const { spawn } = require('child_process');
const path = require('path');

function startProcess(name, command, args, cwd) {
    const child = spawn(command, args, {
        cwd: cwd,
        shell: true,
        stdio: 'inherit'
    });

    child.on('error', (err) => {
        console.error(`Failed to start ${name}:`, err);
    });

    child.on('exit', (code) => {
        console.log(`${name} exited with code ${code}`);
    });

    return child;
}

console.log('Starting Sky Smash Courts...');

// Start Backend
const serverCwd = path.join(__dirname, 'server');
const server = startProcess('Backend', 'npm', ['run', 'start'], serverCwd);

// Start Frontend
const clientCwd = path.join(__dirname, 'client');
const client = startProcess('Frontend', 'npm', ['run', 'dev'], clientCwd);

process.on('SIGINT', () => {
    server.kill();
    client.kill();
    process.exit();
});
