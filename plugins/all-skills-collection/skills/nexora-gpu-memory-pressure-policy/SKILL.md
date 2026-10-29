---
name: nexora-gpu-memory-pressure-policy
description: "Defines safe degradation and resource eviction when GPU memory approaches device limits."
---

# nexora gpu memory pressure policy

## Purpose

Use this workflow for NEXORA-scale engine work when GPU memory pressure and device allocation failures. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Track estimated and observed GPU memory by resource class.
2. define soft and hard pressure thresholds.
3. prioritize critical render targets and visible assets.
4. evict only resources safe to recreate.
5. reduce optional quality or residency deterministically.
6. handle allocation failure without corrupting render state.
7. test low-memory devices and device loss.
8. expose pressure transitions.
9. verify restoration after pressure clears.

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

GPU memory remains bounded where the backend permits and pressure produces controlled degradation.

Do not free in-flight resources before completion. Treat backend estimates as approximate and handle allocation failure explicitly.

## Trigger examples

- **Positive:** A code change or incident directly involves GPU memory pressure and device allocation failures and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
