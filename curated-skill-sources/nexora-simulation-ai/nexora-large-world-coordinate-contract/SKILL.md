---
name: nexora-large-world-coordinate-contract
description: "Defines coordinate conversions for enormous voxel worlds without overflow, precision loss, or inconsistent chunk mapping."
---

# nexora large world coordinate contract

## Purpose

Use this workflow for NEXORA-scale engine work when large-world coordinates and voxel/chunk conversions. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Choose canonical integer world coordinates and documented local precision.
2. define floor division for negative coordinates.
3. use checked arithmetic for chunk origins and region indexing.
4. separate camera-relative rendering coordinates from persistent identity.
5. specify maximum supported coordinate and rejection behavior.
6. test negative boundaries and integer limits.
7. verify round-trip and adjacency invariants.
8. audit serialization and network widths.
9. document physics/rendering precision limits at distance.

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

Coordinate transforms remain consistent at negative and extreme boundaries and reject unsupported values explicitly.

Do not use floating-point coordinates as persistent voxel identity. Avoid unchecked multiplication for region offsets.

## Trigger examples

- **Positive:** A code change or incident directly involves large-world coordinates and voxel/chunk conversions and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
