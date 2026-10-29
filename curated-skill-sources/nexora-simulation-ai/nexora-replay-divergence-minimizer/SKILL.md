---
name: nexora-replay-divergence-minimizer
description: "Reduces a failing deterministic replay to the smallest input/event sequence that still reproduces divergence."
---

# nexora replay divergence minimizer

## Purpose

Use this workflow for NEXORA-scale engine work when simulation replay failures and deterministic debugging. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Capture replay with versioned inputs and periodic state hashes.
2. identify first divergent tick and state partitions.
3. remove event ranges while preserving required dependencies.
4. replay candidates in a clean deterministic environment.
5. hold seed, config, content hashes, and runtime versions fixed.
6. minimize world/entity fixtures where feasible.
7. verify the reduced case fails repeatedly.
8. attach the artifact as a regression fixture.
9. document nondeterministic dependencies that block reduction.

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

The minimized replay reproduces the same earliest divergence and is suitable as a regression fixture.

Do not discard setup events required for failure. Mark nondeterministic failures inconclusive rather than claiming a minimal case.

## Trigger examples

- **Positive:** A code change or incident directly involves simulation replay failures and deterministic debugging and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
