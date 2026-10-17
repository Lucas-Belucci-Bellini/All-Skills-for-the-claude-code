---
name: skill-broker-api-key-rotation-procedure
description: "Defines a low-risk rotation process for broker API credentials. Use when a service identity key needs replacement or revocation."
---

# Skill Broker API Key Rotation Procedure

## Purpose

secret store, consumer inventory, rotation window, overlap policy, and rollback/incident plan

## Required inputs

Inventory consumers and scopes without copying any credential values into tickets or skills.

## Workflow

1. Identify the exact service, release, or data boundary and applicable operational/security policy before changing behavior.
2. Create a replacement key with minimum permissions, test it, switch consumers, verify use, then revoke the old key.
3. A rotation runbook with owners, non-secret identifiers, verification, and rollback criteria.
4. Test both expected operation and the relevant denial/failure path in an isolated environment, capturing evidence without sensitive content.
5. Produce never include api key values in commits, logs, or issue comments; do not revoke the only working key before testing replacement. with scope, observations, limitations, and safe recovery or escalation steps.

## Validation checklist

- [ ] The affected service/component and version are explicit.
- [ ] Allowed and denied/failure behavior is defined before testing.
- [ ] Evidence distinguishes observed results from assumptions and skipped checks.
- [ ] Sensitive identifiers, tokens, prompts, and private skill content are not exposed.
- [ ] Any release, revocation, credential rotation, or destructive action has explicit authorization and rollback criteria.

## Required output

Never include API key values in commits, logs, or issue comments; do not revoke the only working key before testing replacement.

## Boundaries and failure handling

A broker token is due for scheduled rotation. If the operation requires production access or a security decision outside the approved scope, stop and provide a safe, actionable blocker rather than attempting it.

## Trigger examples

- **Positive:** The integration uses no credential or key-based authentication.
- **Negative:** undefined
