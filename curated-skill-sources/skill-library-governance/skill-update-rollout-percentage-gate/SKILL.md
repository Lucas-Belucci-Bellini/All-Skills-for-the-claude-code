---
name: skill-update-rollout-percentage-gate
description: "Controls gradual rollout percentages for approved skill versions. Use when the broker can direct clients to different eligible releases."
---

# Skill Update Rollout Percentage Gate

## Purpose

release cohort policy, client identities/scopes, health metrics, rollout stages, and rollback threshold

## Required inputs

Define cohort selection so clients in a project can pin versions and avoid accidental cross-tenant rollout.

## Workflow

1. Identify the exact service, release, or data boundary and applicable operational/security policy before changing behavior.
2. Increase rollout only when observed retrieval, compatibility, and outcome indicators remain within predeclared thresholds.
3. A staged rollout policy with percentages/cohort rules and stop conditions.
4. Test both expected operation and the relevant denial/failure path in an isolated environment, capturing evidence without sensitive content.
5. Produce do not randomize pinned production clients away from their declared version. with scope, observations, limitations, and safe recovery or escalation steps.

## Validation checklist

- [ ] The affected service/component and version are explicit.
- [ ] Allowed and denied/failure behavior is defined before testing.
- [ ] Evidence distinguishes observed results from assumptions and skipped checks.
- [ ] Sensitive identifiers, tokens, prompts, and private skill content are not exposed.
- [ ] Any release, revocation, credential rotation, or destructive action has explicit authorization and rollback criteria.

## Required output

Do not randomize pinned production clients away from their declared version.

## Boundaries and failure handling

An approved skill update needs incremental exposure before general availability. If the operation requires production access or a security decision outside the approved scope, stop and provide a safe, actionable blocker rather than attempting it.

## Trigger examples

- **Positive:** The library is distributed as a fixed offline package with no cohort mechanism.
- **Negative:** undefined
