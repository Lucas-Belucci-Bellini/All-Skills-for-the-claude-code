---
name: nexora-runtime-feature-degradation
description: "Defines how optional subsystems degrade when hardware, memory, or dependencies are unavailable."
---

# nexora runtime feature degradation

## Purpose

Use this workflow for NEXORA-scale engine work when runtime capability detection and graceful degradation. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Inventory required and optional features.
2. detect actual platform capabilities rather than assuming hardware.
3. define fallback quality and correctness contracts.
4. initialize optional features independently.
5. publish capability state to dependent systems.
6. test missing GPU features, audio devices, and constrained memory.
7. avoid repeated failing initialization loops.
8. expose reasons and active fallback.
9. verify saves and network behavior remain compatible.

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

Unsupported optional features degrade predictably without corrupting authoritative state.

Do not silently downgrade security or persistence guarantees. Clearly distinguish unavailable features from transient initialization failure.

## Trigger examples

- **Positive:** A code change or incident directly involves runtime capability detection and graceful degradation and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
