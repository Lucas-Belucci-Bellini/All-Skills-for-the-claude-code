---
name: nexora-build-failure-minimizer
description: "Reduces build failures to the smallest feature, target, or dependency combination that still reproduces the issue."
---

# nexora build failure minimizer

## Purpose

Use this workflow for NEXORA-scale engine work when engine build regression and feature matrix failure. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Capture exact command, toolchain, lockfile, target, and enabled features.
2. reproduce from a clean checkout.
3. bisect changed source or dependency revisions where practical.
4. reduce feature combinations while preserving failure.
5. isolate platform-specific dependencies.
6. retain compiler diagnostics and generated artifacts.
7. verify the minimal case repeatedly.
8. convert the issue into a CI regression check.
9. document unsupported environment dependencies.

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

A minimized build failure is repeatable and identifies the smallest known trigger set.

Do not change lockfiles or features during reduction without recording the change. Mark environment-only failures distinctly.

## Trigger examples

- **Positive:** A code change or incident directly involves engine build regression and feature matrix failure and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
