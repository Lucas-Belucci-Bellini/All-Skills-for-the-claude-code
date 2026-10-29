---
name: nexora-color-space-pipeline-contract
description: "Keeps texture, material, lighting, and post-processing color spaces consistent through rendering."
---

# nexora color space pipeline contract

## Purpose

Use this workflow for NEXORA-scale engine work when color space and HDR pipeline correctness. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Classify texture formats as color or data.
2. define linear-light working space and display output transform.
3. validate material inputs and render-target formats.
4. specify tone mapping and HDR metadata handling.
5. test representative color patches and alpha blending.
6. check UI compositing order.
7. compare outputs across supported backends.
8. record color-space metadata in assets.
9. document precision and gamut limitations.

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

The pipeline applies each transfer function once at the correct boundary and reference colors remain within declared tolerances.

Do not apply sRGB conversion to data textures or tone-map an already display-referred result twice.

## Trigger examples

- **Positive:** A code change or incident directly involves color space and HDR pipeline correctness and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
