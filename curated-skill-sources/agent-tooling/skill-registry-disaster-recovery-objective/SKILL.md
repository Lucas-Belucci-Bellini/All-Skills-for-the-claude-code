---
name: skill-registry-disaster-recovery-objective
description: "Defines recovery objectives for broker/catalog availability. Use when the shared skill service supports ongoing agent work."
---

# Skill Registry Disaster Recovery Objective

## Purpose

service architecture, backup/replica strategy, critical operations, and recovery constraints

## Required inputs

Set recovery time and data loss objectives separately for catalog content, search index, caches, and audit events.

## Workflow

1. Identify the exact service, release, or data boundary and applicable operational/security policy before changing behavior.
2. Map each objective to recovery steps and evidence, identifying components that cannot meet the target yet.
3. A disaster recovery matrix with objective, procedure, owner, and test cadence.
4. Test both expected operation and the relevant denial/failure path in an isolated environment, capturing evidence without sensitive content.
5. Produce do not claim availability targets that have not been tested in a failure drill. with scope, observations, limitations, and safe recovery or escalation steps.

## Validation checklist

- [ ] The affected service/component and version are explicit.
- [ ] Allowed and denied/failure behavior is defined before testing.
- [ ] Evidence distinguishes observed results from assumptions and skipped checks.
- [ ] Sensitive identifiers, tokens, prompts, and private skill content are not exposed.
- [ ] Any release, revocation, credential rotation, or destructive action has explicit authorization and rollback criteria.

## Required output

Do not claim availability targets that have not been tested in a failure drill.

## Boundaries and failure handling

A central broker becomes a dependency for several agent platforms. If the operation requires production access or a security decision outside the approved scope, stop and provide a safe, actionable blocker rather than attempting it.

## Trigger examples

- **Positive:** The library is accessed only as static files and has no service recovery requirement.
- **Negative:** undefined
