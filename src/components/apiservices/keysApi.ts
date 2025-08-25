// API Keys service
// Uses Vite dev proxy by default (relative path), but supports overriding via env.

export interface CreateKeyPayload {
  name: string
  permissions: string[]
}

export interface ApiKeyResponse {
  id?: string
  name: string
  key?: string
  permissions: string[]
  createdAt?: string
  lastUsedAt?: string
}

const KEYS_BASE_URL: string =
  (import.meta as any).env?.VITE_API_KEYS_URL || '/api/keys'

async function readError(res: Response): Promise<string> {
  try {
    const text = await res.text()
    if (!text) return `${res.status} ${res.statusText}`
    try {
      const json = JSON.parse(text)
      return json.message || JSON.stringify(json)
    } catch {
      return text
    }
  } catch {
    return `${res.status} ${res.statusText}`
  }
}

// Create an API key for a user: POST /api/keys?userId=...
export async function createApiKey(userId: string, payload: CreateKeyPayload): Promise<ApiKeyResponse> {
  const url = `${KEYS_BASE_URL}?${new URLSearchParams({ userId })}`
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const msg = await readError(res)
    throw new Error(`Create API key failed: ${msg}`)
  }

  return res.json()
}