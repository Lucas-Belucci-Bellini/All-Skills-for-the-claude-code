---
name: agent-skill-cache-ttl-policy
description: "Defines cache freshness for metadata, skill bodies, approvals, and revocation state. Use when versions can be updated or withdrawn."
---

# Agent Skill Cache TTL Policy

## Purpose

release frequency, risk classification, cache layers, revocation needs, and offline requirements

## Required inputs

Set freshness windows separately for content, compatibility metadata, and revocation state.

## Workflow

1. Inspect the exact task context, candidate records, and policy/version data before selection or composition.
2. Test stale data behavior under offline and slow-refresh cases and define explicit warnings or fetch failures.
3. A TTL matrix with rationale, freshness guarantees, and cache invalidation tests.
4. Exercise representative positive, negative, no-match, and incompatible cases; record actual observations and untested assumptions.
5. Produce do not use a long content ttl to cache security eligibility indefinitely. with versioned inputs, evidence, limitations, and a safe next action.

## Validation checklist

- [ ] Relevant IDs/versions and input assumptions are captured.
- [ ] Hard safety/authorization/compatibility filters remain separate from relevance ranking.
- [ ] Positive and negative cases produce expected selection or abstention behavior.
- [ ] Private prompts and secrets are not written into shared evaluation data.
- [ ] Unmeasured quality or context savings are not claimed as facts.

## Required output

Do not use a long content TTL to cache security eligibility indefinitely.

## Boundaries and failure handling

Agents may use stale skills after new versions or revocations. If ground truth, policy, or runtime evidence is missing, report the uncertainty and avoid automatically composing an unsafe workflow.

## Trigger examples

- **Positive:** The content is immutable and no revocation or version freshness is required.
- **Negative:** undefined
