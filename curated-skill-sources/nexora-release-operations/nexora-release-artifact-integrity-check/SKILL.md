---
name: nexora-release-artifact-integrity-check
description: "Verifies packaged release files match the tested build and contain no unexpected files."
---

# nexora release artifact integrity check

## Purpose

Use this workflow for NEXORA-scale engine work when engine release packaging and artifact integrity. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Generate an allowlist of expected artifacts.
2. compute hashes and sizes.
3. verify build IDs and platform targets.
4. inspect packaged licenses and provenance.
5. detect debug secrets and local paths.
6. compare staged artifacts to CI outputs.
7. test installation from the package rather than workspace files.
8. sign or attest where the release system supports it.
9. archive the manifest with the release.

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

Published artifacts match tested outputs and unexpected or missing files block promotion.

Do not publish artifacts assembled manually from an unverified working directory. A checksum alone does not authenticate a publisher.

## Trigger examples

- **Positive:** A code change or incident directly involves engine release packaging and artifact integrity and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
