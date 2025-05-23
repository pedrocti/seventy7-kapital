#!/bin/bash

# Seventy7 Kapital - Static Website Build Script

echo "🚀 Building Seventy7 Kapital Static Website..."

# Clean previous builds
rm -rf dist

# Build the static website
npx vite build

# Create deployment package
echo "📦 Creating deployment package..."
cd dist
tar -czf ../seventy7kapital-static.tar.gz .
cd ..

echo "✅ Static website built successfully!"
echo "📁 Files ready in: ./dist/"
echo "📦 Deployment package: seventy7kapital-static.tar.gz"
echo ""
echo "🌐 To deploy:"
echo "   1. Upload the contents of ./dist/ to your hosting provider"
echo "   2. Or extract seventy7kapital-static.tar.gz on your server"
echo ""
echo "💡 Compatible with any static hosting service:"
echo "   - Netlify, Vercel, GitHub Pages"
echo "   - AWS S3, Hostinger, cPanel"
echo "   - Any web server (Apache, Nginx)"