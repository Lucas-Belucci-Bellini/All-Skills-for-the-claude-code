---
name: agent-skill-context-compression-safety
description: "Compresses skill context without dropping critical conditions or safety constraints. Use when a task exceeds an agent's available context."
---

# Agent Skill Context Compression Safety

## Purpose

full selected skills, token budget, required assertions, and compression policy

## Required inputs

Identify non-negotiable steps, stop conditions, required inputs, and validation evidence before summarizing examples.

## Workflow

1. Inspect the exact task context, candidate records, and policy/version data before selection or composition.
2. Compare the compressed representation against the source checklist and test that each required obligation remains present.
3. A compact task context with a source-to-summary coverage map.
4. Exercise representative positive, negative, no-match, and incompatible cases; record actual observations and untested assumptions.
5. Produce do not compress away approval requirements, verification steps, or negative conditions. with versioned inputs, evidence, limitations, and a safe next action.

## Validation checklist

- [ ] Relevant IDs/versions and input assumptions are captured.
- [ ] Hard safety/authorization/compatibility filters remain separate from relevance ranking.
- [ ] Positive and negative cases produce expected selection or abstention behavior.
- [ ] Private prompts and secrets are not written into shared evaluation data.
- [ ] Unmeasured quality or context savings are not claimed as facts.

## Required output

Do not compress away approval requirements, verification steps, or negative conditions.

## Boundaries and failure handling

Several long skills exceed available context and need staged loading. If ground truth, policy, or runtime evidence is missing, report the uncertainty and avoid automatically composing an unsafe workflow.

## Trigger examples

- **Positive:** The available context is sufficient for the full instructions.
- **Negative:** undefined
