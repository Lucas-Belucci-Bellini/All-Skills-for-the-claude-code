---
name: nexora-crash-report-redaction
description: "Produces actionable engine crash diagnostics while excluding secrets, private paths, and unnecessary user data."
---

# Nexora Crash Report Redaction

## Purpose

Use this workflow for NEXORA-scale engine work when crash diagnostics and privacy review. Treat current repository behavior as the source of truth and mark missing architecture or constraints as unknown rather than inventing them.

## Required inputs

- The relevant source files, owning crates/modules, and current change or incident.
- Acceptance criteria, supported platforms, compatibility constraints, and known resource limits.
- Existing tests, logs, fixtures, and a minimal reproduction when available.
- Explicit assumptions and unresolved questions; do not infer unverified NEXORA implementation details.

## Workflow

1. List diagnostic fields and their purpose.
2. classify secrets, identifiers, absolute paths, world names, chat, and mod-provided strings.
3. redact or transform sensitive fields before persistence or upload.
4. cap report size and bound nested payloads.
5. attach build ID, subsystem, crash phase, and sanitized stack context.
6. offer local-only retention and explicit consent for upload.
7. test with synthetic secret markers and hostile long strings..
8. undefined.
9. undefined.

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

Reports preserve debugging value while tests prove sensitive markers are absent and payload size is bounded.

Never upload by default without a documented consent model. Treat mod-generated text and filenames as untrusted input.

## Trigger examples

- "Audit crash diagnostics and privacy review in NEXORA before merging this change."
- "Create a regression test and recovery plan for this engine subsystem."
- "Review the current implementation without assuming missing infrastructure exists."
