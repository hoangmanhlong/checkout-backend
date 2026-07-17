# Rule: Node.js Best Practices

## Purpose

Ensure JavaScript code written in this repository follows modern, idiomatic Node.js conventions compatible with Node.js 20+ and the project's existing stack.

This rule applies to all AI agents working in this repository.

## Module System

- This project uses ES modules. Always use `import`/`export`. Never use `require()` or `module.exports`.
- Use named exports for utilities and repositories. Use default exports for singleton instances (e.g., `database`, `app`).
- Always include the `.js` extension in local import paths: `import foo from './foo.js'`.

## Async / Await

- All I/O operations (DB queries, HTTP calls, file reads) must use `async`/`await`.
- Do not use callback-style APIs unless wrapping them in a Promise.
- Never use `async` functions without `try/catch` or a caller that handles rejections.
- Do not use `Promise.all()` for sequential operations. Use it only for truly parallel operations.

## Error Handling

- Catch specific errors, not bare `catch (e)` with no handling.
- Use `logger.error()` with the error object, not `console.log(e)` or `console.error(e)`.
- In Express route handlers, always call `next(err)` to propagate errors to the error middleware.
- Define a global Express error handler middleware with 4 arguments: `(err, req, res, next)`.

## Express Patterns

- Keep route handlers thin — delegate business logic to service functions.
- Always send a response or call `next()` in every route handler branch. Never leave a request hanging.
- Use `express.json()` middleware for parsing JSON bodies (already in `src/index.js`).
- Use `express.Router()` to group related routes into separate files, not one monolithic file.

## TypeORM Patterns

- Use entity classes to define models. Do not manipulate DB schema via raw SQL unless migrating.
- Use `BaseRepository` in `src/databases/mysql/repositories/BaseRepository.js` as the parent class for new repositories.
- Always close or return connections to the pool. Do not hold open connections unnecessarily.

## Configuration

- Access all config values through `src/config/constants.js`. Do not call `process.env` directly outside of config files.
- Validate required environment variables at startup (already done in `src/index.js`). Add new required vars to the validation check.

## Logging

- Use the `logger` instance from `src/config/index.js`. Do not use `console.log` in production code.
- Log at the appropriate level: `logger.info` for lifecycle events, `logger.warn` for recoverable issues, `logger.error` for failures.

## Code Structure

- Source code lives under `src/`.
- Config and constants: `src/config/`
- Database setup and repositories: `src/databases/`
- Shared utilities: `src/utils/`
- Entry point: `src/index.js`
- Do not add business logic to the entry point. Keep it for app bootstrap only.

## Testing

- Tests live under `src/test/` (when implemented).
- Use a test runner compatible with ES modules (e.g., `node --test` or `vitest`).
- Mock external I/O (DB, HTTP) in unit tests.

## Applies To

All files under `src/`.
