---
name: skill-registry-incident-response-runbook
description: "Provides safe response steps for registry outage, corrupted release, or credential exposure. Use when a broker incident affects skill availability or trust."
---

# Skill Registry Incident Response Runbook

## Purpose

incident classes, on-call roles, release/rollback controls, audit logs, and communication rules

## Required inputs

Define triage severity, containment, evidence preservation, and when to disable resolution or revoke a version.

## Workflow

1. Identify the exact service, release, or data boundary and applicable operational/security policy before changing behavior.
2. Test decision branches for service outage, unauthorized access, unsafe skill release, and integrity mismatch.
3. An incident runbook with decision tree, owner roles, evidence requirements, and recovery steps.
4. Test both expected operation and the relevant denial/failure path in an isolated environment, capturing evidence without sensitive content.
5. Produce do not delete logs or rotate/revoke production credentials without an authorized incident procedure. with scope, observations, limitations, and safe recovery or escalation steps.

## Validation checklist

- [ ] The affected service/component and version are explicit.
- [ ] Allowed and denied/failure behavior is defined before testing.
- [ ] Evidence distinguishes observed results from assumptions and skipped checks.
- [ ] Sensitive identifiers, tokens, prompts, and private skill content are not exposed.
- [ ] Any release, revocation, credential rotation, or destructive action has explicit authorization and rollback criteria.

## Required output

Do not delete logs or rotate/revoke production credentials without an authorized incident procedure.

## Boundaries and failure handling

A released skill is found to be unsafe and must be withdrawn quickly. If the operation requires production access or a security decision outside the approved scope, stop and provide a safe, actionable blocker rather than attempting it.

## Trigger examples

- **Positive:** The task is ordinary feature authoring without an incident or operational service.
- **Negative:** undefined
