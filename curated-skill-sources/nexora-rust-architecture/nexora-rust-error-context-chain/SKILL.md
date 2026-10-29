---
name: nexora-rust-error-context-chain
description: "Preserves actionable causal context as errors cross Rust crate and task boundaries."
---

# nexora rust error context chain

## Purpose

Use this workflow for NEXORA-scale engine work when Rust error propagation and diagnostics. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define error ownership at subsystem boundaries.
2. preserve source chains and operation context.
3. add stable error categories for user-facing handling.
4. distinguish retryable from permanent failures.
5. attach identifiers that are safe to log.
6. avoid parsing error strings for control flow.
7. test nested source chains and conversion behavior.
8. map errors at application boundaries.
9. document what context is intentionally omitted.

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

Errors retain causal context and callers can make recovery decisions without string matching.

Do not erase the root cause into a generic string. Avoid embedding secrets or huge payloads in error context.

## Trigger examples

- **Positive:** A code change or incident directly involves Rust error propagation and diagnostics and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
