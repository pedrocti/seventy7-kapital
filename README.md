# Seventy7 Kapital - Trading Platform

A modern Web3-style landing page for Seventy7 Kapital, featuring premium trading and financial empowerment services.

## Features

- 🎯 Modern Web3 aesthetic with dark theme and neon accents
- 📊 Interactive trading visuals and candlestick charts
- 🚀 Smooth animations with Framer Motion
- 📱 Fully responsive design for all devices
- ⚡ Optimized performance and fast loading
- 🔒 SEO-friendly with proper meta tags

## Project Structure

```
seventy7-kapital/
├── client/                    # Frontend application
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── pages/            # Application pages
│   │   ├── lib/              # Utilities and configurations
│   │   └── hooks/            # Custom React hooks
│   ├── index.html            # Main HTML entry point
│   └── frontend.html         # Frontend-only version
├── server/                   # Backend server (Express)
├── public/                   # Static assets
├── deploy.sh                 # General deployment script
├── hostinger-deploy.sh       # Hostinger VPS specific deployment
├── production-server.js      # Production-ready server
├── static-server.js          # Simple static file server
└── deployment-guide.md       # Detailed deployment instructions
```

## Quick Start (Development)

```bash
npm install
npm run dev
```

The application will be available at http://localhost:5000

## Production Deployment

### Option 1: Hostinger VPS (Recommended)

Run the automated deployment script:

```bash
chmod +x hostinger-deploy.sh
./hostinger-deploy.sh
```

This creates a complete deployment package with:
- Production-optimized build
- Nginx configuration with SSL
- PM2 process management
- Automated installation script

### Option 2: Static Hosting

For simple static hosting, build the frontend:

```bash
cd client
npm run build
```

Then upload the `dist` folder contents to your hosting provider.

### Option 3: Custom Server

Use the production server for custom deployments:

```bash
npm install --production
node production-server.js
```

## Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Animations**: Framer Motion
- **Charts**: Recharts, D3.js
- **Icons**: Lucide React
- **Backend**: Node.js, Express
- **Build Tool**: Vite
- **Process Manager**: PM2 (for production)
- **Web Server**: Nginx (recommended for production)

## Key Components

- **Hero Section**: Animated trading visuals with candlestick charts
- **Services Section**: Interactive service cards with gradient effects
- **Blog Section**: Dynamic content cards with smooth animations
- **Trading Visuals**: Real-time market indicators and charts
- **Particle Background**: Animated particle system for visual appeal

## Performance Features

- ⚡ Code splitting and lazy loading
- 🗜️ Asset compression and optimization
- 📊 Efficient chart rendering
- 🎨 CSS-in-JS with Tailwind CSS
- 💾 Static asset caching

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

All rights reserved - Seventy7 Kapital