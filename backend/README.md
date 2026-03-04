# Backend

Backend de la Plataforma de Estudio

- [api.http](./api.http)
- [course.http](./src/modules/courses/course.http)

## Funcionalidades

### Auth

| Descripción | Método | URL | Contenido | Roles |
| --- | --- | --- | --- | --- |
| Registrar Usuario | `POST` | `auth/register` | [registerSchema](./src/modules/auth/auth.dto.ts) | Admin |
| Iniciar Sesión | `POST` | `auth/login` | [loginSchema](./src/modules/auth/auth.dto.ts) | todos |
| Obtener información | `GET` | `auth/userInfo` | - | todos |
| Actualizar información | `PATCH` | `auth/update/:userId` | [updateUserSchema](./src/modules/auth/auth.dto.ts) | - todos <br> - Admin: puede cambiar roles |

### Courses

| Descripción | Método | URL | Contenido | Roles |
| --- | --- | --- | --- | --- |
| Listar Cursos | `GET` | `/courses` | - | - Admin: todos <br> - Profesor: los creados <br> - Alumnos: los asignados |
| Información de Curso | `GET` | `/courses/:courseId` | - | todos |
| Crear curso | `POST` | `/courses` | [createCourseSchema](./src/modules/courses/course.dto.ts) | - Admin: puede asignar profesor <br> - Profesor: se crea con su id |
| Agregar alumnos | `PUT` | `/courses/:courseId/addStudents` | [addStudentSchema](./src/modules/courses/course.dto.ts) | - Admin: puede agregar a cualquier curso <br> - Profesor: solo puede agregar a sus cursos |
| Quitar alumnos | `PUT` | `/courses/:courseId/removeStudents` | [addStudentSchema](./src/modules/courses/course.dto.ts) | - Admin: puede quitar de cualquier curso  <br> - Profesor: solo puede quitar de sus cursos |

### Tasks

| Descripción | Método | URL | Contenido | Roles |
| --- | --- | --- | --- | --- |
| Listar tareas | `GET` | `/courses/:courseId/tasks` | - | - Admin: todos <br> - Profesor: los creados en sus cursos <br> - Alumnos: los asignados
| Crear tarea | `POST` | `/courses/:courseId/tasks` | [CreateTaskDto](./src/modules/tasks/task.dto.ts) | - Admin: puede agregar a cualquier curso <br> - Profesor: solo puede agregar a sus cursos

### Submissions

| Descripción | Método | URL | Contenido | Roles |
| --- | --- | --- | --- | --- |
| Listar entregas | `GET` | `/courses/:courseId/tasks/:taskId/submissions` | - | Profesor |
| Crear entrega | `POST` | `/courses/:courseId/tasks/:taskId/submissions` | [createSubmissionSchema](./src/modules/sumissions/submission.dto.ts) | Alumno |
| Corregir entrega | `PATCH` | `/courses/:courseId/tasks/:taskId/submissions/:submissionId/grade` | [submitGradeSchema](./src/modules/sumissions/submission.dto.ts) | Profesor |

## Comenzando

### Prerrequisitos

Antes de comenzar es necesario contar con:

- `pnpm` o `npm` instalado
- `podman` instalado

- Configurar el archivo `env`; para esto se dejó el archivo [.env.template](.env.template)
  - Tener en cuenta las credenciales de la conexión a la bd

    ```env
    postgresql://postgres:<CONTRASEÑA>@localhost<PORT>/institute`)
    ```

  - Para la variable `JWT_SECRET` se recomienda usar el resultado del comando

    ```sh
    openssl rand -base64 64
    ```

### Ambiente de desarrollo

Para ejecutar el backend de manera local y teniendo los [prerrequisitos](#prerrequisitos) configurados pasaremos a ejecutar el siguiente comandos

Instalar dependencias del proyecto

```sh
# Instalar dependencias
pnpm install
# o
npm install
```

Iniciar la base de datos

```sh
# container-compose.yaml
podman-compose up -d db
```

Inicializar servicio de `prisma`

```sh
pnpm prisma migrate dev --name init
```

Cargar los datos de prueba

```sh
pnpm run seed
# o 
npm run seed
```

### Ejecución del backend

Teniendo la base de datos corriendo comenzaremos con la instalación de las dependencias

```sh
# Inicializar backend
pnpm run dev
# o
npm run dev
```
