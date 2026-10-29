---
name: nexora-mod-compatibility-release-blocker
description: "Defines when mod incompatibilities must block release or trigger explicit compatibility warnings."
---

# nexora mod compatibility release blocker

## Purpose

Use this workflow for NEXORA-scale engine work when mod API breakage and engine release gating. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Identify supported mod API ranges and known high-impact mods.
2. run compatibility fixtures against the candidate.
3. classify load failure, data migration risk, runtime crash, and degraded behavior.
4. verify API version gate behavior.
5. document intentional breaks and migration paths.
6. define severity and rollout policy.
7. preserve reproduction fixtures.
8. review security implications of fallback loading.
9. publish an exact compatibility statement.

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

Release compatibility claims match tested versions and high-risk incompatibilities have explicit decisions.

Do not claim universal mod compatibility from a limited test matrix. Avoid bypassing API gates to make an old mod load.

## Trigger examples

- **Positive:** A code change or incident directly involves mod API breakage and engine release gating and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
