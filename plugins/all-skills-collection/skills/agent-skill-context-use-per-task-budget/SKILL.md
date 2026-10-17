---
name: agent-skill-context-use-per-task-budget
description: "Allocates a context budget among selected skills, references, and task artifacts. Use when an agent needs multiple skills under a strict window."
---

# Agent Skill Context Use per Task Budget

## Purpose

available context, task inputs, required skills, tool results, and budget policy

## Required inputs

Reserve space for user request, project rules, tool feedback, and final evidence before allocating skill content.

## Workflow

1. Inspect the exact task context, candidate records, and policy/version data before selection or composition.
2. Track planned and actual context consumption by source and trim optional references before required steps.
3. A per-task context budget with included sources, reserve, and exceeded-limit behavior.
4. Exercise representative positive, negative, no-match, and incompatible cases; record actual observations and untested assumptions.
5. Produce do not truncate required safety/validation steps or treat omitted references as consulted. with versioned inputs, evidence, limitations, and a safe next action.

## Validation checklist

- [ ] Relevant IDs/versions and input assumptions are captured.
- [ ] Hard safety/authorization/compatibility filters remain separate from relevance ranking.
- [ ] Positive and negative cases produce expected selection or abstention behavior.
- [ ] Private prompts and secrets are not written into shared evaluation data.
- [ ] Unmeasured quality or context savings are not claimed as facts.

## Required output

Do not truncate required safety/validation steps or treat omitted references as consulted.

## Boundaries and failure handling

Several selected skills compete for context during a complex task. If ground truth, policy, or runtime evidence is missing, report the uncertainty and avoid automatically composing an unsafe workflow.

## Trigger examples

- **Positive:** The task has ample context and only one short skill is selected.
- **Negative:** undefined
