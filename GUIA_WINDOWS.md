# Guía rápida para ejecutar Bubu Drinks en Windows

## 1. Instalar los programas necesarios

Instala Node.js LTS desde https://nodejs.org/ y Python desde https://www.python.org/downloads/. Durante la instalación de Python activa la opción **Add Python to PATH**.

Después abre PowerShell y ejecuta:

```powershell
npm install -g pnpm
```

## 2. Ejecutar el frontend

Descomprime `bubudrinks.zip`. Luego abre PowerShell dentro de la carpeta del proyecto:

```powershell
cd ruta\bubudrinks
pnpm install
pnpm dev
```

Abre en el navegador:

```text
http://localhost:3000
```

La primera versión funciona con los datos simulados incluidos y muestra los 31 productos sin necesidad de iniciar Django.

## 3. Ejecutar el backend Django

Abre una segunda ventana de PowerShell:

```powershell
cd ruta\bubudrinks\backend
py -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
py manage.py migrate
py manage.py createsuperuser
py manage.py runserver
```

El backend estará disponible en:

```text
http://127.0.0.1:8000
```

La administración de Django estará en:

```text
http://127.0.0.1:8000/admin
```

Los endpoints son:

```text
http://127.0.0.1:8000/api/categorias/
http://127.0.0.1:8000/api/productos/
```

## 4. Conectar React con Django

Primero registra categorías y productos desde el administrador de Django. Luego detén el frontend con `Ctrl + C` y vuelve a iniciarlo desde la carpeta principal usando:

```powershell
cd ruta\bubudrinks
$env:VITE_API_URL="http://127.0.0.1:8000/api"
pnpm dev
```

Así React consultará los productos y categorías desde Django REST Framework.

## Importante

No abras `index.html` directamente haciendo doble clic, porque React necesita ejecutarse mediante Vite. Tampoco borres `package.json` ni `pnpm-lock.yaml`, ya que contienen las dependencias del proyecto.
