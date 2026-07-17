# Agent Instructions

Before responding to any request in this repository, you MUST read and apply all rule files under `.ai_agent/rules/`.

## Rules (read all before acting)

- `.ai_agent/rules/01-docs-auto-update.md` — Keep docs in sync after every code change.
- `.ai_agent/rules/02-anti-sycophancy.md` — Do not fabricate APIs, invent signatures, or agree without evidence.
- `.ai_agent/rules/03-code-discipline.md` — Match existing code style. Apply DRY and SOLID. Do not refactor outside the request scope.
- `.ai_agent/rules/04-security.md` — Never hardcode secrets. Validate input. No raw SQL concatenation. Use non-root user in production containers.
- `.ai_agent/rules/05-nodejs-best-practices.md` — Use ES modules, async/await, Express conventions, and TypeORM patterns.

## Stack

- Node.js 20, Express 5, TypeORM 0.3, MySQL 8, Winston, Dotenv, Docker Compose.
- Source root: `src/`. Config/constants: `src/config/constants.js`. DB setup: `src/databases/index.js`. Logger: `src/config/logging.js`.

## Non-negotiable Behaviors

- Do not make changes outside the scope of the request.
- Do not add comments, JSDoc, or type annotations to code that was not modified.
- Do not delete or overwrite existing logic unless explicitly asked.
- Always use ES module syntax (`import`/`export`). Never use `require()`.
- Always include a doc-sync summary at the end of coding responses (see rule 01).
