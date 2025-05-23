import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 5000;

// Serve static files from client directory
app.use(express.static(join(__dirname, 'client')));

// For client-side routing, serve index.html for all routes
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'client', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Seventy7 Kapital running at http://localhost:${PORT}`);
});