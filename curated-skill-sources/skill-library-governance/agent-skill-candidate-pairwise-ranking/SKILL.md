---
name: agent-skill-candidate-pairwise-ranking
description: "Compares close candidate skills to decide which should rank first. Use when near-tie results confuse the selection system."
---

# Agent Skill Candidate Pairwise Ranking

## Purpose

candidate pair, task description, validation states, compatibility, and ranking policy

## Required inputs

Construct pairwise comparisons focused on which candidate better covers the actual task and required outputs.

## Workflow

1. Inspect the exact task context, candidate records, and policy/version data before selection or composition.
2. Resolve ties using verified compatibility, specificity, confidence, and unique contribution; preserve abstention when evidence is insufficient.
3. A pairwise decision with rationale and recorded uncertainty.
4. Exercise representative positive, negative, no-match, and incompatible cases; record actual observations and untested assumptions.
5. Produce do not use pairwise preference to override hard access, revocation, or safety filters. with versioned inputs, evidence, limitations, and a safe next action.

## Validation checklist

- [ ] Relevant IDs/versions and input assumptions are captured.
- [ ] Hard safety/authorization/compatibility filters remain separate from relevance ranking.
- [ ] Positive and negative cases produce expected selection or abstention behavior.
- [ ] Private prompts and secrets are not written into shared evaluation data.
- [ ] Unmeasured quality or context savings are not claimed as facts.

## Required output

Do not use pairwise preference to override hard access, revocation, or safety filters.

## Boundaries and failure handling

Two skills both look relevant but one is narrower and better validated. If ground truth, policy, or runtime evidence is missing, report the uncertainty and avoid automatically composing an unsafe workflow.

## Trigger examples

- **Positive:** Candidates differ only in display name and the exact requested ID decides.
- **Negative:** undefined
