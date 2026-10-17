---
name: skill-registry-data-retention-policy
description: "Defines retention and deletion rules for skill request metadata and feedback. Use when storing broker usage or gap reports."
---

# Skill Registry Data Retention Policy

## Purpose

data categories, privacy constraints, operational needs, legal requirements, and storage locations

## Required inputs

Classify catalog metadata, request telemetry, sanitized feedback, approvals, and raw diagnostic evidence separately.

## Workflow

1. Identify the exact service, release, or data boundary and applicable operational/security policy before changing behavior.
2. Set retention duration, deletion method, exceptions, access roles, and proof of deletion for each class.
3. A retention matrix with owners, periods, deletion behavior, and audit evidence.
4. Test both expected operation and the relevant denial/failure path in an isolated environment, capturing evidence without sensitive content.
5. Produce do not retain raw conversation transcripts by default or invent legal compliance guarantees. with scope, observations, limitations, and safe recovery or escalation steps.

## Validation checklist

- [ ] The affected service/component and version are explicit.
- [ ] Allowed and denied/failure behavior is defined before testing.
- [ ] Evidence distinguishes observed results from assumptions and skipped checks.
- [ ] Sensitive identifiers, tokens, prompts, and private skill content are not exposed.
- [ ] Any release, revocation, credential rotation, or destructive action has explicit authorization and rollback criteria.

## Required output

Do not retain raw conversation transcripts by default or invent legal compliance guarantees.

## Boundaries and failure handling

The service collects skill usage and failure feedback over time. If the operation requires production access or a security decision outside the approved scope, stop and provide a safe, actionable blocker rather than attempting it.

## Trigger examples

- **Positive:** The registry is static and stores no user-linked request data.
- **Negative:** undefined
