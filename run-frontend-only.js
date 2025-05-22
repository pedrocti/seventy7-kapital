// Simple script to run the frontend-only version of Seventy7 Kapital
import { exec } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define paths
const entryPath = join(__dirname, 'client/frontend.html');

// Ensure the frontend entry point exists
if (!fs.existsSync(entryPath)) {
  console.error('Error: Frontend entry point not found at:', entryPath);
  process.exit(1);
}

// Define the command to start a frontend-only version using Vite
// This uses the frontend.html entry point instead of the default index.html
const command = 'npx vite --port 3000 --host 0.0.0.0 client/ --open frontend.html';

console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║   🚀 Seventy7 Kapital - Frontend Only Version              ║
║                                                            ║
║   Starting without backend dependencies...                 ║
║   Opening: http://localhost:3000/frontend.html             ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
`);

// Run the command
const childProcess = exec(command);

// Forward stdout and stderr
childProcess.stdout?.on('data', (data) => {
  console.log(data);
});

childProcess.stderr?.on('data', (data) => {
  console.error(data);
});

// Handle process completion
childProcess.on('close', (code) => {
  if (code !== 0) {
    console.error(`Frontend process exited with code ${code}`);
  }
});