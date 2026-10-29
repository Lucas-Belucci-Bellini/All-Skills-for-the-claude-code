---
name: nexora-asset-import-golden-tests
description: "Uses golden fixtures to detect unintended changes in imported textures, meshes, animations, and materials."
---

# nexora asset import golden tests

## Purpose

Use this workflow for NEXORA-scale engine work when asset importer regression and format upgrades. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Select representative source files with known provenance.
2. store expected semantic outputs rather than unstable incidental bytes where appropriate.
3. record importer and schema versions.
4. test normal, malformed, and boundary inputs.
5. compare geometry, material, skeleton, and metadata invariants.
6. explain intentional output changes.
7. keep fixtures compact.
8. run on supported target platforms.
9. add regression cases for every confirmed importer bug.

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

Importer changes preserve declared asset semantics or include reviewed fixture updates.

Do not update golden outputs automatically to accept unexplained changes. Keep licenses and source attribution with fixtures.

## Trigger examples

- **Positive:** A code change or incident directly involves asset importer regression and format upgrades and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
