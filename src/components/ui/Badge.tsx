import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: 'green' | 'warm' | 'muted'
}

export function Badge({ className, tone = 'green', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em]',
        tone === 'green' && 'bg-bubu-100 text-bubu-700',
        tone === 'warm' && 'bg-orange-50 text-orange-700',
        tone === 'muted' && 'bg-stone-100 text-stone-600',
        className,
      )}
      {...props}
    />
  )
}
