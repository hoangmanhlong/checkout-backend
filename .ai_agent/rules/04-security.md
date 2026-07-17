# Rule: Security Baseline (Node.js + Express)

## Purpose

Prevent common security vulnerabilities in Node.js and Express code. Based on OWASP Top 10 and Express production hardening practices.

This rule applies to all AI agents working in this repository.

## Secrets and Credentials

- Never hardcode secrets, passwords, tokens, or API keys in source files.
- All secrets must come from environment variables loaded via `dotenv` in the app entry point.
- Do not log secrets, passwords, tokens, or database connection strings with credentials.
- Do not expose secrets through API response bodies or error messages.

## Environment Variables

- New environment variables must be added to `.env.example` with a safe placeholder value.
- Never commit `.env` to version control. Verify `.gitignore` includes `.env`.

## API Security

- Do not disable CORS globally without restriction in staging or production. Restrict `Access-Control-Allow-Origin` to known domains.
- Do not return stack traces or internal error details in API responses in production. Use a generic error message instead.
- Validate all request input before processing. Do not trust `req.body`, `req.params`, or `req.query` without validation.
- Set secure HTTP headers using the `helmet` package where appropriate.

## Database

- Do not construct SQL strings by string concatenation or template literals. Use TypeORM's ORM methods or parameterized queries.
- Do not expose database connection details (host, port, username) in API responses.
- When using raw queries, always use parameterized inputs via TypeORM's `query()` with bound parameters.

## Dependencies

- Do not add new packages without verifying they are actively maintained and have no known critical CVEs.
- Pin major versions in `package.json`.
- Do not install packages with `--ignore-scripts` disabled for untrusted packages.
- Run `npm ci` (not `npm install`) in Docker and CI to ensure reproducible installs from `package-lock.json`.

## Docker and Container

- Do not run the application as `root` inside the container in production. The production stage creates and uses `appuser`.
- Do not expose unnecessary ports in `docker-compose.yml`.
- Do not bind `0.0.0.0` for the database service in production configurations.

## Logging

- Do not log request bodies that may contain PII, passwords, or credentials.
- Do not log authorization headers or cookie values.
- Morgan request logging is acceptable for operational use in development only (already gated by `IS_DEVELOPMENT_ENVIRONMENT`).

## Applies To

All files under `src/`, `docker/`, `.env.example`, and `package.json`.
