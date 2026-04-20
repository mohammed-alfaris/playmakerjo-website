import { useT } from '@/i18n/LanguageContext'

export default function Footer() {
  const { t } = useT()

  return (
    <footer className="bg-[#0a0f0d] border-t border-[#3e4a40]/15">
      <div className="flex justify-center items-center px-12 py-10 max-w-7xl mx-auto">
        <p className="text-slate-500 font-body text-sm">{t('built_in')}</p>
      </div>
    </footer>
  )
}
