#!/bin/bash

# Seventy7 Kapital Deployment Script
# This script builds and packages the site for deployment to a VPS

echo "🚀 Starting Seventy7 Kapital deployment process..."

# Create a build directory
BUILD_DIR="./build"
mkdir -p $BUILD_DIR

# Build the frontend
echo "📦 Building the frontend..."
cd client
npm run build
cd ..

# Copy built files to build directory
echo "📋 Preparing deployment package..."
cp -r client/dist $BUILD_DIR/

# Create production server file
cat > $BUILD_DIR/server.js << 'EOL'
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 80;

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')));

// Handle client-side routing - serve index.html for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`
  ┌────────────────────────────────────────────┐
  │                                            │
  │   Seventy7 Kapital server is running!      │
  │   Port: ${PORT}                             │
  │   Environment: production                  │
  │                                            │
  └────────────────────────────────────────────┘
  `);
});
EOL

# Create package.json for production
cat > $BUILD_DIR/package.json << 'EOL'
{
  "name": "seventy7-kapital-production",
  "version": "1.0.0",
  "description": "Seventy7 Kapital Trading Platform (Production)",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  }
}
EOL

# Create a PM2 ecosystem config
cat > $BUILD_DIR/ecosystem.config.js << 'EOL'
module.exports = {
  apps: [{
    name: 'seventy7kapital',
    script: 'server.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '500M',
    env: {
      NODE_ENV: 'production',
      PORT: 80
    }
  }]
};
EOL

# Create a README with deployment instructions
cat > $BUILD_DIR/README.md << 'EOL'
# Seventy7 Kapital (Production Build)

This is a production-ready build of the Seventy7 Kapital trading platform.

## Deployment Steps

1. Upload all these files to your VPS
2. Install dependencies:
   ```
   npm install
   ```
3. Start the server:
   - Using Node: `npm start`
   - Using PM2 (recommended): `pm2 start ecosystem.config.js`

## Using with Nginx

If you're using Nginx as a reverse proxy, use this configuration:

```
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Then secure with SSL:
```
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

## Troubleshooting

- Check logs with: `pm2 logs seventy7kapital`
- Restart with: `pm2 restart seventy7kapital`
EOL

# Create a .env.example file
cat > $BUILD_DIR/.env.example << 'EOL'
# Seventy7 Kapital Environment Variables
PORT=80
NODE_ENV=production
EOL

# Create a deployment archive
echo "📦 Creating deployment archive..."
cd $BUILD_DIR
tar -czf ../seventy7kapital-deploy.tar.gz .
cd ..

# Clean up
echo "🧹 Cleaning up..."
# Keeping the build directory for reference

echo "✅ Deployment package created: seventy7kapital-deploy.tar.gz"
echo "📋 Upload this file to your Hostinger VPS and extract it."
echo "   Then follow the instructions in README.md to complete deployment."

# Provide helpful commands for VPS upload
echo ""
echo "🚀 Use these commands to deploy to your VPS:"
echo "scp seventy7kapital-deploy.tar.gz username@your-vps-ip:/path/to/deployment"
echo "ssh username@your-vps-ip"
echo "cd /path/to/deployment"
echo "tar -xzf seventy7kapital-deploy.tar.gz"
echo "npm install"
echo "pm2 start ecosystem.config.js"
echo ""