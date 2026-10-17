---
name: api-example-schema-conformance
description: "Validate documented API examples against declared schemas, including required fields, nullability, enums, status codes and version assumptions."
---

# Api Example Schema Conformance

## Purpose

Keep API docs aligned with the contract used by generated clients and consumers.

## Required inputs

API schema/OpenAPI, examples, error models, versions and synthetic/redacted fields.

## Workflow

1. Associate each example with operation, schema version, content type and HTTP status.
2. Parse examples and validate fields, types, enums, nullability and nested structure.
3. Review semantic details such as pagination, idempotency and error behavior not fully represented by schema.
4. Label illustrative placeholders so they cannot be mistaken for valid identifiers or secrets.
5. Add CI validation for stable examples and record exceptions needing human review.

## Validation checklist

- [ ] Examples parse.
- [ ] Request/response matches the right operation and version.
- [ ] Error examples use the documented schema and status.
- [ ] Placeholders are safe and labeled.
- [ ] Schema validity is separate from semantic correctness.

## Required output

Example/schema map, conformance failures, corrected fixtures and CI candidates.

## Boundaries and failure handling

Do not change the API schema just to make a misleading example pass. Never use real customer data or credentials.

## Trigger examples

- **Positive:** README response includes a field absent from the current OpenAPI schema.
- **Negative:** Investigating latency with no documentation-contract problem.
