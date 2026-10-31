---
description: "Runs a bounded verification workflow for agent changes using reproducible tests and independent read-only reviews."
argument-hint: [changed files or task scope] [required test commands]
---

Verify this agent workflow or implementation scope:

$ARGUMENTS

## Workflow

1. Establish the exact scope from the user's request and the current diff. Read repository instructions and inspect relevant scripts before execution.
2. Delegate test design and execution to `agent-orchestration-workbench:orchestration-test-engineer`. Prefer deterministic local tests, fake adapters, synthetic inputs, and bounded commands. Do not run production side effects.
3. Collect exact commands and observed exit statuses. Distinguish tests that passed, failed, were skipped, could not run, or were inconclusive. If testing changes files, enumerate each changed file and why it was touched.
4. Delegate an independent read-only code review to `agent-orchestration-workbench:orchestration-runtime-reviewer`, using the actual diff and observed test evidence.
5. Delegate a read-only security pass to `agent-orchestration-workbench:agent-security-auditor` for trust-boundary, tool-permission, secret-handling, and side-effect risks.
6. Reconcile the three reports. Do not treat the absence of findings as proof of correctness, and do not claim a test passed from a skill description, log excerpt without an exit status, or reviewer assertion alone.
7. Return a release-readiness decision: ready for human review, blocked by required failures, or inconclusive due to missing evidence.

## Required output

- Scope and base/head identifiers when available.
- Check table with command, actual result, and evidence reference.
- Confirmed defects, missing tests, security findings, and unresolved questions.
- Files modified by test creation and why; no unrelated fixes.
- Remaining runtime, provider, compatibility, and license checks.

## Safety boundaries

- This command does not authorize deployment, publication, production-provider calls, credential changes, destructive remediation, branch merges, or repository visibility changes.
- Do not fix production code as part of verification unless the user explicitly expands the task; propose the narrowest correction instead.
- If a command is risky or has unclear side effects, inspect it and stop for approval rather than running it.
- Do not merge, publish, deploy, or change repository visibility without explicit user authorization.
