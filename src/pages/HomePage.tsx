import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, Bell, CalendarClock, Clock3, Globe, Heart, HeartHandshake, Leaf, MapPin, MoonStar, ShieldCheck, Sparkles, Store, Target, X } from 'lucide-react'
import { CategoryFilter } from '../components/CategoryFilter'
import { Header } from '../components/Header'
import { ProductList } from '../components/ProductList'
import { Sidebar } from '../components/Sidebar'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { categoryLabels, type Category, type Product } from '../data/products'
import { getCategories, getProducts } from '../services/api'

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
            <img src="/bubu-deco-4-sin-fondo.png" alt="" aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 hidden h-36 w-36 -translate-x-1/2 object-contain opacity-[0.08] lg:block" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.12),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.08),transparent_30%)]" />
            <div className="relative z-10 max-w-xl">
              <div className="mb-4 flex items-center gap-2">
                <span className="rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-bubu-100">Menú de hoy</span>
                <span className="h-1.5 w-1.5 rounded-full bg-caramel" />
              </div>
              <h1 className="max-w-lg text-3xl font-extrabold leading-tight tracking-[-0.06em] sm:text-4xl lg:text-[42px]">Un sorbo de felicidad para tu día.</h1>
              <p className="mt-3 max-w-md text-sm leading-6 text-bubu-100/80">Descubre bebidas, postres y pequeños antojos preparados con cariño por Bubu.</p>
              <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-semibold">
                <span className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2"><Clock3 size={14} /> Hoy: 10:00 a.m. – 10:00 p.m.</span>
                <span className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2"><MapPin size={14} /> Arequipa, Perú</span>
              </div>
            </div>
            <div className="absolute bottom-5 right-8 z-10 hidden rotate-3 items-center gap-3 rounded-3xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur sm:flex lg:right-14">
              <div className="bubu-mark overflow-hidden"><img src="/bubu-logo.png" alt="" className="h-full w-full rounded-full object-contain" /></div>
              <div>
                <p className="text-xs font-bold">Bubu recomienda</p>
                <p className="mt-0.5 text-[11px] text-bubu-100/75">un detalle dulce</p>
              </div>
            </div>
          </section>

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
                <p className="max-w-xs text-left text-xs leading-5 text-stone-500 sm:text-right">Pequeños momentos, grandes sabores. Encuentra algo que te haga sonreír.</p>
              </section>
              <CategoryFilter categories={categories} activeCategory={activeCategory} counts={counts} onChange={setActiveCategory} />
              <div className="mt-6">
                <ProductList products={filteredProducts} loading={loading} error={error} onRetry={() => void loadCatalog()} onSelect={setSelectedProduct} favoriteIds={favoriteIds} onToggleFavorite={toggleFavorite} />
              </div>
            </>
          )}

          {activeNav === 'Favoritos' && (
            <section className="space-y-6">
              <div className="relative overflow-hidden rounded-[30px] border border-bubu-100 bg-white p-7 shadow-sm sm:p-8">
                <img src="/bubu-deco-5-sin-fondo.png" alt="" aria-hidden="true" className="pointer-events-none absolute -right-4 -top-4 h-36 w-36 rotate-[8deg] object-contain opacity-[0.12]" />
                <img src="/bubu-deco-3-sin-fondo.png" alt="" aria-hidden="true" className="pointer-events-none absolute -bottom-6 left-4 h-28 w-28 -rotate-[10deg] object-contain opacity-[0.10]" />
                <div className="relative z-10">
                  <Badge>Favoritos</Badge>
                  <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.05em] text-bubu-900">Tus elegidos de Bubu</h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600">Guarda las bebidas y antojos que más te gustan tocando el corazón en cada producto. Tus favoritos se quedan guardados en este navegador.</p>
                  <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-bubu-50 px-4 py-2 text-xs font-bold text-bubu-700"><Heart size={14} className="text-red-400" fill="currentColor" /> {favoriteIds.length} favorito{favoriteIds.length === 1 ? '' : 's'} guardado{favoriteIds.length === 1 ? '' : 's'}</div>
                </div>
              </div>
              <ProductList products={favoriteProducts} loading={loading} error={error} onRetry={() => void loadCatalog()} onSelect={setSelectedProduct} favoriteIds={favoriteIds} onToggleFavorite={toggleFavorite} emptyTitle="Aún no tienes favoritos" emptyMessage="Toca el corazón en cualquier producto del menú y Bubu lo guardará aquí para ti." emptyIcon="heart" />
              {favoriteProducts.length === 0 && !loading && !error && (
                <div className="flex justify-center"><Button onClick={() => setActiveNav('Menú')}>Ir al menú</Button></div>
              )}
            </section>
          )}

          {activeNav === 'Horarios' && (
            <section className="space-y-6">
              <div className="relative overflow-hidden rounded-[30px] border border-bubu-100 bg-white p-7 shadow-sm sm:p-8">
                <img src="/bubu-deco-4-sin-fondo.png" alt="" aria-hidden="true" className="pointer-events-none absolute -right-6 -top-6 h-40 w-40 rotate-[10deg] object-contain opacity-[0.12]" />
                <img src="/bubu-deco-1-sin-fondo.png" alt="" aria-hidden="true" className="pointer-events-none absolute -bottom-8 left-2 h-32 w-32 -rotate-[8deg] object-contain opacity-[0.10]" />
                <div className="relative z-10">
                  <Badge>Horarios</Badge>
                  <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.05em] text-bubu-900">Ven a compartir un momento con Bubu</h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600">Te esperamos con bebidas, postres y snacks preparados con cariño. Revisa nuestros horarios y planifica tu próxima pausa feliz.</p>
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
                  <div className="mt-5 rounded-2xl border border-dashed border-bubu-200 bg-cream-50 px-4 py-3 text-xs leading-5 text-stone-600">
                    <strong className="text-bubu-800">Nota:</strong> en días festivos especiales el horario puede variar.
                  </div>
                </article>
                <div className="space-y-5">
                  <article className="rounded-[28px] border border-bubu-100 bg-white p-6 shadow-sm">
                    <div className="mb-4 inline-flex rounded-2xl bg-bubu-50 p-3 text-bubu-700"><MapPin size={20} /></div>
                    <h3 className="text-lg font-extrabold text-bubu-900">Ubicación</h3>
                    <p className="mt-2 text-sm leading-6 text-stone-600">Arequipa, Perú</p>
                    <p className="mt-1 text-sm leading-6 text-stone-500">Un rinconcito acogedor para disfrutar tu bebida favorita, estudiar o darte una pausa dulce.</p>
                  </article>
                  <article className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-bubu-700 to-bubu-600 p-6 text-white shadow-sm">
                    <img src="/bubu-deco-5-sin-fondo.png" alt="" aria-hidden="true" className="pointer-events-none absolute -bottom-6 -right-4 h-32 w-32 rotate-[8deg] object-contain opacity-[0.15]" />
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
                    <p className="mt-4 text-sm leading-7 text-stone-600">Bubu Drinks nació como un pequeño sueño entre amigos que querían crear un espacio donde cada bebida se sintiera como un abrazo. Inspirados por Bubu, una panda tierna y curiosa que representa la calma y la alegría de las pausas simples, comenzaron preparando recetas caseras para familiares y vecinos en Arequipa.</p>
                    <p className="mt-3 text-sm leading-7 text-stone-600">Lo que inició como una mesa con cafés, tés y postres hechos con cariño pronto se convirtió en un negocio familiar. Con el tiempo, la comunidad adoptó a Bubu como símbolo de cercanía, sabor y buenos momentos. Hoy, Bubu Drinks combina tradición, creatividad y productos frescos para ofrecer bebidas y antojos que acompañan el día a día de quienes nos visitan.</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      <span className="rounded-full bg-bubu-50 px-3 py-1.5 text-xs font-semibold text-bubu-700">Negocio familiar</span>
                      <span className="rounded-full bg-bubu-50 px-3 py-1.5 text-xs font-semibold text-bubu-700">Recetas con cariño</span>
                      <span className="rounded-full bg-bubu-50 px-3 py-1.5 text-xs font-semibold text-bubu-700">Arequipa, Perú</span>
                    </div>
                  </div>
                  <div className="relative min-h-[280px] overflow-hidden bg-gradient-to-br from-bubu-100 via-cream-100 to-white">
                    <img src="/bubu-deco-2-sin-fondo.png" alt="" aria-hidden="true" className="pointer-events-none absolute -left-8 -top-8 h-40 w-40 rotate-[10deg] object-contain opacity-[0.12]" />
                    <img src="/bubu-deco-1-sin-fondo.png" alt="" aria-hidden="true" className="pointer-events-none absolute -bottom-10 -right-6 h-48 w-48 -rotate-[8deg] object-contain opacity-[0.12]" />
                    <img src="/bubu-deco-4-sin-fondo.png" alt="" aria-hidden="true" className="pointer-events-none absolute right-8 top-6 h-24 w-24 rotate-[6deg] object-contain opacity-[0.10]" />
                    <img src="/bubu-historia-sin-fondo.png" alt="Bubu, la panda de Bubu Drinks" className="relative z-[1] h-full w-full object-contain p-6 sm:p-10" />
                    <div className="absolute inset-x-0 bottom-0 z-[2] bg-gradient-to-t from-bubu-900/40 to-transparent p-5 text-white">
                      <p className="text-sm font-bold">Bubu</p>
                      <p className="text-xs text-white/85">Nuestra inspiración para compartir alegría en cada sorbo.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid gap-5 lg:grid-cols-3">
                <article className="rounded-[28px] border border-bubu-100 bg-white p-6 shadow-sm"><div className="mb-4 inline-flex rounded-2xl bg-bubu-50 p-3 text-bubu-700"><Target size={20} /></div><h3 className="text-lg font-extrabold text-bubu-900">Misión</h3><p className="mt-2 text-sm leading-6 text-stone-600">Brindar bebidas, postres y snacks preparados con ingredientes de calidad y un servicio cálido, creando experiencias sencillas que hagan más feliz el día de cada persona.</p></article>
                <article className="rounded-[28px] border border-bubu-100 bg-white p-6 shadow-sm"><div className="mb-4 inline-flex rounded-2xl bg-bubu-50 p-3 text-bubu-700"><Sparkles size={20} /></div><h3 className="text-lg font-extrabold text-bubu-900">Visión</h3><p className="mt-2 text-sm leading-6 text-stone-600">Ser la cafetería favorita de nuestra comunidad, reconocida por su identidad tierna, su sabor auténtico y por convertir cada visita en un momento especial junto a Bubu.</p></article>
                <article className="rounded-[28px] border border-bubu-100 bg-white p-6 shadow-sm"><div className="mb-4 inline-flex rounded-2xl bg-bubu-50 p-3 text-bubu-700"><HeartHandshake size={20} /></div><h3 className="text-lg font-extrabold text-bubu-900">Valores</h3><ul className="mt-2 space-y-2 text-sm leading-6 text-stone-600"><li><strong className="text-bubu-800">Cariño:</strong> cuidamos cada detalle en lo que preparamos.</li><li><strong className="text-bubu-800">Calidad:</strong> elegimos ingredientes frescos y buenos procesos.</li><li><strong className="text-bubu-800">Cercanía:</strong> escuchamos y acompañamos a nuestra comunidad.</li><li><strong className="text-bubu-800">Alegría:</strong> queremos que cada sorbo transmita bienestar.</li></ul></article>
              </div>
              <div className="relative overflow-hidden rounded-[28px] bg-bubu-700 p-6 text-white sm:p-8">
                <img src="/bubu-deco-3-sin-fondo.png" alt="" aria-hidden="true" className="pointer-events-none absolute -bottom-8 -right-4 h-40 w-40 rotate-[8deg] object-contain opacity-[0.12]" />
                <div className="relative z-10">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-bubu-100">Nuestro compromiso</p>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-bubu-50/90">En Bubu Drinks creemos que los grandes momentos también viven en las pausas pequeñas: un café compartido, un postre después de clase o una bebida fría en una tarde soleada. Por eso trabajamos cada día para que nuestro negocio siga creciendo sin perder su esencia: calidez, sabor y felicidad en cada sorbo.</p>
                  <Button variant="soft" className="mt-5" onClick={() => setActiveNav('Menú')}>Explorar el menú <ArrowRight size={14} /></Button>
                </div>
              </div>
            </section>
          )}

          {activeNav === 'Configuración' && (
            <section className="space-y-6">
              <div className="relative overflow-hidden rounded-[30px] border border-bubu-100 bg-white p-7 shadow-sm sm:p-8">
                <img src="/bubu-deco-5-sin-fondo.png" alt="" aria-hidden="true" className="pointer-events-none absolute -right-5 -top-6 h-36 w-36 rotate-[10deg] object-contain opacity-[0.10]" />
                <div className="relative z-10">
                  <Badge>Configuración</Badge>
                  <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.05em] text-bubu-900">Personaliza tu experiencia en Bubu Drinks</h2>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-600">Ajusta algunas preferencias de la aplicación. Los cambios se aplican en esta vista para que adaptes tu experiencia como más te guste.</p>
                  <div className="mt-7 grid gap-4 lg:grid-cols-2">
                    <div className="rounded-[24px] border border-stone-200 p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div><div className="mb-2 inline-flex rounded-xl bg-bubu-50 p-2 text-bubu-700"><Bell size={18} /></div><h3 className="font-extrabold text-bubu-900">Notificaciones</h3><p className="mt-1 text-sm leading-6 text-stone-500">Recibe avisos sobre novedades, promociones y recomendaciones de Bubu.</p></div>
                        <button onClick={() => setNotifications((v) => !v)} className={`relative mt-1 h-7 w-12 rounded-full transition-colors ${notifications ? 'bg-bubu-500' : 'bg-stone-300'}`} aria-label="Activar o desactivar notificaciones"><span className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-transform ${notifications ? 'left-6' : 'left-1'}`} /></button>
                      </div>
                      <p className="mt-3 text-xs font-semibold text-bubu-700">Estado: {notifications ? 'Activadas' : 'Desactivadas'}</p>
                    </div>
                    <div className="rounded-[24px] border border-stone-200 p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div><div className="mb-2 inline-flex rounded-xl bg-bubu-50 p-2 text-bubu-700"><MoonStar size={18} /></div><h3 className="font-extrabold text-bubu-900">Vista compacta</h3><p className="mt-1 text-sm leading-6 text-stone-500">Reduce espacios para ver más contenido del catálogo en pantalla.</p></div>
                        <button onClick={() => setCompactView((v) => !v)} className={`relative mt-1 h-7 w-12 rounded-full transition-colors ${compactView ? 'bg-bubu-500' : 'bg-stone-300'}`} aria-label="Activar o desactivar vista compacta"><span className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-transform ${compactView ? 'left-6' : 'left-1'}`} /></button>
                      </div>
                      <p className="mt-3 text-xs font-semibold text-bubu-700">Estado: {compactView ? 'Activada' : 'Desactivada'}</p>
                    </div>
                    <div className="rounded-[24px] border border-stone-200 p-5">
                      <div className="mb-2 inline-flex rounded-xl bg-bubu-50 p-2 text-bubu-700"><Globe size={18} /></div>
                      <h3 className="font-extrabold text-bubu-900">Idioma</h3>
                      <p className="mt-1 text-sm leading-6 text-stone-500">Selecciona el idioma de preferencia para la interfaz.</p>
                      <div className="mt-4 flex gap-2">{(['Español', 'English'] as const).map((option) => (<button key={option} onClick={() => setLanguage(option)} className={`rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${language === option ? 'bg-bubu-500 text-white' : 'bg-stone-100 text-stone-600 hover:bg-bubu-50 hover:text-bubu-700'}`}>{option}</button>))}</div>
                      <p className="mt-3 text-xs font-semibold text-bubu-700">Idioma seleccionado: {language}</p>
                    </div>
                    <div className="rounded-[24px] border border-stone-200 p-5">
                      <div className="mb-2 inline-flex rounded-xl bg-bubu-50 p-2 text-bubu-700"><ShieldCheck size={18} /></div>
                      <h3 className="font-extrabold text-bubu-900">Cuenta y privacidad</h3>
                      <p className="mt-1 text-sm leading-6 text-stone-500">En esta versión de laboratorio no hay inicio de sesión. Próximamente podrás gestionar tu perfil, historial y preferencias guardadas.</p>
                      <div className="mt-4 rounded-2xl bg-bubu-50 px-4 py-3 text-xs font-semibold text-bubu-700">Sesión: invitado · Datos personales: no requeridos</div>
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
              <img src="/bubu-deco-3-sin-fondo.png" alt="" aria-hidden="true" className="pointer-events-none absolute bottom-2 right-2 h-24 w-24 rotate-[6deg] object-contain opacity-[0.10]" />
              <div className="relative z-10 max-w-md">
                <Badge>Hecho con cariño</Badge>
                <h3 className="mt-4 text-xl font-extrabold tracking-[-0.04em] text-bubu-900">Tu pausa también merece un abrazo.</h3>
                <p className="mt-2 text-sm leading-6 text-stone-500">Bubu prepara cada opción para que elijas sin prisa y disfrutes cada sorbo.</p>
                <button className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-bubu-700 hover:text-bubu-900" onClick={() => setActiveNav('Sobre Bubu')}>Conoce nuestra historia <ArrowRight size={14} /></button>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-[28px] bg-cream-200 p-6 sm:p-7">
              <img src="/bubu-deco-4-sin-fondo.png" alt="" aria-hidden="true" className="pointer-events-none absolute -right-4 -top-4 h-24 w-24 rotate-[10deg] object-contain opacity-[0.12]" />
              <p className="relative z-10 text-xs font-bold uppercase tracking-[0.16em] text-caramel">Favorito de Bubu</p>
              {featured ? (
                <div className="relative z-10">
                  <div className="mt-4 flex items-center gap-4">
                    <img src={featured.image} alt="" className="h-16 w-16 rounded-2xl object-cover" />
                    <div>
                      <h3 className="font-extrabold text-bubu-900">{featured.name}</h3>
                      <p className="mt-1 text-xs text-stone-500">{currency.format(featured.price)} · {featured.stock} disponibles</p>
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
              <Badge>{selectedProduct.category}</Badge>
              <div className="mt-3 flex items-start justify-between gap-4">
                <h2 className="text-2xl font-extrabold tracking-[-0.05em] text-bubu-900">{selectedProduct.name}</h2>
                <span className="text-lg font-extrabold text-caramel">{currency.format(selectedProduct.price)}</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-stone-500">{selectedProduct.description}</p>
              <div className="mt-5 flex items-center justify-between rounded-2xl bg-bubu-50 px-4 py-3 text-xs font-bold text-bubu-700">
                <span>{selectedProduct.stock} unidades disponibles</span>
                <span>Preparado por Bubu</span>
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
