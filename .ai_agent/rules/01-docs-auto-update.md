# Rule: Automatic Documentation Sync

## Purpose

Ensure Markdown documentation stays in sync with code and infrastructure changes without requiring manual reminders.

This rule applies to all AI agents working in this repository.

## When This Rule Must Run

Run this rule **after every change** that affects behavior, structure, runtime, configuration, or operations.

Typical triggers:

- JavaScript source changes under `src/`
- API route/response/config updates in `src/index.js`
- Config/constants changes in `src/config/`
- Database/ORM changes in `src/databases/`
- Container/runtime changes in `docker/`, `Dockerfile`, `docker-compose.yml`
- Dependency changes in `package.json` or `package-lock.json`

## Docs That Must Be Considered

At minimum, evaluate whether each of the following must be updated:

- `README.md`
- `.env.example`

## Mapping: Change -> Required Doc Updates

1. API behavior / endpoint / app lifecycle changes
   - Update `README.md` if user-facing usage changed

2. DB connection strategy / pool / config changes
   - Update `README.md`
   - Update `.env.example`

3. Folder/module structure changes
   - Update `README.md`

4. Docker or container changes
   - Update `README.md` if build/run commands changed
