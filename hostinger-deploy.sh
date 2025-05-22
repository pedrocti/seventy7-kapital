#!/bin/bash

# Seventy7 Kapital - Hostinger VPS Deployment Script
# This script prepares your app for deployment to Hostinger VPS

# Text formatting
BOLD=$(tput bold)
GREEN=$(tput setaf 2)
BLUE=$(tput setaf 4)
RESET=$(tput sgr0)

# Print banner
echo "${BOLD}${BLUE}"
echo "╔═══════════════════════════════════════════════════════════╗"
echo "║                                                           ║"
echo "║   Seventy7 Kapital - Hostinger VPS Deployment Package     ║"
echo "║                                                           ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo "${RESET}"

# Create build directories
BUILD_DIR="./hostinger-deploy"
DIST_DIR="$BUILD_DIR/dist"
mkdir -p $DIST_DIR

# Build frontend
echo "${BOLD}${GREEN}Building production frontend...${RESET}"
cd client
npm run build
cd ..

# Copy dist files
echo "${BOLD}${GREEN}Preparing deployment package...${RESET}"
cp -r client/dist/* $DIST_DIR/

# Create production server.js
cat > $BUILD_DIR/server.js << 'EOL'
const express = require('express');
const path = require('path');
const fs = require('fs');
const compression = require('compression');

// Initialize the Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Enable gzip compression
app.use(compression());

// Serve static files with cache control
app.use(express.static(path.join(__dirname, 'dist'), {
  maxAge: '7d', // Cache assets for 7 days
  setHeaders: (res, path) => {
    // Don't cache HTML files
    if (path.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache');
    }
  }
}));

// Handle client-side routing - serve index.html for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`
┌────────────────────────────────────────────────────┐
│                                                    │
│   🚀 Seventy7 Kapital is running!                  │
│   🌐 Server active on port: ${PORT}                 │
│                                                    │
└────────────────────────────────────────────────────┘
`);
});
EOL

# Create package.json
cat > $BUILD_DIR/package.json << 'EOL'
{
  "name": "seventy7-kapital",
  "version": "1.0.0",
  "description": "Seventy7 Kapital Trading Platform",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "compression": "^1.7.4"
  },
  "engines": {
    "node": ">=16.0.0"
  }
}
EOL

# Create PM2 ecosystem config
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
      PORT: 3000
    }
  }]
};
EOL

# Create Nginx configuration
cat > $BUILD_DIR/seventy7kapital.conf << 'EOL'
server {
    listen 80;
    listen [::]:80;
    
    # Replace with your actual domain
    server_name yourdomain.com www.yourdomain.com;
    
    # Redirect HTTP to HTTPS
    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    
    # Replace with your actual domain
    server_name yourdomain.com www.yourdomain.com;
    
    # SSL configuration - these paths will be updated by Certbot
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    
    # SSL settings
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 1d;
    ssl_session_tickets off;
    
    # HSTS
    add_header Strict-Transport-Security "max-age=63072000" always;
    
    # Other security headers
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options SAMEORIGIN;
    add_header X-XSS-Protection "1; mode=block";
    
    # Proxy requests to Node.js application
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # Proxy WebSocket connections
    location /socket.io/ {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Optimize asset delivery
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg)$ {
        proxy_pass http://localhost:3000;
        proxy_cache_valid 7d;
        add_header Cache-Control "public, max-age=604800";
    }
    
    # Error pages
    error_page 404 /index.html;
    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
        root /usr/share/nginx/html;
    }
}
EOL

# Create deployment instructions
cat > $BUILD_DIR/DEPLOY.md << 'EOL'
# Seventy7 Kapital - Hostinger VPS Deployment Guide

Follow these steps to deploy the application to your Hostinger VPS:

## 1. Upload Files to VPS

Upload all the files in this deployment package to your VPS:

```bash
# Example using scp (replace with your VPS details)
scp -r * username@your-vps-ip:/path/to/seventy7kapital
```

## 2. Install Node.js and Dependencies

SSH into your VPS and install Node.js if not already installed:

```bash
# SSH into your VPS
ssh username@your-vps-ip

# Update package lists
sudo apt update

# Install Node.js and npm (if not already installed)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node -v
npm -v

# Navigate to your app directory
cd /path/to/seventy7kapital

# Install dependencies
npm install
```

## 3. Install and Configure PM2

```bash
# Install PM2 globally
sudo npm install -g pm2

# Start the application with PM2
pm2 start ecosystem.config.js

# Set PM2 to start on system boot
pm2 startup
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u your-username --hp /home/your-username
pm2 save
```

## 4. Install and Configure Nginx

```bash
# Install Nginx
sudo apt install -y nginx

# Copy Nginx configuration
sudo cp seventy7kapital.conf /etc/nginx/sites-available/

# Edit the configuration to replace 'yourdomain.com' with your actual domain
sudo nano /etc/nginx/sites-available/seventy7kapital.conf

# Create a symbolic link to enable the site
sudo ln -s /etc/nginx/sites-available/seventy7kapital.conf /etc/nginx/sites-enabled/

# Test Nginx configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

## 5. Set Up SSL Certificate with Let's Encrypt

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtain SSL certificates
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Test automatic renewal
sudo certbot renew --dry-run
```

## 6. Verify Deployment

Visit your domain to ensure the site is working properly.

## 7. Monitoring and Maintenance

```bash
# Monitor application
pm2 monit

# View logs
pm2 logs seventy7kapital

# Restart the application
pm2 restart seventy7kapital
```

## Updating the Application

For future updates:

1. Upload new files to the server
2. Navigate to your application directory
3. Run `npm install` if dependencies have changed
4. Restart the application: `pm2 restart seventy7kapital`
EOL

# Create installation script
cat > $BUILD_DIR/install.sh << 'EOL'
#!/bin/bash

# Seventy7 Kapital - VPS Installation Script
# Run this script on your VPS after uploading the files

# Check if running as root
if [ "$EUID" -ne 0 ]
  then echo "Please run as root or using sudo"
  exit
fi

echo "Installing dependencies..."
apt update
apt install -y nginx certbot python3-certbot-nginx

# Install Node.js if not already installed
if ! command -v node &> /dev/null; then
    echo "Installing Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
    apt install -y nodejs
fi

# Install PM2 globally
echo "Installing PM2..."
npm install -g pm2

# Install application dependencies
echo "Installing application dependencies..."
npm install

# Configure Nginx
echo "Setting up Nginx..."
read -p "Enter your domain name (e.g., example.com): " domain_name

# Replace domain placeholder in Nginx config
sed -i "s/yourdomain.com/$domain_name/g" seventy7kapital.conf

# Copy Nginx configuration
cp seventy7kapital.conf /etc/nginx/sites-available/

# Create symbolic link
ln -s /etc/nginx/sites-available/seventy7kapital.conf /etc/nginx/sites-enabled/ 2>/dev/null || true

# Test and restart Nginx
nginx -t && systemctl restart nginx

# Start the application with PM2
echo "Starting the application..."
pm2 start ecosystem.config.js
pm2 startup
pm2 save

# Set up SSL
echo "Setting up SSL with Let's Encrypt..."
read -p "Do you want to set up SSL now? (y/n): " setup_ssl

if [ "$setup_ssl" = "y" ]; then
    certbot --nginx -d $domain_name -d www.$domain_name
fi

echo "
Installation complete! Your Seventy7 Kapital website should now be running.
Visit https://$domain_name to view your site.

To monitor your application: pm2 monit
To view logs: pm2 logs seventy7kapital
"
EOL

# Make install script executable
chmod +x $BUILD_DIR/install.sh

# Create a .htaccess file for shared hosting as fallback option
cat > $BUILD_DIR/dist/.htaccess << 'EOL'
# Enable rewrite engine
RewriteEngine On

# If requested resource exists as a file or directory, skip rewrite rules
RewriteCond %{REQUEST_FILENAME} -f [OR]
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^ - [L]

# Otherwise, rewrite all requests to index.html
RewriteRule ^ index.html [L]

# Enable GZIP compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/plain
  AddOutputFilterByType DEFLATE text/html
  AddOutputFilterByType DEFLATE text/xml
  AddOutputFilterByType DEFLATE text/css
  AddOutputFilterByType DEFLATE application/xml
  AddOutputFilterByType DEFLATE application/xhtml+xml
  AddOutputFilterByType DEFLATE application/rss+xml
  AddOutputFilterByType DEFLATE application/javascript
  AddOutputFilterByType DEFLATE application/x-javascript
  AddOutputFilterByType DEFLATE application/json
</IfModule>

# Set browser caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType application/x-javascript "access plus 1 month"
  ExpiresByType application/json "access plus 0 seconds"
</IfModule>
EOL

# Create archive
echo "${BOLD}${GREEN}Creating deployment package...${RESET}"
cd $BUILD_DIR
tar -czf ../seventy7kapital-hostinger.tar.gz .
cd ..

echo "${BOLD}${GREEN}✅ Deployment package created successfully!${RESET}"
echo ""
echo "${BOLD}File: ${BLUE}seventy7kapital-hostinger.tar.gz${RESET}"
echo ""
echo "Upload this file to your Hostinger VPS and follow the instructions in DEPLOY.md"
echo "For quick setup, run the install.sh script after uploading."
echo ""
echo "Example upload command:"
echo "scp seventy7kapital-hostinger.tar.gz username@your-vps-ip:~/"
echo ""
echo "Then SSH into your VPS, extract the archive, and run install.sh:"
echo "ssh username@your-vps-ip"
echo "mkdir -p seventy7kapital"
echo "tar -xzf seventy7kapital-hostinger.tar.gz -C seventy7kapital"
echo "cd seventy7kapital"
echo "sudo ./install.sh"