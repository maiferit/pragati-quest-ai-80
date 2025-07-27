export interface SearchResult {
  title: string
  link: string
  snippet: string
}

export async function searchGoogle(query: string): Promise<SearchResult[]> {
  const apiKey = import.meta.env.VITE_GOOGLE_SEARCH_API_KEY
  const cseId = import.meta.env.VITE_GOOGLE_CSE_ID
  if (!apiKey || !cseId) throw new Error('Missing Google API credentials')
  const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cseId}&q=${encodeURIComponent(query)}`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Google search failed')
  const data = await res.json() as {
    items?: Array<{ title: string; link: string; snippet: string }>
  }
  return (data.items || []).map(item => ({
    title: item.title,
    link: item.link,
    snippet: item.snippet
  }))
}

export async function fetchPageText(url: string): Promise<string> {
  // Use r.jina.ai to bypass CORS for demo purposes
  const proxyUrl = `https://r.jina.ai/${url}`
  const res = await fetch(proxyUrl)
  if (!res.ok) throw new Error('Failed to fetch page')
  return await res.text()
}

interface GeminiDocument {
  content: string
  source: { name: string; url: string }
}

export async function generateGeminiSummary(query: string, docs: GeminiDocument[]): Promise<string> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY
  if (!apiKey) throw new Error('Missing Gemini API key')
  const promptParts = docs.map((d, i) => `Source ${i + 1} (${d.source.url}):\n${d.content}`)
  const prompt = `Answer the question: "${query}" using the following sources. Cite sources numerically in brackets.\n\n${promptParts.join('\n\n')}`
  const body = {
    contents: [{ role: 'user', parts: [{ text: prompt }] }]
  }
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  if (!res.ok) throw new Error('Gemini request failed')
  const data = await res.json()
  return data.candidates?.[0]?.content?.parts?.[0]?.text || ''
}
