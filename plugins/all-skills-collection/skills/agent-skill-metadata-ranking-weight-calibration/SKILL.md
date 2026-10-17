---
name: agent-skill-metadata-ranking-weight-calibration
description: "Calibrates ranking weights for metadata-based skill discovery. Use when the broker combines domain, trigger, compatibility, quality, and cost signals."
---

# Agent Skill Metadata Ranking Weight Calibration

## Purpose

labeled queries, candidate metadata, baseline weights, and expected relevance

## Required inputs

Define ranking features and isolate hard filters from tunable ranking weights.

## Workflow

1. Inspect the exact task context, candidate records, and policy/version data before selection or composition.
2. Evaluate weight changes on held-out queries and inspect cases where a narrower verified skill loses to generic guidance.
3. A weight calibration report with retrieval metrics, example rank changes, and limitations.
4. Exercise representative positive, negative, no-match, and incompatible cases; record actual observations and untested assumptions.
5. Produce do not tune on the same examples used for final evaluation without noting overfit risk. with versioned inputs, evidence, limitations, and a safe next action.

## Validation checklist

- [ ] Relevant IDs/versions and input assumptions are captured.
- [ ] Hard safety/authorization/compatibility filters remain separate from relevance ranking.
- [ ] Positive and negative cases produce expected selection or abstention behavior.
- [ ] Private prompts and secrets are not written into shared evaluation data.
- [ ] Unmeasured quality or context savings are not claimed as facts.

## Required output

Do not tune on the same examples used for final evaluation without noting overfit risk.

## Boundaries and failure handling

The search engine ranks skills using metadata fields. If ground truth, policy, or runtime evidence is missing, report the uncertainty and avoid automatically composing an unsafe workflow.

## Trigger examples

- **Positive:** Retrieval is exact-ID only and has no ranking step.
- **Negative:** undefined
