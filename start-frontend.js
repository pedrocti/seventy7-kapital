#!/usr/bin/env node

// Start Seventy7 Kapital as a static frontend website
import { spawn } from 'child_process';

console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║   🚀 Seventy7 Kapital - Static Frontend Website            ║
║                                                            ║
║   📊 Premium Trading Platform                               ║
║   🌐 Pure Frontend - No Backend Required                   ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
`);

// Start static frontend using our clean config
const viteProcess = spawn('npx', ['vite', '--config', 'vite.config.js'], {
  stdio: 'inherit'
});

viteProcess.on('close', (code) => {
  if (code !== 0) {
    console.error(`Process exited with code ${code}`);
  }
});

process.on('SIGINT', () => {
  console.log('\n👋 Shutting down...');
  viteProcess.kill('SIGINT');
  process.exit(0);
});