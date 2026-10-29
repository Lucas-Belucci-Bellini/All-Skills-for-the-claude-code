---
name: nexora-release-evidence-bundle
description: "Packages the exact evidence needed to review a release candidate without mixing results from different commits."
---

# nexora release evidence bundle

## Purpose

Use this workflow for NEXORA-scale engine work when release review and audit evidence. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Bind all evidence to one source revision and artifact hash.
2. collect CI runs, test summaries, benchmarks, compatibility results, license reports, and known limitations.
3. reject stale evidence from another candidate.
4. summarize pass/fail/inconclusive status.
5. include reproduction commands and environment metadata.
6. redact sensitive details.
7. archive the bundle with the release.
8. verify links and artifacts are accessible.
9. document missing evidence explicitly.

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

Reviewers can trace every release claim to evidence from the same candidate.

Do not combine green checks from different commits as one successful release result.

## Trigger examples

- **Positive:** A code change or incident directly involves release review and audit evidence and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
