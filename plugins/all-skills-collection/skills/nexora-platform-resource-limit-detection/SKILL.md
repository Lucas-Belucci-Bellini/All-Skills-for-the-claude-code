---
name: nexora-platform-resource-limit-detection
description: "Detects constrained memory, file descriptors, and worker capacity before launching expensive engine workloads."
---

# nexora platform resource limit detection

## Purpose

Use this workflow for NEXORA-scale engine work when platform resource limits and constrained environments. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Query available resource limits where supported.
2. distinguish hard OS limits from estimates.
3. define minimum safe runtime profile.
4. reserve headroom for persistence and critical tasks.
5. reduce optional workloads when constrained.
6. test low-memory and low-thread environments.
7. report active limits and fallbacks.
8. avoid repeated allocation failure loops.
9. document platform-specific blind spots.

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

Startup and runtime adapt to detected limits without violating critical persistence or authority guarantees.

Do not treat a missing limit API as unlimited capacity. Make estimates and unknowns explicit.

## Trigger examples

- **Positive:** A code change or incident directly involves platform resource limits and constrained environments and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
