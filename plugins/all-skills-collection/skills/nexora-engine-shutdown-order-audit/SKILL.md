---
name: nexora-engine-shutdown-order-audit
description: "Ensures subsystems stop in dependency order and do not use resources after their owners shut down."
---

# nexora engine shutdown order audit

## Purpose

Use this workflow for NEXORA-scale engine work when engine shutdown and dependency ordering. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Build a dependency graph of subsystem initialization and teardown.
2. reverse dependencies where safe.
3. stop new requests before draining consumers.
4. cancel background jobs and await bounded completion.
5. flush required persistence before closing storage.
6. retire GPU resources before device teardown.
7. test repeated shutdown and partial initialization.
8. report forced timeouts.
9. verify callbacks cannot re-enter destroyed services.
10. document intentionally skipped optional cleanup.

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

Shutdown follows an explicit dependency order and reports incomplete work without use-after-free.

Do not close services while dependent tasks still access them. Bound waits and surface incomplete persistence honestly.

## Trigger examples

- **Positive:** A code change or incident directly involves engine shutdown and dependency ordering and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
