const BASE = import.meta.env.VITE_API_URL

export async function joinPlayerWaitlist(email: string): Promise<{ message: string }> {
  const res = await fetch(`${BASE}/waitlist/player`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message ?? 'Request failed')
  return data
}

export async function registerVenueWaitlist(payload: {
  contactName: string
  venueName: string
  city: string
  phone: string
  email: string
  sports: string[]
}): Promise<{ message: string }> {
  const res = await fetch(`${BASE}/waitlist/venue`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message ?? 'Request failed')
  return data
}
