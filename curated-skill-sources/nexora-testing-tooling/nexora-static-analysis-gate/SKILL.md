---
name: nexora-static-analysis-gate
description: "Selects static checks that catch unsafe Rust, API drift, and dependency issues without relying on one tool alone."
---

# nexora static analysis gate

## Purpose

Use this workflow for NEXORA-scale engine work when Rust static analysis and quality gates. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Identify project toolchain and workspace boundaries.
2. run formatter and compiler checks with declared features.
3. select clippy or equivalent lints appropriate to current code.
4. review unsafe blocks and FFI boundaries separately.
5. audit dependency advisories and licenses through available tools.
6. distinguish baseline warnings from new regressions.
7. keep checks reproducible in CI.
8. document platform-specific omissions.
9. gate release-critical findings.

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

Required checks are reproducible and new high-severity findings cannot silently accumulate.

Do not claim checks ran if the environment lacks the tool. Avoid blanket lint suppressions without local justification.

## Trigger examples

- **Positive:** A code change or incident directly involves Rust static analysis and quality gates and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
