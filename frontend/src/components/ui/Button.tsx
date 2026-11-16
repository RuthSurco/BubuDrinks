import type { ButtonHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost' | 'soft'
  size?: 'sm' | 'md'
}

export function Button({ className, variant = 'primary', size = 'md', ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-2xl font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bubu-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        size === 'sm' ? 'px-3.5 py-2 text-xs' : 'px-4 py-2.5 text-sm',
        variant === 'primary' && 'bg-bubu-500 text-white shadow-sm hover:-translate-y-0.5 hover:bg-bubu-600 hover:shadow-card',
        variant === 'ghost' && 'text-bubu-700 hover:bg-bubu-50',
        variant === 'soft' && 'bg-bubu-50 text-bubu-700 hover:bg-bubu-100',
        className,
      )}
      {...props}
    />
  )
}
