export const categoryLabels = [
  'Cafés calientes',
  'Tés y matcha',
  'Bebidas frías',
  'Frappés',
  'Smoothies',
  'Postres',
  'Snacks',
] as const

export type Category = (typeof categoryLabels)[number]

export type Product = {
  id: string
  name: string
  description: string
  price: number
  category: Category
  image: string
  stock: number
  discountPercent: number
  finalPrice: number
  onSale: boolean
  featured: boolean
}

const image = (id: string, width = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=82`

export const products: Product[] = [
  { id: 'bubu-latte', name: 'Bubu Latte', description: 'Espresso suave con leche vaporizada y un delicado toque de miel.', price: 12.5, category: 'Cafés calientes', image: image('photo-1495474472287-4d71bcdd2085'), stock: 18, discountPercent: 10, finalPrice: 11.25, onSale: true, featured: true },
  { id: 'cappuccino-menta', name: 'Cappuccino Menta', description: 'Cappuccino clásico con espuma de leche y un ligero sabor a menta.', price: 11, category: 'Cafés calientes', image: image('photo-1517701604599-bb29b565090c'), stock: 12, discountPercent: 0, finalPrice: 11.0, onSale: false, featured: false },
  { id: 'mocha-bubu', name: 'Mocha Bubu', description: 'Espresso combinado con chocolate, leche cremosa y espuma de leche.', price: 13, category: 'Cafés calientes', image: image('photo-1509042239860-f550ce710b93'), stock: 9, discountPercent: 15, finalPrice: 11.05, onSale: true, featured: false },
  { id: 'caramel-panda', name: 'Caramel Panda', description: 'Café latte con jarabe de caramelo y una espuma extra cremosa.', price: 13.5, category: 'Cafés calientes', image: image('photo-1498804103079-a6351b050096'), stock: 16, discountPercent: 0, finalPrice: 13.5, onSale: false, featured: true },
  { id: 'chocolate-bubu', name: 'Chocolate Bubu', description: 'Chocolate caliente preparado con leche y chocolate cremoso.', price: 11.5, category: 'Cafés calientes', image: image('photo-1542990253-0d0f5be5f0ed'), stock: 14, discountPercent: 0, finalPrice: 11.5, onSale: false, featured: false },
  { id: 'matcha-panda', name: 'Matcha Panda', description: 'Matcha premium con leche cremosa y un toque de azúcar glass.', price: 14, category: 'Tés y matcha', image: image('photo-1515823064-d6e0c04616a7'), stock: 10, discountPercent: 10, finalPrice: 12.6, onSale: true, featured: true },
  { id: 'te-verde-bubu', name: 'Té Verde Bubu', description: 'Infusión de té verde con limón y hojas de menta fresca.', price: 9, category: 'Tés y matcha', image: image('photo-1544787219-7f47ccb76574'), stock: 20, discountPercent: 0, finalPrice: 9.0, onSale: false, featured: false },
  { id: 'chai-panda', name: 'Chai Panda', description: 'Té chai con leche, canela y especias aromáticas.', price: 12.5, category: 'Tés y matcha', image: image('photo-1571934811356-5cc061b6821f'), stock: 11, discountPercent: 20, finalPrice: 10.0, onSale: true, featured: false },
  { id: 'matcha-vainilla', name: 'Matcha Vainilla', description: 'Matcha frío o caliente con leche y un suave sabor a vainilla.', price: 14.5, category: 'Tés y matcha', image: image('photo-1536256263959-770b48d82b0a'), stock: 8, discountPercent: 0, finalPrice: 14.5, onSale: false, featured: false },
  { id: 'limon-verde', name: 'Limón Verde Refrescante', description: 'Agua mineral con limón, menta fresca y mucho hielo.', price: 9, category: 'Bebidas frías', image: image('photo-1513558161293-cdaf765ed2fd'), stock: 24, discountPercent: 0, finalPrice: 9.0, onSale: false, featured: false },
  { id: 'frutos-rojos-fresh', name: 'Frutos Rojos Fresh', description: 'Infusión fría de frutos rojos con un toque suave de miel.', price: 10.5, category: 'Bebidas frías', image: image('photo-1497534446932-c925b458314e'), stock: 17, discountPercent: 10, finalPrice: 9.45, onSale: true, featured: true },
  { id: 'limonada-bubu', name: 'Limonada Bubu', description: 'Limonada natural con hierbabuena, limón y hielo triturado.', price: 9.5, category: 'Bebidas frías', image: image('photo-1523677011781-c91d1bbe2f9e'), stock: 22, discountPercent: 0, finalPrice: 9.5, onSale: false, featured: false },
  { id: 'te-verde-tropical', name: 'Té Verde Tropical', description: 'Té verde frío con piña, limón y un toque de miel.', price: 11, category: 'Bebidas frías', image: image('photo-1544145945-f90425340c7e'), stock: 13, discountPercent: 0, finalPrice: 11.0, onSale: false, featured: false },
  { id: 'frappe-menta-choco', name: 'Frappé Menta Choco', description: 'Frappé de menta con chocolate, crema batida y chispas.', price: 16, category: 'Frappés', image: image('photo-1572490122747-3968b75cc699'), stock: 7, discountPercent: 15, finalPrice: 13.6, onSale: true, featured: true },
  { id: 'frappe-verde-matcha', name: 'Frappé Verde Matcha', description: 'Matcha helado con leche, hielo molido y chispas verdes.', price: 17, category: 'Frappés', image: image('photo-1577805947697-89e18249d767'), stock: 6, discountPercent: 0, finalPrice: 17.0, onSale: false, featured: false },
  { id: 'frappe-fresa-panda', name: 'Frappé Fresa Panda', description: 'Frappé de fresa con crema batida y decoración de Bubu.', price: 16.5, category: 'Frappés', image: image('photo-1551024709-8f23befc6f87'), stock: 9, discountPercent: 0, finalPrice: 16.5, onSale: false, featured: true },
  { id: 'frappe-mocha-bubu', name: 'Frappé Mocha Bubu', description: 'Café, chocolate, leche y hielo licuado con crema batida.', price: 16, category: 'Frappés', image: image('photo-1461023058943-07fcbe16d735'), stock: 10, discountPercent: 10, finalPrice: 14.4, onSale: true, featured: false },
  { id: 'smoothie-kiwi', name: 'Smoothie Kiwi Energizante', description: 'Kiwi, yogurt natural, miel y hielo para recargar el día.', price: 14, category: 'Smoothies', image: image('photo-1553530666-ba11a7da3888'), stock: 12, discountPercent: 0, finalPrice: 14.0, onSale: false, featured: false },
  { id: 'smoothie-mango', name: 'Smoothie Mango Tropical', description: 'Mango maduro, leche de coco y un toque refrescante de lima.', price: 14, category: 'Smoothies', image: image('photo-1502741224143-90386d7f8c82'), stock: 15, discountPercent: 10, finalPrice: 12.6, onSale: true, featured: true },
  { id: 'smoothie-verde', name: 'Smoothie Verde Bubu', description: 'Espinaca, piña, manzana verde y agua de coco.', price: 15, category: 'Smoothies', image: image('photo-1610970881699-44a5587cabec'), stock: 5, discountPercent: 0, finalPrice: 15.0, onSale: false, featured: false },
  { id: 'smoothie-fresa', name: 'Smoothie Fresa Cremoso', description: 'Fresas, yogurt natural, leche y un toque de miel.', price: 14.5, category: 'Smoothies', image: image('photo-1551024709-8f23befc6f87'), stock: 11, discountPercent: 0, finalPrice: 14.5, onSale: false, featured: false },
  { id: 'cupcake-menta', name: 'Cupcake Menta', description: 'Bizcocho suave de menta con cobertura de queso crema.', price: 8, category: 'Postres', image: image('photo-1576618148400-f54bed99fcfd'), stock: 8, discountPercent: 0, finalPrice: 8.0, onSale: false, featured: false },
  { id: 'cheesecake-maracuya', name: 'Cheesecake de Maracuyá', description: 'Rebanada de cheesecake con salsa natural de maracuyá.', price: 12, category: 'Postres', image: image('photo-1565958011703-44f9829ba187'), stock: 6, discountPercent: 20, finalPrice: 9.6, onSale: true, featured: true },
  { id: 'dona-verde', name: 'Dona Glaseada Verde', description: 'Dona suave con glaseado de menta y decoraciones.', price: 7, category: 'Postres', image: image('photo-1551024506-0bccd828d307'), stock: 13, discountPercent: 0, finalPrice: 7.0, onSale: false, featured: false },
  { id: 'brownie-bubu', name: 'Brownie Bubu', description: 'Brownie de chocolate con textura suave y trozos de chocolate.', price: 8.5, category: 'Postres', image: image('photo-1499636136210-6f4ee915583e'), stock: 9, discountPercent: 10, finalPrice: 7.65, onSale: true, featured: false },
  { id: 'galleta-panda', name: 'Galleta Panda', description: 'Galleta de vainilla decorada con el rostro de Bubu.', price: 6, category: 'Postres', image: image('photo-1499636136210-6f4ee915583e'), stock: 18, discountPercent: 0, finalPrice: 6.0, onSale: false, featured: false },
  { id: 'palomitas-verdes', name: 'Palomitas Caramelo Verde', description: 'Palomitas cubiertas con caramelo y un toque de menta.', price: 7, category: 'Snacks', image: image('photo-1585647347384-2593bc35786b'), stock: 14, discountPercent: 0, finalPrice: 7.0, onSale: false, featured: false },
  { id: 'barra-granola', name: 'Barra de Granola Panda', description: 'Avena, frutos secos y chispas de chocolate en un solo bocado.', price: 6, category: 'Snacks', image: image('photo-1606312619070-d48b4c652a52'), stock: 20, discountPercent: 0, finalPrice: 6.0, onSale: false, featured: true },
  { id: 'trufas-matcha', name: 'Trufas de Matcha', description: 'Trufas de chocolate blanco cubiertas con polvo de matcha.', price: 9, category: 'Snacks', image: image('photo-1565958011703-44f9829ba187'), stock: 7, discountPercent: 15, finalPrice: 7.65, onSale: true, featured: false },
  { id: 'croissant-bubu', name: 'Croissant Bubu', description: 'Croissant de mantequilla, horneado y ligeramente dorado.', price: 8, category: 'Snacks', image: image('photo-1555507036-ab1f4038808a'), stock: 10, discountPercent: 0, finalPrice: 8.0, onSale: false, featured: false },
  { id: 'sandwich-verde', name: 'Sándwich Verde', description: 'Pollo, lechuga, queso y salsa especial de la casa.', price: 12, category: 'Snacks', image: image('photo-1528735602780-2552fd46c7af'), stock: 8, discountPercent: 10, finalPrice: 10.8, onSale: true, featured: false },
]
