import { useT } from '@/i18n/LanguageContext'

const sports = ['⚽', '🏀', '🎾', '🏐', '🏓', '🏸', '🥎', '🥅']

export default function HeroSection() {
  const { t, lang } = useT()

  const stats = [
    { value: t('stat_sports_value'), label: t('stat_sports_label') },
    { value: t('stat_cities_value'), label: t('stat_cities_label') },
    { value: t('stat_free_value'), label: t('stat_free_label') },
    { value: t('stat_year_value'), label: t('stat_year_label') },
  ]

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 kinetic-grid overflow-hidden">
      {/* Radial glow */}
      <div className="absolute inset-0 hero-glow -z-10" />

      {/* Coming soon badge */}
      <div className="mb-6 sm:mb-8 mx-4 px-4 py-1.5 rounded-full bg-surface-container-high border border-outline-variant/15 flex items-center gap-2">
        <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
        <span className="text-primary text-xs font-bold tracking-widest uppercase text-center">
          {t('coming_soon')}
        </span>
      </div>

      {/* Headline */}
      <div className="max-w-5xl text-center px-4 sm:px-6">
        <h1
          className={`text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-headline font-bold tracking-[-0.04em] text-white mb-4 ${
            lang === 'ar' ? 'leading-[1.5]' : 'leading-[0.95] md:leading-[0.9]'
          }`}
        >
          {t('hero_line1')}
          <br />
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {t('hero_line2')}
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-on-surface-variant text-base sm:text-lg md:text-xl mb-8 sm:mb-12 mt-6 sm:mt-10">
          {t('hero_subtitle')}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
          <div className="w-full sm:w-auto bg-primary-container text-on-primary-container px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold text-base sm:text-lg shadow-[0_10px_20px_-5px_rgba(63,186,116,0.4)] flex items-center justify-center gap-3 cursor-default select-none">
            <span className="material-symbols-outlined text-2xl">android</span>
            {t('cta_android')}
          </div>
          <div className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl border border-outline-variant/30 font-bold text-base sm:text-lg text-white flex items-center justify-center gap-3 cursor-default select-none">
            <span className="material-symbols-outlined text-2xl">phone_iphone</span>
            {t('cta_ios')}
          </div>
        </div>
      </div>

      {/* Sport emoji grid */}
      <div className="mt-8 sm:mt-12 grid grid-cols-4 md:grid-cols-8 gap-2 sm:gap-4 px-4 sm:px-6 opacity-80">
        {sports.map((emoji) => (
          <div
            key={emoji}
            className="p-3 sm:p-4 rounded-2xl bg-surface-container-low border border-outline-variant/10 text-2xl sm:text-3xl flex items-center justify-center"
          >
            {emoji}
          </div>
        ))}
      </div>

      {/* Stats row */}
      <div className="w-full mt-10 sm:mt-12 py-8 sm:py-10 bg-surface-container-lowest/50 border-y border-outline-variant/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 grid grid-cols-2 md:flex md:flex-wrap md:justify-between gap-6 md:gap-12">
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center md:text-left">
              <div className="text-3xl sm:text-4xl font-headline font-bold text-white tracking-tighter">
                {value}
              </div>
              <p className="text-outline text-xs sm:text-sm uppercase tracking-widest mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
