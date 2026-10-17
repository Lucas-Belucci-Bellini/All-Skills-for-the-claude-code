---
name: skill-registry-maintenance-window-contract
description: "Defines how catalog/index maintenance affects clients. Use when a registry rebuild or schema change could interrupt retrieval."
---

# Skill Registry Maintenance Window Contract

## Purpose

maintenance tasks, client retry policy, release freeze policy, availability goals, and operator roles

## Required inputs

Classify which operations can continue during maintenance and which must return retryable or blocked status.

## Workflow

1. Identify the exact service, release, or data boundary and applicable operational/security policy before changing behavior.
2. Test active fetches, cache refreshes, queued proposals, and rollback during a controlled window.
3. A maintenance runbook with communication, status responses, and validation criteria.
4. Test both expected operation and the relevant denial/failure path in an isolated environment, capturing evidence without sensitive content.
5. Produce do not silently accept writes that could be lost during maintenance. with scope, observations, limitations, and safe recovery or escalation steps.

## Validation checklist

- [ ] The affected service/component and version are explicit.
- [ ] Allowed and denied/failure behavior is defined before testing.
- [ ] Evidence distinguishes observed results from assumptions and skipped checks.
- [ ] Sensitive identifiers, tokens, prompts, and private skill content are not exposed.
- [ ] Any release, revocation, credential rotation, or destructive action has explicit authorization and rollback criteria.

## Required output

Do not silently accept writes that could be lost during maintenance.

## Boundaries and failure handling

A search index or registry schema needs a planned migration. If the operation requires production access or a security decision outside the approved scope, stop and provide a safe, actionable blocker rather than attempting it.

## Trigger examples

- **Positive:** The library is static and requires no online maintenance.
- **Negative:** undefined
