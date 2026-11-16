import { Coffee, CupSoda, Donut, GlassWater, Leaf, Sparkles, UtensilsCrossed } from 'lucide-react'
import type { Category } from '../data/products'
import { cn } from '../lib/utils'

const icons = {
  'Cafés calientes': Coffee,
  'Tés y matcha': Leaf,
  'Bebidas frías': GlassWater,
  'Frappés': CupSoda,
  'Smoothies': Sparkles,
  'Postres': Donut,
  'Snacks': UtensilsCrossed,
} satisfies Record<Category, typeof Coffee>

type CategoryFilterProps = {
  categories: Category[]
  activeCategory: Category | 'Todos'
  counts: Record<string, number>
  onChange: (category: Category | 'Todos') => void
}

export function CategoryFilter({ categories, activeCategory, counts, onChange }: CategoryFilterProps) {
  const options: Array<Category | 'Todos'> = ['Todos', ...categories]
  return (
    <div className="scrollbar-none flex gap-2 overflow-x-auto pb-1" aria-label="Filtrar por categoría">
      {options.map((category) => {
        const Icon = category === 'Todos' ? Sparkles : icons[category]
        const active = activeCategory === category
        return (
          <button
            key={category}
            onClick={() => onChange(category)}
            className={cn(
              'flex shrink-0 items-center gap-2 rounded-2xl border px-3.5 py-2.5 text-xs font-bold transition-all duration-200',
              active ? 'border-bubu-500 bg-bubu-500 text-white shadow-card' : 'border-stone-200 bg-white text-stone-500 hover:-translate-y-0.5 hover:border-bubu-200 hover:text-bubu-700',
            )}
          >
            <Icon size={15} strokeWidth={active ? 2.4 : 1.8} />
            {category}
            <span className={cn('rounded-full px-1.5 py-0.5 text-[10px]', active ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-400')}>{category === 'Todos' ? Object.values(counts).reduce((sum, value) => sum + value, 0) : (counts[category] ?? 0)}</span>
          </button>
        )
      })}
    </div>
  )
}
