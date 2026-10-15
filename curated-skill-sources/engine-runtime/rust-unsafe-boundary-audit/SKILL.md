---
name: rust-unsafe-boundary-audit
description: Audit unsafe Rust blocks and FFI boundaries for explicit invariants, soundness risks, and testable safety contracts.
---

# Rust Unsafe Boundary Audit

## Goal

Find unsound or poorly justified unsafe code without mechanically banning necessary low-level code.

## Inputs to inspect

Relevant Rust modules, unsafe blocks, public APIs that expose them, FFI declarations, and existing tests.

## Workflow

1. Inventory every `unsafe` block, `unsafe fn`, raw-pointer conversion, `transmute`, union access, unchecked indexing, and FFI call in the chosen scope. Do not infer safety from a crate name or comment alone.
2. For each site, record the invariant required before entry, what the block guarantees, which caller or owner establishes it, and how long referenced memory remains valid.
3. Trace aliasing, ownership, alignment, initialization, thread-safety, panic-unwind, and lifetime assumptions across the boundary. Treat `Send`/`Sync` implementations as high-risk claims requiring concrete justification.
4. Check whether a safe wrapper can contain the invariant and reduce the number of callers that must reason about it. Prefer the smallest possible unsafe region without obscuring required preconditions.
5. Build targeted tests for boundary conditions and add Miri, sanitizers, fuzzing, or compile-fail checks where the project toolchain supports them. State when a tool was not run.

## Validation checklist

- [ ] Every unsafe site has a specific safety rationale tied to code facts, not a statement such as 'this is safe'.
- [ ] Raw pointers are checked for nullability, alignment, initialization, provenance, lifetime, and aliasing where applicable.
- [ ] Thread-safety claims account for synchronization and shared mutable state.
- [ ] Tests cover empty inputs, boundary lengths, repeated calls, and ownership transitions relevant to the invariant.
- [ ] The review distinguishes confirmed defects from questions requiring a Rust expert or runtime tooling.

## Required output

Produce an audit table with location, required invariant, evidence, severity, recommended action, and validation status. End with confirmed defects, residual risks, and checks not performed.

## Boundaries and failure handling

Do not rewrite large sections just to remove `unsafe`; do not claim soundness solely because tests pass; do not invent UB without pointing to a violated invariant.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
