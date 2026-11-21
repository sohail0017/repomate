import type { AskResponse, IndexResponse } from '../types'

const API_URL =
  import.meta.env.VITE_API_URL ??
  (import.meta.env.DEV ? '/api' : 'http://localhost:8080')

async function post<T>(path: string, body: Record<string, string>): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!response.ok) {
    const detail = await response.text()
    throw new Error(detail || `Request failed (${response.status})`)
  }
  return response.json() as Promise<T>
}

export const indexRepository = (githubURL: string, githubToken = '') =>
  post<IndexResponse>('/add-repo', { githubURL, githubToken })

export const askQuestion = (userQuery: string) =>
  post<AskResponse>('/ask-question', { userQuery })
