---
name: agent-skill-retrieval-precision-measurement
description: "Measures how much of a broker's returned set is relevant. Use when results contain too many loosely related skills."
---

# Agent Skill Retrieval Precision Measurement

## Purpose

labeled queries, ranked candidates, relevance judgments, and selection cutoffs

## Required inputs

Calculate precision at k and the fraction of no-match queries that return irrelevant skills.

## Workflow

1. Inspect the exact task context, candidate records, and policy/version data before selection or composition.
2. Inspect false positives and classify whether they arise from broad descriptions, aliases, semantic search, or missing filters.
3. A precision report with examples, confidence limitations, and focused remediation steps.
4. Exercise representative positive, negative, no-match, and incompatible cases; record actual observations and untested assumptions.
5. Produce do not optimize precision by suppressing a required security or dependency skill. with versioned inputs, evidence, limitations, and a safe next action.

## Validation checklist

- [ ] Relevant IDs/versions and input assumptions are captured.
- [ ] Hard safety/authorization/compatibility filters remain separate from relevance ranking.
- [ ] Positive and negative cases produce expected selection or abstention behavior.
- [ ] Private prompts and secrets are not written into shared evaluation data.
- [ ] Unmeasured quality or context savings are not claimed as facts.

## Required output

Do not optimize precision by suppressing a required security or dependency skill.

## Boundaries and failure handling

An agent receives many irrelevant candidates for one specific task. If ground truth, policy, or runtime evidence is missing, report the uncertainty and avoid automatically composing an unsafe workflow.

## Trigger examples

- **Positive:** The retrieval system returns one exact ID and no relevance ranking.
- **Negative:** undefined
