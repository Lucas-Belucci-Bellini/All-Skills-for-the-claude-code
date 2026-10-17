---
name: skill-broker-service-dependency-health
description: "Monitors dependencies needed for search and retrieval. Use when the broker depends on storage, identity, indexing, or package hosts."
---

# Skill Broker Service Dependency Health

## Purpose

service dependency graph, health probes, expected failure behavior, and alert thresholds

## Required inputs

Map each dependency to required/optional status and define how failure affects individual operations.

## Workflow

1. Identify the exact service, release, or data boundary and applicable operational/security policy before changing behavior.
2. Exercise a dependency outage and verify the broker reports degraded capabilities without false success or permission bypass.
3. A dependency health matrix with alerts, degraded modes, and recovery checks.
4. Test both expected operation and the relevant denial/failure path in an isolated environment, capturing evidence without sensitive content.
5. Produce do not classify a required authorization dependency as optional just to preserve uptime. with scope, observations, limitations, and safe recovery or escalation steps.

## Validation checklist

- [ ] The affected service/component and version are explicit.
- [ ] Allowed and denied/failure behavior is defined before testing.
- [ ] Evidence distinguishes observed results from assumptions and skipped checks.
- [ ] Sensitive identifiers, tokens, prompts, and private skill content are not exposed.
- [ ] Any release, revocation, credential rotation, or destructive action has explicit authorization and rollback criteria.

## Required output

Do not classify a required authorization dependency as optional just to preserve uptime.

## Boundaries and failure handling

Search is available but package fetch or authentication service may be degraded. If the operation requires production access or a security decision outside the approved scope, stop and provide a safe, actionable blocker rather than attempting it.

## Trigger examples

- **Positive:** No service dependencies exist beyond a static local directory.
- **Negative:** undefined
