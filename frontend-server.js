// Simple static file server for the frontend
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Serve the client files directly
app.use(express.static(path.join(__dirname, 'client')));

// For any other routes, serve index.html to support client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`📊 Seventy7 Kapital frontend running on port ${PORT}`);
  console.log(`🚀 Visit: http://localhost:${PORT}`);
  console.log(`❗ This is a frontend-only version with no backend dependencies`);
});