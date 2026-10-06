import { useCallback, useEffect, useRef, useState } from 'react'
import { useT } from '@/i18n/LanguageContext'
import {
  ApiError, cancelBooking, getStatus, payNow, uploadProof, type WebBookingStatus, type WebStatus,
} from '@/api/booking'
import { bookingCopy, fill, formatDay, formatDuration, formatInstant, formatTime, jod, SPORTS } from './bookingCopy'
import { Notice, Row, Shell, Spinner } from './ui'

/** States the venue still has to act on: the page keeps asking for news. */
const OPEN: WebStatus[] = ['requested', 'awaiting_payment', 'awaiting_review']
const REFRESH_MS = 20_000
const MAX_PROOF_BYTES = 5 * 1024 * 1024

const STATUS_STYLE: Record<WebStatus, { icon: string; tone: string }> = {
  requested: { icon: 'hourglass_top', tone: 'text-amber-200 bg-amber-400/10 border-amber-400/40' },
  awaiting_payment: { icon: 'payments', tone: 'text-amber-200 bg-amber-400/10 border-amber-400/40' },
  awaiting_review: { icon: 'fact_check', tone: 'text-sky-200 bg-sky-400/10 border-sky-400/40' },
  confirmed: { icon: 'check_circle', tone: 'text-primary bg-primary/10 border-primary/40' },
  completed: { icon: 'sports_score', tone: 'text-primary bg-primary/10 border-primary/40' },
  no_show: { icon: 'person_off', tone: 'text-slate-300 bg-surface-container border-outline-variant/40' },
  cancelled: { icon: 'cancel', tone: 'text-slate-300 bg-surface-container border-outline-variant/40' },
  expired: { icon: 'timer_off', tone: 'text-slate-300 bg-surface-container border-outline-variant/40' },
}

/** playmakerjo.com/r/{token}: a web booking's own page, the guest's only way back to it. */
export default function BookingStatusPage({ token }: { token: string }) {
  const { lang } = useT()
  const c = bookingCopy[lang]

  const [booking, setBooking] = useState<WebBookingStatus | null>(null)
  const [missing, setMissing] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(() => {
    getStatus(token)
      .then((b) => {
        setBooking(b)
        setMissing(false)
      })
      .catch((e) => {
        if (e instanceof ApiError && e.status === 404) setMissing(true)
      })
  }, [token])

  useEffect(load, [load])

  // While the venue has something to do, check again now and then, and whenever the guest
  // comes back to the tab.
  const open = booking != null && OPEN.includes(booking.status)
  useEffect(() => {
    if (!open) return
    const id = window.setInterval(() => document.visibilityState === 'visible' && load(), REFRESH_MS)
    const onVisible = () => document.visibilityState === 'visible' && load()
    document.addEventListener('visibilitychange', onVisible)
    return () => {
      window.clearInterval(id)
      document.removeEventListener('visibilitychange', onVisible)
    }
  }, [open, load])

  useEffect(() => {
    document.title = `${c.statusTitle} — PlayMaker JO`
  }, [c.statusTitle])

  async function act(run: () => Promise<WebBookingStatus>) {
    setBusy(true)
    setError(null)
    try {
      setBooking(await run())
    } catch (e) {
      setError(e instanceof Error && e.message ? e.message : c.somethingWrong)
      load()
    } finally {
      setBusy(false)
    }
  }

  if (missing) {
    return (
      <Shell>
        <Notice tone="error" icon="link_off">{c.notFound}</Notice>
      </Shell>
    )
  }
  if (!booking) {
    return (
      <Shell>
        <Spinner />
      </Shell>
    )
  }

  const style = STATUS_STYLE[booking.status]
  const venueName = (lang === 'ar' && booking.venueNameAr) || booking.venueName
  const finished = ['cancelled', 'expired', 'completed', 'no_show'].includes(booking.status)

  return (
    <Shell>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">{c.statusTitle}</p>
      <h1 className="mt-2 font-headline text-3xl font-bold tracking-tight text-white sm:text-4xl">{venueName}</h1>

      {/* Status */}
      <div className={`mt-6 rounded-2xl border p-5 ${style.tone}`}>
        <p className="flex items-center gap-2 font-headline text-xl font-bold">
          <span className="material-symbols-outlined text-2xl" aria-hidden="true">{style.icon}</span>
          {c[`status_${booking.status}`]}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{c[`status_${booking.status}_body`]}</p>
        {open && <p className="mt-3 text-xs text-slate-500">{c.refreshes}</p>}
      </div>

      {/* Pay the deposit */}
      {booking.status === 'awaiting_payment' && (
        <PaySection booking={booking} busy={busy} onUpload={(f) => act(() => uploadProof(token, f))} />
      )}

      {booking.status === 'requested' && booking.canPayNow && (
        <button
          type="button"
          disabled={busy}
          onClick={() => act(() => payNow(token))}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-primary px-5 py-3.5 font-bold text-primary transition-all hover:bg-primary/10 disabled:opacity-60"
        >
          <span className="material-symbols-outlined text-xl" aria-hidden="true">bolt</span>
          {c.payNowInstead}
        </button>
      )}

      {error && (
        <div className="mt-4">
          <Notice tone="error" icon="error">{error}</Notice>
        </div>
      )}

      {/* The booking */}
      <div className="mt-6 rounded-2xl border border-outline-variant/30 bg-surface-container-low p-5">
        <dl className="space-y-2.5 text-sm">
          <Row label={c.when}>
            {formatDay(booking.date, lang, 'long')}
            {booking.startTime && (
              <> · <bdi>{formatTime(booking.startTime, lang)}</bdi></>
            )}
            {' · '}{formatDuration(booking.duration, lang)}
          </Row>
          <Row label={c.where}>
            {[
              booking.sport && (SPORTS[booking.sport]?.[lang] ?? booking.sport),
              // A venue with one unnamed pitch calls it after the sport; saying it twice reads oddly.
              booking.pitchName?.toLowerCase() !== booking.sport?.toLowerCase() && booking.pitchName,
            ].filter(Boolean).join(' · ')}
          </Row>
          <Row label={c.total}>
            <span className="font-semibold text-white">{jod(booking.total, lang)}</span>
          </Row>
          {booking.paid > 0 && (
            <Row label={c.paid}>
              <span className="font-semibold text-primary">{jod(booking.paid, lang)}</span>
            </Row>
          )}
        </dl>
        {booking.freeCancelHours > 0 && !finished && (
          <p className="mt-3 text-xs text-slate-500">{fill(c.freeCancel, { h: booking.freeCancelHours })}</p>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {booking.venuePhone && (
          <a
            href={`tel:${booking.venuePhone}`}
            className="inline-flex items-center gap-1.5 rounded-lg border border-outline-variant/40 px-4 py-2.5 text-sm font-semibold text-on-surface hover:border-primary/60"
          >
            <span className="material-symbols-outlined text-lg" aria-hidden="true">call</span>
            {c.callVenue}
          </a>
        )}
        {finished && booking.venueSlug && (
          <a
            href={`/v/${booking.venueSlug}`}
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-on-primary hover:brightness-110"
          >
            <span className="material-symbols-outlined text-lg" aria-hidden="true">replay</span>
            {c.bookAgain}
          </a>
        )}
        {booking.canCancel && (
          <button
            type="button"
            disabled={busy}
            onClick={() => window.confirm(c.cancelConfirm) && act(() => cancelBooking(token))}
            className="inline-flex items-center gap-1.5 rounded-lg border border-error/40 px-4 py-2.5 text-sm font-semibold text-error hover:bg-error-container/20 disabled:opacity-60"
          >
            <span className="material-symbols-outlined text-lg" aria-hidden="true">close</span>
            {c.cancel}
          </button>
        )}
      </div>

      {!finished && (
        <div className="mt-8">
          <Notice icon="bookmark">{c.keepLink}</Notice>
        </div>
      )}
    </Shell>
  )
}

function PaySection({
  booking, busy, onUpload,
}: { booking: WebBookingStatus; busy: boolean; onUpload: (file: File) => void }) {
  const { lang } = useT()
  const c = bookingCopy[lang]
  const input = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [tooBig, setTooBig] = useState(false)

  useEffect(() => {
    if (!file) return setPreview(null)
    const url = URL.createObjectURL(file)
    setPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [file])

  const owed = Math.max(0, booking.deposit - booking.paid)

  async function copy() {
    if (!booking.cliqAlias) return
    try {
      await navigator.clipboard.writeText(booking.cliqAlias)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch { /* clipboard blocked: the alias is on screen to type */ }
  }

  return (
    <div className="mt-4 space-y-4">
      {booking.proofNote && (
        <Notice tone="error" icon="report">{fill(c.rejected, { note: booking.proofNote })}</Notice>
      )}

      <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-low p-5">
        <p className="text-sm text-slate-400">{c.cliqTo}</p>
        <div className="mt-1 flex items-center justify-between gap-3">
          <span dir="ltr" className="break-all font-headline text-2xl font-bold text-white">{booking.cliqAlias}</span>
          <button
            type="button"
            onClick={copy}
            className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-outline-variant/40 px-3 py-2 text-sm font-semibold text-on-surface hover:border-primary/60"
          >
            <span className="material-symbols-outlined text-lg" aria-hidden="true">{copied ? 'check' : 'content_copy'}</span>
            {copied ? c.copied : c.copy}
          </button>
        </div>
        <div className="mt-4 flex items-baseline justify-between gap-3 border-t border-outline-variant/20 pt-4">
          <span className="text-sm text-slate-400">{c.amount}</span>
          <span className="font-headline text-2xl font-bold text-primary">{jod(owed, lang)}</span>
        </div>
        {booking.deadline && (
          <p className="mt-3 flex items-center gap-1.5 text-sm text-amber-200">
            <span className="material-symbols-outlined text-lg" aria-hidden="true">timer</span>
            {fill(c.payBefore, { time: formatInstant(booking.deadline, lang) })}
          </p>
        )}
      </div>

      <input
        ref={input}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0] ?? null
          e.target.value = ''
          setTooBig(!!f && f.size > MAX_PROOF_BYTES)
          setFile(f && f.size <= MAX_PROOF_BYTES ? f : null)
        }}
      />

      {preview ? (
        <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-low p-3">
          <img src={preview} alt="" className="mx-auto max-h-80 rounded-xl object-contain" />
          <div className="mt-3 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => input.current?.click()}
              disabled={busy}
              className="rounded-xl border border-outline-variant/40 px-4 py-3 text-sm font-semibold text-on-surface hover:border-primary/60"
            >
              {c.chooseScreenshot}
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={() => file && onUpload(file)}
              className="rounded-xl bg-primary px-4 py-3 text-sm font-bold text-on-primary hover:brightness-110 disabled:opacity-60"
            >
              {busy ? c.uploading : c.uploadScreenshot}
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => input.current?.click()}
          className="flex w-full flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-primary/50 px-5 py-8 font-bold text-primary transition-all hover:bg-primary/5"
        >
          <span className="material-symbols-outlined text-4xl" aria-hidden="true">add_photo_alternate</span>
          {c.chooseScreenshot}
        </button>
      )}
      {tooBig && <Notice tone="error" icon="error">{c.tooBig}</Notice>}
    </div>
  )
}
