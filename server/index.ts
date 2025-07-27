import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import { JSDOM } from 'jsdom';
import { Readability } from '@mozilla/readability';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

async function fetchArticleText(url: string): Promise<string> {
  const resp = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const dom = new JSDOM(resp.data, { url });
  const reader = new Readability(dom.window.document);
  const article = reader.parse();
  return article?.textContent || '';
}

app.post('/api/query', async (req, res) => {
  const { query } = req.body as { query: string };
  try {
    const searchResp = await axios.get('https://www.googleapis.com/customsearch/v1', {
      params: {
        key: process.env.GOOGLE_API_KEY,
        cx: process.env.GOOGLE_CSE_ID,
        q: query,
      },
    });
    const items = searchResp.data.items || [];
    const results = [] as Array<{ url: string; title: string; summary: string }>;
    for (const item of items.slice(0, 3)) {
      const url = item.link as string;
      const title = item.title as string;
      const text = await fetchArticleText(url);
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      const result = await model.generateContent(`Summarize the following article in 3 sentences.\n\n${text}`);
      const summary = result.response.text();
      results.push({ url, title, summary });
    }
    res.json({ query, results });
  } catch (err: unknown) {
    console.error(err);
    res.status(500).json({ error: 'Failed to process query' });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
