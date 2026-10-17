---
name: agent-skill-selection-explanation-record
description: "Records why each skill was selected or omitted for a task. Use when selection needs auditing, debugging, or reproducibility."
---

# Agent Skill Selection Explanation Record

## Purpose

query, candidate ranking, compatibility filters, versions, and selection policy

## Required inputs

Capture relevant query features, hard-filter outcomes, ranking evidence, and the reason each chosen skill contributes.

## Workflow

1. Inspect the exact task context, candidate records, and policy/version data before selection or composition.
2. Record excluded near-matches and the fallback decision when no candidate qualifies.
3. A selection receipt with query ID, catalog revision, chosen versions, rationales, and exclusions.
4. Exercise representative positive, negative, no-match, and incompatible cases; record actual observations and untested assumptions.
5. Produce do not log raw private prompts or credentials when a sanitized task summary is sufficient. with versioned inputs, evidence, limitations, and a safe next action.

## Validation checklist

- [ ] Relevant IDs/versions and input assumptions are captured.
- [ ] Hard safety/authorization/compatibility filters remain separate from relevance ranking.
- [ ] Positive and negative cases produce expected selection or abstention behavior.
- [ ] Private prompts and secrets are not written into shared evaluation data.
- [ ] Unmeasured quality or context savings are not claimed as facts.

## Required output

Do not log raw private prompts or credentials when a sanitized task summary is sufficient.

## Boundaries and failure handling

A user asks why an agent chose a certain procedure from the shared repository. If ground truth, policy, or runtime evidence is missing, report the uncertainty and avoid automatically composing an unsafe workflow.

## Trigger examples

- **Positive:** The task uses a single explicitly named skill and no audit is required.
- **Negative:** undefined
