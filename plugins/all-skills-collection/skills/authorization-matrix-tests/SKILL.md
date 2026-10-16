---
name: authorization-matrix-tests
description: Turn role, resource ownership, tenant scope, and operation permissions into systematic positive and negative authorization tests.
---

# Authorization Matrix Tests

## Goal

Catch broken access control whenever routes, roles, or resource relationships change.

## Inputs to inspect

Roles/permissions, ownership model, API operations, tenant design, and existing authorization middleware.

## Workflow

1. List resource types and operations such as read/list/create/update/delete/export/admin; map each to roles, ownership, and tenant constraints.
2. Generate positive tests for allowed combinations and negative tests for forbidden combinations, including direct object IDs and bulk/list endpoints.
3. Vary identity context independently from resource owner, tenant, request path, and payload values to catch confused-deputy assumptions.
4. Exercise the same policy through web/API endpoints, background jobs, file exports, and any alternate service entrypoint.
5. Run the matrix in CI for critical roles/resources and keep exceptions documented with owners and reason.

## Validation checklist

- [ ] Both list and single-object endpoints enforce the same intended scope.
- [ ] Ownership and tenant boundaries are tested independently of identifier randomness.
- [ ] Privilege escalation through changed role/context is a negative test.
- [ ] Background and administrative paths are included in the access matrix.
- [ ] A failed authorization test provides the exact role/resource/action combination.

## Required output

Deliver a permission matrix, parameterized tests, exception register, and a gap report for uncovered entrypoints.

## Boundaries and failure handling

Do not assume route middleware protects direct database/object-store operations; do not treat an HTTP status alone as sufficient when response data may still leak.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
