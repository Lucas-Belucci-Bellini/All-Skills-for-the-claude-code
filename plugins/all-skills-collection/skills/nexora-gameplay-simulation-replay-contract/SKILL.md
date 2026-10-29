---
name: nexora-gameplay-simulation-replay-contract
description: "Defines what inputs and state must be captured to reproduce gameplay simulation across runs."
---

# nexora gameplay simulation replay contract

## Purpose

Use this workflow for NEXORA-scale engine work when gameplay replay and deterministic simulation. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define replay start snapshot and authoritative input format.
2. capture seeds, simulation version, content hashes, and relevant config.
3. record external nondeterministic results at subsystem boundaries.
4. assign stable event ordering.
5. bound replay size and privacy exposure.
6. verify periodic state hashes.
7. test replay across supported runtime configurations.
8. minimize divergence windows.
9. version replay artifacts.
10. document limits on cross-platform determinism.

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

Replay reproduces the documented state contract or pinpoints the earliest divergence.

Do not claim deterministic replay if wall-clock, unordered iteration, or unrecorded external inputs affect state.

## Trigger examples

- **Positive:** A code change or incident directly involves gameplay replay and deterministic simulation and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
