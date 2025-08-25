// Contact API service
// Uses Vite dev proxy by default (relative path), but supports overriding via env.

export interface ContactPayload {
  name: string
  email: string
  subject: string
  message: string
}

const CONTACT_URL: string =
  (import.meta as any).env?.VITE_API_CONTACT_URL || '/api/contact'

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

export async function sendContact(payload: ContactPayload): Promise<any> {
  const res = await fetch(CONTACT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const msg = await readError(res)
    throw new Error(`Contact request failed: ${msg}`)
  }

  // Contact endpoints sometimes return no body; handle gracefully
  try {
    return await res.json()
  } catch {
    return { success: true }
  }
}