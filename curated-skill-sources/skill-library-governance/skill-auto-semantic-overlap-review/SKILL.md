---
name: skill-auto-semantic-overlap-review
description: "Finds likely scope overlap between a proposed skill and the existing catalog. Use before accepting additions to a large library."
---

# Automated Semantic Overlap Review

## Purpose

new skill purpose/triggers, catalog summaries, candidate neighbors, and duplicate policy

## Required inputs

Compare task goal, inputs, workflow, outputs, and boundaries instead of relying on slug similarity alone.

## Workflow

1. Inspect the canonical source, current repository rules, and the exact change request before taking action.
2. Recommend accept, differentiate, extend-existing, merge-for-review, or reject with explicit reasons.
3. A semantic overlap table with nearest neighbors and a requested human decision.
4. Verify behavior with positive and negative fixtures and record skipped runtime checks, unresolved evidence, or required human decisions.
5. Produce do not silently delete or merge a skill based on a model's similarity score. tied to the exact candidate version/digest and request ID.

## Validation checklist

- [ ] Scope and expected change are documented before generating or accepting output.
- [ ] Existing neighboring skills and repository policy are considered.
- [ ] Positive and negative cases are explicit and failures are not described as successes.
- [ ] Security, provenance, compatibility, and rollback requirements are handled where relevant.
- [ ] Unexecuted checks and required approvals remain visibly pending.

## Required output

Do not silently delete or merge a skill based on a model's similarity score.

## Boundaries and failure handling

A proposed skill covers a narrow task already handled by several existing skills. If required evidence or approval is missing, stop promotion and return a precise blocker. Never write directly to the protected main branch through this skill.

## Trigger examples

- **Positive:** The skill solves a demonstrated unique task with no nearby candidates.
- **Negative:** undefined
