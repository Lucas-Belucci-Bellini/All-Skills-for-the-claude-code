---
name: skill-update-rate-budget-policy
description: "Limits update churn and API load while maintaining security freshness. Use when a large client population polls or refreshes skills automatically."
---

# Skill Update Rate Budget Policy

## Purpose

client count, release frequency, cache policy, stale-risk tiers, and broker capacity budget

## Required inputs

Define minimum/maximum refresh intervals and immediate refresh behavior for revocations or critical fixes.

## Workflow

1. Identify the exact service, release, or data boundary and applicable operational/security policy before changing behavior.
2. Model worst-case polling and synchronize jitter/backoff to avoid burst traffic after a release.
3. A rate budget with normal refresh, urgent invalidation, and overload behavior.
4. Test both expected operation and the relevant denial/failure path in an isolated environment, capturing evidence without sensitive content.
5. Produce do not delay a critical revocation solely to honor a normal cache ttl. with scope, observations, limitations, and safe recovery or escalation steps.

## Validation checklist

- [ ] The affected service/component and version are explicit.
- [ ] Allowed and denied/failure behavior is defined before testing.
- [ ] Evidence distinguishes observed results from assumptions and skipped checks.
- [ ] Sensitive identifiers, tokens, prompts, and private skill content are not exposed.
- [ ] Any release, revocation, credential rotation, or destructive action has explicit authorization and rollback criteria.

## Required output

Do not delay a critical revocation solely to honor a normal cache TTL.

## Boundaries and failure handling

Many agents refresh the shared catalog after every commit. If the operation requires production access or a security decision outside the approved scope, stop and provide a safe, actionable blocker rather than attempting it.

## Trigger examples

- **Positive:** A small static local library is updated manually.
- **Negative:** undefined
