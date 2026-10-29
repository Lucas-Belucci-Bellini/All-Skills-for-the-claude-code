---
name: nexora-skeleton-skin-weight-normalization
description: "Validates and normalizes skeletal skin weights without changing intended deformation unexpectedly."
---

# nexora skeleton skin weight normalization

## Purpose

Use this workflow for NEXORA-scale engine work when skeletal skinning import and weight normalization. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define maximum influences per vertex.
2. validate bone indices and finite nonnegative weights.
3. normalize sums within tolerance.
4. handle zero-sum vertices with a documented fallback.
5. preserve important deformation influences when reducing counts.
6. test extreme and malformed weights.
7. compare reference poses.
8. record import warnings.
9. version normalization rules if output changes.

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

Skin weights satisfy declared constraints and reference poses remain within tolerance.

Do not allow NaN weights or invalid bone references into GPU buffers. Document lossy influence reduction.

## Trigger examples

- **Positive:** A code change or incident directly involves skeletal skinning import and weight normalization and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
