---
name: agent-skill-retrieval-recall-measurement
description: "Measures whether relevant skills appear among retrieved candidates. Use when optimizing discovery completeness."
---

# Agent Skill Retrieval Recall Measurement

## Purpose

labeled retrieval dataset, relevant skill IDs, top-k results, and catalog revision

## Required inputs

Calculate recall at configured cutoffs and segment by domain, wording, and platform compatibility.

## Workflow

1. Inspect the exact task context, candidate records, and policy/version data before selection or composition.
2. Inspect missed labels to distinguish poor metadata, missing skills, filters, and ranking errors.
3. A recall report with denominator, cutoffs, slices, and observed misses.
4. Exercise representative positive, negative, no-match, and incompatible cases; record actual observations and untested assumptions.
5. Produce do not call search complete when the gold labels cover only a small subset of tasks. with versioned inputs, evidence, limitations, and a safe next action.

## Validation checklist

- [ ] Relevant IDs/versions and input assumptions are captured.
- [ ] Hard safety/authorization/compatibility filters remain separate from relevance ranking.
- [ ] Positive and negative cases produce expected selection or abstention behavior.
- [ ] Private prompts and secrets are not written into shared evaluation data.
- [ ] Unmeasured quality or context savings are not claimed as facts.

## Required output

Do not call search complete when the gold labels cover only a small subset of tasks.

## Boundaries and failure handling

Relevant skills are repeatedly absent from top results. If ground truth, policy, or runtime evidence is missing, report the uncertainty and avoid automatically composing an unsafe workflow.

## Trigger examples

- **Positive:** No ground-truth relevance labels exist and a recall score would be misleading.
- **Negative:** undefined
