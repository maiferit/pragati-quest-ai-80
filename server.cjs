const express = require('express');
const app = express();
app.use(express.json());

app.post('/api/auth/signup', (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  return res.status(201).json({ message: 'User created' });
});

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body || {};
  if (username === 'user' && password === 'pass') {
    return res.status(200).json({ token: 'fake-jwt-token' });
  }
  return res.status(401).json({ error: 'Invalid credentials' });
});

app.post('/api/chat', (req, res) => {
  const { message } = req.body || {};
  if (!message) {
    return res.status(400).json({ error: 'Message required' });
  }
  return res.status(200).json({ reply: 'Message received' });
});

module.exports = app;
