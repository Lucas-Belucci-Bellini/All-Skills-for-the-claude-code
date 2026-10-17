---
name: agent-skill-dependency-closure-check
description: "Verifies that a selected skill set includes required dependencies. Use before handing an orchestrated task to an agent."
---

# Agent Skill Dependency Closure Check

## Purpose

selected skill IDs/versions, dependency metadata, project constraints, and budget

## Required inputs

Resolve declared mandatory dependencies while deduplicating exact immutable versions.

## Workflow

1. Inspect the exact task context, candidate records, and policy/version data before selection or composition.
2. Report missing, incompatible, revoked, or cyclic dependencies and distinguish optional references from required prerequisites.
3. A dependency closure report with ordering and blockers.
4. Exercise representative positive, negative, no-match, and incompatible cases; record actual observations and untested assumptions.
5. Produce do not invent dependencies or assume a similarly named skill satisfies a required id. with versioned inputs, evidence, limitations, and a safe next action.

## Validation checklist

- [ ] Relevant IDs/versions and input assumptions are captured.
- [ ] Hard safety/authorization/compatibility filters remain separate from relevance ranking.
- [ ] Positive and negative cases produce expected selection or abstention behavior.
- [ ] Private prompts and secrets are not written into shared evaluation data.
- [ ] Unmeasured quality or context savings are not claimed as facts.

## Required output

Do not invent dependencies or assume a similarly named skill satisfies a required ID.

## Boundaries and failure handling

A workflow's main skill depends on a mandatory validation or rollback skill. If ground truth, policy, or runtime evidence is missing, report the uncertainty and avoid automatically composing an unsafe workflow.

## Trigger examples

- **Positive:** The selected skill is verified as self-contained.
- **Negative:** undefined
