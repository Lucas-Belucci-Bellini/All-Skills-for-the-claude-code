---
name: designing-stable-api-contracts
description: "Designs clear, versionable API contracts with consistent validation, errors, and compatibility rules. Use when creating or evolving HTTP endpoints, service interfaces, or machine-consumed APIs."
---

# Designing Stable API Contracts

## Goal
Make service boundaries predictable for clients and resilient to safe evolution.

## Workflow
1. Identify consumers, use cases, trust boundaries, latency expectations, and compatibility requirements.
2. Define resource or operation semantics, methods, request/response schemas, required fields, units, identifiers, and nullability explicitly.
3. Specify validation behavior and stable error shapes, including status codes, machine-readable codes, and safe human-readable messages.
4. Define authentication and authorization at the boundary; document which actor may perform each operation.
5. Decide pagination, filtering, sorting, idempotency, retries, rate limits, and timeout behavior where relevant.
6. Preserve backward compatibility by default. Treat removing or changing field meaning, enum values, error contracts, and ordering guarantees as potentially breaking changes.
7. Use explicit versioning or a documented migration plan when a breaking change is unavoidable. Avoid versioning every small additive change without need.
8. Generate or update schema documentation and contract tests from the actual implementation where supported.
9. Test representative success, validation, authorization, not-found, conflict, and server-error cases.
10. Communicate migration steps, deprecation windows, and known limitations to consumers.

## Deliverable
- Contract specification or schema.
- Examples of successful and failed requests.
- Compatibility assessment and tests.
- Migration notes for breaking changes.

## Acceptance criteria
- Clients can determine valid requests and interpret errors without guessing.
- Authorization and validation rules are enforceable, not documentation-only.
- Additive evolution is safe for existing clients under the stated contract.
- Breaking changes are versioned or accompanied by a clear migration plan.

## Guardrails
- Do not expose stack traces or internal identifiers in public errors.
- Do not assume all clients tolerate unknown enum values or fields.
- Do not publish credentials in examples.
- Do not claim compatibility without checking affected consumers.

