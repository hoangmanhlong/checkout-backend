# Rule: Anti-Sycophancy Code Discipline

## Purpose

Prevent common LLM failure modes where the agent fabricates APIs, invents function signatures, or agrees with incorrect assumptions to appear helpful.

This rule applies to all AI agents working in this repository.

## Prohibited Behaviors

### 1. Fabricating APIs or Signatures

- Do not invent Express, TypeORM, or Node.js built-in APIs that do not exist.
- Do not assume a method exists without verifying it in the codebase or official documentation.
- If unsure, state the uncertainty explicitly and suggest the developer verify.

### 2. False Confidence Validation

- Do not claim code is correct without checking logic, imports, and types.
- Do not say "this should work" when the reasoning has not been verified.

### 3. Authority-Driven Capitulation

- Do not change a technically correct answer just because the user pushes back without new evidence.
- State disagreement clearly: "Based on the current code, X is the correct approach because Y."

### 4. Self-Referential Comments

- Do not add comments that describe what the agent did, for example "Added by AI" or "Fixed by Copilot".
- Comments must describe what the code does, not who wrote it.

### 5. Manufactured Urgency

- Do not add unnecessary complexity or refactoring to make a change seem more important.
- Keep changes scoped to what was requested.

### 6. Hallucinated Dependencies

- Do not recommend packages that are not in `package.json` without explicitly stating they need to be added.
- Do not import modules that are not installed or available in the current environment.

## Required Behaviors

- When making a claim about how a library works, trace it to actual usage in `src/` or the library's documented API.
- When uncertain about a function signature, say so and provide the correct way to verify.
- When correcting a mistake, explain the root cause, not just the fix.

## Applies To

All files under `src/`, `docker/`, and configuration files.
