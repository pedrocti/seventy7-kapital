# Seventy7 Kapital - Static Trading Website

A modern Web3-style landing page for Seventy7 Kapital, featuring premium trading and financial empowerment services.

## Features

- 🎯 Modern Web3 aesthetic with dark theme and neon accents
- 📊 Interactive trading visuals and candlestick charts
- 🚀 Smooth animations with Framer Motion
- 📱 Fully responsive design for all devices
- ⚡ Pure static website - no backend required
- 🔒 SEO-friendly with proper meta tags

## Quick Start

```bash
# Start development server
node start-frontend.js

# Or using npm
npm install
npx vite --config vite.config.js
```

The website will be available at http://localhost:3000

## Build for Production

```bash
# Build static website
./build-static.sh

# Or manually
npx vite build
```

This creates a `dist/` folder with all static files ready for deployment.

## Deployment

Your website is now 100% static and can be deployed to any hosting service:

### Option 1: Static Hosting Services
- **Netlify**: Drag and drop the `dist` folder
- **Vercel**: Upload the `dist` folder  
- **GitHub Pages**: Push `dist` contents to gh-pages branch

### Option 2: Traditional Web Hosting
- **Hostinger**: Upload `dist` contents to public_html
- **cPanel**: Upload `dist` contents to public_html
- **Any web server**: Upload `dist` contents to web root

### Option 3: CDN/Cloud Storage
- **AWS S3**: Upload `dist` contents and enable static website hosting
- **Cloudflare Pages**: Connect your repository
- **Firebase Hosting**: Deploy `dist` folder

## Project Structure

```
seventy7-kapital/
├── client/                   # Frontend application
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── pages/           # Application pages
│   │   └── hooks/           # Custom React hooks
│   └── index.html           # HTML entry point
├── public/                  # Static assets
├── index.html              # Main entry point
├── vite.config.js          # Build configuration
├── build-static.sh         # Build script
└── start-frontend.js       # Development server
```

## Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Animations**: Framer Motion
- **Charts**: Recharts, D3.js
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Static files (no server required)

## Key Components

- **Hero Section**: Animated trading visuals with candlestick charts
- **Services Section**: Interactive service cards with gradient effects
- **Blog Section**: Dynamic content cards with smooth animations
- **Trading Visuals**: Market indicators and charts
- **Particle Background**: Animated particle system

## Performance Features

- ⚡ Optimized static build
- 🗜️ Asset compression and minification
- 📊 Efficient chart rendering
- 🎨 Tailwind CSS for styling
- 💾 Browser caching support

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

All rights reserved - Seventy7 Kapital