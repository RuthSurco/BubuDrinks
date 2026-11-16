import { AlertCircle, Coffee, Heart, LoaderCircle } from 'lucide-react'
import type { Product } from '../data/products'
import { ProductCard } from './ProductCard'
import { Button } from './ui/Button'

type ProductListProps = {
  products: Product[]
  loading: boolean
  error: string | null
  onRetry: () => void
  onSelect: (product: Product) => void
  favoriteIds?: string[]
  onToggleFavorite?: (productId: string) => void
  emptyTitle?: string
  emptyMessage?: string
  emptyIcon?: 'coffee' | 'heart'
}

function ProductSkeleton() {
  return <div className="overflow-hidden rounded-[26px] border border-stone-200 bg-white p-2.5"><div className="skeleton aspect-[4/3] rounded-[20px]" /><div className="space-y-3 px-2 pb-3 pt-4"><div className="skeleton h-5 w-3/5 rounded-lg" /><div className="skeleton h-8 w-full rounded-lg" /><div className="skeleton h-9 w-28 rounded-xl" /></div></div>
}

export function ProductList({ products, loading, error, onRetry, onSelect, favoriteIds = [], onToggleFavorite, emptyTitle = 'Bubu no encontró nada', emptyMessage = 'Prueba con otro nombre o cambia la categoría.', emptyIcon = 'coffee' }: ProductListProps) {
  if (loading) {
    return <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{Array.from({ length: 6 }).map((_, index) => <ProductSkeleton key={index} />)}</div>
  }

  if (error) {
    return <div className="flex min-h-[280px] flex-col items-center justify-center rounded-[28px] border border-red-100 bg-red-50/70 p-8 text-center"><AlertCircle className="mb-3 text-red-500" size={30} /><h3 className="font-extrabold text-red-900">No pudimos traer el menú</h3><p className="mt-2 max-w-sm text-sm leading-6 text-red-700/75">{error}</p><Button className="mt-5" onClick={onRetry}>Intentar nuevamente</Button></div>
  }

  if (products.length === 0) {
    const EmptyIcon = emptyIcon === 'heart' ? Heart : Coffee
    return <div className="flex min-h-[280px] flex-col items-center justify-center rounded-[28px] border border-dashed border-bubu-200 bg-bubu-50/50 p-8 text-center"><EmptyIcon className="mb-3 text-bubu-400" size={32} /><h3 className="font-extrabold text-bubu-900">{emptyTitle}</h3><p className="mt-2 max-w-sm text-sm text-stone-500">{emptyMessage}</p></div>
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          name={product.name}
          description={product.description}
          price={product.price}
          image={product.image}
          category={product.category}
          isFavorite={favoriteIds.includes(product.id)}
          onToggleFavorite={onToggleFavorite}
          onSelect={onSelect}
        />
      ))}
    </div>
  )
}

export function LoadingIcon() {
  return <LoaderCircle size={17} className="animate-spin" />
}
