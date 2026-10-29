---
name: nexora-device-loss-state-machine
description: "Coordinates renderer and GPU resource recovery after device removal or reset."
---

# nexora device loss state machine

## Purpose

Use this workflow for NEXORA-scale engine work when GPU device loss and renderer recovery. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define device lifecycle states and transition ownership.
2. stop new submissions after loss.
3. invalidate device-bound handles by generation.
4. preserve CPU-side asset sources and authoritative world state.
5. recreate required device resources in dependency order.
6. bound retry attempts.
7. test forced device removal and allocation failure.
8. rebuild pipelines and descriptors.
9. expose recovery diagnostics and degraded mode.

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

Device loss cannot leave stale handles usable and recovery either reaches ready state or fails safely.

Do not wait indefinitely for fences from a lost device. Avoid discarding unsaved world state during renderer recovery.

## Trigger examples

- **Positive:** A code change or incident directly involves GPU device loss and renderer recovery and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
