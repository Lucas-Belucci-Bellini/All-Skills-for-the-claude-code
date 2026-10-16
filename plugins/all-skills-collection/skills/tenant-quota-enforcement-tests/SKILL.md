---
name: tenant-quota-enforcement-tests
description: "Use when validating per-tenant rate, storage, compute, or request quotas under concurrency and attempted bypasses; not for general multi-tenant data isolation."
---

# Tenant Quota Enforcement Tests

## Purpose

Prove that resource limits are enforced consistently per tenant without cross-tenant leakage or race-condition bypasses.

## Required inputs

Tenant identity model, quota definitions, measurement windows, enforcement locations, concurrency behavior, and reset/exception rules.

## Workflow

1. Translate each quota into a measurable invariant: resource, tenant key, window, limit, burst allowance, and expected rejection or degradation behavior.
2. Trace quota enforcement through API, background jobs, internal service calls, and administrative paths; identify places where tenant context may be missing.
3. Exercise boundary values, concurrent requests at the limit, retries, delayed resets, tenant switching, and internal bypass routes in a controlled test environment.
4. Inspect usage accounting after failures and retries, ensuring rejected or canceled work is handled according to the documented policy.

## Verification checklist

- [ ] Quota keys always include the canonical tenant identity.
- [ ] Concurrent work cannot exceed the stated policy because of a read-then-write race.
- [ ] Reset windows and burst rules are deterministic and testable.
- [ ] Administrative exceptions are explicit, authenticated, audited, and not available to ordinary tenant requests.

## Required output

A quota-to-enforcement map, adversarial boundary matrix, observed accounting results, and remediation list.

## Boundaries and failure handling

Use synthetic tenants and safe limits. Do not run load tests against production without explicit authorization and agreed ceilings.

When required evidence, permissions, or environment details are unavailable, stop at the supported analysis, record the missing prerequisite, and do not report an unexecuted validation as passing.

## Trigger examples

- **Positive:** Two simultaneous uploads sometimes let a tenant exceed its storage allowance.
- **Negative:** Checking that users from different tenants cannot read each other's records.
