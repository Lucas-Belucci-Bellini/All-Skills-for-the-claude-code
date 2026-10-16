---
name: rust-concurrency-test-scenario-design
description: Design reproducible concurrency tests using controlled barriers, fault injection, bounded schedules, and explicit invariants.
---

# Rust Concurrency Test Scenario Design

## Goal

Catch race-sensitive behavior without relying on sleeps, high iteration counts alone or the assumption that one successful run proves safety.

## Inputs to inspect

Shared state, task/thread boundaries, invariants, cancellation and failure paths, available deterministic test tools and CI constraints.

## Workflow

1. Express the concurrency invariant first, including allowed intermediate states and what constitutes a lost update, duplicate effect, stale publication or deadlock.
2. Identify the critical interleaving and use barriers, channels, latches or test hooks to force it instead of hoping the scheduler produces it.
3. Inject delays, worker failure, cancellation and partial I/O at the boundary between read/compute/commit phases.
4. Repeat tests across relevant worker counts and use timeouts only as a safety bound, with diagnostics that preserve involved task/state identifiers.
5. Where applicable, run model checking, sanitizer or stress tooling separately; keep the smallest deterministic reproducer as the primary regression test.

## Validation checklist

- [ ] Tests assert state invariants and externally visible outcomes rather than internal timing assumptions.
- [ ] No correctness claim depends only on thread.sleep ordering.
- [ ] Failure injection is deterministic and its activation point is documented.
- [ ] Timeout failures include enough state to distinguish deadlock, starvation and a slow environment.

## Required output

A concurrency invariant, controlled interleaving test, failure matrix and documented optional stress/model-checking commands.

## Boundaries and failure handling

Do not claim race freedom because stress tests passed; scope assurance to the invariants and schedules actually exercised.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
