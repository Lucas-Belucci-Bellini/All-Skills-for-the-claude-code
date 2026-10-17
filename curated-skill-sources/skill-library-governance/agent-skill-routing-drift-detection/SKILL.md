---
name: agent-skill-routing-drift-detection
description: "Detects changes in which skills are selected after catalog or prompt updates. Use when a batch alters descriptions or ranking."
---

# Agent Skill Routing Drift Detection

## Purpose

baseline query set, prior selection receipts, current results, catalog versions, and expected tolerances

## Required inputs

Replay the same query set against the new catalog and compare selected/excluded skills by immutable ID/version.

## Workflow

1. Inspect the exact task context, candidate records, and policy/version data before selection or composition.
2. Classify differences as expected coverage change, metadata regression, compatibility change, or unexplained drift.
3. A routing drift report with changed query IDs and impact severity.
4. Exercise representative positive, negative, no-match, and incompatible cases; record actual observations and untested assumptions.
5. Produce do not label every selection change a regression; evaluate intent and quality evidence. with versioned inputs, evidence, limitations, and a safe next action.

## Validation checklist

- [ ] Relevant IDs/versions and input assumptions are captured.
- [ ] Hard safety/authorization/compatibility filters remain separate from relevance ranking.
- [ ] Positive and negative cases produce expected selection or abstention behavior.
- [ ] Private prompts and secrets are not written into shared evaluation data.
- [ ] Unmeasured quality or context savings are not claimed as facts.

## Required output

Do not label every selection change a regression; evaluate intent and quality evidence.

## Boundaries and failure handling

A new skill batch may unexpectedly shadow existing triggers. If ground truth, policy, or runtime evidence is missing, report the uncertainty and avoid automatically composing an unsafe workflow.

## Trigger examples

- **Positive:** The catalog and retrieval configuration are unchanged.
- **Negative:** undefined
