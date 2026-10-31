---
name: nexora-rust-public-api-stability
description: "Keeps public Rust APIs deliberate and compatible across engine releases and plugin integrations."
---

# nexora rust public api stability

## Purpose

Use this workflow for NEXORA-scale engine work when Rust public API review and semver compatibility. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Inventory exported modules, types, traits, and feature gates.
2. distinguish intended API from accidental exports.
3. define semver and deprecation policy.
4. test downstream consumer fixtures.
5. review trait-object and generic bounds for future extensibility.
6. validate feature combinations.
7. document behavior guarantees and error types.
8. compare API surface against prior release.
9. require migration notes for breaking changes.

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

Public API changes match the compatibility policy and downstream fixtures expose accidental breaks.

Do not promise stability for experimental interfaces without an explicit policy. Avoid leaking internal crate types through public signatures.

## Trigger examples

- **Positive:** A code change or incident directly involves Rust public API review and semver compatibility and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
