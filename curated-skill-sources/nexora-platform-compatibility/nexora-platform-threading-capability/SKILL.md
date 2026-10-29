---
name: nexora-platform-threading-capability
description: "Selects safe worker and affinity behavior based on platform capabilities rather than hard-coded assumptions."
---

# nexora platform threading capability

## Purpose

Use this workflow for NEXORA-scale engine work when platform threading and affinity. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Identify required thread features and backend constraints.
2. query available parallelism safely.
3. define minimum worker count and fallback.
4. isolate affinity-specific code.
5. avoid assuming CPU topology.
6. test constrained containers and single-core environments.
7. validate thread-affinity for graphics/audio APIs.
8. expose selected configuration.
9. benchmark representative platforms.

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

Runtime startup chooses a supported thread configuration and fails clearly when required capabilities are missing.

Do not pin threads without evidence. Treat reported CPU count as a hint rather than guaranteed available capacity.

## Trigger examples

- **Positive:** A code change or incident directly involves platform threading and affinity and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
