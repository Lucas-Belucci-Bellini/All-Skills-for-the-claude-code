---
name: skill-broker-tenant-quota-enforcement
description: "Defines resource quotas for search, downloads, indexing, and proposal submissions per tenant. Use when multiple teams share a broker."
---

# Skill Broker Tenant Quota Enforcement

## Purpose

tenant identity, workload estimates, endpoint costs, budget policy, and retry rules

## Required inputs

Set quotas by operation cost and response size, not only raw request count.

## Workflow

1. Identify the exact service, release, or data boundary and applicable operational/security policy before changing behavior.
2. Test quota isolation, reset windows, burst behavior, and denial responses without affecting other tenants.
3. A quota policy and test matrix with observed enforcement and fairness notes.
4. Test both expected operation and the relevant denial/failure path in an isolated environment, capturing evidence without sensitive content.
5. Produce do not return private tenant metrics or permit one tenant to starve all other users. with scope, observations, limitations, and safe recovery or escalation steps.

## Validation checklist

- [ ] The affected service/component and version are explicit.
- [ ] Allowed and denied/failure behavior is defined before testing.
- [ ] Evidence distinguishes observed results from assumptions and skipped checks.
- [ ] Sensitive identifiers, tokens, prompts, and private skill content are not exposed.
- [ ] Any release, revocation, credential rotation, or destructive action has explicit authorization and rollback criteria.

## Required output

Do not return private tenant metrics or permit one tenant to starve all other users.

## Boundaries and failure handling

A large workspace could overwhelm the service with automated skill queries. If the operation requires production access or a security decision outside the approved scope, stop and provide a safe, actionable blocker rather than attempting it.

## Trigger examples

- **Positive:** The broker is local to one user with no shared resource constraint.
- **Negative:** undefined
