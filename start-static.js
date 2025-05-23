#!/usr/bin/env node

// Simple script to start Seventy7 Kapital as a static frontend website
const { spawn } = require('child_process');

console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║   🚀 Starting Seventy7 Kapital - Static Frontend           ║
║                                                            ║
║   📊 Pure frontend trading platform                        ║
║   🌐 No backend server required                            ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
`);

// Start Vite dev server in client directory
const viteProcess = spawn('npx', ['vite', '--host', '0.0.0.0', '--port', '3000'], {
  cwd: './client',
  stdio: 'inherit'
});

viteProcess.on('close', (code) => {
  if (code !== 0) {
    console.error(`Vite process exited with code ${code}`);
  }
});

// Handle Ctrl+C gracefully
process.on('SIGINT', () => {
  console.log('\n👋 Shutting down Seventy7 Kapital...');
  viteProcess.kill('SIGINT');
  process.exit(0);
});