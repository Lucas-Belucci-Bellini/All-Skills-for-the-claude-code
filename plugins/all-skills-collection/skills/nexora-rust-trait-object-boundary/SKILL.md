---
name: nexora-rust-trait-object-boundary
description: "Defines stable trait-object and dynamic dispatch boundaries for engine plugins and subsystem extensions."
---

# nexora rust trait object boundary

## Purpose

Use this workflow for NEXORA-scale engine work when Rust trait objects and plugin extension points. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Identify where dynamic dispatch is required and where generics are sufficient.
2. define object-safe interfaces and ownership of returned values.
3. minimize trait surface and associated-type leakage.
4. document thread-safety requirements.
5. version plugin-facing contracts.
6. test implementers from a separate crate.
7. define error and downcast behavior.
8. benchmark hot-path dispatch where relevant.
9. avoid exposing internal concrete types.

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

Extension interfaces are object-safe where required, documented, and usable by downstream crates.

Do not assume Rust trait objects form a stable cross-compiler ABI. Avoid unnecessary dynamic dispatch in measured hot loops.

## Trigger examples

- **Positive:** A code change or incident directly involves Rust trait objects and plugin extension points and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
