---
name: nexora-mod-compatibility-test-lab
description: "Tests combinations of mods and engine versions without assuming every combination is supported."
---

# nexora mod compatibility test lab

## Purpose

Use this workflow for NEXORA-scale engine work when mod compatibility matrix and regression triage. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define supported compatibility tiers.
2. select representative high-impact mod pairs and dependency chains.
3. pin mod versions and content hashes.
4. isolate test worlds.
5. automate startup, load, save, and gameplay smoke scenarios.
6. collect crash and schema diagnostics.
7. classify incompatibility versus test infrastructure failure.
8. minimize failing combinations.
9. publish the exact tested matrix.
10. expire obsolete fixtures with review.

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

Compatibility claims identify exact versions and scenarios and failures are reproducible.

Do not imply exhaustive compatibility from a small sample. Avoid downloading or executing untrusted mods outside an isolated test environment.

## Trigger examples

- **Positive:** A code change or incident directly involves mod compatibility matrix and regression triage and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
