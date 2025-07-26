import express from 'express'
import axios from 'axios'
import { Readability } from '@mozilla/readability'
import { JSDOM } from 'jsdom'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY
const GOOGLE_CSE_ID = process.env.GOOGLE_CSE_ID
const GEMINI_API_KEY = process.env.GEMINI_API_KEY

async function searchGoogle(query) {
  const url = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${GOOGLE_CSE_ID}&q=${encodeURIComponent(query)}`
  const res = await axios.get(url)
  return res.data.items || []
}

async function fetchPageText(url) {
  try {
    const res = await axios.get(url, { timeout: 10000 })
    const dom = new JSDOM(res.data, { url })
    const reader = new Readability(dom.window.document)
    const article = reader.parse()
    return article?.textContent || ''
  } catch (e) {
    console.error('Failed to fetch', url, e.message)
    return ''
  }
}

async function summarize(text) {
  const prompt = `Summarize the following text:\n\n${text}`
  const { data } = await axios.post(
    `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
    { contents: [{ parts: [{ text: prompt }] }] }
  )
  return data.candidates?.[0]?.content?.parts?.[0]?.text || ''
}

app.post('/api/search', async (req, res) => {
  const query = req.body.query
  if (!query) return res.status(400).json({ error: 'Query required' })

  try {
    const results = await searchGoogle(query)
    const top = results.slice(0, 3).map(r => ({ title: r.title, link: r.link }))
    const texts = await Promise.all(top.map(r => fetchPageText(r.link)))
    const summary = await summarize(texts.join('\n'))
    res.json({ summary, sources: top })
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'Failed to search' })
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log('Server running on port', PORT)
})
