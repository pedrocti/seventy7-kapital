#!/usr/bin/env node

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, '..');

// Run Vite directly from the client directory
console.log('Starting Seventy7 Kapital Frontend...');
const viteProcess = spawn('npx', ['vite'], {
  cwd: rootDir,
  shell: true,
  stdio: 'inherit',
  env: {
    ...process.env,
    PORT: '5000',
  },
});

viteProcess.on('close', (code) => {
  if (code !== 0) {
    console.error(`Frontend process exited with code ${code}`);
  }
});