import { useEffect } from 'react'
import NavBar from '@/components/NavBar'
import HeroSection from '@/components/HeroSection'
import ForPlayersSection from '@/components/ForPlayersSection'
import ForVenuesSection from '@/components/ForVenuesSection'
import Footer from '@/components/Footer'
import LegalPage from '@/components/LegalPage'
import { legalDocs, type LegalPageKey } from '@/content/legal'
import { useT } from '@/i18n/LanguageContext'
import { translations } from '@/i18n/translations'

// The site is one page plus the legal pages. nginx serves index.html for every path, so the
// path picks the page; any other path shows the home page, as before.
const LEGAL_PATHS: Record<string, LegalPageKey> = {
  '/privacy': 'privacy',
  '/privacy-policy': 'privacy',
  '/terms': 'terms',
  '/delete-account': 'deleteAccount',
  '/account-deletion': 'deleteAccount',
}

export default function App() {
  const { lang } = useT()
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  const legal: LegalPageKey | undefined = LEGAL_PATHS[path]

  useEffect(() => {
    document.title = legal
      ? `${legalDocs[legal][lang].title} — PlayMaker JO`
      : translations[lang].meta_title
  }, [legal, lang])

  // A legal page's "Join waitlist" button comes back here as /#waitlist.
  useEffect(() => {
    if (!legal && window.location.hash === '#waitlist') {
      document.getElementById('waitlist')?.scrollIntoView()
    }
  }, [legal])

  return (
    <div className="bg-surface text-on-surface font-body min-h-screen">
      <NavBar onHome={!legal} />
      {legal ? (
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
