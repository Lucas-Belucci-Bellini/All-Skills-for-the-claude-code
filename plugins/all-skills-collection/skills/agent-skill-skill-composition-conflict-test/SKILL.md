---
name: agent-skill-skill-composition-conflict-test
description: "Tests whether a selected combination of skills can be executed without contradictory steps. Use when multi-skill workflows are composed automatically."
---

# Agent Skill Composition Conflict Test

## Purpose

candidate skill set, declared dependencies, shared inputs/outputs, and project policy

## Required inputs

Construct a small composition plan and check for conflicting assumptions, file ownership, versions, and write scopes.

## Workflow

1. Inspect the exact task context, candidate records, and policy/version data before selection or composition.
2. Run a synthetic handoff through the selected procedures and validate that outputs from one step satisfy the next step's inputs.
3. A composition report with conflicts, ordering constraints, and conditions for safe execution.
4. Exercise representative positive, negative, no-match, and incompatible cases; record actual observations and untested assumptions.
5. Produce do not combine two independently valid skills without checking their joint side effects. with versioned inputs, evidence, limitations, and a safe next action.

## Validation checklist

- [ ] Relevant IDs/versions and input assumptions are captured.
- [ ] Hard safety/authorization/compatibility filters remain separate from relevance ranking.
- [ ] Positive and negative cases produce expected selection or abstention behavior.
- [ ] Private prompts and secrets are not written into shared evaluation data.
- [ ] Unmeasured quality or context savings are not claimed as facts.

## Required output

Do not combine two independently valid skills without checking their joint side effects.

## Boundaries and failure handling

A planner combines diagnostic, patching, and release skills for one task. If ground truth, policy, or runtime evidence is missing, report the uncertainty and avoid automatically composing an unsafe workflow.

## Trigger examples

- **Positive:** Only one skill is selected and no composition occurs.
- **Negative:** undefined
