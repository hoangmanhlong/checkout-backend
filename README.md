# Getting Started with checkout backend

Checkout backend written in expressJS

## Usage

### Prerequisites

- Docker and Docker Compose installed
- Copy `.env.example` to `.env` and fill in values

```bash
cp .env.example .env
```

### Run with Docker Compose

All commands are run from the **project root**.

**Development**
```bash
APP_ENVIRONMENT=development docker compose --project-directory . -f docker/docker-compose.yml up --build
```

**Staging**
```bash
APP_ENVIRONMENT=staging docker compose --project-directory . -f docker/docker-compose.yml up --build
```

**Production**
```bash
APP_ENVIRONMENT=production docker compose --project-directory . -f docker/docker-compose.yml up --build -d
```

Or set `APP_ENVIRONMENT` in `.env` and run:
```bash
docker compose --project-directory . -f docker/docker-compose.yml up --build -d
```

### Useful commands

```bash
# View logs
docker compose --project-directory . -f docker/docker-compose.yml logs -f backend

# Stop all services
docker compose --project-directory . -f docker/docker-compose.yml down

# Stop and remove volumes
docker compose --project-directory . -f docker/docker-compose.yml down -v

# Rebuild without cache
docker compose --project-directory . -f docker/docker-compose.yml build --no-cache
```