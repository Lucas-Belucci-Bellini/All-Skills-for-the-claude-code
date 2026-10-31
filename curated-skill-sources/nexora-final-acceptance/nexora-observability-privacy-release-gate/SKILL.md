---
name: nexora-observability-privacy-release-gate
description: "Verifies diagnostics and telemetry obey privacy and retention rules before release."
---

# nexora observability privacy release gate

## Purpose

Use this workflow for NEXORA-scale engine work when release telemetry and crash-report privacy review. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Inventory logs, metrics, crash dumps, and optional uploads.
2. classify sensitive fields.
3. test redaction with synthetic markers.
4. verify consent and upload defaults.
5. bound payload sizes and retention.
6. ensure IDs are not used as unbounded metric labels.
7. inspect failure-path logging.
8. document local-only alternatives.
9. review dependency or platform data collection.
10. archive privacy test evidence.

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

Diagnostics are useful, bounded, and consistent with the documented consent and retention model.

Do not assume a field is safe because it is labeled diagnostic. Avoid uploading user data without explicit policy and consent.

## Trigger examples

- **Positive:** A code change or incident directly involves release telemetry and crash-report privacy review and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
