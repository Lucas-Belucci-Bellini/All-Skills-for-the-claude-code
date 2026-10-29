---
name: nexora-physics-broadphase-budget
description: "Bounds collision candidate generation and prevents broadphase degradation in dense scenes."
---

# nexora physics broadphase budget

## Purpose

Use this workflow for NEXORA-scale engine work when physics broadphase performance. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Capture collider counts and candidate-pair distributions.
2. identify broadphase update costs.
3. validate spatial bounds and filter rules.
4. separate static and dynamic populations where supported.
5. bound pathological overlap workloads.
6. test dense piles and sparse worlds.
7. compare candidate counts with a reference case.
8. measure query tail latency.
9. expose counters for pairs and reinserts.

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

Candidate generation scales within target workloads and pathological scenes remain diagnosable.

Do not discard possible collisions to meet a budget without an explicit gameplay fallback.

## Trigger examples

- **Positive:** A code change or incident directly involves physics broadphase performance and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
