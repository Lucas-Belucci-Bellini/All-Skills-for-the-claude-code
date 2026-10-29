---
name: nexora-authoritative-combat-resolution
description: "Keeps damage, hit validation, cooldowns, and death transitions authoritative and reproducible."
---

# nexora authoritative combat resolution

## Purpose

Use this workflow for NEXORA-scale engine work when combat simulation and hit resolution. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Identify the authoritative simulation owner for attacks and health.
2. Define attack intent, target identity, tick ordering, and cooldown rules.
3. Validate range, line of sight, team rules, and target generation at resolution time.
4. Separate visual hit effects from authoritative hit outcomes.
5. Specify ordering for simultaneous attacks and death events.
6. Record enough inputs to replay disputed outcomes.
7. Test duplicate events, stale targets, and boundary-distance cases.
8. Add invariant checks for health bounds and single death transitions.
9. Measure resolution cost under crowded combat scenarios.

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

Combat outcomes are resolved once under documented tick ordering and can be replayed for diagnosis.

Do not trust client-reported damage or presentation-only collision. Avoid double-applying retries or duplicate network events.

## Trigger examples

- **Positive:** A code change or incident directly involves combat simulation and hit resolution and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
