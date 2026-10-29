---
name: nexora-clean-room-build-verification
description: "Verifies that the project builds and packages from a clean checkout without relying on local generated state."
---

# nexora clean room build verification

## Purpose

Use this workflow for NEXORA-scale engine work when clean checkout and reproducible build verification. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Create an isolated checkout at the candidate revision.
2. install the declared toolchain.
3. avoid user-specific caches where feasible.
4. run code generation and validation steps from documented commands.
5. build the target artifact.
6. run critical smoke tests.
7. compare output metadata with the release manifest.
8. record missing external prerequisites.
9. verify no secrets or local paths are embedded.
10. archive logs and artifact hashes.

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

A clean environment can reproduce the declared build path or identify undocumented prerequisites.

Do not claim a clean build if it reused untracked local outputs. Record network dependencies and unavailable services honestly.

## Trigger examples

- **Positive:** A code change or incident directly involves clean checkout and reproducible build verification and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
