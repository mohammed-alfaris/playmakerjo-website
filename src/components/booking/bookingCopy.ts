import type { Lang } from '@/i18n/translations'

// Text for the public booking pages, in both languages. Kept beside the pages rather than in
// the landing page's translations: it is a separate flow with its own vocabulary.

const en = {
  loading: 'Loading…',
  notFound: 'This booking link does not exist.',
  notAccepting: 'This venue is not taking bookings right now.',
  callVenue: 'Call the venue',
  directions: 'Directions',
  pickSport: 'Sport',
  pickPitch: 'Pitch',
  pickSize: 'Size',
  sizeLabel: '{n}-a-side',
  pickDay: 'Day',
  pickDuration: 'Duration',
  minutes: '{n} min',
  hours: '{n} h',
  pickTime: 'Time',
  noTimes: 'No free times this day. Try another day.',
  today: 'Today',
  tomorrow: 'Tomorrow',
  yourDetails: 'Your details',
  name: 'Your name',
  phone: 'Mobile number',
  phoneHint: 'The venue calls or messages you on this number.',
  notes: 'Note for the venue (optional)',
  howToPay: 'How do you want to book?',
  payNowTitle: 'Pay the deposit now',
  payNowBody: 'Transfer {deposit} by CliQ and upload the screenshot. The time is held for you until the venue checks it.',
  requestTitle: 'Send a request, pay at the venue',
  requestBody: 'The venue confirms your booking. The time is held for a few hours while they answer.',
  total: 'Total',
  deposit: 'Deposit',
  submitPay: 'Hold the time and pay',
  submitRequest: 'Send request',
  sending: 'Sending…',
  invalidPhone: 'Enter a Jordanian mobile number, e.g. 0791234567',
  invalidName: 'Enter your name',
  taken: 'That time was just taken. Please pick another.',
  freeCancel: 'Free cancellation up to {h} hours before the game.',
  // status page
  statusTitle: 'Your booking',
  status_requested: 'Waiting for the venue to confirm',
  status_requested_body: 'The venue will confirm your booking soon, and may call you. The time is held for you meanwhile.',
  status_awaiting_payment: 'Pay the deposit to keep this time',
  status_awaiting_payment_body: 'Transfer the deposit by CliQ, then upload the screenshot of the transfer.',
  status_awaiting_review: 'The venue is checking your payment',
  status_awaiting_review_body: 'Your time is held. Nobody else can book it while the venue checks the transfer.',
  status_confirmed: 'Booking confirmed',
  status_confirmed_body: 'See you at the venue. Pay the rest when you arrive.',
  status_completed: 'Played',
  status_completed_body: 'Thanks for playing.',
  status_no_show: 'Marked as not attended',
  status_no_show_body: 'Contact the venue if this is wrong.',
  status_cancelled: 'Cancelled',
  status_cancelled_body: 'This booking was cancelled.',
  status_expired: 'Released',
  status_expired_body: 'The time was released because it was not confirmed or paid in time. You can book again.',
  cliqTo: 'Send by CliQ to',
  amount: 'Amount',
  copy: 'Copy',
  copied: 'Copied',
  payBefore: 'Pay before {time}',
  rejected: 'The venue could not accept your last screenshot: {note}',
  chooseScreenshot: 'Choose the screenshot',
  uploadScreenshot: 'Send screenshot',
  uploading: 'Uploading…',
  tooBig: 'That image is over 5 MB. Choose a smaller screenshot.',
  payNowInstead: 'Pay the deposit now to secure it',
  cancel: 'Cancel booking',
  cancelConfirm: 'Cancel this booking?',
  bookAgain: 'Book again',
  keepLink: 'Keep this page: it is the only way back to your booking.',
  refreshes: 'This page updates by itself.',
  paid: 'Paid',
  when: 'When',
  where: 'Where',
  somethingWrong: 'Something went wrong. Please try again.',
}

type Copy = typeof en

const ar: Copy = {
  loading: 'جارٍ التحميل…',
  notFound: 'رابط الحجز هذا غير موجود.',
  notAccepting: 'هذا الملعب لا يستقبل حجوزات حالياً.',
  callVenue: 'اتصل بالملعب',
  directions: 'الموقع',
  pickSport: 'الرياضة',
  pickPitch: 'الملعب',
  pickSize: 'الحجم',
  sizeLabel: '{n} ضد {n}',
  pickDay: 'اليوم',
  pickDuration: 'المدة',
  minutes: '{n} دقيقة',
  hours: '{n} ساعة',
  pickTime: 'الوقت',
  noTimes: 'لا أوقات متاحة في هذا اليوم. جرّب يوماً آخر.',
  today: 'اليوم',
  tomorrow: 'غداً',
  yourDetails: 'معلوماتك',
  name: 'اسمك',
  phone: 'رقم الموبايل',
  phoneHint: 'يتصل بك الملعب أو يراسلك على هذا الرقم.',
  notes: 'ملاحظة للملعب (اختياري)',
  howToPay: 'كيف تريد أن تحجز؟',
  payNowTitle: 'ادفع العربون الآن',
  payNowBody: 'حوّل {deposit} عبر كليك وارفع صورة التحويل. يبقى الوقت محجوزاً لك حتى يتحقق الملعب منها.',
  requestTitle: 'أرسل طلباً وادفع في الملعب',
  requestBody: 'الملعب يؤكد حجزك. يبقى الوقت محجوزاً لبضع ساعات حتى يردّ.',
  total: 'المجموع',
  deposit: 'العربون',
  submitPay: 'احجز الوقت وادفع',
  submitRequest: 'أرسل الطلب',
  sending: 'جارٍ الإرسال…',
  invalidPhone: 'أدخل رقم موبايل أردني، مثل 0791234567',
  invalidName: 'أدخل اسمك',
  taken: 'تم حجز هذا الوقت للتو. اختر وقتاً آخر.',
  freeCancel: 'الإلغاء مجاني حتى {h} ساعة قبل المباراة.',
  statusTitle: 'حجزك',
  status_requested: 'بانتظار تأكيد الملعب',
  status_requested_body: 'سيؤكد الملعب حجزك قريباً وقد يتصل بك. الوقت محجوز لك في هذه الأثناء.',
  status_awaiting_payment: 'ادفع العربون لتثبيت هذا الوقت',
  status_awaiting_payment_body: 'حوّل العربون عبر كليك، ثم ارفع صورة التحويل.',
  status_awaiting_review: 'الملعب يتحقق من دفعتك',
  status_awaiting_review_body: 'وقتك محجوز، ولا أحد يستطيع حجزه بينما يتحقق الملعب من التحويل.',
  status_confirmed: 'تم تأكيد الحجز',
  status_confirmed_body: 'نراك في الملعب. ادفع الباقي عند وصولك.',
  status_completed: 'تمت المباراة',
  status_completed_body: 'شكراً للعب معنا.',
  status_no_show: 'سُجّل كغائب',
  status_no_show_body: 'تواصل مع الملعب إن كان هذا خطأ.',
  status_cancelled: 'ملغى',
  status_cancelled_body: 'تم إلغاء هذا الحجز.',
  status_expired: 'تم تحرير الوقت',
  status_expired_body: 'تم تحرير الوقت لأنه لم يُؤكَّد أو يُدفع في الوقت المحدد. يمكنك الحجز من جديد.',
  cliqTo: 'حوّل عبر كليك إلى',
  amount: 'المبلغ',
  copy: 'نسخ',
  copied: 'تم النسخ',
  payBefore: 'ادفع قبل {time}',
  rejected: 'لم يقبل الملعب صورتك الأخيرة: {note}',
  chooseScreenshot: 'اختر صورة التحويل',
  uploadScreenshot: 'أرسل الصورة',
  uploading: 'جارٍ الرفع…',
  tooBig: 'حجم الصورة أكبر من 5 ميغابايت. اختر صورة أصغر.',
  payNowInstead: 'ادفع العربون الآن لتثبيته',
  cancel: 'إلغاء الحجز',
  cancelConfirm: 'هل تريد إلغاء هذا الحجز؟',
  bookAgain: 'احجز من جديد',
  keepLink: 'احتفظ بهذه الصفحة: هي طريقك الوحيد للعودة إلى حجزك.',
  refreshes: 'تتحدّث هذه الصفحة تلقائياً.',
  paid: 'مدفوع',
  when: 'الموعد',
  where: 'المكان',
  somethingWrong: 'حدث خطأ. حاول مرة أخرى.',
}

export const bookingCopy: Record<Lang, Copy> = { en, ar }

export const SPORTS: Record<string, { en: string; ar: string }> = {
  football: { en: 'Football', ar: 'كرة القدم' },
  basketball: { en: 'Basketball', ar: 'كرة السلة' },
  volleyball: { en: 'Volleyball', ar: 'كرة الطائرة' },
  tennis: { en: 'Tennis', ar: 'التنس' },
  padel: { en: 'Padel', ar: 'البادل' },
  swimming: { en: 'Swimming', ar: 'السباحة' },
  squash: { en: 'Squash', ar: 'الاسكواش' },
  cricket: { en: 'Cricket', ar: 'الكريكت' },
}

export const fill = (s: string, vars: Record<string, string | number>) =>
  Object.entries(vars).reduce((acc, [k, v]) => acc.split(`{${k}}`).join(String(v)), s)

export const jod = (n: number, lang: Lang) =>
  `${n.toFixed(n % 1 === 0 ? 0 : 2)} ${lang === 'ar' ? 'د.أ' : 'JOD'}`

// ─── Dates and times ────────────────────────────────────────────────────────────────────────
// Venues are in Jordan and the server reads every date and time as Jordan's, so the pages do
// too, whatever the visitor's device is set to.

const TZ = 'Asia/Amman'
const locale = (lang: Lang) => (lang === 'ar' ? 'ar-JO-u-nu-latn' : 'en-GB')

/** Today in Jordan, as YYYY-MM-DD. */
export const jordanToday = () => new Intl.DateTimeFormat('en-CA', { timeZone: TZ }).format(new Date())

/** Minutes past midnight right now in Jordan. */
export function jordanNowMinutes() {
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: TZ, hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
    .formatToParts(new Date())
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value ?? 0)
  return get('hour') * 60 + get('minute')
}

/** YYYY-MM-DD plus [days], on the calendar (no time zone involved). */
export function addDays(iso: string, days: number) {
  const d = new Date(`${iso}T12:00:00Z`)
  d.setUTCDate(d.getUTCDate() + days)
  return d.toISOString().slice(0, 10)
}

export function formatDay(iso: string, lang: Lang, style: 'short' | 'long' = 'short') {
  const d = new Date(`${iso}T12:00:00Z`)
  return new Intl.DateTimeFormat(locale(lang), {
    timeZone: 'UTC',
    weekday: style,
    day: 'numeric',
    month: style === 'long' ? 'long' : 'short',
  }).format(d)
}

export const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(':')
  return (Number(h) || 0) * 60 + (Number(m) || 0)
}

/** "18:30" → "6:30 PM" / "6:30 م". */
export function formatTime(hhmm: string, lang: Lang) {
  const total = toMinutes(hhmm) % (24 * 60)
  const h = Math.floor(total / 60)
  const m = total % 60
  const h12 = h % 12 === 0 ? 12 : h % 12
  const suffix = lang === 'ar' ? (h < 12 ? 'ص' : 'م') : h < 12 ? 'AM' : 'PM'
  return `${h12}:${String(m).padStart(2, '0')} ${suffix}`
}

/** An instant (ISO, UTC) as a time of day in Jordan, with the day when it is not today. */
export function formatInstant(iso: string, lang: Lang) {
  const d = new Date(iso)
  const sameDay = new Intl.DateTimeFormat('en-CA', { timeZone: TZ }).format(d) === jordanToday()
  return new Intl.DateTimeFormat(locale(lang), {
    timeZone: TZ,
    hour: 'numeric',
    minute: '2-digit',
    ...(sameDay ? {} : { weekday: 'short', day: 'numeric', month: 'short' }),
  }).format(d)
}

export function formatDuration(minutes: number, lang: Lang) {
  const c = bookingCopy[lang]
  return minutes % 30 === 0 ? fill(c.hours, { n: minutes / 60 }) : fill(c.minutes, { n: minutes })
}

// ─── Free start times ───────────────────────────────────────────────────────────────────────
// The same capacity arithmetic as the app (CapacityMath in booking.dart): a pitch has units
// (11-a-side = 4, 7/8 = 2, 5/6 = 1), and a start is free when the units already booked over
// that span plus the units the chosen size needs fit. The server checks again on submit.

export const weightOf = (size?: string | null) =>
  size === '11' ? 4 : size === '8' || size === '7' ? 2 : 1

export function freeStarts(opts: {
  hours: { open: string; close: string } | null | undefined
  booked: { startTime: string; duration: number; unitWeight?: number }[]
  capacity: number
  size?: string | null
  duration: number
  date: string
}): string[] {
  if (!opts.hours) return []
  const open = toMinutes(opts.hours.open)
  let close = toMinutes(opts.hours.close)
  if (close <= open) close += 24 * 60
  const overnight = close > 24 * 60
  // Today: nothing in the past or in the next half hour.
  const earliest = opts.date === jordanToday() ? jordanNowMinutes() + 30 : open
  const need = weightOf(opts.size)
  const cap = opts.capacity > 0 ? opts.capacity : 1

  const out: string[] = []
  // Starts stay on the booking's own calendar day: a start after midnight belongs to the next
  // day's page, where the server reads it.
  for (let start = open; start + opts.duration <= close && start < 24 * 60; start += 30) {
    if (start < earliest) continue
    const end = start + opts.duration
    let used = 0
    for (const b of opts.booked) {
      let s = toMinutes(b.startTime)
      if (overnight && s < open) s += 24 * 60
      if (start < s + b.duration && end > s) used += b.unitWeight && b.unitWeight > 0 ? b.unitWeight : 1
    }
    if (used + need > cap) continue
    out.push(`${String(Math.floor(start / 60)).padStart(2, '0')}:${String(start % 60).padStart(2, '0')}`)
  }
  return out
}

// ─── The guest's bookings on this device ────────────────────────────────────────────────────
// The token is the only way back to a booking, so the page remembers it per venue. Storage can
// be unavailable (private mode); everything works without it.

const KEY = 'pmj-web-bookings'

export function rememberBooking(slug: string, token: string) {
  try {
    const all = JSON.parse(localStorage.getItem(KEY) ?? '{}') as Record<string, string>
    all[slug] = token
    localStorage.setItem(KEY, JSON.stringify(all))
  } catch { /* no storage */ }
}

export function rememberedBooking(slug: string): string | null {
  try {
    return (JSON.parse(localStorage.getItem(KEY) ?? '{}') as Record<string, string>)[slug] ?? null
  } catch {
    return null
  }
}
