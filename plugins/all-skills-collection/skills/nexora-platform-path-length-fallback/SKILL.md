---
name: nexora-platform-path-length-fallback
description: "Handles long paths and platform-specific path limits without truncating or corrupting world and asset references."
---

# nexora platform path length fallback

## Purpose

Use this workflow for NEXORA-scale engine work when long filesystem paths and platform limits. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Identify maximum path constraints per target.
2. keep logical identifiers independent from physical paths.
3. use supported long-path mechanisms where available.
4. validate before writing.
5. avoid truncation and lossy normalization.
6. test deep mod trees and long Unicode names.
7. provide clear diagnostics and safe alternate storage when supported.
8. preserve references across migration.
9. document unsupported path cases.

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

Paths either work through a supported mechanism or fail before destructive writes with a clear error.

Do not silently truncate paths or map distinct logical assets to the same shortened path.

## Trigger examples

- **Positive:** A code change or incident directly involves long filesystem paths and platform limits and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
