const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

// This simple server only serves the static frontend files
// No backend functionality or API routes are included

// Serve static files from the client directory
app.use(express.static(path.join(__dirname, 'client')));

// Handle client-side routing - serve index.html for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`
╔════════════════════════════════════════════════════╗
║                                                    ║
║   🚀 Seventy7 Kapital - Frontend Only Solution     ║
║                                                    ║
║   📊 Server running on: http://localhost:${PORT}    ${PORT === 5000 ? ' ' : ''}║
║   📱 Static files served from: ./client            ║
║                                                    ║
╚════════════════════════════════════════════════════╝
`);
});