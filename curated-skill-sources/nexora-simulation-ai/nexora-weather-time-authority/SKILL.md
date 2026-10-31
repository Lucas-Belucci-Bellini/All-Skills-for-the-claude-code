---
name: nexora-weather-time-authority
description: "Defines one authoritative source for world time, weather transitions, and time-dependent simulation."
---

# nexora weather time authority

## Purpose

Use this workflow for NEXORA-scale engine work when world clock and weather transitions. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Identify the time authority.
2. define persisted clock units and monotonic progression.
3. represent weather transitions as seeded events or explicit state changes.
4. specify catch-up after offline time and pauses.
5. separate visual effects from authoritative effects.
6. version persisted state.
7. test save/load and clock boundaries.
8. ensure clients do not invent transitions.
9. record transition causes for replay.

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

World time and weather have consistent authority, persistence, and replication semantics.

Do not rely on local wall-clock time for replay-sensitive outcomes; handle overflow and unsupported save versions.

## Trigger examples

- **Positive:** A code change or incident directly involves world clock and weather transitions and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
