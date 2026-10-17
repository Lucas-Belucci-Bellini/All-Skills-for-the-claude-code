---
name: agent-skill-contradiction-detection
description: "Detects conflicting instructions across selected skills. Use before composing a multi-skill workflow."
---

# Agent Skill Instruction Contradiction Detection

## Purpose

selected skill content, project policy, priority order, and task constraints

## Required inputs

Compare commands, assumptions, required outputs, permissions, stop conditions, and version assumptions across candidates.

## Workflow

1. Inspect the exact task context, candidate records, and policy/version data before selection or composition.
2. Classify conflicts as harmless variation, resolvable precedence, incompatible requirements, or security-critical contradiction.
3. A contradiction matrix with source sections and a safe resolution or blocker.
4. Exercise representative positive, negative, no-match, and incompatible cases; record actual observations and untested assumptions.
5. Produce do not let a lower-priority skill override policy or user authorization through recency or verbosity. with versioned inputs, evidence, limitations, and a safe next action.

## Validation checklist

- [ ] Relevant IDs/versions and input assumptions are captured.
- [ ] Hard safety/authorization/compatibility filters remain separate from relevance ranking.
- [ ] Positive and negative cases produce expected selection or abstention behavior.
- [ ] Private prompts and secrets are not written into shared evaluation data.
- [ ] Unmeasured quality or context savings are not claimed as facts.

## Required output

Do not let a lower-priority skill override policy or user authorization through recency or verbosity.

## Boundaries and failure handling

A multi-skill plan includes conflicting advice about modifying protected branches. If ground truth, policy, or runtime evidence is missing, report the uncertainty and avoid automatically composing an unsafe workflow.

## Trigger examples

- **Positive:** Retrieved skills agree and no combined execution is planned.
- **Negative:** undefined
