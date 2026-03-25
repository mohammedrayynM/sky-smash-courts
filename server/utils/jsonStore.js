const fs = require('fs').promises;
const path = require('path');

class JsonStore {
    constructor(collectionName) {
        this.dirPath = path.resolve(process.cwd(), 'server', 'data');
        this.filePath = path.join(this.dirPath, `${collectionName}.json`);
        console.log(`[JsonStore] Initialized for ${collectionName}. Path: ${this.filePath}`);
    }

    async ensureDir() {
        try {
            await fs.mkdir(this.dirPath, { recursive: true });
        } catch (err) {
            // Directory likely exists
        }
    }

    async read() {
        await this.ensureDir();
        try {
            const data = await fs.readFile(this.filePath, 'utf8');
            return JSON.parse(data);
        } catch (err) {
            return [];
        }
    }

    async write(data) {
        await this.ensureDir();
        try {
            await fs.writeFile(this.filePath, JSON.stringify(data, null, 2));
        } catch (err) {
            console.error(`[JsonStore] Error writing to ${this.filePath}:`, err);
            throw err;
        }
    }

    async find(query = {}) {
        const data = await this.read();
        return data.filter(item => {
            for (let key in query) {
                if (key === 'date') {
                    // Match by YYYY-MM-DD string
                    const queryDateStr = query[key] instanceof Date
                        ? query[key].toISOString().split('T')[0]
                        : query[key].split('T')[0];
                    const itemDateStr = item[key].split('T')[0];
                    if (itemDateStr !== queryDateStr) return false;
                } else if (item[key] !== query[key]) {
                    return false;
                }
            }
            return true;
        });
    }


    async findOne(query = {}) {
        const results = await this.find(query);
        return results[0] || null;
    }

    async create(item) {
        console.log(`[JsonStore] Creating item in ${this.filePath}`);
        const data = await this.read();
        const newItem = {
            ...item,
            _id: Date.now().toString(36) + Math.random().toString(36).substr(2),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        data.push(newItem);
        await this.write(data);
        return newItem;
    }


    async findById(id) {
        const data = await this.read();
        return data.find(item => item._id === id) || null;
    }

    async findByIdAndUpdate(id, updates) {
        const data = await this.read();
        const index = data.findIndex(item => item._id === id);
        if (index === -1) return null;
        data[index] = { ...data[index], ...updates, updatedAt: new Date().toISOString() };
        await this.write(data);
        return data[index];
    }

    async findByIdAndDelete(id) {
        const data = await this.read();
        const initialLength = data.length;
        const newData = data.filter(item => item._id !== id);
        if (newData.length !== initialLength) {
            await this.write(newData);
            return true;
        }
        return false;
    }
}

module.exports = JsonStore;
