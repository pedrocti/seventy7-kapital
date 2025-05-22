#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

// Start the frontend directly with Vite
console.log('Starting Seventy7 Kapital (Frontend Only)...');
console.log('Launching website on http://localhost:5000');

const viteProcess = spawn('npx', ['vite'], {
  stdio: 'inherit',
  shell: true,
});

viteProcess.on('close', (code) => {
  if (code !== 0) {
    console.error(`Frontend process exited with code ${code}`);
  }
});