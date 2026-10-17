---
name: agent-skill-search-query-rewrite
description: "Normalizes a task description into a retrieval query without changing user intent. Use when agents struggle to discover relevant skills."
---

# Agent Skill Search Query Rewrite

## Purpose

original task goal, constraints, agent/platform context, and broker query schema

## Required inputs

Extract the task action, domain, environment, required output, and key constraints while excluding irrelevant narrative.

## Workflow

1. Inspect the exact task context, candidate records, and policy/version data before selection or composition.
2. Test rewrites against exact and paraphrased tasks, ensuring critical version or safety terms are preserved.
3. A query set with original/rewrite pairs, expected relevant skills, and discarded context rationale.
4. Exercise representative positive, negative, no-match, and incompatible cases; record actual observations and untested assumptions.
5. Produce do not add assumptions or new requirements that were not present in the task. with versioned inputs, evidence, limitations, and a safe next action.

## Validation checklist

- [ ] Relevant IDs/versions and input assumptions are captured.
- [ ] Hard safety/authorization/compatibility filters remain separate from relevance ranking.
- [ ] Positive and negative cases produce expected selection or abstention behavior.
- [ ] Private prompts and secrets are not written into shared evaluation data.
- [ ] Unmeasured quality or context savings are not claimed as facts.

## Required output

Do not add assumptions or new requirements that were not present in the task.

## Boundaries and failure handling

An agent needs to search a large catalog from a verbose request. If ground truth, policy, or runtime evidence is missing, report the uncertainty and avoid automatically composing an unsafe workflow.

## Trigger examples

- **Positive:** The request is clear and an exact skill ID is already known.
- **Negative:** undefined
