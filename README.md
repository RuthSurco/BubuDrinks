# Bubu Drinks

**Bubu Drinks** es una aplicación web de catálogo para una cafetería virtual de bebidas, postres y snacks, inspirada en Bubu y el eslogan **“Un sorbo de felicidad”**.

Proyecto desarrollado como estructura inicial de comercio electrónico con **ReactJS + Vite** en el frontend y **Django + Django REST Framework** en el backend.

## Estructura del proyecto (Ej. 02)

La carpeta principal contiene los dos directorios solicitados:

```text
bubudrinks/
├── frontend/                     # Aplicación ReactJS + Vite
│   ├── public/                   # Recursos estáticos (logo, imágenes Bubu)
│   ├── src/
│   │   ├── components/           # Componentes reutilizables
│   │   │   └── ui/               # Componentes UI (shadcn/ui: Button, Badge)
│   │   ├── pages/                # Páginas/vistas (HomePage)
│   │   ├── services/             # Servicios HTTP (consumo de API)
│   │   ├── data/                 # Datos simulados/fallback del catálogo
│   │   ├── lib/                  # Utilidades (cn, compatibilidad)
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── components.json           # Configuración de shadcn/ui
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── tsconfig*.json
│   └── vite.config.ts
├── backend/                      # Aplicación Django + DRF
│   ├── catalogo/                 # App: modelos, serializers, views, urls, admin, seed
│   ├── config/                   # Configuración Django (settings, urls)
│   ├── manage.py
│   └── requirements.txt
└── README.md
```

## Tecnologías y preparación

- **Frontend:** ReactJS, Vite, TypeScript, Tailwind CSS.
- **shadcn/ui:** incorporado formalmente con `components.json`, alias `@/*`, utilitario `cn` (`clsx` + `tailwind-merge`) y componentes reutilizables en `src/components/ui/` (Button, Badge).
- **Backend:** Django, Django REST Framework, django-cors-headers, SQLite.
- **Organización frontend:** carpetas `components/`, `pages/` y `services/` (además de `data/` y `lib/`).

## Funcionalidades implementadas

- Catálogo de productos con nombre, descripción, precio, imagen, categoría y stock.
- Búsqueda y filtrado por categorías (`useState`, eventos) con actualización del listado.
- Componentes principales: `Header`, `ProductCard`, `ProductList`, `CategoryFilter` (más `Sidebar` y UI).
- Consumo de API REST con `fetch`, `useEffect` y `useState` desde `frontend/src/services/api.ts`.
- Endpoints backend: `/api/categorias/` y `/api/productos/`.
- Estados de carga, error y sin resultados.
- Detalle de producto, favoritos (localStorage), horarios, “Sobre Bubu” y configuración.
- Fallback local si no se define `VITE_API_URL`.

## Requisitos previos

- Node.js y npm
- Python 3.10+ y pip

## Ejecución del frontend

Desde `bubudrinks/frontend`:

```bash
npm install
npm run dev
```

- URL local: `http://localhost:3000`
- Con backend (PowerShell): `$env:VITE_API_URL="http://127.0.0.1:8000/api"; npm run dev`
- Con backend (CMD): `set VITE_API_URL=http://127.0.0.1:8000/api && npm run dev`

## Ejecución del backend

Desde `bubudrinks/backend`:

```powershell
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py cargar_catalogo   # opcional: datos de ejemplo
python manage.py createsuperuser   # opcional
python manage.py runserver
```

- Admin: `http://127.0.0.1:8000/admin/`
- API: `http://127.0.0.1:8000/api/categorias/`, `http://127.0.0.1:8000/api/productos/`

## Verificación

- Frontend: `npm run build` (en `frontend/`)
- Backend: `python manage.py check` (en `backend/`)

## Repositorio

- GitHub: *(agregar aquí el enlace del repositorio)*
