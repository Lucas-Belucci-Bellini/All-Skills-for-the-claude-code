---
name: nexora-test-isolation-contract
description: "Ensures engine tests do not depend on execution order, user files, network state, or leftover runtime resources."
---

# nexora test isolation contract

## Purpose

Use this workflow for NEXORA-scale engine work when flaky tests and test isolation. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Inventory external dependencies and shared global state.
2. create unique temporary workspaces.
3. inject clocks, seeds, and filesystem/network interfaces where appropriate.
4. reset or recreate process-wide registries.
5. isolate GPU/device-dependent tests.
6. test repeated execution and shuffled order.
7. run selected tests in parallel.
8. clean up resources even on failure.
9. capture environment metadata.
10. document unavoidable integration-test requirements.

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

Tests pass repeatedly in isolation and in shuffled/parallel runs with failures attributable to a specific dependency.

Do not delete arbitrary user directories during cleanup. Avoid hidden reliance on wall-clock time or machine-global configuration.

## Trigger examples

- **Positive:** A code change or incident directly involves flaky tests and test isolation and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
