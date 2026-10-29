---
name: nexora-rust-lock-poison-recovery
description: "Defines safe handling for poisoned locks and panics in shared engine state."
---

# nexora rust lock poison recovery

## Purpose

Use this workflow for NEXORA-scale engine work when Rust mutex poisoning and shared-state recovery. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Inventory locks protecting authoritative state.
2. determine whether poison indicates a violated invariant or recoverable interruption.
3. avoid blanket unwrap or unconditional into_inner.
4. define subsystem-specific validation before recovery.
5. isolate panic-prone callbacks from critical lock scopes.
6. test panics during mutation.
7. report recovery decisions.
8. use non-poisoning primitives only with explicit rationale.
9. document fatal cases.

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

Poison recovery either proves the protected state valid or fails safely with diagnostics.

Do not continue with potentially inconsistent authoritative state merely to keep the engine running.

## Trigger examples

- **Positive:** A code change or incident directly involves Rust mutex poisoning and shared-state recovery and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
