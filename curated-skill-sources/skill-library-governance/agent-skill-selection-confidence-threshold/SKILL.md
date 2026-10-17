---
name: agent-skill-selection-confidence-threshold
description: "Defines when an agent has enough evidence to select a skill automatically. Use when ambiguous retrieval results could cause incorrect workflows."
---

# Agent Skill Selection Confidence Threshold

## Purpose

labeled search fixtures, candidate scores, error costs, and fallback policy

## Required inputs

Set different thresholds for low-risk discovery, behavior-changing operations, and security-sensitive tasks.

## Workflow

1. Inspect the exact task context, candidate records, and policy/version data before selection or composition.
2. Calibrate thresholds on labeled cases and measure false positives, false negatives, and abstention quality.
3. A threshold policy with metrics, example decisions, and abstention conditions.
4. Exercise representative positive, negative, no-match, and incompatible cases; record actual observations and untested assumptions.
5. Produce do not convert an uncalibrated model score into a guarantee of correctness. with versioned inputs, evidence, limitations, and a safe next action.

## Validation checklist

- [ ] Relevant IDs/versions and input assumptions are captured.
- [ ] Hard safety/authorization/compatibility filters remain separate from relevance ranking.
- [ ] Positive and negative cases produce expected selection or abstention behavior.
- [ ] Private prompts and secrets are not written into shared evaluation data.
- [ ] Unmeasured quality or context savings are not claimed as facts.

## Required output

Do not convert an uncalibrated model score into a guarantee of correctness.

## Boundaries and failure handling

A broker must decide whether to return one skill or ask for a more precise query. If ground truth, policy, or runtime evidence is missing, report the uncertainty and avoid automatically composing an unsafe workflow.

## Trigger examples

- **Positive:** The agent is not selecting skills automatically.
- **Negative:** undefined
