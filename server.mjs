import http from 'http';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

const requestListener = (req, res) => {
  if (req.url === '/env-check') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      gemini: Boolean(process.env.GEMINI_API_KEY),
      google: Boolean(process.env.GOOGLE_API_KEY),
    }));
    return;
  }
  res.writeHead(404);
  res.end();
};

const server = http.createServer(requestListener);
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
