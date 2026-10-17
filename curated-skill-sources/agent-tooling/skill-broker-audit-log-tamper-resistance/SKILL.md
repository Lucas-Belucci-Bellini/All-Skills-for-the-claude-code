---
name: skill-broker-audit-log-tamper-resistance
description: "Evaluates whether audit events can be altered or deleted without detection. Use for approval and release accountability."
---

# Skill Broker Audit Log Tamper Resistance

## Purpose

audit storage, retention policy, writer identities, integrity scheme, and incident process

## Required inputs

Separate write roles from readers and define append-only or integrity-protected storage where supported.

## Workflow

1. Identify the exact service, release, or data boundary and applicable operational/security policy before changing behavior.
2. Test unauthorized update/delete, missing event ranges, altered hashes, and retention expiry behavior.
3. An audit-log integrity report with detected tamper cases and recovery steps.
4. Test both expected operation and the relevant denial/failure path in an isolated environment, capturing evidence without sensitive content.
5. Produce do not store secrets merely to strengthen audit logs; integrity metadata must be privacy-safe. with scope, observations, limitations, and safe recovery or escalation steps.

## Validation checklist

- [ ] The affected service/component and version are explicit.
- [ ] Allowed and denied/failure behavior is defined before testing.
- [ ] Evidence distinguishes observed results from assumptions and skipped checks.
- [ ] Sensitive identifiers, tokens, prompts, and private skill content are not exposed.
- [ ] Any release, revocation, credential rotation, or destructive action has explicit authorization and rollback criteria.

## Required output

Do not store secrets merely to strengthen audit logs; integrity metadata must be privacy-safe.

## Boundaries and failure handling

An approval history must be reliable during incident review. If the operation requires production access or a security decision outside the approved scope, stop and provide a safe, actionable blocker rather than attempting it.

## Trigger examples

- **Positive:** No persistent audit log or regulated approval workflow exists.
- **Negative:** undefined
