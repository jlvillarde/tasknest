
# TaskNest Project Plan (NestJS + PostgreSQL)

This plan covers Phases 1–4 of a Task Management application built with NestJS.

---

## Tech Stack
- NestJS (Backend API)
- PostgreSQL (Database)
- TypeORM (ORM)
- JWT Authentication
- React (Frontend, served separately during dev, bundled in prod)

---

## Project Structure

```
tasknest/
├── src/
│   ├── app.module.ts
│   ├── main.ts
│   ├── auth/
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   ├── auth.controller.ts
│   │   ├── jwt.strategy.ts
│   │   └── entities/user.entity.ts
│   ├── tasks/
│   │   ├── tasks.module.ts
│   │   ├── tasks.service.ts
│   │   ├── tasks.controller.ts
│   │   └── entities/task.entity.ts
│   ├── projects/
│   │   ├── projects.module.ts
│   │   ├── projects.service.ts
│   │   ├── projects.controller.ts
│   │   └── entities/project.entity.ts
│   ├── comments/
│   │   ├── comments.module.ts
│   │   ├── comments.service.ts
│   │   ├── comments.controller.ts
│   │   └── entities/comment.entity.ts
│   ├── common/
│   │   ├── decorators/
│   │   └── guards/
│   └── database/
│       └── database.module.ts
└── package.json
```

---

## Entities

### User
- id (uuid)
- username
- email
- password (hashed)
- role (admin, user)

### Project
- id (uuid)
- name
- description
- owner (User)
- members (Users[])
- createdAt
- updatedAt

### Task
- id (uuid)
- title
- description
- status (todo, in-progress, done)
- priority (low, medium, high)
- dueDate
- project (Project)
- assignee (User)
- createdAt
- updatedAt

### Comment
- id (uuid)
- content
- task (Task)
- author (User)
- createdAt

---

## API Routes

### Auth
- POST `/auth/register`
- POST `/auth/login`
- GET `/auth/profile`

### Users
- GET `/users` (admin only)
- GET `/users/:id`

### Projects
- POST `/projects`
- GET `/projects`
- GET `/projects/:id`
- PATCH `/projects/:id`
- DELETE `/projects/:id`
- POST `/projects/:id/members`

### Tasks
- POST `/tasks`
- GET `/tasks`
- GET `/tasks/:id`
- PATCH `/tasks/:id`
- DELETE `/tasks/:id`
- GET `/projects/:id/tasks`

### Comments
- POST `/tasks/:id/comments`
- GET `/tasks/:id/comments`

---

## Phases

### Phase 1 – Core CRUD
- Auth (register/login)
- Task CRUD (title, description, status, dueDate)
- User association

### Phase 2 – Organization
- Projects module
- Link tasks to projects
- Add priorities and categories

### Phase 3 – Collaboration
- Assign tasks to users
- Comments on tasks
- Project members

### Phase 4 – Productivity Features
- Deadlines & reminders (scheduling with cron/queues)
- Kanban board view (frontend)
- Calendar view (frontend)

---

## Next Steps
1. Initialize NestJS project with `nest new tasknest`.
2. Configure PostgreSQL & TypeORM in `app.module.ts`.
3. Implement **AuthModule** with JWT.
4. Create **TasksModule** (Phase 1).
5. Expand with **ProjectsModule**, **CommentsModule** (Phases 2 & 3).
6. Add productivity features (Phase 4).
7. Connect React frontend.

---
