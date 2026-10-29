---
name: nexora-content-provenance-manifest
description: "Tracks the origin, license, version, and transformation history of assets shipped with the engine or mods."
---

# nexora content provenance manifest

## Purpose

Use this workflow for NEXORA-scale engine work when asset provenance and distribution audit. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define required provenance fields per asset class.
2. record upstream URL or source identifier, revision, license, and modification steps.
3. associate generated outputs with source hashes and tool versions.
4. validate required notices.
5. distinguish unknown license from permissive license.
6. fail release checks on unresolved mandatory fields.
7. test manifest determinism.
8. generate attribution reports.
9. keep provenance metadata separate from runtime trust decisions.

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

Every distributed asset has traceable provenance and release checks surface missing or incompatible license data.

Do not infer permission to redistribute from public availability. Do not treat provenance metadata as proof that content is safe to execute.

## Trigger examples

- **Positive:** A code change or incident directly involves asset provenance and distribution audit and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
