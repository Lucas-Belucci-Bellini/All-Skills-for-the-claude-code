---
name: agent-skill-revocation-cache-flush
description: "Defines how revoked skill content is removed from eligible caches. Use after a severe error or security issue affects a released version."
---

# Agent Skill Revocation Cache Flush

## Purpose

revoked skill ID/version/digest, cache inventory, adapter acknowledgements, and offline clients

## Required inputs

Enumerate known cache locations and distinguish disabling resolution from physical removal of cached bytes.

## Workflow

1. Inspect the exact task context, candidate records, and policy/version data before selection or composition.
2. Issue scoped invalidation, verify acknowledgements, and define what offline clients must do when they reconnect.
3. A revocation propagation report with confirmed, pending, and unreachable clients.
4. Exercise representative positive, negative, no-match, and incompatible cases; record actual observations and untested assumptions.
5. Produce do not claim all copies are erased when offline clients cannot be observed; preserve audit evidence. with versioned inputs, evidence, limitations, and a safe next action.

## Validation checklist

- [ ] Relevant IDs/versions and input assumptions are captured.
- [ ] Hard safety/authorization/compatibility filters remain separate from relevance ranking.
- [ ] Positive and negative cases produce expected selection or abstention behavior.
- [ ] Private prompts and secrets are not written into shared evaluation data.
- [ ] Unmeasured quality or context savings are not claimed as facts.

## Required output

Do not claim all copies are erased when offline clients cannot be observed; preserve audit evidence.

## Boundaries and failure handling

A published skill version must no longer be used as latest-approved. If ground truth, policy, or runtime evidence is missing, report the uncertainty and avoid automatically composing an unsafe workflow.

## Trigger examples

- **Positive:** A candidate was never distributed and has no client cache.
- **Negative:** undefined
