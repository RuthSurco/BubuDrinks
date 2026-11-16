import { Bell, Menu, Search, ShoppingBag } from 'lucide-react'
import { Button } from './ui/Button'

type HeaderProps = {
  query: string
  onQueryChange: (value: string) => void
  onMenuClick: () => void
  totalProducts: number
}

export function Header({ query, onQueryChange, onMenuClick, totalProducts }: HeaderProps) {
  return (
    <header className="flex flex-wrap items-center gap-4 border-b border-stone-200/70 bg-cream-100/85 px-5 py-4 backdrop-blur lg:px-10 lg:py-6">
      <button className="rounded-2xl border border-stone-200 bg-white p-2.5 text-bubu-700 shadow-sm lg:hidden" onClick={onMenuClick} aria-label="Abrir menú">
        <Menu size={20} />
      </button>
      <div className="mr-auto flex items-center gap-3 lg:hidden">
        <img src="/bubu-logo.png" alt="Logo de Bubu Drinks" className="h-14 w-14 rounded-full bg-white object-contain p-1 shadow-sm ring-1 ring-bubu-100" />
        <div>
          <p className="font-extrabold tracking-[-0.04em] text-bubu-800">Bubu<span className="text-bubu-500">Drinks</span></p>
          <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-bubu-400">un sorbo de felicidad</p>
        </div>
      </div>
      <div className="order-3 flex w-full items-center gap-3 rounded-2xl border border-stone-200 bg-white px-4 py-3 shadow-sm transition-shadow focus-within:border-bubu-300 focus-within:shadow-card lg:order-none lg:max-w-[430px]">
        <Search size={18} className="shrink-0 text-stone-400" />
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Busca una bebida o antojo..."
          className="w-full bg-transparent text-sm text-bubu-900 outline-none placeholder:text-stone-400"
          aria-label="Buscar productos"
        />
        <kbd className="hidden rounded-lg bg-stone-100 px-2 py-1 text-[10px] font-semibold text-stone-400 sm:inline">⌘ K</kbd>
      </div>
      <div className="hidden items-center gap-3 lg:flex">
        <div className="flex items-center gap-2 rounded-2xl border border-bubu-100 bg-white px-3 py-2 text-xs font-semibold text-bubu-700"><span className="h-2 w-2 rounded-full bg-bubu-500" /> {totalProducts} opciones hoy</div>
        <button aria-label="Notificaciones" className="relative rounded-2xl border border-stone-200 bg-white p-3 text-stone-500 transition-colors hover:border-bubu-200 hover:text-bubu-600"><Bell size={18} /><span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-caramel" /></button>
        <Button variant="soft" size="sm"><ShoppingBag size={16} />Mi pausa</Button>
      </div>
    </header>
  )
}
