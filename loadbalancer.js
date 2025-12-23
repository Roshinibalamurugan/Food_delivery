const http = require('http');
const httpProxy = require('http-proxy');

// Create a proxy server
const proxy = httpProxy.createProxyServer({});

// Define backend servers
const nodeBackend = 'http://localhost:5000';
const pythonBackend = 'http://localhost:5001';

// Create load balancer server
const server = http.createServer((req, res) => {
  // Route requests based on path
  if (req.url.startsWith('/api/auth') || req.url.startsWith('/api/food') || req.url.startsWith('/api/orders')) {
    // Route to Node.js backend
    proxy.web(req, res, { target: nodeBackend });
  } else if (req.url.startsWith('/api/analytics')) {
    // Route to Python backend
    proxy.web(req, res, { target: pythonBackend });
  } else {
    // Default: route to Node.js backend
    proxy.web(req, res, { target: nodeBackend });
  }
});

// Handle proxy errors
proxy.on('error', (err, req, res) => {
  console.error('Proxy error:', err);
  res.writeHead(500, { 'Content-Type': 'text/plain' });
  res.end('Proxy error');
});

// Start the load balancer on port 80 or 8080
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Load balancer running on port ${PORT}`);
  console.log(`Routing /api/auth, /api/food, /api/orders to Node.js backend at ${nodeBackend}`);
  console.log(`Routing /api/analytics to Python backend at ${pythonBackend}`);
});
