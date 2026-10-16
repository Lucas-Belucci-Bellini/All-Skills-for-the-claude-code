---
name: multi-tenant-data-boundary
description: Audit tenant isolation across queries, storage paths, background jobs, exports, caches, and service-to-service calls.
---

# Multi Tenant Data Boundary

## Goal

Ensure every operation is scoped to the intended tenant even when code paths bypass ordinary row-level database policies.

## Inputs to inspect

Tenant model, request context, database queries, file/object storage, job queues, caches, exports, and admin paths.

## Workflow

1. Define the canonical tenant identity and how it is authenticated, propagated, and validated at each API and worker boundary.
2. Trace reads, writes, list queries, aggregation, search, storage object names, exports, and background jobs for missing tenant predicates or ownership checks.
3. Check composite uniqueness and foreign-key relationships where identifiers that appear globally unique could still cross tenant boundaries.
4. Test with two or more seeded tenants, attempting cross-tenant IDs, changed request context, delayed jobs, cached results, export links, and admin impersonation flows.
5. Add defense-in-depth constraints and negative tests; document privileged system-wide operations and the approval/audit path they require.

## Validation checklist

- [ ] Tenant context is derived from trusted identity, not accepted unverified from request payload.
- [ ] Background and scheduled jobs carry and validate tenant scope explicitly.
- [ ] Caches and object storage include tenant-aware namespaces and permissions.
- [ ] Cross-tenant reads, writes, exports, and references are tested as negative cases.
- [ ] System-wide privileged operations are narrow, auditable, and never accidentally available to ordinary roles.

## Required output

Deliver a tenant data-flow map, operation matrix, confirmed isolation gaps, negative test suite, and accepted privileged exceptions.

## Boundaries and failure handling

Do not treat UUIDs as a tenant isolation control; do not rely on front-end filtering for authorization.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
