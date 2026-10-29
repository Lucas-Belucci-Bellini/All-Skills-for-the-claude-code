---
name: nexora-mesh-topology-validation
description: "Rejects malformed or non-manifold imported meshes before collision, rendering, or animation systems consume them."
---

# nexora mesh topology validation

## Purpose

Use this workflow for NEXORA-scale engine work when mesh import topology and geometry validation. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Validate index bounds and primitive counts.
2. detect non-finite vertices and degenerate triangles.
3. check winding and normal conventions.
4. classify non-manifold edges according to asset use.
5. validate skin weights and vertex attributes.
6. cap geometry size and nesting.
7. test malformed index buffers.
8. provide source-linked diagnostics.
9. define repair versus rejection policy.

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

Mesh data meets the invariants required by its downstream consumers before registration.

Do not silently repair topology when it changes collision or visual meaning. Check integer overflow before buffer allocation.

## Trigger examples

- **Positive:** A code change or incident directly involves mesh import topology and geometry validation and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
