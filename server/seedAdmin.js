const { connectDB } = require('./config/db');
const User = require('./models/User');
require('dotenv').config();

const seedAdmin = async () => {
    try {
        await connectDB();

        const adminEmail = 'admin@skysmash.com';

        // Check if admin already exists
        const existingAdmin = await User.findOne({ where: { email: adminEmail } });

        if (existingAdmin) {
            existingAdmin.password = 'admin123'; // Model hook will hash
            await existingAdmin.save();
            console.log('✅ Admin user updated successfully!');
            process.exit(0);
        }

        // Create new admin user
        await User.create({
            name: 'Admin',
            email: adminEmail,
            password: 'admin123', // Model hook will hash
            isAdmin: true
        });

        console.log('✅ Admin user created successfully!');
        console.log('');
        console.log('==========================================');
        console.log('       ADMIN LOGIN CREDENTIALS');
        console.log('==========================================');
        console.log('📧 Email:    admin@skysmash.com');
        console.log('🔑 Password: admin123');
        console.log('==========================================');
        console.log('');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding admin:', error.message);
        process.exit(1);
    }
};

seedAdmin();
