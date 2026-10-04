import { useT } from '@/i18n/LanguageContext'
import { SUPPORT_EMAIL } from '@/content/legal'

export default function Footer() {
  const { t } = useT()

  const links = [
    { href: '/privacy', label: t('footer_privacy') },
    { href: '/terms', label: t('footer_terms') },
    { href: '/delete-account', label: t('footer_delete_account') },
    { href: `mailto:${SUPPORT_EMAIL}`, label: t('footer_support') },
  ]

  return (
    <footer className="bg-[#0a0f0d] border-t border-[#3e4a40]/15">
      <div className="flex flex-col items-center gap-5 px-6 sm:px-12 py-10 max-w-7xl mx-auto">
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-slate-400 hover:text-white transition-colors">
              {link.label}
            </a>
          ))}
        </nav>
        <p className="text-slate-500 font-body text-sm text-center">{t('built_in')}</p>
      </div>
    </footer>
  )
}
