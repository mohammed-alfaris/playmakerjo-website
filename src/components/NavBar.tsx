import { useT } from '@/i18n/LanguageContext'

export default function NavBar() {
  const { t, lang, setLang } = useT()

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0f1512]/80 backdrop-blur-xl">
      <div className="flex justify-between items-center px-4 sm:px-6 md:px-8 py-3 sm:py-4 max-w-7xl mx-auto gap-2">
        {/* Logo */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="w-8 h-8 bg-primary-container rounded-md flex items-center justify-center shrink-0">
            <span
              className="material-symbols-outlined text-on-primary-container text-xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              sports_soccer
            </span>
          </div>
          <span className="text-lg sm:text-xl md:text-2xl font-bold tracking-tighter text-primary font-headline truncate">
            PlayMaker JO
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <button
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
            className="text-slate-400 hover:text-white transition-all duration-300 flex items-center gap-1 text-sm font-medium min-w-[40px] justify-center"
          >
            <span className="material-symbols-outlined text-lg">language</span>
            <span>{lang === 'en' ? 'عر' : 'EN'}</span>
          </button>
          <button
            onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-primary-container text-on-primary-container px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg font-bold tracking-tight hover:brightness-110 active:scale-95 transition-all duration-200 whitespace-nowrap text-sm sm:text-base"
          >
            {t('join_waitlist')}
          </button>
        </div>
      </div>
    </nav>
  )
}
