---
name: nexora-ai-planning-determinism-boundary
description: "Separates nondeterministic AI planning from authoritative deterministic simulation where replayability is required."
---

# nexora ai planning determinism boundary

## Purpose

Use this workflow for NEXORA-scale engine work when AI-assisted gameplay and deterministic replay. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Identify which decisions must be deterministic.
2. isolate nondeterministic model or planner calls behind recorded decision inputs/results.
3. define when decisions are accepted into the tick stream.
4. version decision schemas.
5. capture seed and context hashes where safe.
6. test replay with recorded decisions.
7. specify fallback when the AI service is unavailable.
8. bound latency and result size.
9. document platform determinism limitations.

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

Replay reproduces authoritative outcomes from recorded accepted decisions even if planning itself is nondeterministic.

Do not claim deterministic AI merely because a seed is set. Keep model outputs out of authority paths until validated.

## Trigger examples

- **Positive:** A code change or incident directly involves AI-assisted gameplay and deterministic replay and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
