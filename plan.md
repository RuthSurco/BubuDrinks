# Plan de Bubu Drinks

## Alcance

Bubu Drinks será un catálogo web responsive para una cafetería virtual de bebidas, postres y snacks, inspirado en Bubu, una panda verde. El eslogan será **“Un sorbo de felicidad”**. La primera versión se concentrará en explorar el catálogo, buscar productos y filtrar por categoría; no incluirá carrito, autenticación, pedidos ni pagos.

## Arquitectura y estructura

- `src/data/products.ts`: catálogo inicial de 31 productos con nombre, descripción, precio en soles, categoría, imagen y stock.
- `src/lib/api.ts`: capa de acceso a datos; usa `fetch` cuando existe `VITE_API_URL` y conserva un fallback simulado para que el frontend funcione durante el desarrollo del laboratorio.
- `src/components/Header.tsx`: marca, búsqueda global y acciones de la cabecera.
- `src/components/Sidebar.tsx`: navegación principal lateral.
- `src/components/CategoryFilter.tsx`: filtros de categorías reutilizables.
- `src/components/ProductCard.tsx`: tarjeta reusable con imagen, precio, descripción y disponibilidad.
- `src/components/ProductList.tsx`: estados de carga, error, vacío y grilla de productos.
- `src/components/ui/*`: primitivas visuales estilo shadcn/ui, con clases Tailwind.
- `backend/`: base Django REST Framework con modelos `Categoria` y `Producto`, relación uno a muchos, serializers, admin y endpoints.
- `public/manus-routes.json`: manifiesto de la ruta principal del sitio.

## Diseño

### Movimiento

**Cafetería editorial cálida**: una interfaz de menú digital con navegación lateral, tarjetas suaves y detalles de papel/crema, adaptada a la personalidad tierna de Bubu.

### Principios

1. Claridad de menú: el catálogo debe leerse de un vistazo y el filtro debe ser evidente.
2. Calidez sin exceso: crema y marrón aportan sabor a cafetería; verde menta identifica a Bubu.
3. Ritmo amable: bordes redondeados, sombras ligeras y microinteracciones cortas.
4. Responsive real: la navegación se compacta y la grilla se adapta sin perder jerarquía.

### Paleta

- Verde Bubu `#4D7C59`: color de marca, acciones y selección.
- Verde menta `#E3F0E5`: fondos de apoyo y estados suaves.
- Crema `#FBF6EE`: lienzo principal.
- Marrón café `#5C4638`: texto y referencias a la cafetería.
- Caramelo `#C98755`: acentos, precios y detalles cálidos.
- Blanco `#FFFFFF`: tarjetas y superficies.

### Composición

Una barra lateral amplia en escritorio organiza la experiencia como un menú de cafetería. El contenido principal usa una cabecera editorial, búsqueda, filtros horizontales y una grilla de tarjetas. En móvil, la barra se vuelve una cabecera compacta y los filtros tienen desplazamiento horizontal.

### Elementos distintivos

- Sello circular de Bubu en verde con el panda como mascota.
- Etiquetas tipo “Favorito de Bubu” y “Disponible” para comunicar personalidad y stock.
- Fondos con manchas suaves y líneas orgánicas que recuerdan espuma y hojas sin competir con el catálogo.

### Interacción y animación

Los filtros cambian de color con una transición breve; las tarjetas elevan ligeramente su sombra al pasar el cursor; las imágenes hacen un zoom sutil; los estados de carga usan bloques suaves. No habrá animaciones largas ni efectos que ralenticen la navegación.

### Tipografía

Se usará `Plus Jakarta Sans` como fuente sans principal mediante importación de Google Fonts, con pesos 400, 500, 600, 700 y 800. La jerarquía será: título de página 32–40 px, títulos de tarjeta 16 px, precio 18 px y texto auxiliar 12–14 px.

### Voz de marca

Bubu habla de forma cercana, alegre y breve. Ejemplos: **“Elige algo delicioso para tu momento”** y **“Bubu recomienda este sorbo”**.

### Wordmark y logo

El logotipo combina el nombre “Bubu Drinks” con un sello circular verde inspirado en el panda del usuario. El sitio reutilizará el logo suministrado cuando esté disponible como archivo individual; mientras tanto, el sello visual mantiene su forma circular y color de marca.

### Esencia

Una cafetería digital tierna para descubrir bebidas y antojos que convierten una pausa común en un momento feliz. Personalidad: acogedora, juguetona y fresca.
