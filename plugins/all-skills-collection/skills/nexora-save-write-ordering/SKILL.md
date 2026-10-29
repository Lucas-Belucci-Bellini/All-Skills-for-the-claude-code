---
name: nexora-save-write-ordering
description: "Defines safe ordering for snapshot creation, durable writes, and save metadata updates."
---

# nexora save write ordering

## Purpose

Use this workflow for NEXORA-scale engine work when save durability and crash consistency. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Map the authoritative snapshot boundary.
2. serialize a consistent versioned snapshot.
3. write payload to a temporary file on the same volume where possible.
4. flush according to the platform durability contract.
5. verify length and checksum.
6. atomically publish the new payload.
7. update manifests only after payload success.
8. test crashes at every write phase.
9. keep a recoverable previous generation.
10. document durability guarantees per platform.

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

After interruption, loading chooses a complete validated generation rather than a partially written save.

Do not update the manifest before the payload is durable. State clearly when the OS/filesystem cannot guarantee the requested durability.

## Trigger examples

- **Positive:** A code change or incident directly involves save durability and crash consistency and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
