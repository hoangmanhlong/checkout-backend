# Rule: Code Style Consistency and Design Discipline

## Purpose

Keep generated and modified code consistent with the existing codebase style and sound software design principles. Prevent unnecessary complexity and inconsistent patterns.

This rule applies to all AI agents working in this repository.

## Style Consistency

### Match Existing Patterns

- Follow the naming conventions, import ordering, and file structure already present in `src/`.
- If a pattern exists in the codebase (for example, using `constants` for config access), use the same pattern in new code. Do not introduce a different approach without a clear reason.
- If unsure of the convention, read two or three existing files in the same layer before writing new code.
- This project uses ES modules (`"type": "module"` in `package.json`). Always use `import`/`export` syntax, never `require()`.

### Import Order

Follow this order, consistent with `src/` files:
1. Third-party imports (`express`, `morgan`, `dotenv`, etc.)
2. Internal imports (`./config`, `./databases`, `./utils`)

### Naming

- Variables and functions: `camelCase`
- Classes: `PascalCase`
- Constants: `UPPER_SNAKE_CASE`
- Private helpers: prefix with `_`
- File names: `camelCase.js`

## DRY (Don't Repeat Yourself)

- Do not duplicate logic that already exists in `src/config/`, `src/databases/`, or `src/utils/`.
- If similar code appears more than twice, extract it into a shared helper only if it is used in more than one module.
- Do not create helpers for one-off operations.

## SOLID Principles (Applied to This Stack)

### Single Responsibility

- Route handlers in Express must be thin. Business logic belongs in a service layer.
- Database access belongs in repository classes, not in route handlers.
- The `BaseRepository` pattern under `src/databases/mysql/repositories/` must be followed for new repositories.

### Open/Closed

- Config behavior should be driven by environment variables loaded from `.env`, not by hardcoded logic changes.

### Dependency Inversion

- Route handlers depend on injected services or repositories, not on direct database calls.

## What Agents Must Not Do

- Do not refactor code that was not part of the request.
- Do not rename variables or restructure files without being asked.
- Do not add JSDoc comments or type annotations to code that was not touched.
- Do not introduce new abstractions for a single use case.
- Do not switch from ES module syntax (`import/export`) to CommonJS (`require`).

## Applies To

All files under `src/`.
