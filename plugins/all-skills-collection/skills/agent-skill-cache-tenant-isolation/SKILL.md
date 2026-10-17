---
name: agent-skill-cache-tenant-isolation
description: "Prevents one tenant or project from reading another project's cached skill content. Use when a broker cache may contain private skills."
---

# Agent Skill Cache Tenant Isolation

## Purpose

tenant/project IDs, cache keys, ACL policy, and disposable test identities

## Required inputs

Include authorization scope and immutable skill identity in cache key design where visibility differs by tenant.

## Workflow

1. Inspect the exact task context, candidate records, and policy/version data before selection or composition.
2. Test guessed keys, shared names, cross-tenant warming, and revoked access against server authorization.
3. An isolation test report with allowed/denied paths and cache-key policy.
4. Exercise representative positive, negative, no-match, and incompatible cases; record actual observations and untested assumptions.
5. Produce never treat an unguessable key or hidden ui element as access control. with versioned inputs, evidence, limitations, and a safe next action.

## Validation checklist

- [ ] Relevant IDs/versions and input assumptions are captured.
- [ ] Hard safety/authorization/compatibility filters remain separate from relevance ranking.
- [ ] Positive and negative cases produce expected selection or abstention behavior.
- [ ] Private prompts and secrets are not written into shared evaluation data.
- [ ] Unmeasured quality or context savings are not claimed as facts.

## Required output

Never treat an unguessable key or hidden UI element as access control.

## Boundaries and failure handling

Two workspaces use the same broker but have different private skills. If ground truth, policy, or runtime evidence is missing, report the uncertainty and avoid automatically composing an unsafe workflow.

## Trigger examples

- **Positive:** All cached skills are public and no tenant boundary exists.
- **Negative:** undefined
