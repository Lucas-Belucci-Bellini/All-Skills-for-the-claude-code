---
name: agent-skill-offline-age-disclosure
description: "Communicates the age and eligibility uncertainty of cached skills when disconnected. Use when offline work is allowed but may use stale instructions."
---

# Agent Offline Skill Age Disclosure

## Purpose

cached skill digest, fetched timestamp, last eligibility check, and revocation policy

## Required inputs

Determine which tasks can safely use pinned cached instructions and which require a live eligibility check.

## Workflow

1. Inspect the exact task context, candidate records, and policy/version data before selection or composition.
2. Present exact cached version, age, and stale/unknown status to the agent before continuing.
3. An offline-use decision with the version, age, permitted scope, and blocked operations.
4. Exercise representative positive, negative, no-match, and incompatible cases; record actual observations and untested assumptions.
5. Produce do not describe offline cache contents as latest-approved without a live or signed freshness proof. with versioned inputs, evidence, limitations, and a safe next action.

## Validation checklist

- [ ] Relevant IDs/versions and input assumptions are captured.
- [ ] Hard safety/authorization/compatibility filters remain separate from relevance ranking.
- [ ] Positive and negative cases produce expected selection or abstention behavior.
- [ ] Private prompts and secrets are not written into shared evaluation data.
- [ ] Unmeasured quality or context savings are not claimed as facts.

## Required output

Do not describe offline cache contents as latest-approved without a live or signed freshness proof.

## Boundaries and failure handling

An agent must continue a permitted local analysis during a broker outage. If ground truth, policy, or runtime evidence is missing, report the uncertainty and avoid automatically composing an unsafe workflow.

## Trigger examples

- **Positive:** The task requires a fresh security policy and cannot run offline.
- **Negative:** undefined
