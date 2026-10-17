---
name: agent-skill-topk-budget-optimization
description: "Optimizes the number of retrieved skills under a context budget. Use when many candidates compete to support one task."
---

# Agent Skill Top-K Budget Optimization

## Purpose

candidate relevance, token-size estimates, dependencies, and task quality labels

## Required inputs

Compare small candidate sets against larger sets while tracking unique coverage and duplicated guidance.

## Workflow

1. Inspect the exact task context, candidate records, and policy/version data before selection or composition.
2. Choose a default top-k by measured task results and context cost, allowing smaller/larger limits for risk tiers.
3. A top-k recommendation with quality-versus-cost results and known limits.
4. Exercise representative positive, negative, no-match, and incompatible cases; record actual observations and untested assumptions.
5. Produce do not remove required dependencies or safety rules simply to reduce context size. with versioned inputs, evidence, limitations, and a safe next action.

## Validation checklist

- [ ] Relevant IDs/versions and input assumptions are captured.
- [ ] Hard safety/authorization/compatibility filters remain separate from relevance ranking.
- [ ] Positive and negative cases produce expected selection or abstention behavior.
- [ ] Private prompts and secrets are not written into shared evaluation data.
- [ ] Unmeasured quality or context savings are not claimed as facts.

## Required output

Do not remove required dependencies or safety rules simply to reduce context size.

## Boundaries and failure handling

An agent often loads too many similar skills before coding. If ground truth, policy, or runtime evidence is missing, report the uncertainty and avoid automatically composing an unsafe workflow.

## Trigger examples

- **Positive:** The task needs one exact procedure and extra context provides no measurable value.
- **Negative:** undefined
