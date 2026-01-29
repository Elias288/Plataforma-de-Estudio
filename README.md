# Cursos PuntoCom

Aplicación full stack de gestión de cursos, profesores, alumnos y tareas entregables.

Se pretende desarrollar una plataforma de estudio, calificación y entrega de tareas para alumnos y profesores del instituto, donde cada profesor pueda cargar alumnos a sus cursos, y ver el progreso de cada uno, calificarlo y generar un reporte.

Cada tipo de usuario podrá loguearse y tener diferentes accesos a la plataforma dependiendo de su rol (Administrador, Profesor, Alumno).

## Tecnologías

- Backend:
  - NodeJs
  - Express
    - postgresql
- Frontend:
  - Reactjs

## Características

Este proyecto va a contar con las siguientes funcionalidades:

- Roles de usuarios (admin, profesor, alumno)
  - Admin: acceso de desarrollo, creación de "cursos"
  - Profesor: creación de alumnos, creación de tareas, acceso a información de alumnos, calificar alumno de curso.
  - Alumno: ver información de curso, listar tareas del curso, entregar tarea (link github, descripción)
- Creación y login de usuario. (Admin -> Profesor -> Alumno)
- CRUD de curso: (nombre, descripción, lista de alumnos, profesor) (rol: Profesor+)
- CRUD de tareas de curso (rol: Profesor+)
- Entrega de tareas (rol: Alumno+)

## Comenzando

### Prerrequisitos

Antes de comenzar es necesario contar con:

- `podman` instalado
- Configurar el archivo `env`; para esto se dejó el archivo [.env.template](./backend/.env.template)

### Ambiente de desarrollo

Para ejecutar el backend de manera local y teniendo los [prerrequisitos](#prerrequisitos) configurados pasaremos a ejecutar el siguiente comando que iniciará la base de datos

```sh
# ./backend/container-compose

podman-compose up -d database
```

y para cargar los datos de prueba

```sh
pnpm prisma generate
```

### Ejecución del backend

Teniendo la base de datos corriendo comenzaremos con la instalación de las dependencias

```sh
# Instalar dependencias
pnpm install
# o
npm install

# Inicializar backend
pnpm run dev
# o
npm run dev
```
