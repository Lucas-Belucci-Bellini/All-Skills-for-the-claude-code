---
name: nexora-feature-fallback-regression-suite
description: "Verifies degraded and fallback paths remain correct when optional engine capabilities are unavailable."
---

# nexora feature fallback regression suite

## Purpose

Use this workflow for NEXORA-scale engine work when fallback paths and degraded mode regression. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Inventory fallback paths and the capability that selects each.
2. define expected correctness and quality differences.
3. force capability absence in tests.
4. validate save and network semantics remain compatible.
5. exercise transitions into and out of degraded mode.
6. check diagnostics identify the active fallback.
7. compare resource use and behavior.
8. retain fixtures for each supported tier.
9. review fallback coverage before releases.

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

Every supported fallback has regression coverage and cannot silently weaken core correctness.

Do not test fallbacks only on hardware that supports the preferred path. Keep security and persistence guarantees invariant across tiers.

## Trigger examples

- **Positive:** A code change or incident directly involves fallback paths and degraded mode regression and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
