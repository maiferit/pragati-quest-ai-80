import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';
import { Readability } from '@mozilla/readability';

const app = express();
app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || '';
const GOOGLE_CX = process.env.GOOGLE_CX || '';

interface User {
  email: string;
  password: string;
}

interface Message {
  id: string;
  query: string;
  response: string;
  sources: Array<{ title: string; url: string }>;
}

const DATA_PATH = path.join(__dirname, 'data.json');
let data: { users: User[]; messages: Record<string, Message[]> } = { users: [], messages: {} };

if (fs.existsSync(DATA_PATH)) {
  data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
}

function save() {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
}

app.post('/api/auth/signup', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Missing fields' });
  if (data.users.find(u => u.email === email)) return res.status(409).json({ error: 'User exists' });
  data.users.push({ email, password });
  save();
  res.json({ success: true });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = data.users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  res.json({ success: true });
});

app.post('/api/chat', async (req, res) => {
  const { email, query } = req.body;
  if (!query) return res.status(400).json({ error: 'No query' });

  try {
    // search google
    const searchRes = await fetch(`https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${GOOGLE_CX}&q=${encodeURIComponent(query)}`);
    const searchJson = await searchRes.json();
    const items = searchJson.items?.slice(0, 3) || [];

    const sources: Array<{ title: string; url: string; content: string }> = [];
    for (const item of items) {
      try {
        const resp = await fetch(item.link);
        const html = await resp.text();
        const dom = new JSDOM(html);
        const reader = new Readability(dom.window.document);
        const article = reader.parse();
        sources.push({ title: item.title, url: item.link, content: article?.textContent || '' });
      } catch (e) {
        sources.push({ title: item.title, url: item.link, content: '' });
      }
    }

    const contextText = sources.map(s => s.content).join('\n');
    const prompt = `Answer the question: "${query}" using the following context:\n${contextText}`;
    const gemRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });
    const gemJson = await gemRes.json();
    const responseText = gemJson.candidates?.[0]?.content?.parts?.[0]?.text || '';

    const message: Message = {
      id: Date.now().toString(),
      query,
      response: responseText,
      sources: sources.map(s => ({ title: s.title, url: s.url }))
    };

    if (email) {
      if (!data.messages[email]) data.messages[email] = [];
      data.messages[email].push(message);
      save();
    }

    res.json(message);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to process query' });
  }
});

app.get('/api/history', (req, res) => {
  const email = req.query.email as string;
  if (!email) return res.json([]);
  res.json(data.messages[email] || []);
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
