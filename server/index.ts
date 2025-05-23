import { spawn } from 'child_process';

console.log('🚀 Seventy7 Kapital - Pure Static Frontend');

// Start Vite directly from client directory for static website
const viteProcess = spawn('npx', ['vite', '--host', '0.0.0.0', '--port', '5000'], {
  cwd: 'client',
  stdio: 'inherit'
});

console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║   🚀 Seventy7 Kapital - Static Trading Platform           ║
║                                                            ║
║   📊 Starting at: http://localhost:5000                   ║
║   🌐 Pure frontend, no backend required!                  ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
`);