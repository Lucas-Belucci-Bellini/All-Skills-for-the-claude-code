---
name: implementing-incremental-code-changes
description: "Implements a requested code change in small, reviewable slices with explicit scope and verification. Use when adding a feature, fixing a bug, or modifying an unfamiliar codebase where broad rewrites would increase risk."
---

# Implementing Incremental Code Changes

## Goal
Deliver the smallest coherent change that satisfies the request while preserving unrelated behavior.

## Workflow
1. **Establish the contract.** Restate the requested behavior, observable inputs and outputs, constraints, and explicit non-goals. Ask only for information that blocks safe implementation.
2. **Inspect before editing.** Read repository instructions, nearby implementation, callers, tests, and relevant configuration. Identify the actual source of truth rather than editing generated artifacts.
3. **Trace impact.** List the files and public contracts likely affected. Check compatibility, error handling, state changes, security boundaries, and migration needs.
4. **Choose a vertical slice.** Implement one end-to-end behavior at a time. Avoid unrelated cleanup, speculative abstractions, and broad formatting changes.
5. **Make the change.** Follow local conventions, reuse established abstractions, and keep interfaces explicit. Do not silently change public behavior or dependency versions.
6. **Verify proportionally.** Run the narrowest relevant test first, then broader checks if the change crosses module or runtime boundaries. Inspect the final diff for accidental edits.
7. **Report evidence.** Summarize changed behavior, files, checks actually run and their results, known gaps, and any follow-up needed.

## Deliverable
- A concise implementation summary.
- A list of changed files and behavior.
- Commands run with truthful pass/fail/not-run status.
- Remaining risks or assumptions.

## Acceptance criteria
- The change directly addresses the requested behavior.
- Unrelated files and interfaces remain untouched.
- Relevant checks cover the changed contract.
- No test, build, deployment, or runtime result is claimed unless observed.

## Failure modes and guardrails
- If repository state or instructions conflict, stop and explain the conflict before writing.
- If a test fails, preserve the failure evidence and diagnose before changing unrelated code.
- Do not replace failing tests with weaker assertions merely to get a green result.
- Do not commit secrets, generated output, or local artifacts unless the repository explicitly requires them.
- Do not deploy, publish, or merge without explicit authorization.
