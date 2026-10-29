---
name: nexora-config-transactional-reload
description: "Applies live configuration changes atomically while preserving a valid runtime configuration when parsing or validation fails."
---

# nexora config transactional reload

## Purpose

Use this workflow for NEXORA-scale engine work when runtime config reload and hot settings. Treat current repository behavior as the source of truth and mark missing architecture or constraints as unknown rather than inventing them.

## Required inputs

- The relevant source files, owning crates/modules, and current change or incident.
- Acceptance criteria, supported platforms, compatibility constraints, and known resource limits.
- Existing tests, logs, fixtures, and a minimal reproduction when available.
- Explicit assumptions and unresolved questions; do not infer unverified NEXORA implementation details.

## Workflow

1. Separate parse, schema validation, semantic validation, preparation, and commit.
2. construct a candidate immutable config snapshot.
3. validate cross-field constraints and resource budgets.
4. prepare dependent resources before switching active state.
5. publish the new snapshot atomically or through a single owner.
6. keep the previous snapshot if any stage fails.
7. classify settings requiring restart.
8. test malformed files, concurrent readers, and rollback.
9. Document a safe rollback or fallback path..

## Validation checklist

- [ ] The change is tied to a measurable requirement or a reproducible failure.
- [ ] Ownership, lifecycle, compatibility, and failure behavior are documented.
- [ ] Tests cover normal, boundary, repeated, and failure-path behavior.
- [ ] No hidden assumptions about unverified NEXORA subsystems remain.
- [ ] Focused tests, formatting, and applicable lint/static checks were run; skipped checks are listed.
- [ ] Performance or reliability claims include reproducible evidence where relevant.

## Required output

- A concise decision and scope statement.
- The invariants and implementation plan or reviewed diff.
- Tests run, results, and reproducible evidence.
- Risks, compatibility implications, and unresolved follow-up items.

## Boundaries and failure handling

Reload is all-or-nothing, errors identify the field/path, and active state remains usable after rejection.

Do not mutate live config field-by-field. Never log secrets; redact credential-bearing values from validation errors.

## Trigger examples

- "Audit runtime config reload and hot settings in NEXORA before merging this change."
- "Create a regression test and recovery plan for this engine subsystem."
- "Review the current implementation without assuming missing infrastructure exists."
