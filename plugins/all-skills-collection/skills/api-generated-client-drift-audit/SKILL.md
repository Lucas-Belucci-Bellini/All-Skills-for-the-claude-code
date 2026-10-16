---
name: api-generated-client-drift-audit
description: "Use when generated API clients or SDKs may have drifted from the published schema or server behavior; do not use as a substitute for general API contract regression testing."
---

# Api Generated Client Drift Audit

## Purpose

Detect and explain mismatches between an API schema, generated client code, and the behavior that consumers actually observe.

## Required inputs

The source OpenAPI or equivalent schema, generation command/configuration, generated client diff, supported language matrix, and representative server responses.

## Workflow

1. Identify the canonical schema revision and the exact generator version/configuration; record both before regenerating anything.
2. Regenerate clients into a clean temporary directory and compare normalized output with the committed SDK files.
3. Compile or type-check the changed clients and run representative request/response fixtures, including optional fields, enums, errors, and pagination.
4. Classify each drift as schema change, generator change, manual modification, or server-behavior mismatch; propose the smallest reproducible correction.

## Verification checklist

- [ ] The canonical schema and generator version are pinned in the report.
- [ ] A clean regeneration produces no unexplained diff.
- [ ] Nullable fields, unknown enum values, error shapes, and versioned endpoints are covered.
- [ ] Generated artifacts are not manually patched without a repeatable generation rule.

## Required output

A drift report with schema/generator revisions, changed symbols, reproducible commands, fixture results, and recommended fix.

## Boundaries and failure handling

Do not infer compatibility from a clean diff alone. Never replace generated files in place before recording the baseline; do not expose real credentials or customer payloads in fixtures.

When required evidence, permissions, or environment details are unavailable, stop at the supported analysis, record the missing prerequisite, and do not report an unexecuted validation as passing.

## Trigger examples

- **Positive:** A TypeScript SDK no longer matches a changed OpenAPI response type.
- **Negative:** A broad test strategy for all endpoint contracts without a generated-client drift concern.
