---
name: nexora-texture-format-fallback
description: "Selects compatible texture formats when GPU capabilities differ without violating material sampling assumptions."
---

# nexora texture format fallback

## Purpose

Use this workflow for NEXORA-scale engine work when texture compression formats and device fallback. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Inventory source and target texture formats.
2. define supported capability tiers.
3. validate compression and color-space metadata.
4. select fallback formats deterministically.
5. estimate decompressed memory before allocation.
6. ensure mip and channel semantics are preserved.
7. test devices lacking preferred formats.
8. measure upload time and quality differences.
9. record chosen format in diagnostics.

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

Fallback textures preserve required semantics and stay within memory/device limits.

Do not treat data textures as color textures during fallback. Avoid silent alpha or channel loss.

## Trigger examples

- **Positive:** A code change or incident directly involves texture compression formats and device fallback and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
