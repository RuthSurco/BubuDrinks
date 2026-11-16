# Bubu Drinks

**Bubu Drinks** es una aplicación web de catálogo para una cafetería virtual de bebidas, postres y snacks, inspirada en Bubu (una panda tierna) y el eslogan **“Un sorbo de felicidad”**.

Proyecto desarrollado como estructura inicial de comercio electrónico con **ReactJS + Vite** en el frontend y **Django + Django REST Framework** en el backend.

## Funcionalidades implementadas

- Catálogo de productos con nombre, descripción, precio, imagen, categoría y stock disponible.
- Búsqueda de productos por nombre.
- Filtrado por categorías con `CategoryFilter` (uso de `useState` y eventos).
- Componentes reutilizables: `Header`, `ProductCard`, `ProductList`, `CategoryFilter`, `Sidebar` y componentes UI (`Button`, `Badge`).
- Consumo de API REST con `fetch`, `useEffect` y `useState` desde `src/services/api.ts`.
- Estados de carga, error y sin resultados.
- Vista de detalle de producto (modal).
- Secciones personalizadas: **Favoritos** (guardados en `localStorage`), **Horarios**, **Sobre Bubu** y **Configuración**.
- Integración frontend-backend mediante endpoints REST (`/api/categorias/`, `/api/productos/`), con fallback local si no se define `VITE_API_URL`.

## Tecnologías

- **Frontend:** React, Vite, TypeScript, Tailwind CSS, componentes UI reutilizables.
- **Backend:** Django, Django REST Framework, django-cors-headers, SQLite.
- **Comunicación:** API REST (JSON) entre frontend y backend.

## Estructura del proyecto

```text
bubudrinks/
├── backend/
│   ├── catalogo/                 # App Django: modelos, serializers, views, urls, admin, seed
│   ├── config/                   # Configuración Django (settings, urls)
│   ├── manage.py
│   └── requirements.txt
├── public/                       # Recursos estáticos (logo, imágenes de Bubu)
├── src/
│   ├── components/               # Componentes reutilizables (Header, ProductCard, etc.)
│   │   └── ui/                   # Primitivas UI (Button, Badge)
│   ├── data/                     # Datos simulados/fallback del catálogo
│   ├── pages/                    # Páginas/vistas (HomePage)
│   ├── services/                 # Servicios HTTP (consumo de API)
│   ├── lib/                      # Utilidades y compatibilidad
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

> Nota: en esta versión el frontend se encuentra en la raíz del proyecto y el backend en `backend/`. Ambos se ejecutan de forma independiente.

## Requisitos previos

- Node.js y npm
- Python 3.10+ (recomendado)
- pip

## Ejecución del frontend

Desde la raíz del proyecto (`bubudrinks`):

```bash
npm install
npm run dev
```

- URL local: `http://localhost:3000`
- Sin `VITE_API_URL`, el frontend usa datos simulados de `src/data/products.ts`.

### Conectar con el backend (API real)

En PowerShell:

```powershell
$env:VITE_API_URL="http://127.0.0.1:8000/api"; npm run dev
```

En CMD:

```cmd
set VITE_API_URL=http://127.0.0.1:8000/api && npm run dev
```

## Ejecución del backend (Django)

Desde `bubudrinks/backend`:

```powershell
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py cargar_catalogo   # carga categorías y productos de ejemplo
python manage.py createsuperuser   # opcional, para acceder al admin
python manage.py runserver
```

- API categorías: `http://127.0.0.1:8000/api/categorias/`
- API productos: `http://127.0.0.1:8000/api/productos/`
- Admin: `http://127.0.0.1:8000/admin/`

## Verificación rápida

- Frontend build: `npm run build`
- Backend check: `python manage.py check` (desde `backend/`)

## Repositorio

- GitHub: *(agregar aquí el enlace del repositorio)*
