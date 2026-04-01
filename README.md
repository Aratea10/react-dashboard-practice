# 🖥️ React Dashboard - Práctica Frontend

<div align="center">

[![React](https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://es.react.dev/)
[![TypeScript](https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/vite-9135FF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![React Router](https://img.shields.io/badge/reactrouter-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)](https://reactrouter.com/)
[![Node.js](https://img.shields.io/badge/nodedotjs-5FA04E?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/)


</div>

Este proyecto es una aplicación dashboard tipo SPA (Single Page Application) desarrollada como parte de la práctica de Fundamentos de React del Bootcamp de Desarrollo Web FullStack en [KeepCoding](https://www.keepcoding.io/). La aplicación permite a los usuarios gestionar un catálogo de productos mediante operaciones CRUD (crear, leer y eliminar), con sistema de autenticación y rutas protegidas.

El principal requisito técnico de la práctica es el uso de **React** con **TypeScript**, utilizando únicamente **React Router** como librería adicional, sin frameworks de formularios ni manejo de estado externo.

## ✨ Características Implementadas

### Funcionalidades Obligatorias

- ✅ **Autenticación de usuarios**: Los usuarios pueden hacer login usando credenciales existentes (name + password). El sistema utiliza **tokens JWT** para gestionar la sesión, con opción de "Recordar contraseña" usando localStorage.
  - **Nota sobre credenciales**: La documentación sobre la práctica menciona "email" en la sección de LoginPage, pero en el backend requiere "name" (nombre de usuario) según la descripción del endpoint `/api/auth/login`. Esta implementación usa `name` para ser compatible con el backend proporcionado.
- ✅ **Rutas protegidas**: Implementación de rutas públicas y protegidas con redirección automática a login para usuarios no autenticados.
- ✅ **Listado de Productos**: Muestra todos los productos existentes con información clave (venta/compra/todos).
- ✅ **Página de detalle del producto**: Muestra la información completa de un producto, incluyendo imagen (o placeholder), descripción y todos los campos.
- ✅ **Eliminación de productos**: Botón de eliminación con modal de confirmación implementado con estado de React (no window.confirm).
- ✅ **Creación de productos**: Formulario completo con todos los campos requeridos, validación en tiempo real que deshabilita el submit hasta cumplir todas las validaciones, y carga dinámica de tags disponibles desde la API.
- ✅ **Layout con navegación**: Componente Layout con enlaces de navegación y botón con confirmación mediante modal.
- ✅ **Página 404**: NotFoundPage para rutas no encontradas con enlace de retorno.

### Decisiones de Diseño

- ✅ **Confirmaciones con React**: Las confirmaciones de borrado y los logout se implementan con modales controlados por estado de React, reutilizando el patrón.
- ✅ **Validación de formularios nativa**: Validación de campos sin librerías externas, usando estado de React y lógica personalizada.
- ✅ **Gestión de tags dinámica**: Los tags disponibles se obtienen del endpoint `/api/tags` en lugar de estar hardcodeados.
- ✅ **Sin página de registro**: La documentación de la práctica solo requiere de LoginPage. Aunque el backend proporciona el endpoint `/api/auth/register`, como tenía la duda de si tenía que hacerlo o no, no implementé la opción ni la interfaz de registro en el frontend.

## 🚀 Instalación y Puesta en Marcha

Para ejecutar este proyecto, necesitas tener dos terminales abiertas, una para el backend y otra para el frontend.

### 1. Backend (Servidor de API)

El backend utiliza [sparrest.js](https://github.com/alce65/sparrest.js.git) (un wrapper de `json-server`) para simular una API REST.

```bash
# 1. Navega a la carpeta del backend
cd backend

# 2. Instala las dependencias
npm install

# 3. Inicia el servidor
npm start
```

El servidor del backend se ejecutará en `http://localhost:8000`.

### 2. Crear el Primer Usuario

**Importante**: Esta práctica NO incluye página de registro en el frontend. Para poder hacer login, primero debes crear un usuario.

Abre el archivo `backend/db.json` y añade un usuario en el array de `users`, por ejemplo:

```json
{
    "products": [],
    "tags": ["motor", "work", "lifestyle", "mobile", "motorcyle"],
    "users": [
        {
            "id": 1,
            "name": "sara",
            "password": "123456"
        }
    ]
}
```

> ⚠️ **Nota**: Las contraseñas en `db.json` se almacenan en texto plano ya que es un backend simulado para desarrollo.

Después de guardar el archivo, reinicia el backend si está en ejecución.

### 3. Frontend (Aplicación Web)

El frontend está construido con React, TypeScript y Vite como bundler.

```bash
# 1. (En una nueva terminal) Navega a la carpeta del frontend
cd frontend

# 2. Instala las dependencias
npm install

# 3. Inicia el servidor de desarrollo
npm run dev
```

La aplicación frontend estará disponible en `http://localhost:5173` (o en el puerto que indique Vite en la terminal).

### 4. Usar la Aplicación

Una vez que ambos servidores estén en ejecución:

1. Abre `http://localhost:5173` en tu navegador.
2. Verás el formulario de login.
3. Ingresa las credenciales del usuario que creaste.
   - **Nombre de usuario (name)**
   - **Contraseña**
4. Marca "Recordar contraseña" si quieres mantener la sesión.
5. ¡Listo! Ya puedes gestionar productos.

---

## 🛠️ Scripts Disponibles

### En la carpeta `backend/`:

- `npm start`: Inicia el servidor de la API REST con `sparrest.js`.

### En la carpeta `frontend/`:

- `npm run dev`: Inicia el servidor de desarrollo de Vite con Hot-Reload.
- `npm run build`: Genera una versión de producción optimizada.
- `npm run preview`: Sirve localmente la versión de producción.
- `npm run lint`: Ejecuta ESLint para verificar la calidad del código.

---

## 🔧 Tecnologías Utilizadas

- **React 19**: Librería principal para la interfaz de usuario.
- **TypeScript**: Superset de JavaScript con tipado estático.
- **Vite**: Build tool y dev server rápido.
- **React Router v7**: Enrutamiento del lado del cliente.
- **Context API**: Gestión de estado global para autenticación.
- **ESLint**: Linting y calidad de código.
- **sparrest.js**: Backend simulado con persistencia en JSON.

---

## 🤝 Contribución

Si quieres mejorar el proyecto:

1. Haz fork del repositorio.
2. Crea una rama: `git checkout -b feature/mi-mejora`.
3. Haz commits claros siguiendo Conventional Commits.
4. Haz push y abre un Pull Request describiendo los cambios.

---

## 📄 Licencia

Este proyecto se entrega con [**Licencia MIT**](https://github.com/Aratea10/react-dashboard-practice/blob/main/LICENSE).

---

## 👩‍💻 Autora

**Sara Gallego Méndez** — Estudiante del Bootcamp de Desarrollo Web FullStack en [KeepCoding](https://keepcoding.io/).
