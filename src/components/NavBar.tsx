import { useT } from '@/i18n/LanguageContext'

/**
 * [onHome]: the waitlist button scrolls to the form; elsewhere it goes back to it.
 * [waitlist]: off on the booking pages, where a guest is booking a venue, not joining a list.
 */
export default function NavBar({ onHome = true, waitlist = true }: { onHome?: boolean; waitlist?: boolean }) {
  const { t, lang, setLang } = useT()

  const goToWaitlist = () => {
    if (onHome) document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })
    else window.location.assign('/#waitlist')
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0f1512]/80 backdrop-blur-xl">
      <div className="flex justify-between items-center px-4 sm:px-6 md:px-8 py-3 sm:py-4 max-w-7xl mx-auto gap-2">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 sm:gap-3 min-w-0">
          <img src="/logo-mark.png" alt="PlayMaker" className="w-8 h-8 shrink-0" />
          <span className="text-lg sm:text-xl md:text-2xl font-bold tracking-tighter font-headline truncate">
            <span className="text-white">PLAY</span>
            <span className="text-primary">MAKER</span>
          </span>
        </a>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <button
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
            className="text-slate-400 hover:text-white transition-all duration-300 flex items-center gap-1 text-sm font-medium min-w-[40px] justify-center"
          >
            <span className="material-symbols-outlined text-lg">language</span>
            <span>{lang === 'en' ? 'عر' : 'EN'}</span>
          </button>
          {waitlist && (
            <button
              onClick={goToWaitlist}
              className="bg-primary-container text-on-primary-container px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg font-bold tracking-tight hover:brightness-110 active:scale-95 transition-all duration-200 whitespace-nowrap text-sm sm:text-base"
            >
              {t('join_waitlist')}
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}
