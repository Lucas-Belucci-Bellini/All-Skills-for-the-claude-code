---
name: nexora-occlusion-query-latency-contract
description: "Prevents delayed occlusion results from incorrectly hiding visible objects or stalling the renderer."
---

# nexora occlusion query latency contract

## Purpose

Use this workflow for NEXORA-scale engine work when GPU occlusion queries and visibility decisions. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define when query results become available and how old they may be.
2. associate results with object and camera generations.
3. use conservative visibility when data is stale.
4. avoid synchronous GPU waits.
5. test camera cuts and fast motion.
6. measure query latency and false-occlusion rate.
7. integrate query retirement with GPU lifetime.
8. expose debug visualization.
9. document fallback for unsupported backends.

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

Stale or missing query results cannot incorrectly hide important visible geometry and never force a blocking wait.

Do not block the render thread waiting for query completion. Treat uncertainty as visible unless a safe conservative bound exists.

## Trigger examples

- **Positive:** A code change or incident directly involves GPU occlusion queries and visibility decisions and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
