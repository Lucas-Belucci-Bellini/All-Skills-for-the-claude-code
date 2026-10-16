---
name: agent-output-evidence-traceability
description: "Use when an agent must support important claims with inspected files, tests, or tool outputs and distinguish evidence from inference; not for generic writing style review."
---

# Agent Output Evidence Traceability

## Purpose

Make agent reports auditable by linking each material claim to concrete evidence and clearly labeling unknowns.

## Required inputs

Draft report, source files or tool results, claim list, validation commands, timestamps/revisions, and expected evidence standard.

## Workflow

1. Extract the report's material claims and classify each as direct observation, derived conclusion, assumption, recommendation, or unverified statement.
2. Attach the minimum evidence needed for each observation: file/path and line range, command output, test result, or source revision.
3. Recheck whether the evidence actually supports the claim and whether any contradictory or stale evidence is present.
4. Rewrite unsupported claims as uncertainty or open questions, then emit an evidence manifest with failed and unavailable checks.

## Verification checklist

- [ ] Every important factual or verification claim has a traceable evidence item.
- [ ] Inferences are labeled and do not masquerade as directly observed facts.
- [ ] Test results state command, environment, and actual outcome where available.
- [ ] No source, command result, or passing test is fabricated to complete the report.

## Required output

A claim-to-evidence matrix and final report separating verified facts, inference, failures, and unverified areas.

## Boundaries and failure handling

Do not include secrets, personal data, or sensitive raw logs as evidence. Preserve only the minimum excerpts required to support a claim.

When required evidence, permissions, or environment details are unavailable, stop at the supported analysis, record the missing prerequisite, and do not report an unexecuted validation as passing.

## Trigger examples

- **Positive:** A code review report must distinguish issues found in the current branch from older notes.
- **Negative:** Editing prose for grammar when there are no evidence or verification claims.
