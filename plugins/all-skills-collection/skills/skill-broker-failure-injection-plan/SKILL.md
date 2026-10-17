---
name: skill-broker-failure-injection-plan
description: "Designs controlled failure tests for broker dependencies. Use when validating recovery from index, storage, auth, or network failures."
---

# Skill Broker Failure Injection Plan

## Purpose

dependency graph, allowed test environment, failure modes, health metrics, and stop controls

## Required inputs

Choose bounded, reversible failure injections in an isolated environment and define expected behavior first.

## Workflow

1. Identify the exact service, release, or data boundary and applicable operational/security policy before changing behavior.
2. Test timeouts, corrupt index, denied auth, unavailable storage, and partial package fetch without touching production state.
3. A failure-injection matrix with expected behavior, observations, cleanup, and untested scenarios.
4. Test both expected operation and the relevant denial/failure path in an isolated environment, capturing evidence without sensitive content.
5. Produce do not interrupt production availability or trigger destructive failure injection without explicit authorization. with scope, observations, limitations, and safe recovery or escalation steps.

## Validation checklist

- [ ] The affected service/component and version are explicit.
- [ ] Allowed and denied/failure behavior is defined before testing.
- [ ] Evidence distinguishes observed results from assumptions and skipped checks.
- [ ] Sensitive identifiers, tokens, prompts, and private skill content are not exposed.
- [ ] Any release, revocation, credential rotation, or destructive action has explicit authorization and rollback criteria.

## Required output

Do not interrupt production availability or trigger destructive failure injection without explicit authorization.

## Boundaries and failure handling

The broker needs resilience testing before serving multiple agents. If the operation requires production access or a security decision outside the approved scope, stop and provide a safe, actionable blocker rather than attempting it.

## Trigger examples

- **Positive:** There is no running broker or failure-injection test environment.
- **Negative:** undefined
