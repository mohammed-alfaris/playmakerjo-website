// The public web booking API: a venue's page, its availability, a guest booking and the guest's
// status page (by private token). No account, no cookies.

const BASE = import.meta.env.VITE_API_URL

export interface Pitch {
  id: string
  name: string
  nameAr?: string | null
  sport: string
  parentSize?: string | null
  subSizes: string[]
  sizePrices: Record<string, number>
  pricePerHour: number
}

export interface WebVenue {
  id: string
  slug: string
  name: string
  nameAr?: string | null
  city?: string | null
  cityAr?: string | null
  address?: string | null
  addressAr?: string | null
  latitude?: number | null
  longitude?: number | null
  images: string[]
  sports: string[]
  pitches: Pitch[]
  pricePerHour: number
  minDuration: number
  maxDuration: number
  depositPercentage: number
  freeCancelHours: number
  canPayNow: boolean
  acceptingBookings: boolean
  phone?: string | null
}

export interface BookedSlot {
  startTime: string
  duration: number
  pitchId?: string | null
  unitWeight?: number
}

export interface PitchAvailability {
  pitchId: string
  name: string
  sport: string
  offeredSizes: string[]
  sizePrices: Record<string, number>
  pricePerHour: number
  capacityUnits: number
  operatingHours?: { open: string; close: string } | null
  bookedSlots: BookedSlot[]
}

export interface Availability {
  operatingHours?: { open: string; close: string } | null
  pitches: PitchAvailability[]
}

export type WebStatus =
  | "requested" | "awaiting_payment" | "awaiting_review" | "confirmed"
  | "completed" | "no_show" | "cancelled" | "expired"

export interface WebBookingStatus {
  status: WebStatus
  venueName: string
  venueNameAr?: string | null
  venueSlug?: string | null
  venuePhone?: string | null
  customerName?: string | null
  sport?: string | null
  pitchName?: string | null
  date: string
  startTime?: string | null
  duration: number
  total: number
  deposit: number
  paid: number
  cliqAlias?: string | null
  deadline?: string | null
  proofNote?: string | null
  canPayNow: boolean
  canCancel: boolean
  freeCancelHours: number
}

export interface WebBookingInput {
  sport: string
  pitchId?: string
  pitchSize?: string
  date: string
  startTime: string
  duration: number
  name: string
  phone: string
  notes?: string
  payNow: boolean
  website?: string
}

/** A refused request carries the server's sentence, and its status for the caller to branch on. */
export class ApiError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

async function call<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, init)
  let body: { data?: T; message?: string } = {}
  try { body = await res.json() } catch { /* empty body */ }
  if (!res.ok) throw new ApiError(body.message ?? "Request failed", res.status)
  return body.data as T
}

const json = (body: unknown): RequestInit => ({
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
})

export const getVenue = (slug: string) => call<WebVenue>(`/public/v/${encodeURIComponent(slug)}`)

export const getAvailability = (venueId: string, date: string) =>
  call<Availability>(`/venues/${encodeURIComponent(venueId)}/available-slots?date=${date}`)

export const book = (slug: string, input: WebBookingInput) =>
  call<{ token: string }>(`/public/v/${encodeURIComponent(slug)}/requests`, json(input))

export const getStatus = (token: string) => call<WebBookingStatus>(`/public/requests/${encodeURIComponent(token)}`)

export const payNow = (token: string) =>
  call<WebBookingStatus>(`/public/requests/${encodeURIComponent(token)}/pay`, { method: "POST" })

export const cancelBooking = (token: string) =>
  call<WebBookingStatus>(`/public/requests/${encodeURIComponent(token)}/cancel`, { method: "POST" })

export function uploadProof(token: string, file: File) {
  const form = new FormData()
  form.append("file", file)
  return call<WebBookingStatus>(`/public/requests/${encodeURIComponent(token)}/proof`, { method: "POST", body: form })
}
