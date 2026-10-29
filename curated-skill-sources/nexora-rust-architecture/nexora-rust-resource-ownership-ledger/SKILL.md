---
name: nexora-rust-resource-ownership-ledger
description: "Tracks ownership and shutdown responsibility for engine resources crossing crate boundaries."
---

# nexora rust resource ownership ledger

## Purpose

Use this workflow for NEXORA-scale engine work when Rust resource ownership across subsystems. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. List resources, creators, owners, borrowers, and release conditions.
2. distinguish Arc ownership from GPU or OS completion.
3. define transfer APIs and cancellation behavior.
4. avoid reference cycles.
5. connect resource release to subsystem shutdown order.
6. test repeated create/destroy and partial initialization.
7. instrument outstanding resource counts in debug builds.
8. review unsafe ownership conversions.
9. maintain a concise ownership diagram.

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

Each resource has one clear ownership policy and release condition, including asynchronous completion.

Reference counting alone does not prove GPU, filesystem, or network operations have completed. Avoid implicit global owners.

## Trigger examples

- **Positive:** A code change or incident directly involves Rust resource ownership across subsystems and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
