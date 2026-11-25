# Bubu Drinks

Tienda en línea de una cafetería de Arequipa (bebidas, postres y snacks).
El proyecto está separado en un frontend en React y un backend en Django, con una
base de datos SQLite.

## Funcionalidades

- Catálogo de productos con imagen, precio y disponibilidad.
- Búsqueda por nombre o descripción y filtro por categoría.
- Promociones con porcentaje de descuento y precio final.
- Recomendaciones de productos destacados o de la misma categoría.
- Gestión de inventario (stock) desde la aplicación y desde el panel de administración.
- Diseño adaptable a celular y computadora.

## Estructura del proyecto

- `frontend/`: React, Vite, TypeScript y Tailwind CSS.
- `backend/`: Django y Django REST Framework (aplicación `catalogo`).

## Requisitos

- Node.js 18 o superior
- Python 3.12 o superior

## Cómo ejecutar el backend

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py cargar_catalogo
python manage.py runserver
```

La API queda en `http://127.0.0.1:8000` y el panel de administración en
`http://127.0.0.1:8000/admin/`.

El comando `cargar_catalogo` registra las categorías y los productos de ejemplo.
Si se necesita un usuario para el panel, se crea con `python manage.py createsuperuser`.

## Cómo ejecutar el frontend

```powershell
cd frontend
npm install
npm run dev
```

La página se abre en `http://localhost:3000`.

Para que el frontend use los datos del backend, se indica la URL antes de iniciar:

```powershell
$env:VITE_API_URL="http://127.0.0.1:8000/api"
npm run dev
```

Si no se define `VITE_API_URL`, la página funciona con los datos de ejemplo que están
incluidos en el frontend.

## Endpoints principales

- `GET /api/categorias/`
- `GET /api/productos/`
- `PATCH /api/productos/{id}/inventario/` actualiza la cantidad disponible.
- `GET /api/area-privada/` zona privada, requiere token.

## Validación de tokens

La zona privada de la API solo responde si se envía un token. Para generarlo:

```powershell
python manage.py drf_create_token Ruth
```

En Postman se elige **Authorization → Auth Type: Token** y se pega el token que imprimió el comando. Sin token la respuesta es `401` y con token es `200` con los datos del usuario.

## Autor

Ruth Surco
Laboratorio 14
