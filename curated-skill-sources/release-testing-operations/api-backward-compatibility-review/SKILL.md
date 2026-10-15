---
name: api-backward-compatibility-review
description: Assess API changes for source, wire-format, semantic, and operational compatibility with existing clients.
---

# Api Backward Compatibility Review

## Goal

Detect breaking changes before release and choose versioning or migration steps appropriate to the actual contract.

## Inputs to inspect

OpenAPI/schema definitions, previous release, generated clients, consumer usage, and changelog/release policy.

## Workflow

1. Compare the proposed API to the last released contract across endpoints, fields, enum values, requiredness, status codes, error shapes, and behavior.
2. Classify changes as additive, breaking, or semantically incompatible; remember that a field can remain present while its meaning changes.
3. Inspect client code and usage evidence for assumptions about ordering, nullability, unknown values, pagination, idempotency, and retries.
4. Run schema diff and contract tests against representative old clients or recorded consumer fixtures; test both request and response compatibility.
5. Choose mitigation: additive phase, dual-read/write migration, deprecation window, API version, or coordinated release, and define when the old path can be removed.

## Validation checklist

- [ ] Compatibility is evaluated for both requests and responses, not only schema syntax.
- [ ] Unknown fields/enums have explicit client behavior.
- [ ] Semantic changes and error/status changes are included in the review.
- [ ] The proposed rollout has consumer migration and deprecation criteria.
- [ ] The report cites exact contract changes and tests rather than relying on commit titles.

## Required output

Deliver a compatibility matrix, breaking-change findings, consumer impact, rollout/versioning recommendation, and contract-test evidence.

## Boundaries and failure handling

Do not call a change backward-compatible solely because the OpenAPI file validates; do not infer consumer behavior without evidence.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
