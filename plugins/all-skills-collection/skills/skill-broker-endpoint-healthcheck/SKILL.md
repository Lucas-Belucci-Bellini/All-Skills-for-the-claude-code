---
name: skill-broker-endpoint-healthcheck
description: "Defines health probes that verify broker readiness without leaking private catalog data. Use in deployment and adapter diagnostics."
---

# Skill Broker Endpoint Health Check

## Purpose

service endpoints, dependencies, health objectives, authentication policy, and safe response constraints

## Required inputs

Separate liveness from readiness and check registry/index availability, schema compatibility, and authentication backend health.

## Workflow

1. Identify the exact service, release, or data boundary and applicable operational/security policy before changing behavior.
2. Confirm probes return minimal status without listing skills, identities, tokens, or sensitive dependency details.
3. A health-check contract with response schema, dependencies, and test cases.
4. Test both expected operation and the relevant denial/failure path in an isolated environment, capturing evidence without sensitive content.
5. Produce do not expose private resource names or environment variables in unauthenticated health endpoints. with scope, observations, limitations, and safe recovery or escalation steps.

## Validation checklist

- [ ] The affected service/component and version are explicit.
- [ ] Allowed and denied/failure behavior is defined before testing.
- [ ] Evidence distinguishes observed results from assumptions and skipped checks.
- [ ] Sensitive identifiers, tokens, prompts, and private skill content are not exposed.
- [ ] Any release, revocation, credential rotation, or destructive action has explicit authorization and rollback criteria.

## Required output

Do not expose private resource names or environment variables in unauthenticated health endpoints.

## Boundaries and failure handling

A connector needs to distinguish network reachability from broker readiness. If the operation requires production access or a security decision outside the approved scope, stop and provide a safe, actionable blocker rather than attempting it.

## Trigger examples

- **Positive:** The service has no endpoint or health monitoring.
- **Negative:** undefined
