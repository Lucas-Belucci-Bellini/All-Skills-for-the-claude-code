---
name: async-task-cancellation-contract
description: "Prevents orphaned tasks and half-applied operations by making cancellation, cleanup, and completion semantics explicit."
---

# Specify async task cancellation

## Purpose

Use this workflow when changing spawned tasks, cancellation tokens, join handles, and shutdown behavior in a large Rust-first engine such as NEXORA or another long-lived multi-crate application. Favor explicit contracts and measurable validation over speculative redesign.

## Required inputs

- Affected crate/module paths, current diff, workspace manifests, and relevant tests.
- A concrete defect, planned change, or acceptance criterion.
- Known compatibility, performance, security, and release constraints; mark unknowns rather than assuming them.

## Workflow

1. Read the owning crate, public exports, callers, tests, and configuration. Identify the behavior owner and all affected consumers.
2. Document inputs, outputs, state changes, ordering, failure modes, and compatibility promises; separate observed behavior from intended behavior.
3. Search for hidden coupling, implicit defaults, unbounded resource use, lifecycle assumptions, and feature-flag interactions relevant to the change.
4. Choose the smallest safe implementation. Preserve public behavior unless a breaking change is explicitly authorized.
5. Add actionable diagnostics and make ownership of retries, cleanup, and recovery explicit; do not swallow errors or silently accept invalid state.
6. Add a focused regression test and cases for invalid inputs, partial failure, and the most relevant compatibility edge.
7. Run narrow crate tests, formatting, linting, and a representative feature/workspace check. Record any command that cannot run and why.
8. Review API impact, migration needs, resource cleanup, documentation, and the final diff before reporting completion.

## Validation checklist

- [ ] Owning module and affected callers are identified.
- [ ] Contract and failure semantics are explicit and tested.
- [ ] Regression tests demonstrate the target invariant.
- [ ] Invalid input and partial failure do not leave inconsistent state.
- [ ] Public API and feature compatibility are reviewed.
- [ ] Relevant tests, formatting, and lint checks pass, or blockers are precise.
- [ ] No unrelated refactor or unbounded performance cost was introduced.

## Required output

Report the inspected boundary, risk found, implementation and affected files, validation commands/results, compatibility concerns, and remaining risks. Mark the status as validated, partially validated, or blocked.

## Boundaries and failure handling

Do not invent repository files, API guarantees, runtime infrastructure, or benchmark results. If the relevant subsystem does not exist, propose a small contract and test seam. Stop and request approval before breaking, security-sensitive, or data-destructive changes. Never claim a test passed if it was not run.

## Trigger examples

- **Positive:** A Rust engine needs an explicit cross-crate, lifecycle, resource, or feature contract.
- **Positive:** A subsystem change requires regression tests and compatibility review.
- **Negative:** The task is an isolated syntax correction without architectural implications.
- **Negative:** The request asks for broad redesign without constraints, evidence, or acceptance criteria.
