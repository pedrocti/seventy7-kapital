const express = require('express');
const path = require('path');
const fs = require('fs');
const compression = require('compression');
const helmet = require('helmet');

// Initialize the Express app
const app = express();
const PORT = process.env.PORT || 80;

// Apply security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "cdnjs.cloudflare.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "cdnjs.cloudflare.com"],
      imgSrc: ["'self'", "data:", "blob:"],
      fontSrc: ["'self'", "cdnjs.cloudflare.com"],
      connectSrc: ["'self'", "t.me"], // Allow connections to Telegram
    }
  },
  // Other helmet options
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// Enable gzip compression
app.use(compression());

// Serve static files with cache control
app.use(express.static(path.join(__dirname, 'dist'), {
  maxAge: '1y', // Cache assets for 1 year
  setHeaders: (res, path) => {
    // Don't cache HTML files
    if (path.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache');
    }
  }
}));

// Add basic logging
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.url} ${res.statusCode} - ${duration}ms`);
  });
  next();
});

// Handle client-side routing - serve index.html for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Handle errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`
┌────────────────────────────────────────────────────┐
│                                                    │
│   🚀 Seventy7 Kapital is live!                     │
│                                                    │
│   🌐 Server running on port: ${PORT}                │
│   🔒 Production mode enabled                        │
│   📊 Financial freedom accelerator                  │
│                                                    │
└────────────────────────────────────────────────────┘
`);
});