#!/usr/bin/env node

// Simple static server for Seventy7 Kapital frontend
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from client directory
app.use(express.static(path.join(__dirname, 'client')));

// For client-side routing, serve static.html for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'static.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║   🚀 Seventy7 Kapital - Static Frontend                    ║
║                                                            ║
║   📊 Trading Platform Running on Port: ${PORT}             ║
║   🌐 Access: http://localhost:${PORT}                      ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
  `);
});