---
name: nexora-world-save-privacy-export
description: "Removes private or sensitive world data from diagnostic exports while preserving the requested reproduction case."
---

# nexora world save privacy export

## Purpose

Use this workflow for NEXORA-scale engine work when world save export and privacy review. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define export purpose and minimum required records.
2. classify player identifiers, chat, private builds, paths, and mod data.
3. create export from a copy or filtered snapshot.
4. preserve structural dependencies and seed only when needed.
5. validate the sanitized save opens correctly.
6. inspect for known secret markers.
7. record removed categories and transformations.
8. test repeatable export.
9. require confirmation before external upload.

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

The export is useful for debugging and passes automated privacy checks before sharing.

Do not modify the original world. Avoid uploading a full save when a smaller fixture is sufficient.

## Trigger examples

- **Positive:** A code change or incident directly involves world save export and privacy review and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
