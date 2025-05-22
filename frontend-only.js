// Frontend-only solution for Seventy7 Kapital
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Map file extensions to MIME types
const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.ttf': 'font/ttf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

// Create a simple server
const server = http.createServer((req, res) => {
  // Normalize URL to prevent directory traversal
  let url = req.url;
  
  // Redirect root to index.html
  if (url === '/') {
    url = '/index.html';
  }
  
  // Client-side routing - return index.html for all page requests
  if (url.match(/^\/(privacy-policy|terms-of-service|disclaimer)$/)) {
    url = '/index.html';
  }
  
  // Set the filepath based on the request
  let filepath = '';
  if (url.startsWith('/src/') || url === '/index.html') {
    filepath = path.join(__dirname, 'client', url);
  } else if (url.startsWith('/assets/')) {
    // Handle assets
    filepath = path.join(__dirname, 'client', url);
  } else {
    // Try to find the file in public directory
    filepath = path.join(__dirname, 'public', url);
    
    // If not found in public, check client directory
    if (!fs.existsSync(filepath)) {
      filepath = path.join(__dirname, 'client', url);
    }
  }
  
  // Get the file extension
  const extname = path.extname(filepath);
  
  // Set default content type to text/plain
  let contentType = 'text/plain';
  
  // Set the content type based on the file extension
  if (extname in mimeTypes) {
    contentType = mimeTypes[extname];
  }
  
  // Read the file
  fs.readFile(filepath, (err, data) => {
    if (err) {
      // If the file doesn't exist, serve index.html (for client-side routing)
      if (err.code === 'ENOENT') {
        fs.readFile(path.join(__dirname, 'client', 'index.html'), (err, data) => {
          if (err) {
            res.writeHead(500);
            res.end('Error loading index.html');
            return;
          }
          
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(data, 'utf-8');
        });
        return;
      }
      
      // Handle other errors
      res.writeHead(500);
      res.end(`Server Error: ${err.code}`);
      return;
    }
    
    // Success - return the file
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data, 'utf-8');
  });
});

// Set the port (using 3000 to avoid conflict with the main application)
const PORT = process.env.PORT || 3000;

// Start the server
server.listen(PORT, '0.0.0.0', () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║   🚀 Seventy7 Kapital - Frontend Only Solution             ║
║                                                            ║
║   Server running at http://localhost:${PORT}                ${PORT === 5000 ? ' ' : ''}║
║                                                            ║
║   Frontend-only mode: No backend dependencies required!    ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
`);
});