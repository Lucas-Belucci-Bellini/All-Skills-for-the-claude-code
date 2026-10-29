---
name: nexora-content-registry-atomic-publication
description: "Publishes a content registry only after all required assets and cross-references validate."
---

# nexora content registry atomic publication

## Purpose

Use this workflow for NEXORA-scale engine work when runtime content registry and asset registration. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Load declarations into an isolated candidate registry.
2. validate unique IDs and references.
3. resolve dependency ordering.
4. check resource budgets and required asset availability.
5. build derived lookup tables.
6. publish an immutable snapshot at a defined boundary.
7. keep the previous snapshot on failure.
8. test concurrent readers and failed reloads.
9. report registry generation and validation summary.

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

Readers observe a complete registry generation and invalid candidates never partially replace live content.

Do not mutate shared registries record-by-record during loading. Keep external side effects out of the validation phase.

## Trigger examples

- **Positive:** A code change or incident directly involves runtime content registry and asset registration and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
