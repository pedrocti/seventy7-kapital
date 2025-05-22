# Deploying Seventy7 Kapital to Hostinger VPS

This guide will help you deploy your Seventy7 Kapital website to a Hostinger VPS.

## Prerequisites

1. A Hostinger VPS with SSH access
2. Node.js (v16+) and npm installed on the VPS
3. Domain name pointed to your VPS IP address

## Preparation Steps

### 1. Build the Frontend

Before deploying, create a production build of your frontend:

```bash
# Navigate to your project directory
cd client

# Install dependencies if needed
npm install

# Create a production build
npm run build
```

This will generate static files in the `dist` folder that can be served by any web server.

### 2. Server Setup

Create a simple Express server to serve your static files:

```bash
# In your project root, create a server file
touch server.js
```

Add the following code to `server.js`:

```javascript
const express = require('express');
const path = require('path');
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
  console.log(`Server running on port ${PORT}`);
});
```

### 3. Process Manager Setup

Install PM2 to keep your application running:

```bash
# Install PM2 globally
npm install -g pm2

# Start your application with PM2
pm2 start server.js --name seventy7kapital

# Set PM2 to start on system boot
pm2 startup
pm2 save
```

## Deployment Process

### 1. Prepare Your Project for Transfer

```bash
# In your local environment, create a deployment archive
tar -czf seventy7kapital.tar.gz client/dist server.js package.json package-lock.json
```

### 2. Transfer to VPS

```bash
# Using SCP to transfer your files
scp seventy7kapital.tar.gz username@your-vps-ip:/path/to/deployment
```

### 3. Setup on VPS

```bash
# SSH into your VPS
ssh username@your-vps-ip

# Navigate to your deployment directory
cd /path/to/deployment

# Extract the archive
tar -xzf seventy7kapital.tar.gz

# Install dependencies
npm install --production

# Start the application
pm2 start server.js --name seventy7kapital
pm2 startup
pm2 save
```

### 4. Set Up Nginx (Optional but Recommended)

Install Nginx as a reverse proxy for better performance and security:

```bash
# Install Nginx
sudo apt update
sudo apt install nginx

# Configure Nginx
sudo nano /etc/nginx/sites-available/seventy7kapital
```

Add the following configuration:

```nginx
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

Enable the site and restart Nginx:

```bash
sudo ln -s /etc/nginx/sites-available/seventy7kapital /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 5. Set Up SSL with Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

## Monitoring and Maintenance

- Monitor your application: `pm2 monit`
- View logs: `pm2 logs seventy7kapital`
- Restart if needed: `pm2 restart seventy7kapital`

## Automated Deployment (Optional)

For future deployments, you can create a deployment script:

```bash
#!/bin/bash
# deploy.sh

# Pull latest changes
git pull

# Install dependencies
npm install

# Build frontend
cd client && npm run build

# Restart the application
pm2 restart seventy7kapital
```

Make it executable:
```bash
chmod +x deploy.sh
```

## Troubleshooting

- If the site doesn't load, check Nginx logs: `sudo tail -f /var/log/nginx/error.log`
- Check application logs: `pm2 logs seventy7kapital`
- Verify firewall settings to allow HTTP/HTTPS traffic