# TODO — Bubu Drinks

## Catálogo y experiencia principal

- [ ] La página principal debe mostrar el nombre Bubu Drinks, el eslogan “Un sorbo de felicidad” y una navegación lateral o compacta responsive.

- [ ] El catálogo debe incluir los 31 productos definidos para Bubu Drinks, organizados en Cafés calientes, Tés y matcha, Bebidas frías, Frappés, Smoothies, Postres y Snacks.

- [ ] Cada producto debe mostrar nombre, descripción, precio en soles peruanos, imagen y cantidad o estado de disponibilidad.

- [ ] El usuario debe poder buscar productos por nombre desde un buscador integrado.

- [ ] El usuario debe poder filtrar visualmente el catálogo por categoría mediante un componente reutilizable `CategoryFilter`.

- [ ] La interfaz debe mostrar estados claros de carga, error y ausencia de resultados.

## Componentes y diseño

- [ ] Implementar `Header`, `ProductCard`, `ProductList` y `CategoryFilter` como componentes reutilizables.

- [ ] Aplicar Tailwind CSS y primitivas visuales estilo shadcn/ui.

- [ ] Mantener una identidad tierna, moderna y acogedora con verde Bubu, verde claro, crema, blanco y marrón café.

- [ ] Adaptar la experiencia a escritorio, tablet y móvil.

## Datos y backend

- [ ] Preparar `src/lib/api.ts` para consumir productos y categorías mediante `fetch`, `useEffect` y `useState`, con fallback local durante el desarrollo.

- [ ] Crear en `backend/` un proyecto Django con Django REST Framework.

- [ ] Definir `Categoria` y `Producto`, con relación uno a muchos y campos de catálogo: nombre, descripción, precio, imagen, cantidad disponible y categoría.

- [ ] Crear serializadores, vistas, rutas REST y registro en el administrador para categorías y productos.

## Fuera del alcance de esta entrega

- [ ] No implementar carrito de compras, autenticación, pedidos ni pasarela de pagos en esta primera versión.

