import { categoryLabels, products as mockProducts, type Category, type Product } from '../data/products'

const API_URL = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, '')

type BackendProduct = {
  id: number | string
  nombre?: string
  name?: string
  descripcion?: string
  description?: string
  precio?: number | string
  price?: number | string
  imagen?: string
  image?: string
  cantidad_disponible?: number
  stock?: number
  categoria_nombre?: string
  category?: string
  categoria?: { nombre?: string } | number | string
}

type BackendCategory = { nombre?: string; name?: string }

const wait = (duration = 420) => new Promise((resolve) => window.setTimeout(resolve, duration))

function categoryFromValue(value: string | undefined): Category {
  return categoryLabels.find((category) => category === value) ?? 'Cafés calientes'
}

function normalizeProduct(item: BackendProduct): Product {
  const categoryName = item.category ?? item.categoria_nombre ?? (typeof item.categoria === 'object' ? item.categoria?.nombre : undefined)
  return {
    id: String(item.id),
    name: item.name ?? item.nombre ?? 'Producto Bubu',
    description: item.description ?? item.descripcion ?? 'Una opción preparada con cariño por Bubu.',
    price: Number(item.price ?? item.precio ?? 0),
    category: categoryFromValue(categoryName),
    image: item.image ?? item.imagen ?? mockProducts[0].image,
    stock: Number(item.stock ?? item.cantidad_disponible ?? 0),
  }
}

export async function getCategories(): Promise<Category[]> {
  if (!API_URL) {
    await wait(260)
    return [...categoryLabels]
  }

  const response = await fetch(`${API_URL}/categorias/`)
  if (!response.ok) throw new Error('No se pudieron cargar las categorías.')
  const data = await response.json()
  const items: BackendCategory[] = Array.isArray(data) ? data : data.results
  const mapped = items.map((item) => categoryFromValue(item.name ?? item.nombre))
  const unique = [...new Set(mapped)]
  return categoryLabels.filter((category) => unique.includes(category))
}

export async function getProducts(): Promise<Product[]> {
  if (!API_URL) {
    await wait()
    return [...mockProducts]
  }

  const response = await fetch(`${API_URL}/productos/`)
  if (!response.ok) throw new Error('No se pudieron cargar los productos.')
  const data = await response.json()
  const items: BackendProduct[] = Array.isArray(data) ? data : data.results
  return items.map(normalizeProduct)
}
