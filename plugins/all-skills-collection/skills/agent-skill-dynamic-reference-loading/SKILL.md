---
name: agent-skill-dynamic-reference-loading
description: "Loads supporting reference files only when a workflow step needs them. Use when a skill has long references or optional implementation details."
---

# Agent Dynamic Reference Loading

## Purpose

selected skill, relative reference map, context budget, and step plan

## Required inputs

Map each workflow stage to only the references required for that decision or step.

## Workflow

1. Inspect the exact task context, candidate records, and policy/version data before selection or composition.
2. Resolve file paths safely and load referenced content just before use, preserving the canonical source version.
3. A reference-loading plan with loaded paths, version identity, and omitted optional material.
4. Exercise representative positive, negative, no-match, and incompatible cases; record actual observations and untested assumptions.
5. Produce do not omit a required safety reference because its title appears optional or its contents are lengthy. with versioned inputs, evidence, limitations, and a safe next action.

## Validation checklist

- [ ] Relevant IDs/versions and input assumptions are captured.
- [ ] Hard safety/authorization/compatibility filters remain separate from relevance ranking.
- [ ] Positive and negative cases produce expected selection or abstention behavior.
- [ ] Private prompts and secrets are not written into shared evaluation data.
- [ ] Unmeasured quality or context savings are not claimed as facts.

## Required output

Do not omit a required safety reference because its title appears optional or its contents are lengthy.

## Boundaries and failure handling

A skill has several long references but the current task needs only one. If ground truth, policy, or runtime evidence is missing, report the uncertainty and avoid automatically composing an unsafe workflow.

## Trigger examples

- **Positive:** The complete skill is a short self-contained file with no references.
- **Negative:** undefined
