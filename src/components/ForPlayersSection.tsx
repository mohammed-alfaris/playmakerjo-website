import { useState } from 'react'
import { useT } from '@/i18n/LanguageContext'
import { joinPlayerWaitlist } from '@/api/waitlist'

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default function ForPlayersSection() {
  const { t } = useT()
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const handleJoin = async () => {
    if (!isValidEmail(email)) {
      setError(true)
      return
    }
    setError(false)
    setLoading(true)
    try {
      await joinPlayerWaitlist(email)
      setSubmitted(true)
      setEmail('')
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  const features = [
    { icon: 'explore', title: t('discover_title'), description: t('discover_desc') },
    { icon: 'event_available', title: t('book_title'), description: t('book_desc') },
    { icon: 'account_balance_wallet', title: t('pay_title'), description: t('pay_desc') },
    { icon: 'verified', title: t('reviews_title'), description: t('reviews_desc') },
  ]

  return (
    <section className="py-16 px-8 max-w-7xl mx-auto">
      {/* Section label */}
      <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
        <span className="text-blue-400 text-sm font-bold tracking-tight">{t('for_players_badge')}</span>
      </div>

      <h2 className="text-4xl md:text-6xl font-headline font-bold tracking-tight text-white mb-16 max-w-3xl">
        {t('players_headline')}
      </h2>

      {/* Feature cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map(({ icon, title, description }) => (
          <div
            key={icon}
            className="p-8 rounded-3xl bg-surface-container border border-outline-variant/10 hover:border-primary/30 transition-colors group"
          >
            <div className="w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined">{icon}</span>
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
            <p className="text-on-surface-variant leading-relaxed">{description}</p>
          </div>
        ))}
      </div>

      {/* Email capture bento */}
      <div id="waitlist" className="mt-12 p-12 rounded-3xl bg-gradient-to-br from-surface-container-high to-surface-container-low border border-outline-variant/10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-lg">
          <h3 className="text-2xl font-bold text-white mb-2">{t('first_to_play')}</h3>
          <p className="text-on-surface-variant">{t('early_access_desc')}</p>
        </div>
        {submitted ? (
          <div className="flex items-center gap-3 bg-primary/10 border border-primary/30 px-6 py-4 rounded-xl text-primary font-bold">
            <span className="material-symbols-outlined">check_circle</span>
            {t('joined_success')}
          </div>
        ) : (
          <div className="flex flex-col w-full md:w-auto gap-2">
            <div className="flex gap-2">
              <input
                type="email"
                placeholder={t('email_placeholder')}
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(false) }}
                onKeyDown={(e) => e.key === 'Enter' && handleJoin()}
                className={`flex-1 md:w-80 bg-surface-container-lowest border-none rounded-xl px-5 py-4 focus:outline-none focus:ring-1 text-on-surface placeholder:text-on-surface-variant/50 ${
                  error ? 'ring-1 ring-error' : 'focus:ring-primary'
                }`}
              />
              <button
                onClick={handleJoin}
                disabled={loading}
                className="bg-primary text-on-primary px-8 py-4 rounded-xl font-bold hover:brightness-110 active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading && (
                  <span className="material-symbols-outlined animate-spin text-base">progress_activity</span>
                )}
                {t('join')}
              </button>
            </div>
            {error && (
              <p className="text-error text-sm px-1">{t('invalid_email')}</p>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
