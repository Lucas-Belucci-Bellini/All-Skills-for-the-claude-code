---
name: skill-update-circuit-breaker
description: "Stops an update rollout when predefined error or regression thresholds are exceeded. Use when multiple clients may receive a new skill version."
---

# Skill Update Circuit Breaker

## Purpose

baseline metrics, release metrics, threshold policy, rollback capability, and observation window

## Required inputs

Define error signals, minimum sample sizes, duration, and false-alarm handling before rollout.

## Workflow

1. Identify the exact service, release, or data boundary and applicable operational/security policy before changing behavior.
2. Simulate correlated failures and verify the system stops expansion and restores last-known-good resolution when policy requires it.
3. A circuit-breaker policy with threshold rationale, test results, and reset conditions.
4. Test both expected operation and the relevant denial/failure path in an isolated environment, capturing evidence without sensitive content.
5. Produce do not let a single unverified model judgment trigger irreversible deletion or unreviewed code changes. with scope, observations, limitations, and safe recovery or escalation steps.

## Validation checklist

- [ ] The affected service/component and version are explicit.
- [ ] Allowed and denied/failure behavior is defined before testing.
- [ ] Evidence distinguishes observed results from assumptions and skipped checks.
- [ ] Sensitive identifiers, tokens, prompts, and private skill content are not exposed.
- [ ] Any release, revocation, credential rotation, or destructive action has explicit authorization and rollback criteria.

## Required output

Do not let a single unverified model judgment trigger irreversible deletion or unreviewed code changes.

## Boundaries and failure handling

An updated retrieval or safety skill causes a spike in failures. If the operation requires production access or a security decision outside the approved scope, stop and provide a safe, actionable blocker rather than attempting it.

## Trigger examples

- **Positive:** There is no dynamic version distribution or rollout state.
- **Negative:** undefined
