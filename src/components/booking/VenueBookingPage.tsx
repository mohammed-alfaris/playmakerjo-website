import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { useT } from '@/i18n/LanguageContext'
import { ApiError, book, getAvailability, getVenue, type Availability, type WebVenue } from '@/api/booking'
import {
  addDays, bookingCopy, fill, formatDay, formatDuration, formatTime, freeStarts, jod, jordanToday,
  rememberBooking, rememberedBooking, SPORTS,
} from './bookingCopy'
import { Chip, inputClass, Notice, Row, Section, Shell, Spinner } from './ui'

const DAYS_AHEAD = 14
const JO_MOBILE = /^(?:\+?962|00962|0)?7[789]\d{7}$/

/** Arabic keyboards type ٠٧٩…; the server accepts those too, so the check reads them the same. */
const cleanPhone = (raw: string) =>
  raw
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660))
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06f0))
    .replace(/[\s\-()]/g, '')

/** playmakerjo.com/v/{slug}: a venue's own booking page, for guests without an account. */
export default function VenueBookingPage({ slug }: { slug: string }) {
  const { lang } = useT()
  const c = bookingCopy[lang]

  const [venue, setVenue] = useState<WebVenue | null>(null)
  const [loadError, setLoadError] = useState<'missing' | 'failed' | null>(null)

  const [sport, setSport] = useState('')
  const [pitchId, setPitchId] = useState('')
  const [size, setSize] = useState<string | null>(null)
  const [date, setDate] = useState(jordanToday())
  const [duration, setDuration] = useState(60)
  const [time, setTime] = useState<string | null>(null)

  const [availability, setAvailability] = useState<Availability | null>(null)
  const [slotsLoading, setSlotsLoading] = useState(false)
  const [reload, setReload] = useState(0)

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [payNow, setPayNow] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const previous = useMemo(() => rememberedBooking(slug), [slug])

  useEffect(() => {
    getVenue(slug)
      .then((v) => {
        setVenue(v)
        const firstSport = v.sports.find((s) => v.pitches.some((p) => p.sport === s)) ?? v.pitches[0]?.sport ?? ''
        setSport(firstSport)
        setDuration(Math.max(v.minDuration, Math.min(60, v.maxDuration)))
        setPayNow(v.canPayNow)
      })
      .catch((e) => setLoadError(e instanceof ApiError && e.status === 404 ? 'missing' : 'failed'))
  }, [slug])

  const venueName = venue ? (lang === 'ar' && venue.nameAr) || venue.name : ''
  useEffect(() => {
    if (venueName) document.title = `${venueName} — PlayMaker JO`
  }, [venueName])

  const sports = useMemo(
    () => (venue ? [...new Set(venue.pitches.map((p) => p.sport))] : []),
    [venue],
  )
  const pitches = useMemo(() => venue?.pitches.filter((p) => p.sport === sport) ?? [], [venue, sport])
  const pitch = pitches.find((p) => p.id === pitchId) ?? pitches[0]

  // A new sport starts on its first pitch at full size.
  useEffect(() => {
    if (!pitches.length) return
    setPitchId(pitches[0].id)
  }, [pitches])
  useEffect(() => {
    setSize(pitch?.parentSize ?? null)
  }, [pitch?.id, pitch?.parentSize])

  useEffect(() => {
    if (!venue) return
    let live = true
    setSlotsLoading(true)
    getAvailability(venue.id, date)
      .then((a) => live && setAvailability(a))
      .catch(() => live && setAvailability(null))
      .finally(() => live && setSlotsLoading(false))
    return () => {
      live = false
    }
  }, [venue, date, reload])

  const pitchAvailability = availability?.pitches.find((p) => p.pitchId === pitch?.id)
  const offeredSizes = pitchAvailability?.offeredSizes ?? []

  const starts = useMemo(() => {
    if (!pitchAvailability) return []
    return freeStarts({
      hours: pitchAvailability.operatingHours,
      booked: pitchAvailability.bookedSlots,
      capacity: pitchAvailability.capacityUnits,
      size,
      duration,
      date,
    })
  }, [pitchAvailability, size, duration, date])

  // A time that stops being free (other choices changed) is dropped, not silently kept.
  useEffect(() => {
    if (time && !starts.includes(time)) setTime(null)
  }, [starts, time])

  const durations = useMemo(() => {
    if (!venue) return []
    const out: number[] = []
    for (let d = venue.minDuration; d <= venue.maxDuration; d += 30) out.push(d)
    return out.length ? out : [60, 90, 120]
  }, [venue])

  const hourly = pitch
    ? (size != null && pitch.sizePrices[size]) || (pitch.pricePerHour > 0 ? pitch.pricePerHour : venue?.pricePerHour ?? 0)
    : 0
  const total = (hourly * duration) / 60
  const deposit = venue ? (total * venue.depositPercentage) / 100 : 0

  async function submit(e: FormEvent) {
    e.preventDefault()
    if (!venue || !pitch || !time) return
    setFormError(null)
    if (name.trim().length < 2) return setFormError(c.invalidName)
    if (!JO_MOBILE.test(cleanPhone(phone))) return setFormError(c.invalidPhone)

    setSubmitting(true)
    try {
      const { token } = await book(venue.slug, {
        sport,
        pitchId: pitch.id,
        pitchSize: pitch.parentSize ? size ?? undefined : undefined,
        date,
        startTime: time,
        duration,
        name: name.trim(),
        phone: cleanPhone(phone),
        notes: notes.trim() || undefined,
        payNow: venue.canPayNow && payNow,
        website: honeypot,
      })
      rememberBooking(venue.slug, token)
      window.location.assign(`/r/${token}`)
    } catch (err) {
      setSubmitting(false)
      if (err instanceof ApiError && err.status === 409) {
        setFormError(c.taken)
        setTime(null)
        setReload((n) => n + 1)
      } else {
        setFormError(err instanceof Error && err.message ? err.message : c.somethingWrong)
      }
    }
  }

  if (loadError) {
    return (
      <Shell>
        <Notice tone="error" icon="link_off">{loadError === 'missing' ? c.notFound : c.somethingWrong}</Notice>
      </Shell>
    )
  }
  if (!venue) {
    return (
      <Shell>
        <Spinner />
      </Shell>
    )
  }

  const city = (lang === 'ar' && venue.cityAr) || venue.city
  const address = (lang === 'ar' && venue.addressAr) || venue.address
  const days = Array.from({ length: DAYS_AHEAD }, (_, i) => addDays(jordanToday(), i))

  return (
    <Shell>
      {/* Venue */}
      <header className="overflow-hidden rounded-3xl border border-outline-variant/20 bg-surface-container-low">
        {venue.images[0] && (
          <img src={venue.images[0]} alt="" className="h-44 w-full object-cover sm:h-56" />
        )}
        <div className="p-5 sm:p-6">
          <h1 className="font-headline text-3xl font-bold tracking-tight text-white sm:text-4xl">{venueName}</h1>
          {(city || address) && (
            <p className="mt-2 flex items-center gap-1.5 text-on-surface-variant">
              <span className="material-symbols-outlined text-lg" aria-hidden="true">location_on</span>
              {[address, city].filter(Boolean).join(' · ')}
            </p>
          )}
          <div className="mt-4 flex flex-wrap gap-2">
            {venue.phone && (
              <a href={`tel:${venue.phone}`} className="inline-flex items-center gap-1.5 rounded-lg border border-outline-variant/40 px-3 py-2 text-sm font-semibold text-on-surface hover:border-primary/60">
                <span className="material-symbols-outlined text-lg" aria-hidden="true">call</span>
                {c.callVenue}
              </a>
            )}
            {venue.latitude != null && venue.longitude != null && (
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${venue.latitude},${venue.longitude}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-outline-variant/40 px-3 py-2 text-sm font-semibold text-on-surface hover:border-primary/60"
              >
                <span className="material-symbols-outlined text-lg" aria-hidden="true">directions</span>
                {c.directions}
              </a>
            )}
          </div>
        </div>
      </header>

      {previous && (
        <a href={`/r/${previous}`} className="mt-4 block">
          <Notice icon="confirmation_number">
            <span className="inline-flex items-center gap-1 font-semibold text-on-surface underline-offset-2 hover:underline">
              {c.statusTitle}
              <span className="material-symbols-outlined text-base rtl:rotate-180" aria-hidden="true">arrow_forward</span>
            </span>
          </Notice>
        </a>
      )}

      {!venue.acceptingBookings ? (
        <div className="mt-8">
          <Notice tone="warn" icon="event_busy">{c.notAccepting}</Notice>
        </div>
      ) : (
        <form onSubmit={submit} noValidate>
          {sports.length > 1 && (
            <Section title={c.pickSport}>
              <div className="flex flex-wrap gap-2">
                {sports.map((s) => (
                  <Chip key={s} selected={s === sport} onClick={() => setSport(s)}>
                    {SPORTS[s]?.[lang] ?? s}
                  </Chip>
                ))}
              </div>
            </Section>
          )}

          {pitches.length > 1 && (
            <Section title={c.pickPitch}>
              <div className="flex flex-wrap gap-2">
                {pitches.map((p) => (
                  <Chip key={p.id} selected={p.id === pitch?.id} onClick={() => setPitchId(p.id)}>
                    {(lang === 'ar' && p.nameAr) || p.name}
                  </Chip>
                ))}
              </div>
            </Section>
          )}

          {offeredSizes.length > 1 && (
            <Section title={c.pickSize}>
              <div className="flex flex-wrap gap-2">
                {offeredSizes.map((s) => (
                  <Chip key={s} selected={s === size} onClick={() => setSize(s)}>
                    {fill(c.sizeLabel, { n: s })}
                  </Chip>
                ))}
              </div>
            </Section>
          )}

          <Section title={c.pickDay}>
            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
              {days.map((d, i) => (
                <Chip key={d} selected={d === date} onClick={() => setDate(d)} className="shrink-0 whitespace-nowrap">
                  {i === 0 ? c.today : i === 1 ? c.tomorrow : formatDay(d, lang)}
                </Chip>
              ))}
            </div>
          </Section>

          {durations.length > 1 && (
            <Section title={c.pickDuration}>
              <div className="flex flex-wrap gap-2">
                {durations.map((d) => (
                  <Chip key={d} selected={d === duration} onClick={() => setDuration(d)}>
                    {formatDuration(d, lang)}
                  </Chip>
                ))}
              </div>
            </Section>
          )}

          <Section title={c.pickTime}>
            {slotsLoading ? (
              <Spinner />
            ) : starts.length === 0 ? (
              <Notice icon="event_busy">{c.noTimes}</Notice>
            ) : (
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {starts.map((s) => (
                  <Chip key={s} selected={s === time} onClick={() => setTime(s)} className="px-2">
                    <bdi>{formatTime(s, lang)}</bdi>
                  </Chip>
                ))}
              </div>
            )}
          </Section>

          {time && (
            <>
              <Section title={c.yourDetails}>
                <div className="space-y-3">
                  <input
                    className={inputClass}
                    placeholder={c.name}
                    aria-label={c.name}
                    autoComplete="name"
                    value={name}
                    maxLength={80}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <div>
                    <input
                      className={inputClass}
                      placeholder={c.phone}
                      aria-label={c.phone}
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      dir="ltr"
                      value={phone}
                      maxLength={20}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <p className="mt-1.5 text-xs text-slate-500">{c.phoneHint}</p>
                  </div>
                  <textarea
                    className={`${inputClass} min-h-[80px]`}
                    placeholder={c.notes}
                    aria-label={c.notes}
                    value={notes}
                    maxLength={300}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                  {/* Hidden from people; a bot that fills every field gives itself away. */}
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="absolute -left-[9999px] h-0 w-0 opacity-0"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>
              </Section>

              {venue.canPayNow && (
                <Section title={c.howToPay}>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <PayOption
                      selected={payNow}
                      onClick={() => setPayNow(true)}
                      icon="bolt"
                      title={c.payNowTitle}
                      body={fill(c.payNowBody, { deposit: jod(deposit, lang) })}
                    />
                    <PayOption
                      selected={!payNow}
                      onClick={() => setPayNow(false)}
                      icon="schedule_send"
                      title={c.requestTitle}
                      body={c.requestBody}
                    />
                  </div>
                </Section>
              )}

              <div className="mt-8 rounded-2xl border border-outline-variant/30 bg-surface-container-low p-5">
                <dl className="space-y-2 text-sm">
                  <Row label={c.when}>
                    {formatDay(date, lang, 'long')} · <bdi>{formatTime(time, lang)}</bdi> · {formatDuration(duration, lang)}
                  </Row>
                  <Row label={c.total}>
                    <span className="font-headline text-lg font-bold text-white">{jod(total, lang)}</span>
                  </Row>
                  {venue.canPayNow && payNow && deposit > 0 && (
                    <Row label={c.deposit}>
                      <span className="font-semibold text-primary">{jod(deposit, lang)}</span>
                    </Row>
                  )}
                </dl>
                {venue.freeCancelHours > 0 && (
                  <p className="mt-3 text-xs text-slate-500">{fill(c.freeCancel, { h: venue.freeCancelHours })}</p>
                )}
              </div>

              {formError && (
                <div className="mt-4">
                  <Notice tone="error" icon="error">{formError}</Notice>
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="mt-5 w-full rounded-xl bg-primary px-6 py-4 font-headline text-lg font-bold text-on-primary transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-60"
              >
                {submitting ? c.sending : venue.canPayNow && payNow ? c.submitPay : c.submitRequest}
              </button>
            </>
          )}
        </form>
      )}
    </Shell>
  )
}



function PayOption({
  selected, onClick, icon, title, body,
}: { selected: boolean; onClick: () => void; icon: string; title: string; body: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={[
        'rounded-2xl border p-4 text-start transition-all',
        selected ? 'border-primary bg-primary/10' : 'border-outline-variant/40 bg-surface-container-low hover:border-primary/50',
      ].join(' ')}
    >
      <span className="flex items-center gap-2 font-bold text-white">
        <span className={`material-symbols-outlined text-xl ${selected ? 'text-primary' : 'text-slate-400'}`} aria-hidden="true">{icon}</span>
        {title}
      </span>
      <span className="mt-2 block text-sm leading-relaxed text-on-surface-variant">{body}</span>
    </button>
  )
}
