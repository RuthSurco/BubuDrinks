import { Coffee, Heart, Home, Info, LogOut, Settings, ShoppingBag, Sparkles, X } from 'lucide-react'
import { cn } from '../lib/utils'

const navItems = [
  { label: 'Inicio', icon: Home },
  { label: 'Menú', icon: Coffee },
  { label: 'Favoritos', icon: Heart },
  { label: 'Horarios', icon: ShoppingBag },
]

type SidebarProps = {
  activeItem: string
  onChange: (item: string) => void
  mobileOpen: boolean
  onClose: () => void
  favoritesCount?: number
}

export function Sidebar({ activeItem, onChange, mobileOpen, onClose, favoritesCount = 0 }: SidebarProps) {
  return (
    <>
      {mobileOpen && <button aria-label="Cerrar menú" className="fixed inset-0 z-40 bg-bubu-900/25 backdrop-blur-sm lg:hidden" onClick={onClose} />}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-[250px] flex-col border-r border-bubu-100 bg-white/95 px-5 py-6 shadow-soft backdrop-blur-xl transition-transform duration-300 lg:translate-x-0 lg:bg-white/75 lg:shadow-none',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex items-start justify-between px-2">
          <div className="flex items-center gap-3">
            <div className="bubu-mark overflow-hidden"><img src="/bubu-logo.png" alt="Logo de Bubu Drinks" className="h-full w-full rounded-full object-contain" /></div>
            <div>
              <p className="font-extrabold tracking-[-0.04em] text-bubu-800">Bubu<span className="text-bubu-500">Drinks</span></p>
              <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-bubu-400">un sorbo de felicidad</p>
            </div>
          </div>
          <button className="rounded-xl p-2 text-stone-400 hover:bg-bubu-50 hover:text-bubu-600 lg:hidden" onClick={onClose} aria-label="Cerrar menú">
            <X size={18} />
          </button>
        </div>

        <div className="mt-12 px-2 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">Explora Bubu</div>
        <nav className="mt-3 space-y-1.5" aria-label="Navegación principal">
          {navItems.map(({ label, icon: Icon }) => {
            const active = activeItem === label
            return (
              <button
                key={label}
                onClick={() => { onChange(label); onClose() }}
                className={cn(
                  'group flex w-full items-center gap-3 rounded-2xl px-3.5 py-3 text-left text-sm font-semibold transition-colors',
                  active ? 'bg-cream-200 text-bubu-800 shadow-sm' : 'text-stone-500 hover:bg-bubu-50 hover:text-bubu-700',
                )}
              >
                <Icon size={18} strokeWidth={active ? 2.4 : 1.8} className={cn(active ? 'text-bubu-600' : 'text-stone-400 group-hover:text-bubu-500')} />
                {label}
                {label === 'Favoritos' && <span className="ml-auto rounded-full bg-bubu-100 px-2 py-0.5 text-[10px] text-bubu-700">{favoritesCount}</span>}
              </button>
            )
          })}
        </nav>

        <div className="mt-auto space-y-1.5 border-t border-stone-100 pt-5">
          <button
            onClick={() => { onChange('Sobre Bubu'); onClose() }}
            className={cn(
              'flex w-full items-center gap-3 rounded-2xl px-3.5 py-3 text-left text-sm font-semibold transition-colors',
              activeItem === 'Sobre Bubu' ? 'bg-cream-200 text-bubu-800 shadow-sm' : 'text-stone-500 hover:bg-bubu-50 hover:text-bubu-700',
            )}
          >
            <Info size={18} strokeWidth={activeItem === 'Sobre Bubu' ? 2.4 : 1.8} className={cn(activeItem === 'Sobre Bubu' ? 'text-bubu-600' : 'text-stone-400')} /> Sobre Bubu
          </button>
          <button
            onClick={() => { onChange('Configuración'); onClose() }}
            className={cn(
              'flex w-full items-center gap-3 rounded-2xl px-3.5 py-3 text-left text-sm font-semibold transition-colors',
              activeItem === 'Configuración' ? 'bg-cream-200 text-bubu-800 shadow-sm' : 'text-stone-500 hover:bg-bubu-50 hover:text-bubu-700',
            )}
          >
            <Settings size={18} strokeWidth={activeItem === 'Configuración' ? 2.4 : 1.8} className={cn(activeItem === 'Configuración' ? 'text-bubu-600' : 'text-stone-400')} /> Configuración
          </button>
          <div className="mt-4 rounded-3xl bg-bubu-50 p-4">
            <div className="mb-3 flex items-center gap-2 text-bubu-700"><Sparkles size={16} /><span className="text-xs font-bold">Tip de Bubu</span></div>
            <p className="text-xs leading-5 text-bubu-700/75">Cada bebida está preparada para hacer más bonito tu momento.</p>
          </div>
          <button className="flex w-full items-center gap-3 rounded-2xl px-3.5 py-3 text-left text-sm font-semibold text-stone-500 transition-colors hover:bg-red-50 hover:text-red-600">
            <LogOut size={18} strokeWidth={1.8} className="text-stone-400" /> Salir
          </button>
        </div>
      </aside>
    </>
  )
}
