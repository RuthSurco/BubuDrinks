import { ArrowUpRight, Heart, PackageCheck } from 'lucide-react'
import type { Product } from '../data/products'
import { Badge } from './ui/Badge'
import { Button } from './ui/Button'

const currency = new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' })

type ProductCardProps = {
  product: Product
  name?: string
  description?: string
  price?: number
  image?: string
  category?: string
  isFavorite?: boolean
  onToggleFavorite?: (productId: string) => void
  onSelect: (product: Product) => void
}

export function ProductCard({ product, name, description, price, image, category, isFavorite = false, onToggleFavorite, onSelect }: ProductCardProps) {
  const displayName = name ?? product.name
  const displayDescription = description ?? product.description
  const basePrice = price ?? product.price
  const finalPrice = product.finalPrice ?? basePrice
  const displayImage = image ?? product.image
  const displayCategory = category ?? product.category
  const lowStock = product.stock <= 6
  const outOfStock = product.stock <= 0
  const onSale = product.onSale && product.discountPercent > 0

  return (
    <article className="group overflow-hidden rounded-[26px] border border-stone-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-bubu-200 hover:shadow-card">
      <div className="relative m-2.5 overflow-hidden rounded-[20px] bg-gradient-to-br from-bubu-100 via-cream-100 to-bubu-50">
        <img src="/bubu-deco-1-sin-fondo.png" alt="" aria-hidden="true" className="pointer-events-none absolute -bottom-5 -right-3 h-28 w-28 rotate-[-10deg] object-contain opacity-[0.13]" />
        <img src="/bubu-deco-2-sin-fondo.png" alt="" aria-hidden="true" className="pointer-events-none absolute -left-4 -top-4 h-20 w-20 rotate-[12deg] object-contain opacity-[0.10]" />
        <img src="/bubu-deco-3-sin-fondo.png" alt="" aria-hidden="true" className="pointer-events-none absolute right-8 top-1 h-16 w-16 -rotate-[6deg] object-contain opacity-[0.09]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-white/25" />
        <img src={displayImage} alt={displayName} className="relative z-[1] aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
        <div className="absolute left-3 top-3 z-[2] flex flex-wrap gap-2">
          {outOfStock ? <Badge tone="warm">Agotado</Badge> : <Badge tone={lowStock ? 'warm' : 'green'}>{lowStock ? 'Pocas unidades' : 'Disponible'}</Badge>}
          <Badge tone="muted">{displayCategory}</Badge>
          {onSale && <Badge tone="brand">-{product.discountPercent}%</Badge>}
          {product.featured && <Badge tone="green">Recomendado</Badge>}
        </div>
        <button
          aria-label={isFavorite ? `Quitar ${displayName} de favoritos` : `Agregar ${displayName} a favoritos`}
          onClick={() => onToggleFavorite?.(product.id)}
          className={`absolute right-3 top-3 z-[2] rounded-full p-2.5 backdrop-blur transition-colors ${isFavorite ? 'bg-white text-red-500 shadow-sm' : 'bg-white/80 text-stone-400 hover:text-red-400'}`}
        >
          <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="px-4 pb-4 pt-1">
        <div className="mb-1 flex items-start justify-between gap-3">
          <h3 className="font-extrabold tracking-[-0.03em] text-bubu-900">{displayName}</h3>
          <div className="shrink-0 text-right">
            {onSale ? (
              <>
                <p className="text-[11px] font-semibold text-stone-400 line-through">{currency.format(basePrice)}</p>
                <p className="font-extrabold text-caramel">{currency.format(finalPrice)}</p>
              </>
            ) : (
              <p className="font-extrabold text-caramel">{currency.format(basePrice)}</p>
            )}
          </div>
        </div>
        <p className="min-h-[40px] text-xs leading-5 text-stone-500">{displayDescription}</p>
        <div className="mt-4 flex items-center justify-between gap-3 border-t border-stone-100 pt-3">
          <span className="flex items-center gap-1.5 text-[11px] font-semibold text-stone-400"><PackageCheck size={14} className="text-bubu-500" /> {product.stock} disponibles</span>
          <Button variant="soft" size="sm" onClick={() => onSelect(product)}>Ver detalle <ArrowUpRight size={14} /></Button>
        </div>
      </div>
    </article>
  )
}
