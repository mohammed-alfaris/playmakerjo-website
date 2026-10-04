import type { ReactNode } from 'react'
import { useT } from '@/i18n/LanguageContext'
import { legalDocs, SUPPORT_EMAIL, type Block, type LegalPageKey } from '@/content/legal'

const DELETE_PAGE_TEXT = 'playmakerjo.com/delete-account'
const LINKABLE = /(support@playmakerjo\.com|playmakerjo\.com\/delete-account)/

/** The support address and the deletion page, written inside the policy text, become links. */
function linkify(text: string): ReactNode[] {
  return text.split(LINKABLE).map((part, i) => {
    if (part === SUPPORT_EMAIL) {
      return (
        <a key={i} href={`mailto:${SUPPORT_EMAIL}`} dir="ltr" className="text-primary hover:underline">
          {part}
        </a>
      )
    }
    if (part === DELETE_PAGE_TEXT) {
      return (
        <a key={i} href="/delete-account" dir="ltr" className="text-primary hover:underline">
          {part}
        </a>
      )
    }
    return part
  })
}

/** "Account details: your name…" — the label before the colon reads as a heading for the item. */
function ListText({ text }: { text: string }) {
  const colon = text.indexOf(': ')
  if (colon > 0 && colon < 40) {
    return (
      <>
        <strong className="font-semibold text-on-surface">{text.slice(0, colon + 1)}</strong>{' '}
        {linkify(text.slice(colon + 2))}
      </>
    )
  }
  return <>{linkify(text)}</>
}

function BlockView({ block }: { block: Block }) {
  if ('p' in block) {
    return <p className="text-on-surface-variant leading-relaxed">{linkify(block.p)}</p>
  }
  if ('list' in block) {
    return (
      <ul className="space-y-3">
        {block.list.map((item, i) => (
          <li key={i} className="flex gap-3 text-on-surface-variant leading-relaxed">
            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
            <span>
              <ListText text={item} />
            </span>
          </li>
        ))}
      </ul>
    )
  }
  if ('steps' in block) {
    return (
      <ol className="space-y-3">
        {block.steps.map((step, i) => (
          <li
            key={i}
            className="flex items-start gap-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 p-4"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary font-headline font-bold">
              {i + 1}
            </span>
            <span className="pt-1 text-on-surface leading-relaxed">{linkify(step)}</span>
          </li>
        ))}
      </ol>
    )
  }
  return (
    <a
      href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(block.mailto.subject)}`}
      className="inline-flex items-center gap-2 rounded-lg bg-primary-container px-5 py-3 font-bold text-on-primary-container hover:brightness-110 active:scale-95 transition-all duration-200"
    >
      <span className="material-symbols-outlined text-xl" aria-hidden="true">
        mail
      </span>
      <span>{block.mailto.label}</span>
    </a>
  )
}

/** Privacy policy, terms or account deletion, in the visitor's language. */
export default function LegalPage({ page }: { page: LegalPageKey }) {
  const { lang, t } = useT()
  const doc = legalDocs[page][lang]

  return (
    <main className="pt-28 sm:pt-32 pb-20 px-5 sm:px-8 kinetic-grid">
      <article className="max-w-3xl mx-auto">
        <a
          href="/"
          className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white transition-colors"
        >
          <span className="material-symbols-outlined text-base rtl:rotate-180" aria-hidden="true">
            arrow_back
          </span>
          {t('legal_home')}
        </a>

        <h1 className="mt-6 font-headline text-4xl sm:text-5xl font-bold tracking-tight text-white">
          {doc.title}
        </h1>
        <p className="mt-3 text-sm text-slate-500">
          {t('legal_updated')}: {doc.updated}
        </p>

        <div className="mt-8 space-y-4">
          {doc.intro.map((p, i) => (
            <p key={i} className="text-lg text-on-surface leading-relaxed">
              {linkify(p)}
            </p>
          ))}
        </div>

        {doc.sections.map((section) => (
          <section key={section.heading} className="mt-12">
            <h2 className="mb-5 font-headline text-2xl font-bold text-white">{section.heading}</h2>
            <div className="space-y-5">
              {section.blocks.map((block, i) => (
                <BlockView key={i} block={block} />
              ))}
            </div>
          </section>
        ))}

        <aside className="mt-16 rounded-2xl glass-card border border-outline-variant/20 p-6 sm:p-8">
          <p className="font-headline text-xl font-bold text-white">{t('legal_questions')}</p>
          <p className="mt-2 text-on-surface-variant">
            {t('legal_write_to')}{' '}
            <a href={`mailto:${SUPPORT_EMAIL}`} dir="ltr" className="text-primary hover:underline">
              {SUPPORT_EMAIL}
            </a>
          </p>
        </aside>
      </article>
    </main>
  )
}
