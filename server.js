const express = require('express');
const path = require('path');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable compression
app.use(compression());

// Serve static files from Build directory
app.use(express.static('Build', {
  setHeaders: (res, filePath) => {
    // Set proper MIME types for Unity WebGL files
    if (filePath.endsWith('.wasm.br')) {
      res.setHeader('Content-Type', 'application/wasm');
      res.setHeader('Content-Encoding', 'br');
    } else if (filePath.endsWith('.js.br')) {
      res.setHeader('Content-Type', 'application/javascript');
      res.setHeader('Content-Encoding', 'br');
    } else if (filePath.endsWith('.data.br')) {
      res.setHeader('Content-Type', 'application/octet-stream');
      res.setHeader('Content-Encoding', 'br');
    } else if (filePath.endsWith('.wasm.gz')) {
      res.setHeader('Content-Type', 'application/wasm');
      res.setHeader('Content-Encoding', 'gzip');
    } else if (filePath.endsWith('.js.gz')) {
      res.setHeader('Content-Type', 'application/javascript');
      res.setHeader('Content-Encoding', 'gzip');
    } else if (filePath.endsWith('.data.gz')) {
      res.setHeader('Content-Type', 'application/octet-stream');
      res.setHeader('Content-Encoding', 'gzip');
    }
  }
}));

// Serve index.html for root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Unity WebGL server running on port ${PORT}`);
});
