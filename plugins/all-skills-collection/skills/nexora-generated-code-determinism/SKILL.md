---
name: nexora-generated-code-determinism
description: "Makes generated Rust, shader, and asset metadata stable across repeated builds."
---

# nexora generated code determinism

## Purpose

Use this workflow for NEXORA-scale engine work when generated code and artifact determinism. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Identify all generators and their input ordering.
2. sort map-derived outputs and normalize line endings.
3. record generator versions and options.
4. eliminate machine-local paths and timestamps from outputs where unnecessary.
5. compare repeated clean builds.
6. test locale and filesystem-order variation.
7. preserve source maps and provenance.
8. review diffs for semantic changes.
9. document unavoidable nondeterminism.

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

Equivalent inputs produce stable generated outputs within the documented platform scope.

Do not normalize away meaningful semantic differences. Avoid hiding toolchain nondeterminism without identifying its source.

## Trigger examples

- **Positive:** A code change or incident directly involves generated code and artifact determinism and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
