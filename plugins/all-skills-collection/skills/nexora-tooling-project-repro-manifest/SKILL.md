---
name: nexora-tooling-project-repro-manifest
description: "Captures enough project metadata to reproduce engine bugs and builds across machines."
---

# nexora tooling project repro manifest

## Purpose

Use this workflow for NEXORA-scale engine work when engine issue reproduction and build environment capture. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Record source revision, compiler/toolchain, target triple, feature flags, mod/content versions, and deterministic seeds.
2. exclude credentials and private paths.
3. hash required fixtures.
4. note optional hardware/backend dependencies.
5. generate a stable manifest.
6. verify the manifest from a clean checkout.
7. attach exact reproduction commands.
8. distinguish guaranteed from best-effort reproducibility.
9. version the manifest schema.

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

The manifest makes the reproduction environment explicit without leaking secrets or implying unsupported guarantees.

Do not include environment variables wholesale. Mark unavailable hardware-specific dependencies instead of inventing them.

## Trigger examples

- **Positive:** A code change or incident directly involves engine issue reproduction and build environment capture and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
