---
name: log-schema-evolution-validation
description: "Use when structured log fields change and parsers, alerts, or analytics may break; not for secret redaction."
---

# Log Schema Evolution Validation

## Purpose

Use when structured log fields change and parsers, alerts, or analytics may break; not for secret redaction.

## Required inputs

Inputs: event schemas, parser/query definitions, alerts, dashboards, producer versions, sample events.

## Workflow

1. Inventory consumers of affected fields, including queries, dashboards, alert predicates, exports, and incident rules.
2. Compare old/new events for field renames, types, null/missing semantics, cardinality, and timestamp meaning.
3. Run fixtures through downstream consumers, including mixed-version events; choose additive migration, dual-write, or coordinated rollout.

## Verification checklist

Checks: breaking changes are tied to field path and consumer; null/missing/wrong-type cases are explicit; mixed versions parse during transition; high-cardinality and sensitive fields are reviewed.

## Required output

Output: compatibility matrix, consumer impact list, fixture results, and migration plan.

## Boundaries and failure handling

Boundary: use synthetic fixtures; avoid silent coercion that hides producer bugs.

When evidence, permission, or environment details are missing, document the limitation and do not claim unrun validation passed.

## Trigger examples

- Positive: Positive: renaming request_id breaks dashboards during a rolling release.
- Negative: Negative: finding a bearer token in logs.
