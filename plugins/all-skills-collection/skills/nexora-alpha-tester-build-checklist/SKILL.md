---
name: nexora-alpha-tester-build-checklist
description: "Validates a controlled alpha build and its tester-facing diagnostics before distribution."
---

# nexora alpha tester build checklist

## Purpose

Use this workflow for NEXORA-scale engine work when NEXORA alpha builds and selected tester onboarding. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Pin the source revision and build profile.
2. create a clean release artifact.
3. verify crash reporting and privacy defaults.
4. test world creation, save/load, chunk streaming, and shutdown.
5. document known limitations and minimum requirements.
6. ensure test worlds and content have appropriate provenance.
7. provide a reproducible bug-report template.
8. verify rollback and backup instructions.
9. collect tester feedback through a defined channel.
10. track build-specific issues.

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

The alpha artifact is reproducible, its limitations are clear, and testers can report failures without exposing private data.

Do not claim stability beyond tested scenarios. Never require testers to upload private worlds by default.

## Trigger examples

- **Positive:** A code change or incident directly involves NEXORA alpha builds and selected tester onboarding and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
