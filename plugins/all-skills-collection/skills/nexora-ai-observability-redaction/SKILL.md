---
name: nexora-ai-observability-redaction
description: "Makes AI-assisted engine behavior diagnosable without leaking prompts, private world state, or credentials."
---

# nexora ai observability redaction

## Purpose

Use this workflow for NEXORA-scale engine work when AI-assisted NPC diagnostics and privacy. Inspect the current code before proposing implementation details; do not assume an unverified subsystem exists.

## Required inputs

- Relevant source files, owning crates/modules, and the current diff or incident.
- Acceptance criteria, compatibility constraints, and known resource budgets.
- Existing tests, logs, fixtures, and reproduction steps where available.
- Explicit unknowns and assumptions requiring confirmation.

## Workflow

1. Define which metadata is needed to debug decisions.
2. log decision IDs, model/tool version, timing, and validation outcome instead of full private context.
3. redact secrets and user-authored private content.
4. cap diagnostic payloads.
5. sample repeated decisions.
6. define retention and export consent.
7. test synthetic secret markers.
8. correlate planner outputs with accepted commands.
9. document unavailable details due to redaction.

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

Diagnostics explain decision flow while sensitive prompts and private data remain excluded by default.

Do not log full prompts or world snapshots by default. Keep diagnostics separate from authoritative state and permissions.

## Trigger examples

- **Positive:** A code change or incident directly involves AI-assisted NPC diagnostics and privacy and needs reproducible validation.
- **Positive:** Reviewers need explicit invariants, boundary cases, and failure recovery for this subsystem.
- **Negative:** The task is unrelated to this subsystem or asks for speculative changes without source evidence.
- **Negative:** The request is only documentation/content work with no runtime or code behavior impact.
