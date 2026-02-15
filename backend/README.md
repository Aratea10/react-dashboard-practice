# Sparrest.js

Un fork de [json-server](https://github.com/typicode/json-server) para disfrutar desarrollando aplicaciones frontend sin un backend real, pero con autenticación JWT.

## Configuración

1. Crea un archivo `db.json` con las entidades de tu base de datos.
2. Ejecuta el servidor con `npm start`.
3. Registra un usuario con `POST /auth/register { username: "luke", password: "skywalker" }`.
4. Inicia sesión para obtener tu token JWT: `POST /auth/login { username: "luke", password: "skywalker" }`.
5. Comienza a usar las rutas de json-server en `/api/<json-server routes>`. Necesitarás autenticar cada petición añadiendo una cabecera HTTP: `Authorization: Bearer <JWT token>`.

## Subir archivos

Puedes subir archivos haciendo una petición POST multipart con un campo file (con el contenido del archivo) a `/upload`.
