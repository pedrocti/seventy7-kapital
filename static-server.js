const express = require('express');
const path = require('path');
const fs = require('fs');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Simple request logger
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'client/dist')));

// For all other routes, serve the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`
┌────────────────────────────────────────────────────┐
│                                                    │
│   Seventy7 Kapital - Static Server                 │
│                                                    │
│   Server running at:                               │
│   http://localhost:${PORT}                          │
│                                                    │
│   Press Ctrl+C to stop                             │
│                                                    │
└────────────────────────────────────────────────────┘
  `);
});