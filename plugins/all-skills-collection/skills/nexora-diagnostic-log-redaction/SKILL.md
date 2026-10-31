---
name: nexora-diagnostic-log-redaction
description: "Redacts credentials, private paths, and sensitive gameplay data from logs while preserving debugging context."
---

# nexora diagnostic log redaction

## Purpose

Use this workflow for NEXORA-scale engine work when engine logging and sensitive-data review. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define sensitive field categories and logging boundaries.
2. centralize structured redaction before output sinks.
3. sanitize mod-provided strings and control characters.
4. bound message length and nesting.
5. preserve stable error codes and subsystem context.
6. test synthetic secret markers and path variants.
7. review crash and debug logs as separate sinks.
8. document retention and export behavior.
9. verify redaction happens before persistence or upload.

## Validation checklist

- [ ] The invariant and measurable acceptance criteria are explicit.
- [ ] Ownership, lifecycle, and failure handling are documented.
- [ ] Tests cover normal, boundary, repeated, and failure cases.
- [ ] Changes preserve source/plugin byte parity and catalog uniqueness.
- [ ] Focused tests, formatting, and applicable static checks pass; skipped checks are listed.
- [ ] Performance and reliability claims include reproducible evidence.

## Required output

Provide the decision and scope, invariants, code paths reviewed or changed, tests and results, compatibility implications, and unresolved risks.

## Boundaries and failure handling

Automated tests demonstrate sensitive markers never reach configured log outputs.

Do not rely on developers remembering to redact manually. Avoid logging raw tokens, chat, or save contents.

## Trigger examples

- **Positive:** A code change or incident directly involves engine logging and sensitive-data review and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
