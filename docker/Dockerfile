# syntax=docker/dockerfile:1.4

# ==========================================
# Stage 1: Builder — install dependencies
# ==========================================
FROM node:20-slim AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci


# ==========================================
# Stage 2: Base runner — shared across envs
# ==========================================
FROM node:20-slim AS base

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY . .

EXPOSE 3000


FROM base AS development
ENV NODE_ENV=development
CMD ["npm", "run", "dev"]

FROM base AS staging
ENV NODE_ENV=staging
CMD ["npm", "run", "stag"]

FROM base AS test
ENV NODE_ENV=test
CMD ["npm", "test"]

# PRODUCTION: run as non-root user for security
FROM base AS production
ENV NODE_ENV=production
RUN useradd --create-home --no-log-init appuser \
    && chown -R appuser:appuser /app
USER appuser
CMD ["npm", "run", "prod"]