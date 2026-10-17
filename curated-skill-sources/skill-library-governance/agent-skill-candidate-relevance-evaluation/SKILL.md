---
name: agent-skill-candidate-relevance-evaluation
description: "Evaluates candidate skills against a task before they enter context. Use when a retrieval result contains broad or only partially related skills."
---

# Agent Skill Candidate Relevance Evaluation

## Purpose

task criteria, candidate summaries, trigger examples, validation state, and platform compatibility

## Required inputs

Compare each candidate's intended task, inputs, outputs, prerequisites, and explicit non-goals against the request.

## Workflow

1. Inspect the exact task context, candidate records, and policy/version data before selection or composition.
2. Label candidates as direct match, useful dependency, optional reference, weak match, or mismatch with reason.
3. A relevance report with candidate labels, supporting evidence, and recommended selection.
4. Exercise representative positive, negative, no-match, and incompatible cases; record actual observations and untested assumptions.
5. Produce do not treat keyword overlap as proof the workflow is relevant. with versioned inputs, evidence, limitations, and a safe next action.

## Validation checklist

- [ ] Relevant IDs/versions and input assumptions are captured.
- [ ] Hard safety/authorization/compatibility filters remain separate from relevance ranking.
- [ ] Positive and negative cases produce expected selection or abstention behavior.
- [ ] Private prompts and secrets are not written into shared evaluation data.
- [ ] Unmeasured quality or context savings are not claimed as facts.

## Required output

Do not treat keyword overlap as proof the workflow is relevant.

## Boundaries and failure handling

Search returns several possible skills for one engineering task. If ground truth, policy, or runtime evidence is missing, report the uncertainty and avoid automatically composing an unsafe workflow.

## Trigger examples

- **Positive:** Only one exact, compatible skill is available and no ranking decision is needed.
- **Negative:** undefined
