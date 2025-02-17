# Challenge Mercado Libre

Este es un proyecto full stack de un e-commerce, desarrollado con un backend en **Node.js con Express** y un frontend en **React con Vite y Redux Toolkit**. El backend proporciona una API que consume datos de Mercado Libre, mientras que el frontend muestra los resultados de búsqueda y los detalles de los productos.

## Tecnologías utilizadas

### Backend

- Node.js
- Express
- TypeScript
- Jest para testing
- Axios para llamadas HTTP

### Frontend

- React
- Vite
- Redux Toolkit
- React Router DOM
- TailwindCSS
- Styled Components
- i18next para internacionalización
- Vitest y Testing Library para tests

---

## 🛠️ Instalación y configuración

### 1️⃣ Clonar el repositorio

```sh
git clone https://github.com/tu-usuario/tu-repositorio.git
cd ecommerce
```

### 2️⃣ Configurar el backend

####  Instalar dependencias

```sh
cd backend
yarn
```

####  Configurar variables de entorno

Crear un archivo `.env` en la carpeta `backend` con las siguientes variables:

```env
PORT=5000
```

####  Ejecutar el backend en modo desarrollo

```sh
yarn dev
```

El backend se ejecutará en `http://localhost:5000`.

####  Construir y ejecutar el backend en producción

```sh
yarn build
yarn start
```

####  Ejecutar tests en el backend

```sh
yarn test
```

---

### 3️⃣ Configurar el frontend

####  Instalar dependencias

```sh
cd ../frontend
yarn
```

####  Configurar variables de entorno

Crear un archivo `.env` en la carpeta `frontend` con las siguientes variables:

```env
VITE_API_URL=http://localhost:5000
```

####  Ejecutar el frontend en modo desarrollo

```sh
yarn dev
```

El frontend se ejecutará en `http://localhost:5173` por defecto.

####  Construir el frontend para producción

```sh
yarn build
```

####  Ejecutar tests en el frontend

```sh
yarn test
```

---

##  Estructura del Proyecto

```
 ecommerce
 ┣  backend
 ┃ ┣  src
 ┃ ┃ ┣  controllers
 ┃ ┃ ┣  infrastructure
 ┃ ┃ ┣  services
 ┃ ┃ ┣  tests
 ┃ ┃ ┣  index.ts
 ┃ ┃ ┗  app.ts
 ┃ ┣  package.json
 ┃ ┣  tsconfig.json
 ┃ ┣  jest.config.js
 ┃ ┗  .env
 ┣  frontend
 ┃ ┣  src
 ┃ ┃ ┣  components
 ┃ ┃ ┣  hooks
 ┃ ┃ ┣  pages
 ┃ ┃ ┣  store
 ┃ ┃ ┣  styles
 ┃ ┃ ┣  tests
 ┃ ┃ ┣  main.tsx
 ┃ ┃ ┗  App.tsx
 ┃ ┣  package.json
 ┃ ┣  tsconfig.json
 ┃ ┣  vite.config.ts
 ┃ ┗  .env
 ┣  README.md
 ┗  .gitignore
```

---

##  Endpoints de la API

### Búsqueda de productos

```
GET /api/items?q=:query
```

**Ejemplo:** `GET http://localhost:5000/api/items?q=iphone`

### Detalle de producto

```
GET /api/items/:id
```

**Ejemplo:** `GET http://localhost:5000/api/items/MLA12345`

---

