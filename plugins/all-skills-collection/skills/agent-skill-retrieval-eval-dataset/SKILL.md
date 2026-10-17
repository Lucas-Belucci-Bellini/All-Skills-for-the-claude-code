---
name: agent-skill-retrieval-eval-dataset
description: "Builds a versioned query set for skill search quality. Use before changing retrieval, metadata, or ranking logic."
---

# Agent Skill Retrieval Evaluation Dataset

## Purpose

representative tasks, expected skill IDs, negative candidates, and privacy policy

## Required inputs

Sample across domains, ambiguous requests, no-match cases, agent incompatibility, and sensitive boundaries.

## Workflow

1. Inspect the exact task context, candidate records, and policy/version data before selection or composition.
2. Store minimal synthetic/sanitized query text with expected candidate labels and evaluation criteria.
3. A dataset manifest with query IDs, labels, coverage, provenance, and split strategy.
4. Exercise representative positive, negative, no-match, and incompatible cases; record actual observations and untested assumptions.
5. Produce do not include private conversation data or credentials as retrieval examples without authorization and sanitization. with versioned inputs, evidence, limitations, and a safe next action.

## Validation checklist

- [ ] Relevant IDs/versions and input assumptions are captured.
- [ ] Hard safety/authorization/compatibility filters remain separate from relevance ranking.
- [ ] Positive and negative cases produce expected selection or abstention behavior.
- [ ] Private prompts and secrets are not written into shared evaluation data.
- [ ] Unmeasured quality or context savings are not claimed as facts.

## Required output

Do not include private conversation data or credentials as retrieval examples without authorization and sanitization.

## Boundaries and failure handling

A broker update needs repeatable evaluation of discovery quality. If ground truth, policy, or runtime evidence is missing, report the uncertainty and avoid automatically composing an unsafe workflow.

## Trigger examples

- **Positive:** There is no search or automatic selection behavior to evaluate.
- **Negative:** undefined
