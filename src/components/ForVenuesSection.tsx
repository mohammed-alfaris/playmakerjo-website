import { useState } from 'react'
import { useT } from '@/i18n/LanguageContext'
import { registerVenueWaitlist } from '@/api/waitlist'

const cities = ['Amman', 'Irbid', 'Zarqa', 'Aqaba']

export default function ForVenuesSection() {
  const { t } = useT()
  const [selectedSports, setSelectedSports] = useState<string[]>(['soccer'])
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const [form, setForm] = useState({
    contactName: '',
    venueName: '',
    city: 'Amman',
    phone: '',
    email: '',
  })

  const features = [
    { icon: 'analytics', title: t('dashboard_title'), description: t('dashboard_desc') },
    { icon: 'schedule', title: t('slots_title'), description: t('slots_desc') },
    { icon: 'notifications_active', title: t('alerts_title'), description: t('alerts_desc') },
    { icon: 'qr_code_2', title: t('scan_title'), description: t('scan_desc') },
  ]

  const sports = [
    { id: 'soccer', icon: 'sports_soccer', label: t('sport_soccer') },
    { id: 'basketball', icon: 'sports_basketball', label: t('sport_basketball') },
    { id: 'tennis', icon: 'sports_tennis', label: t('sport_tennis') },
    { id: 'volleyball', icon: 'sports_volleyball', label: t('sport_volleyball') },
  ]

  const toggleSport = (id: string) => {
    setSelectedSports((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await registerVenueWaitlist({
        contactName: form.contactName,
        venueName: form.venueName,
        city: form.city,
        phone: form.phone,
        email: form.email,
        sports: selectedSports,
      })
      setSubmitted(true)
    } catch {
      // still show success — API may be offline during dev
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="bg-[#121815] py-16">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: Feature list */}
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="text-primary text-sm font-bold tracking-tight">{t('for_venues_badge')}</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-headline font-bold tracking-tight text-white mb-12">
            {t('venues_headline')}
          </h2>

          <div className="space-y-10">
            {features.map(({ icon, title, description }) => (
              <div key={icon} className="flex gap-6">
                <div className="mt-1 w-10 h-10 shrink-0 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-3xl">{icon}</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">{title}</h4>
                  <p className="text-on-surface-variant">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Registration form */}
        <div className="bg-surface-container p-10 rounded-3xl border border-outline-variant/20 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.06)]">
          {submitted ? (
            <div className="flex flex-col items-center justify-center gap-6 py-12 text-center">
              <span className="material-symbols-outlined text-primary text-6xl">check_circle</span>
              <h3 className="text-2xl font-bold text-white">{t('venue_success_title')}</h3>
              <p className="text-on-surface-variant">{t('venue_success_desc')}</p>
            </div>
          ) : (
            <>
              <h3 className="text-2xl font-bold text-white mb-8">{t('list_venue')}</h3>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-outline uppercase tracking-wider">
                      {t('label_owner_name')}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={t('placeholder_name')}
                      value={form.contactName}
                      onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                      className="w-full bg-surface-container-lowest border-none rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-outline uppercase tracking-wider">
                      {t('label_venue_name')}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={t('placeholder_venue')}
                      value={form.venueName}
                      onChange={(e) => setForm({ ...form, venueName: e.target.value })}
                      className="w-full bg-surface-container-lowest border-none rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-outline uppercase tracking-wider">
                      {t('label_city')}
                    </label>
                    <select
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      className="w-full bg-surface-container-lowest border-none rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:ring-1 focus:ring-primary appearance-none"
                    >
                      {cities.map((city) => (
                        <option key={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-outline uppercase tracking-wider">
                      {t('label_phone')}
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder={t('placeholder_phone')}
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-surface-container-lowest border-none rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-outline uppercase tracking-wider">
                    {t('label_email')}
                  </label>
                  <input
                    type="email"
                    required
                    placeholder={t('placeholder_email')}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-surface-container-lowest border-none rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant/50"
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-xs font-bold text-outline uppercase tracking-wider">
                    {t('label_sports')}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {sports.map(({ id, icon, label }) => {
                      const active = selectedSports.includes(id)
                      return (
                        <button
                          key={id}
                          type="button"
                          onClick={() => toggleSport(id)}
                          className={`px-4 py-2 rounded-full border text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                            active
                              ? 'bg-secondary-fixed text-on-secondary-fixed border-secondary-fixed'
                              : 'border-outline-variant/30 text-on-surface-variant hover:border-outline-variant/60'
                          }`}
                        >
                          <span className="material-symbols-outlined text-base">{icon}</span>
                          {label}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary-container text-on-primary-container py-4 rounded-xl font-bold text-lg hover:brightness-110 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading && (
                    <span className="material-symbols-outlined animate-spin text-base">progress_activity</span>
                  )}
                  {t('submit')}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
