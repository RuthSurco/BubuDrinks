import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, Bell, Boxes, CalendarClock, Clock3, Globe, Heart, HeartHandshake, Leaf, MapPin, Megaphone, Minus, MoonStar, PackageCheck, Percent, Plus, RefreshCw, ShieldCheck, Sparkles, Store, Target, TrendingUp, Users, X } from 'lucide-react'
import { CategoryFilter } from '../components/CategoryFilter'
import { Header } from '../components/Header'
import { ProductList } from '../components/ProductList'
import { Sidebar } from '../components/Sidebar'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { categoryLabels, type Category, type Product } from '../data/products'
import { getCategories, getProducts, updateProductStock } from '../services/api'

const currency = new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' })
const FAVORITES_KEY = 'bubu-favorites'

export function HomePage() {
  const [activeCategory, setActiveCategory] = useState<Category | 'Todos'>('Todos')
  const [query, setQuery] = useState('')
  const [activeNav, setActiveNav] = useState('Menú')
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([...categoryLabels])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [compactView, setCompactView] = useState(false)
  const [language, setLanguage] = useState<'Español' | 'English'>('Español')
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(FAVORITES_KEY)
      const parsed = raw ? JSON.parse(raw) : []
      return Array.isArray(parsed) ? parsed.filter((value): value is string => typeof value === 'string') : []
    } catch {
      return []
    }
  })
  const [inventorySaving, setInventorySaving] = useState<string | null>(null)

  const loadCatalog = async () => {
    setLoading(true)
    setError(null)
    try {
      const [catalog, categoryList] = await Promise.all([getProducts(), getCategories()])
      setProducts(catalog)
      setCategories(categoryList)
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Ocurrió un error inesperado.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { void loadCatalog() }, [])
  useEffect(() => { localStorage.setItem(FAVORITES_KEY, JSON.stringify(favoriteIds)) }, [favoriteIds])

  const toggleFavorite = (productId: string) => {
    setFavoriteIds((current) => (current.includes(productId) ? current.filter((id) => id !== productId) : [...current, productId]))
  }

  const counts = useMemo(() => products.reduce<Record<string, number>>((result, product) => {
    result[product.category] = (result[product.category] ?? 0) + 1
    return result
  }, {}), [products])

  const promoProducts = useMemo(() => products.filter((p) => p.onSale), [products])
  const recommendedProducts = useMemo(() => {
    const featured = products.filter((p) => p.featured)
    return (featured.length ? featured : products.slice(0, 4)).slice(0, 4)
  }, [products])

  const getRecommendations = (base: Product | null) => {
    if (!base) return recommendedProducts.slice(0, 3)
    const same = products.filter((p) => p.id !== base.id && (p.category === base.category || p.featured || p.onSale))
    return (same.length ? same : products.filter((p) => p.id !== base.id)).slice(0, 3)
  }

  const handleStockChange = async (productId: string, nextStock: number) => {
    const safeStock = Math.max(0, Math.floor(Number.isFinite(nextStock) ? nextStock : 0))
    setInventorySaving(productId)
    try {
      const updated = await updateProductStock(productId, safeStock)
      if (updated) {
        setProducts((prev) => prev.map((p) => (p.id === productId ? { ...p, ...updated } : p)))
        setSelectedProduct((prev) => (prev && prev.id === productId ? { ...prev, ...updated } : prev))
      } else {
        setProducts((prev) => prev.map((p) => (p.id === productId ? { ...p, stock: safeStock } : p)))
      }
    } catch {
      // mantener interfaz usable
    } finally {
      setInventorySaving(null)
    }
  }

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return products.filter((product) => {
      const matchesCategory = activeCategory === 'Todos' || product.category === activeCategory
      const matchesQuery = !normalizedQuery || `${product.name} ${product.description} ${product.category}`.toLowerCase().includes(normalizedQuery)
      return matchesCategory && matchesQuery
    })
  }, [activeCategory, products, query])

  const favoriteProducts = useMemo(() => products.filter((product) => favoriteIds.includes(product.id)), [products, favoriteIds])
  const featured = products.find((product) => product.id === 'bubu-latte') ?? products[0]

  return (
    <div className="app-shell min-h-screen">
      <Sidebar activeItem={activeNav} onChange={setActiveNav} mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} favoritesCount={favoriteIds.length} />
      <div className="lg:pl-[250px]">
        <Header query={query} onQueryChange={setQuery} onMenuClick={() => setMobileOpen(true)} totalProducts={products.length || 31} />
        <main className="mx-auto max-w-[1500px] px-5 pb-12 pt-7 lg:px-10 lg:pt-10">
          <section className="relative mb-8 overflow-hidden rounded-[30px] bg-gradient-to-br from-bubu-700 via-bubu-700 to-bubu-600 px-6 py-7 text-white shadow-card sm:px-8 lg:px-10 lg:py-9">
            <div className="menu-dot absolute right-0 top-0 h-full w-1/2 opacity-70" />
            <img src="/bubu-deco-1-sin-fondo.png" alt="" aria-hidden="true" className="pointer-events-none absolute -bottom-10 -left-6 h-48 w-48 rotate-[8deg] object-contain opacity-[0.10] sm:h-56 sm:w-56" />
            <img src="/bubu-deco-2-sin-fondo.png" alt="" aria-hidden="true" className="pointer-events-none absolute -right-4 top-4 h-40 w-40 -rotate-[10deg] object-contain opacity-[0.12] sm:h-52 sm:w-52" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.12),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.08),transparent_30%)]" />
            <div className="relative z-10 max-w-xl">
              <div className="mb-4 flex items-center gap-2">
                <span className="rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-bubu-100">Menú de hoy</span>
                <span className="h-1.5 w-1.5 rounded-full bg-caramel" />
              </div>
              <h1 className="max-w-lg text-3xl font-extrabold leading-tight tracking-[-0.06em] sm:text-4xl lg:text-[42px]">Un sorbo de felicidad para tu día.</h1>
              <p className="mt-3 max-w-md text-sm leading-6 text-bubu-100/80">Descubre bebidas, postres y antojos preparados con cariño por Bubu, con promociones y recomendaciones pensadas para ti.</p>
              <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-semibold">
                <span className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2"><Clock3 size={14} /> Hoy: 10:00 a.m. – 10:00 p.m.</span>
                <span className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2"><MapPin size={14} /> Arequipa, Perú</span>
              </div>
            </div>
          </section>

          {promoProducts.length > 0 && (
            <section className="mb-8 overflow-hidden rounded-[28px] border border-caramel/20 bg-gradient-to-r from-cream-100 via-white to-bubu-50 p-5 sm:p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-start gap-4">
                  <div className="mt-1 rounded-2xl bg-caramel/10 p-3 text-caramel"><Megaphone size={22} /></div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-caramel">Promociones y descuentos</p>
                    <h2 className="mt-1 text-xl font-extrabold tracking-[-0.04em] text-bubu-900">Ofertas especiales para tu pausa feliz</h2>
                    <p className="mt-1 text-sm text-stone-600">Descubre productos con descuento y precios promocionales aplicados en el catálogo.</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-bold text-bubu-700 shadow-sm"><Percent size={14} className="text-caramel" /> {promoProducts.length} productos en promoción</span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-bubu-700 px-3 py-2 text-xs font-bold text-white"><Sparkles size={14} /> Ofertas activas</span>
                </div>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {promoProducts.slice(0, 4).map((p) => (
                  <button key={p.id} onClick={() => setSelectedProduct(p)} className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-white p-3 text-left transition hover:-translate-y-0.5 hover:border-bubu-200 hover:shadow-sm">
                    <img src={p.image} alt={p.name} className="h-14 w-14 rounded-xl object-cover" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-extrabold text-bubu-900">{p.name}</p>
                      <p className="text-xs font-bold text-caramel">-{p.discountPercent}% · {currency.format(p.finalPrice)}</p>
                      <p className="text-[11px] text-stone-400 line-through">{currency.format(p.price)}</p>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          )}

          {(activeNav === 'Menú' || activeNav === 'Inicio') && (
            <>
              <section className="mb-7 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-caramel">Para ti</p>
                  <div className="mt-1 flex items-center gap-3">
                    <h2 className="text-2xl font-extrabold tracking-[-0.05em] text-bubu-900 sm:text-3xl">Elige tu favorito</h2>
                    <span className="rounded-full bg-bubu-100 px-2.5 py-1 text-[11px] font-bold text-bubu-700">{filteredProducts.length} opciones</span>
                  </div>
                </div>
                <p className="max-w-xs text-left text-xs leading-5 text-stone-500 sm:text-right">Busca, filtra y descubre productos con promociones y recomendaciones de Bubu.</p>
              </section>
              <CategoryFilter categories={categories} activeCategory={activeCategory} counts={counts} onChange={setActiveCategory} />
              <div className="mt-6">
                <ProductList products={filteredProducts} loading={loading} error={error} onRetry={() => void loadCatalog()} onSelect={setSelectedProduct} favoriteIds={favoriteIds} onToggleFavorite={toggleFavorite} />
              </div>

              <section className="mt-10 grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
                <div className="rounded-[28px] border border-bubu-100 bg-white p-6 shadow-sm sm:p-7">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-caramel">Sistema de recomendación</p>
                      <h3 className="mt-1 text-xl font-extrabold tracking-[-0.04em] text-bubu-900">Recomendados por Bubu</h3>
                    </div>
                    <span className="inline-flex items-center gap-2 rounded-full bg-bubu-50 px-3 py-1.5 text-xs font-bold text-bubu-700"><TrendingUp size={14} /> Sugerencias</span>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {recommendedProducts.map((p) => (
                      <button key={p.id} onClick={() => setSelectedProduct(p)} className="flex items-center gap-3 rounded-2xl border border-stone-200 p-3 text-left transition hover:border-bubu-200 hover:bg-bubu-50/40">
                        <img src={p.image} alt={p.name} className="h-16 w-16 rounded-xl object-cover" />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-extrabold text-bubu-900">{p.name}</p>
                          <p className="text-xs text-stone-500">{p.category}</p>
                          <p className="mt-0.5 text-xs font-bold text-caramel">{currency.format(p.onSale ? p.finalPrice : p.price)}{p.onSale ? ` · -${p.discountPercent}%` : ''}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                  <p className="mt-4 text-xs leading-5 text-stone-500">Las recomendaciones consideran productos destacados, promociones y opciones relacionadas para ayudarte a descubrir nuevos favoritos.</p>
                </div>

                <div className="space-y-5">
                  <div className="rounded-[28px] border border-bubu-100 bg-bubu-50 p-6">
                    <div className="mb-3 inline-flex rounded-2xl bg-white p-3 text-bubu-700"><Target size={20} /></div>
                    <h3 className="text-lg font-extrabold text-bubu-900">Objetivos de la aplicación</h3>
                    <ul className="mt-3 space-y-2 text-sm leading-6 text-stone-600">
                      <li>• Presentar el catálogo de Bubu Drinks de forma clara, visual y accesible.</li>
                      <li>• Facilitar la búsqueda, filtrado y visualización de productos.</li>
                      <li>• Informar promociones, descuentos y recomendaciones personalizadas.</li>
                      <li>• Apoyar la gestión básica del inventario y la disponibilidad.</li>
                    </ul>
                  </div>
                  <div className="rounded-[28px] border border-bubu-100 bg-white p-6 shadow-sm">
                    <div className="mb-3 inline-flex rounded-2xl bg-bubu-50 p-3 text-bubu-700"><Users size={20} /></div>
                    <h3 className="text-lg font-extrabold text-bubu-900">Público objetivo</h3>
                    <p className="mt-2 text-sm leading-6 text-stone-600">Jóvenes, estudiantes y familias de Arequipa que buscan bebidas, postres y snacks en un ambiente acogedor, con opciones accesibles, promociones y una experiencia amigable desde el celular.</p>
                    <h4 className="mt-4 text-sm font-extrabold text-bubu-900">Características clave</h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="rounded-full bg-bubu-50 px-3 py-1.5 text-xs font-semibold text-bubu-700">Diseño responsive</span>
                      <span className="rounded-full bg-bubu-50 px-3 py-1.5 text-xs font-semibold text-bubu-700">Búsqueda y filtros</span>
                      <span className="rounded-full bg-bubu-50 px-3 py-1.5 text-xs font-semibold text-bubu-700">Promociones y descuentos</span>
                      <span className="rounded-full bg-bubu-50 px-3 py-1.5 text-xs font-semibold text-bubu-700">Recomendaciones</span>
                      <span className="rounded-full bg-bubu-50 px-3 py-1.5 text-xs font-semibold text-bubu-700">Gestión de inventario</span>
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}

          {activeNav === 'Favoritos' && (
            <section className="space-y-6">
              <div className="relative overflow-hidden rounded-[30px] border border-bubu-100 bg-white p-7 shadow-sm sm:p-8">
                <div className="relative z-10">
                  <Badge>Favoritos</Badge>
                  <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.05em] text-bubu-900">Tus elegidos de Bubu</h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600">Guarda las bebidas y antojos que más te gustan tocando el corazón en cada producto.</p>
                  <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-bubu-50 px-4 py-2 text-xs font-bold text-bubu-700"><Heart size={14} className="text-red-400" fill="currentColor" /> {favoriteIds.length} favorito{favoriteIds.length === 1 ? '' : 's'} guardado{favoriteIds.length === 1 ? '' : 's'}</div>
                </div>
              </div>
              <ProductList products={favoriteProducts} loading={loading} error={error} onRetry={() => void loadCatalog()} onSelect={setSelectedProduct} favoriteIds={favoriteIds} onToggleFavorite={toggleFavorite} emptyTitle="Aún no tienes favoritos" emptyMessage="Toca el corazón en cualquier producto del menú y Bubu lo guardará aquí para ti." emptyIcon="heart" />
              {favoriteProducts.length === 0 && !loading && !error && (
                <div className="flex justify-center"><Button onClick={() => setActiveNav('Menú')}>Ir al menú</Button></div>
              )}
            </section>
          )}

          {activeNav === 'Inventario' && (
            <section className="space-y-6">
              <div className="relative overflow-hidden rounded-[30px] border border-bubu-100 bg-white p-7 shadow-sm sm:p-8">
                <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <Badge>Inventario</Badge>
                    <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.05em] text-bubu-900">Gestión básica de inventario</h2>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600">Controla las unidades disponibles de cada producto. Puedes aumentar, disminuir o ajustar el stock para mantener el catálogo actualizado.</p>
                  </div>
                  <Button variant="soft" onClick={() => void loadCatalog()}><RefreshCw size={15} /> Actualizar</Button>
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl bg-bubu-50 p-4"><p className="text-xs font-bold uppercase tracking-[0.14em] text-bubu-500">Productos</p><p className="mt-1 flex items-center gap-2 text-2xl font-extrabold text-bubu-900"><Boxes size={20} /> {products.length}</p></div>
                  <div className="rounded-2xl bg-cream-100 p-4"><p className="text-xs font-bold uppercase tracking-[0.14em] text-caramel">Stock bajo (≤ 6)</p><p className="mt-1 text-2xl font-extrabold text-bubu-900">{products.filter((p) => p.stock > 0 && p.stock <= 6).length}</p></div>
                  <div className="rounded-2xl bg-stone-100 p-4"><p className="text-xs font-bold uppercase tracking-[0.14em] text-stone-500">Agotados</p><p className="mt-1 text-2xl font-extrabold text-bubu-900">{products.filter((p) => p.stock <= 0).length}</p></div>
                </div>
              </div>

              <div className="overflow-hidden rounded-[28px] border border-stone-200 bg-white shadow-sm">
                <div className="hidden grid-cols-[1.4fr_.7fr_.6fr_.9fr] gap-4 border-b border-stone-100 bg-stone-50 px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-stone-500 md:grid">
                  <span>Producto</span><span>Categoría</span><span>Stock</span><span>Acciones</span>
                </div>
                <div className="divide-y divide-stone-100">
                  {products.map((p) => (
                    <div key={p.id} className="grid gap-3 px-5 py-4 md:grid-cols-[1.4fr_.7fr_.6fr_.9fr] md:items-center">
                      <div className="flex min-w-0 items-center gap-3">
                        <img src={p.image} alt={p.name} className="h-12 w-12 rounded-xl object-cover" />
                        <div className="min-w-0">
                          <p className="truncate font-extrabold text-bubu-900">{p.name}</p>
                          <p className="text-xs text-stone-500">{p.onSale ? `Promo -${p.discountPercent}% · ${currency.format(p.finalPrice)}` : currency.format(p.price)}</p>
                        </div>
                      </div>
                      <div className="text-sm text-stone-600">{p.category}</div>
                      <div>
                        <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${p.stock <= 0 ? 'bg-red-50 text-red-600' : p.stock <= 6 ? 'bg-amber-50 text-amber-700' : 'bg-green-50 text-green-700'}`}>
                          {p.stock} uds.
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <button disabled={inventorySaving === p.id} onClick={() => void handleStockChange(p.id, p.stock - 1)} className="rounded-xl border border-stone-200 p-2 text-stone-600 hover:border-bubu-200 hover:text-bubu-700 disabled:opacity-50" aria-label={`Disminuir stock de ${p.name}`}><Minus size={14} /></button>
                        <input
                          type="number"
                          min={0}
                          value={p.stock}
                          onChange={(e) => void handleStockChange(p.id, Number(e.target.value))}
                          className="w-20 rounded-xl border border-stone-200 px-2 py-1.5 text-center text-sm font-semibold text-bubu-900 outline-none focus:border-bubu-300"
                          aria-label={`Stock de ${p.name}`}
                        />
                        <button disabled={inventorySaving === p.id} onClick={() => void handleStockChange(p.id, p.stock + 1)} className="rounded-xl border border-stone-200 p-2 text-stone-600 hover:border-bubu-200 hover:text-bubu-700 disabled:opacity-50" aria-label={`Aumentar stock de ${p.name}`}><Plus size={14} /></button>
                        {inventorySaving === p.id && <span className="text-xs text-stone-400">Guardando...</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {activeNav === 'Horarios' && (
            <section className="space-y-6">
              <div className="relative overflow-hidden rounded-[30px] border border-bubu-100 bg-white p-7 shadow-sm sm:p-8">
                <div className="relative z-10">
                  <Badge>Horarios</Badge>
                  <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.05em] text-bubu-900">Ven a compartir un momento con Bubu</h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600">Te esperamos con bebidas, postres y snacks preparados con cariño.</p>
                </div>
              </div>
              <div className="grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
                <article className="rounded-[28px] border border-bubu-100 bg-white p-6 shadow-sm sm:p-7">
                  <div className="mb-4 inline-flex rounded-2xl bg-bubu-50 p-3 text-bubu-700"><CalendarClock size={20} /></div>
                  <h3 className="text-xl font-extrabold text-bubu-900">Horario de atención</h3>
                  <div className="mt-5 space-y-3 text-sm">
                    {[['Lunes a Viernes', '10:00 a.m. – 10:00 p.m.'], ['Sábados', '9:00 a.m. – 11:00 p.m.'], ['Domingos y feriados', '9:00 a.m. – 9:00 p.m.']].map(([day, hours]) => (
                      <div key={day} className="flex items-center justify-between gap-4 rounded-2xl bg-bubu-50 px-4 py-3">
                        <span className="font-semibold text-bubu-900">{day}</span>
                        <span className="font-bold text-bubu-700">{hours}</span>
                      </div>
                    ))}
                  </div>
                </article>
                <div className="space-y-5">
                  <article className="rounded-[28px] border border-bubu-100 bg-white p-6 shadow-sm">
                    <div className="mb-4 inline-flex rounded-2xl bg-bubu-50 p-3 text-bubu-700"><MapPin size={20} /></div>
                    <h3 className="text-lg font-extrabold text-bubu-900">Ubicación</h3>
                    <p className="mt-2 text-sm leading-6 text-stone-600">Arequipa, Perú</p>
                  </article>
                  <article className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-bubu-700 to-bubu-600 p-6 text-white shadow-sm">
                    <div className="relative z-10">
                      <div className="mb-3 inline-flex rounded-2xl bg-white/10 p-3"><Store size={20} /></div>
                      <h3 className="text-lg font-extrabold">Mejores momentos para visitarnos</h3>
                      <ul className="mt-3 space-y-2 text-sm text-bubu-50/90">
                        <li>• Mañanas: cafés y desayunos tranquilos.</li>
                        <li>• Tardes: frappés, smoothies y postres.</li>
                        <li>• Noches: un antojo dulce para cerrar el día.</li>
                      </ul>
                    </div>
                  </article>
                </div>
              </div>
            </section>
          )}

          {activeNav === 'Sobre Bubu' && (
            <section className="space-y-6">
              <div className="overflow-hidden rounded-[30px] border border-bubu-100 bg-white shadow-sm">
                <div className="grid gap-0 md:grid-cols-[1.05fr_.95fr]">
                  <div className="p-7 sm:p-9">
                    <Badge>Sobre Bubu</Badge>
                    <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.05em] text-bubu-900">La historia detrás de un sorbo de felicidad</h2>
                    <p className="mt-4 text-sm leading-7 text-stone-600">Bubu Drinks nació como un pequeño sueño entre amigos en Arequipa, inspirado por Bubu, una panda tierna que representa calma y alegría.</p>
                  </div>
                  <div className="relative min-h-[280px] overflow-hidden bg-gradient-to-br from-bubu-100 via-cream-100 to-white">
                    <img src="/bubu-historia-sin-fondo.png" alt="Bubu, la panda de Bubu Drinks" className="relative z-[1] h-full w-full object-contain p-6 sm:p-10" />
                  </div>
                </div>
              </div>
              <div className="grid gap-5 lg:grid-cols-3">
                <article className="rounded-[28px] border border-bubu-100 bg-white p-6 shadow-sm"><div className="mb-4 inline-flex rounded-2xl bg-bubu-50 p-3 text-bubu-700"><Target size={20} /></div><h3 className="text-lg font-extrabold text-bubu-900">Misión</h3><p className="mt-2 text-sm leading-6 text-stone-600">Brindar bebidas, postres y snacks con calidad y un servicio cálido.</p></article>
                <article className="rounded-[28px] border border-bubu-100 bg-white p-6 shadow-sm"><div className="mb-4 inline-flex rounded-2xl bg-bubu-50 p-3 text-bubu-700"><Sparkles size={20} /></div><h3 className="text-lg font-extrabold text-bubu-900">Visión</h3><p className="mt-2 text-sm leading-6 text-stone-600">Ser la cafetería favorita de la comunidad por su identidad y sabor auténtico.</p></article>
                <article className="rounded-[28px] border border-bubu-100 bg-white p-6 shadow-sm"><div className="mb-4 inline-flex rounded-2xl bg-bubu-50 p-3 text-bubu-700"><HeartHandshake size={20} /></div><h3 className="text-lg font-extrabold text-bubu-900">Valores</h3><ul className="mt-2 space-y-2 text-sm leading-6 text-stone-600"><li><strong className="text-bubu-800">Cariño:</strong> cuidamos cada detalle.</li><li><strong className="text-bubu-800">Calidad:</strong> ingredientes frescos.</li><li><strong className="text-bubu-800">Cercanía:</strong> acompañamos a nuestra comunidad.</li></ul></article>
              </div>
            </section>
          )}

          {activeNav === 'Configuración' && (
            <section className="space-y-6">
              <div className="relative overflow-hidden rounded-[30px] border border-bubu-100 bg-white p-7 shadow-sm sm:p-8">
                <div className="relative z-10">
                  <Badge>Configuración</Badge>
                  <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.05em] text-bubu-900">Personaliza tu experiencia en Bubu Drinks</h2>
                  <div className="mt-7 grid gap-4 lg:grid-cols-2">
                    <div className="rounded-[24px] border border-stone-200 p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div><div className="mb-2 inline-flex rounded-xl bg-bubu-50 p-2 text-bubu-700"><Bell size={18} /></div><h3 className="font-extrabold text-bubu-900">Notificaciones</h3><p className="mt-1 text-sm leading-6 text-stone-500">Avisos sobre novedades y promociones.</p></div>
                        <button onClick={() => setNotifications((v) => !v)} className={`relative mt-1 h-7 w-12 rounded-full transition-colors ${notifications ? 'bg-bubu-500' : 'bg-stone-300'}`} aria-label="Activar o desactivar notificaciones"><span className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-transform ${notifications ? 'left-6' : 'left-1'}`} /></button>
                      </div>
                      <p className="mt-3 text-xs font-semibold text-bubu-700">Estado: {notifications ? 'Activadas' : 'Desactivadas'}</p>
                    </div>
                    <div className="rounded-[24px] border border-stone-200 p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div><div className="mb-2 inline-flex rounded-xl bg-bubu-50 p-2 text-bubu-700"><MoonStar size={18} /></div><h3 className="font-extrabold text-bubu-900">Vista compacta</h3><p className="mt-1 text-sm leading-6 text-stone-500">Reduce espacios para ver más contenido.</p></div>
                        <button onClick={() => setCompactView((v) => !v)} className={`relative mt-1 h-7 w-12 rounded-full transition-colors ${compactView ? 'bg-bubu-500' : 'bg-stone-300'}`} aria-label="Activar o desactivar vista compacta"><span className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-transform ${compactView ? 'left-6' : 'left-1'}`} /></button>
                      </div>
                      <p className="mt-3 text-xs font-semibold text-bubu-700">Estado: {compactView ? 'Activada' : 'Desactivada'}</p>
                    </div>
                    <div className="rounded-[24px] border border-stone-200 p-5">
                      <div className="mb-2 inline-flex rounded-xl bg-bubu-50 p-2 text-bubu-700"><Globe size={18} /></div>
                      <h3 className="font-extrabold text-bubu-900">Idioma</h3>
                      <div className="mt-4 flex gap-2">{(['Español', 'English'] as const).map((option) => (<button key={option} onClick={() => setLanguage(option)} className={`rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${language === option ? 'bg-bubu-500 text-white' : 'bg-stone-100 text-stone-600 hover:bg-bubu-50 hover:text-bubu-700'}`}>{option}</button>))}</div>
                      <p className="mt-3 text-xs font-semibold text-bubu-700">Idioma seleccionado: {language}</p>
                    </div>
                    <div className="rounded-[24px] border border-stone-200 p-5">
                      <div className="mb-2 inline-flex rounded-xl bg-bubu-50 p-2 text-bubu-700"><ShieldCheck size={18} /></div>
                      <h3 className="font-extrabold text-bubu-900">Cuenta y privacidad</h3>
                      <p className="mt-1 text-sm leading-6 text-stone-500">En esta versión no hay inicio de sesión.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button onClick={() => setActiveNav('Menú')}>Volver al menú</Button>
                <Button variant="soft" onClick={() => { setNotifications(true); setCompactView(false); setLanguage('Español') }}>Restablecer preferencias</Button>
              </div>
            </section>
          )}

          <section className="mt-10 grid gap-5 md:grid-cols-[1.3fr_.7fr]">
            <div className="relative overflow-hidden rounded-[28px] border border-bubu-100 bg-bubu-50 p-6 sm:p-7">
              <Leaf className="absolute -right-2 -top-3 h-28 w-28 rotate-12 text-bubu-200" strokeWidth={1} />
              <div className="relative z-10 max-w-md">
                <Badge>Hecho con cariño</Badge>
                <h3 className="mt-4 text-xl font-extrabold tracking-[-0.04em] text-bubu-900">Tu pausa también merece un abrazo.</h3>
                <p className="mt-2 text-sm leading-6 text-stone-500">Bubu prepara cada opción para que elijas sin prisa y disfrutes cada sorbo.</p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-[28px] bg-cream-200 p-6 sm:p-7">
              <p className="relative z-10 text-xs font-bold uppercase tracking-[0.16em] text-caramel">Favorito de Bubu</p>
              {featured ? (
                <div className="relative z-10">
                  <div className="mt-4 flex items-center gap-4">
                    <img src={featured.image} alt="" className="h-16 w-16 rounded-2xl object-cover" />
                    <div>
                      <h3 className="font-extrabold text-bubu-900">{featured.name}</h3>
                      <p className="mt-1 text-xs text-stone-500">{currency.format(featured.onSale ? featured.finalPrice : featured.price)} · {featured.stock} disponibles</p>
                    </div>
                  </div>
                  <Button variant="soft" size="sm" className="mt-5" onClick={() => setSelectedProduct(featured)}>Ver recomendación <ArrowRight size={14} /></Button>
                </div>
              ) : (
                <div className="skeleton mt-4 h-16 rounded-2xl" />
              )}
            </div>
          </section>
        </main>
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-bubu-900/35 p-4 backdrop-blur-sm" onClick={() => setSelectedProduct(null)}>
          <div role="dialog" aria-modal="true" aria-label={`Detalle de ${selectedProduct.name}`} className="relative w-full max-w-md overflow-hidden rounded-[30px] bg-white shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <button onClick={() => setSelectedProduct(null)} aria-label="Cerrar detalle" className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 text-stone-500 shadow-sm hover:text-bubu-700"><X size={18} /></button>
            <img src={selectedProduct.image} alt={selectedProduct.name} className="aspect-[16/9] w-full object-cover" />
            <div className="p-6">
              <div className="flex flex-wrap gap-2">
                <Badge>{selectedProduct.category}</Badge>
                {selectedProduct.onSale && <Badge tone="brand">Promo -{selectedProduct.discountPercent}%</Badge>}
                {selectedProduct.featured && <Badge tone="green">Recomendado</Badge>}
              </div>
              <div className="mt-3 flex items-start justify-between gap-4">
                <h2 className="text-2xl font-extrabold tracking-[-0.05em] text-bubu-900">{selectedProduct.name}</h2>
                <div className="text-right">
                  {selectedProduct.onSale ? (
                    <>
                      <p className="text-xs font-semibold text-stone-400 line-through">{currency.format(selectedProduct.price)}</p>
                      <span className="text-lg font-extrabold text-caramel">{currency.format(selectedProduct.finalPrice)}</span>
                    </>
                  ) : (
                    <span className="text-lg font-extrabold text-caramel">{currency.format(selectedProduct.price)}</span>
                  )}
                </div>
              </div>
              <p className="mt-3 text-sm leading-6 text-stone-500">{selectedProduct.description}</p>
              <div className="mt-5 flex items-center justify-between rounded-2xl bg-bubu-50 px-4 py-3 text-xs font-bold text-bubu-700">
                <span className="inline-flex items-center gap-1.5"><PackageCheck size={14} /> {selectedProduct.stock} unidades disponibles</span>
                <span>{selectedProduct.stock <= 0 ? 'Agotado' : selectedProduct.stock <= 6 ? 'Stock bajo' : 'Disponible'}</span>
              </div>

              <div className="mt-5">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-stone-500">También te puede gustar</p>
                <div className="grid grid-cols-3 gap-2">
                  {getRecommendations(selectedProduct).map((p) => (
                    <button key={p.id} onClick={() => setSelectedProduct(p)} className="rounded-2xl border border-stone-200 p-2 text-left hover:border-bubu-200 hover:bg-bubu-50/40">
                      <img src={p.image} alt={p.name} className="h-14 w-full rounded-xl object-cover" />
                      <p className="mt-1 line-clamp-2 text-[11px] font-bold text-bubu-900">{p.name}</p>
                      <p className="text-[10px] font-semibold text-caramel">{currency.format(p.onSale ? p.finalPrice : p.price)}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-5 flex gap-3">
                <Button className="flex-1" onClick={() => setSelectedProduct(null)}>Seguir explorando</Button>
                <Button variant={favoriteIds.includes(selectedProduct.id) ? 'primary' : 'soft'} onClick={() => toggleFavorite(selectedProduct.id)} aria-label="Alternar favorito">
                  <Heart size={16} fill={favoriteIds.includes(selectedProduct.id) ? 'currentColor' : 'none'} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
