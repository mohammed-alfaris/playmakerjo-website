import { useEffect } from 'react'
import NavBar from '@/components/NavBar'
import HeroSection from '@/components/HeroSection'
import ForPlayersSection from '@/components/ForPlayersSection'
import ForVenuesSection from '@/components/ForVenuesSection'
import Footer from '@/components/Footer'
import LegalPage from '@/components/LegalPage'
import VenueBookingPage from '@/components/booking/VenueBookingPage'
import BookingStatusPage from '@/components/booking/BookingStatusPage'
import { legalDocs, type LegalPageKey } from '@/content/legal'
import { useT } from '@/i18n/LanguageContext'
import { translations } from '@/i18n/translations'

// The site is one page, the legal pages and the web booking pages. nginx serves index.html for
// every path, so the path picks the page; any other path shows the home page, as before.
const LEGAL_PATHS: Record<string, LegalPageKey> = {
  '/privacy': 'privacy',
  '/privacy-policy': 'privacy',
  '/terms': 'terms',
  '/delete-account': 'deleteAccount',
  '/account-deletion': 'deleteAccount',
}

// A venue's booking page (/v/{slug}, from its QR code) and a guest's booking (/r/{token}).
const VENUE_PATH = /^\/v\/([A-Za-z0-9_-]{1,64})$/
const BOOKING_PATH = /^\/r\/([A-Za-z0-9_-]{16,64})$/

export default function App() {
  const { lang } = useT()
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  const legal: LegalPageKey | undefined = LEGAL_PATHS[path]
  const venueSlug = VENUE_PATH.exec(path)?.[1]
  const bookingToken = BOOKING_PATH.exec(path)?.[1]
  const booking = venueSlug != null || bookingToken != null

  useEffect(() => {
    if (booking) return // the booking pages title themselves
    document.title = legal
      ? `${legalDocs[legal][lang].title} — PlayMaker JO`
      : translations[lang].meta_title
  }, [legal, lang, booking])

  // A legal page's "Join waitlist" button comes back here as /#waitlist.
  useEffect(() => {
    if (!legal && !booking && window.location.hash === '#waitlist') {
      document.getElementById('waitlist')?.scrollIntoView()
    }
  }, [legal, booking])

  return (
    <div className="bg-surface text-on-surface font-body min-h-screen">
      <NavBar onHome={!legal && !booking} waitlist={!booking} />
      {venueSlug ? (
        <VenueBookingPage slug={venueSlug.toLowerCase()} />
      ) : bookingToken ? (
        <BookingStatusPage token={bookingToken} />
      ) : legal ? (
        <LegalPage page={legal} />
      ) : (
        <main>
          <HeroSection />
          <ForPlayersSection />
          <ForVenuesSection />
        </main>
      )}
      <Footer />
    </div>
  )
}
