---
name: nexora-rust-unsafe-block-audit
description: "Reviews unsafe Rust blocks for local safety invariants and soundness across engine resource lifecycles."
---

# nexora rust unsafe block audit

## Purpose

Use this workflow for NEXORA-scale engine work when unsafe Rust and FFI boundary audit. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Inventory unsafe blocks and their callers.
2. state the safety invariant next to each block.
3. validate pointer provenance, aliasing, alignment, and lifetime assumptions.
4. check panic and cancellation paths.
5. review synchronization and thread-safety traits.
6. isolate unsafe operations behind narrow safe abstractions.
7. add Miri or sanitizer checks where supported.
8. test boundary inputs.
9. record unresolved soundness risks.

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

Every unsafe block has a defensible invariant and safe callers cannot violate it through documented inputs.

Do not mark an abstraction safe if callers can construct invalid states. Never rely on comments instead of enforcing preconditions.

## Trigger examples

- **Positive:** A code change or incident directly involves unsafe Rust and FFI boundary audit and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
