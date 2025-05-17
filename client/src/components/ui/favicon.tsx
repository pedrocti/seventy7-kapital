import React from 'react';

const Favicon: React.FC = () => {
  const svgString = `
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
    <defs>
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#7E22CE" />
        <stop offset="100%" stop-color="#0AEFFF" />
      </linearGradient>
    </defs>
    <circle cx="16" cy="16" r="16" fill="url(#gradient)" />
    <text x="50%" y="50%" font-family="Orbitron, sans-serif" font-size="14" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">77</text>
  </svg>
  `;
  
  const base64 = btoa(svgString);

  React.useEffect(() => {
    const link = document.querySelector<HTMLLinkElement>("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/svg+xml';
    link.rel = 'shortcut icon';
    link.href = `data:image/svg+xml;base64,${base64}`;
    document.head.appendChild(link);
  }, []);

  return null;
};

export default Favicon;
