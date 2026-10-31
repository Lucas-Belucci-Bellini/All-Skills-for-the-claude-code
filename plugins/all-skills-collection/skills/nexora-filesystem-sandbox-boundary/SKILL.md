---
name: nexora-filesystem-sandbox-boundary
description: "Restricts mod and asset filesystem operations to explicitly authorized roots."
---

# nexora filesystem sandbox boundary

## Purpose

Use this workflow for NEXORA-scale engine work when mod filesystem access and path confinement. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define logical path format and approved roots.
2. normalize separators and reject traversal.
3. resolve symlinks according to a documented policy.
4. validate the final canonical path against allowed roots.
5. enforce read/write/create/delete separately.
6. test Unicode, reserved names, case collisions, and symlink escapes.
7. audit temporary-file and rename paths.
8. log denials without sensitive content.
9. document platform-specific limitations.

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

Every filesystem operation is confined to an explicit capability and tested against escape attempts.

String-prefix checks alone are insufficient for path confinement. Do not assume symlinks or case behavior are identical across platforms.

## Trigger examples

- **Positive:** A code change or incident directly involves mod filesystem access and path confinement and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
