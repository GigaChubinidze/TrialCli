# TriaCli — Clinical Trial Data Dashboard

Full-stack application for visualizing and managing clinical trial participants and metrics.

## Quick start

```bash
cp .env.example .env
docker compose up --build
```

| Service    | URL                   |
| ---------- | --------------------- |
| Web        | http://localhost:5173 |
| API        | http://localhost:8000 |
| PostgreSQL | localhost:5432        |

API docs: http://localhost:8000/docs

## Project structure

```
TriaCli/
├── backend/
├── frontend/
├── docker-compose.yml
└── README.md
```

## Stack

- React + TypeScript + Vite
- FastAPI + SQLAlchemy
- PostgreSQL
- JWT authentication
- Docker Compose
