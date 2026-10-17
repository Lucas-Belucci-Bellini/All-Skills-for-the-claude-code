---
name: agent-skill-negative-trigger-regression
description: "Tests that skills stay inactive for tasks outside their intended scope. Use when new skills alter routing in a large library."
---

# Agent Skill Negative Trigger Regression

## Purpose

skill descriptions, intended triggers, neighboring tasks, and regression fixture set

## Required inputs

Generate negative examples from adjacent domains and explicit non-goals, not only unrelated random requests.

## Workflow

1. Inspect the exact task context, candidate records, and policy/version data before selection or composition.
2. Run routing evaluation after changes to names, descriptions, or taxonomy and compare false activation rates.
3. A negative-trigger suite with expected no-match/candidate-exclusion outcomes.
4. Exercise representative positive, negative, no-match, and incompatible cases; record actual observations and untested assumptions.
5. Produce do not optimize recall by allowing broad skills to activate on every keyword. with versioned inputs, evidence, limitations, and a safe next action.

## Validation checklist

- [ ] Relevant IDs/versions and input assumptions are captured.
- [ ] Hard safety/authorization/compatibility filters remain separate from relevance ranking.
- [ ] Positive and negative cases produce expected selection or abstention behavior.
- [ ] Private prompts and secrets are not written into shared evaluation data.
- [ ] Unmeasured quality or context savings are not claimed as facts.

## Required output

Do not optimize recall by allowing broad skills to activate on every keyword.

## Boundaries and failure handling

A new skill for broker security could incorrectly activate for generic network troubleshooting. If ground truth, policy, or runtime evidence is missing, report the uncertainty and avoid automatically composing an unsafe workflow.

## Trigger examples

- **Positive:** The task is about implementing a workflow, not evaluating when a skill should activate.
- **Negative:** undefined
