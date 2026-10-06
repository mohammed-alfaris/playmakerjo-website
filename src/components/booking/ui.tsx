import type { ReactNode } from 'react'

// Small building blocks shared by the booking and status pages.

export function Section({ title, children, aside }: { title: string; children: ReactNode; aside?: ReactNode }) {
  return (
    <section className="mt-8">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">{title}</h2>
        {aside}
      </div>
      {children}
    </section>
  )
}

export function Chip({
  selected,
  disabled,
  onClick,
  children,
  className = '',
}: {
  selected?: boolean
  disabled?: boolean
  onClick?: () => void
  children: ReactNode
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
      className={[
        'rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all duration-150',
        selected
          ? 'border-primary bg-primary text-on-primary'
          : 'border-outline-variant/40 bg-surface-container-low text-on-surface hover:border-primary/60',
        disabled ? 'cursor-not-allowed opacity-35 line-through hover:border-outline-variant/40' : 'active:scale-95',
        className,
      ].join(' ')}
    >
      {children}
    </button>
  )
}

export function Spinner() {
  return (
    <div className="flex justify-center py-16" role="status">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
    </div>
  )
}

export function Notice({ tone = 'info', icon, children }: { tone?: 'info' | 'error' | 'ok' | 'warn'; icon: string; children: ReactNode }) {
  const tones = {
    info: 'border-outline-variant/30 bg-surface-container-low text-on-surface-variant',
    error: 'border-error/40 bg-error-container/20 text-error',
    ok: 'border-primary/40 bg-primary/10 text-primary',
    warn: 'border-amber-400/40 bg-amber-400/10 text-amber-200',
  }
  return (
    <div className={`flex items-start gap-3 rounded-xl border p-4 text-sm leading-relaxed ${tones[tone]}`}>
      <span className="material-symbols-outlined text-xl" aria-hidden="true">{icon}</span>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  )
}

export const inputClass =
  'w-full rounded-xl border border-outline-variant/40 bg-surface-container-low px-4 py-3 text-on-surface placeholder:text-slate-500 focus:border-primary focus:outline-none'

export function Shell({ children }: { children: ReactNode }) {
  return (
    <main className="kinetic-grid px-4 pb-20 pt-24 sm:px-8 sm:pt-28">
      <div className="mx-auto max-w-2xl">{children}</div>
    </main>
  )
}

export function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="shrink-0 text-slate-400">{label}</dt>
      <dd className="text-end text-on-surface">{children}</dd>
    </div>
  )
}
