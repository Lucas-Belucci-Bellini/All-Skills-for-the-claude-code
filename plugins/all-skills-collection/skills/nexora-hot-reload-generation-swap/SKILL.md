---
name: nexora-hot-reload-generation-swap
description: "Makes asset hot reload atomic so frames cannot mix old and new resource generations."
---

# nexora hot reload generation swap

## Purpose

Use this workflow for NEXORA-scale engine work when asset hot reload and resource generation swaps. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Build candidate assets off the active path.
2. validate dependencies and GPU resource creation.
3. assign generation IDs.
4. switch references at a defined frame or tick boundary.
5. retain old resources until CPU and GPU consumers release them.
6. rollback on failed import or upload.
7. test repeated reload and deletion.
8. measure reload stalls and memory peaks.
9. expose the active generation in diagnostics.

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

Consumers observe a complete valid asset generation and failed reloads preserve the previous working asset.

Do not destroy old GPU resources before in-flight work completes. Avoid exposing partially loaded dependency graphs.

## Trigger examples

- **Positive:** A code change or incident directly involves asset hot reload and resource generation swaps and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
