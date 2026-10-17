---
name: agent-skill-overlap-resolution-policy
description: "Defines how to resolve overlapping candidate skills. Use when several skills cover similar parts of a task and may conflict."
---

# Agent Skill Overlap Resolution Policy

## Purpose

candidate skills, task decomposition, dependency declarations, priority rules, and safety constraints

## Required inputs

Determine whether candidates are duplicates, complementary steps, alternative approaches, or conflicting procedures.

## Workflow

1. Inspect the exact task context, candidate records, and policy/version data before selection or composition.
2. Prefer a minimal coherent set and preserve explicit precedence where instructions genuinely conflict.
3. A resolution record with included/excluded skills and rationale.
4. Exercise representative positive, negative, no-match, and incompatible cases; record actual observations and untested assumptions.
5. Produce do not silently merge conflicting instructions or let ranking erase a safety requirement. with versioned inputs, evidence, limitations, and a safe next action.

## Validation checklist

- [ ] Relevant IDs/versions and input assumptions are captured.
- [ ] Hard safety/authorization/compatibility filters remain separate from relevance ranking.
- [ ] Positive and negative cases produce expected selection or abstention behavior.
- [ ] Private prompts and secrets are not written into shared evaluation data.
- [ ] Unmeasured quality or context savings are not claimed as facts.

## Required output

Do not silently merge conflicting instructions or let ranking erase a safety requirement.

## Boundaries and failure handling

Two retrieved skills propose different update and rollback procedures. If ground truth, policy, or runtime evidence is missing, report the uncertainty and avoid automatically composing an unsafe workflow.

## Trigger examples

- **Positive:** Only one matching candidate exists.
- **Negative:** undefined
