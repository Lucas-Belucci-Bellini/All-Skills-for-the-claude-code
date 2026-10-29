---
name: nexora-crash-dump-version-contract
description: "Ensures crash dumps and diagnostic artifacts remain interpretable across engine versions and platforms."
---

# nexora crash dump version contract

## Purpose

Use this workflow for NEXORA-scale engine work when crash dump format and symbolication. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Record build ID, source revision, platform, architecture, and symbol version.
2. version any custom dump metadata.
3. preserve required registers and thread context within platform limits.
4. define privacy filtering and artifact size caps.
5. validate dump completeness before upload.
6. retain matching symbols through release policy.
7. test symbolication for release builds.
8. distinguish missing symbols from invalid dumps.
9. document upload consent and retention.

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

Crash artifacts can be matched to the correct symbols and format version with privacy and size constraints.

Do not assume debug symbols are interchangeable across builds. Never upload dumps without the defined consent and privacy policy.

## Trigger examples

- **Positive:** A code change or incident directly involves crash dump format and symbolication and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
