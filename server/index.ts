import { exec } from 'child_process';
import path from 'path';

console.log('🚀 Starting Seventy7 Kapital Trading Platform...');

const clientPath = path.join(process.cwd(), 'client');

// Use Vite CLI directly for proper module handling
const viteCommand = `cd ${clientPath} && npx vite --host 0.0.0.0 --port 5000`;

const viteProcess = exec(viteCommand, (error, stdout, stderr) => {
  if (error) {
    console.error('Error starting Vite:', error);
    return;
  }
  if (stderr) {
    console.error('Vite stderr:', stderr);
  }
  console.log('Vite output:', stdout);
});

viteProcess.stdout?.on('data', (data) => {
  console.log(data.toString());
});

viteProcess.stderr?.on('data', (data) => {
  console.error(data.toString());
});

console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║   🚀 Seventy7 Kapital - Starting Vite Server              ║
║                                                            ║
║   📊 Will be available at: http://localhost:5000           ║
║   🌐 Loading your trading platform...                     ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
`);