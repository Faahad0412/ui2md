const http = require('http');
const handler = require('./api/scrape');

const server = http.createServer((req, rawRes) => {
  // Mock Express-like response
  const res = {
    _status: 200,
    _headers: {},
    status(code) { this._status = code; return this; },
    setHeader(key, val) { rawRes.setHeader(key, val); return this; },
    json(data) {
      rawRes.writeHead(this._status, { 'Content-Type': 'application/json', ...this._headers });
      rawRes.end(JSON.stringify(data));
    },
    end() { rawRes.writeHead(this._status); rawRes.end(); }
  };

  // Parse body
  let body = '';
  req.on('data', chunk => { body += chunk; });
  req.on('end', () => {
    try { req.body = JSON.parse(body || '{}'); } catch (_) { req.body = {}; }
    handler(req, res).catch(err => {
      console.error('Handler error:', err);
      rawRes.writeHead(500, { 'Content-Type': 'application/json' });
      rawRes.end(JSON.stringify({ error: err.message }));
    });
  });
});

const PORT = 3001;
server.listen(PORT, () => console.log(`Local serverless test server at http://localhost:${PORT}`));
