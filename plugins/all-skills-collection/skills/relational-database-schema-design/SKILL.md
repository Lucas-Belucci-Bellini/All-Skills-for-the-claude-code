---
name: relational-database-schema-design
description: "Designs relational schemas with explicit keys, constraints, normalization, and access patterns. Use when creating tables, modeling entities and relationships, or reviewing a database schema before implementation."
---

# Relational Database Schema Design

## Goal
Represent domain facts accurately and enforce important invariants in the database as well as the application.

## Workflow
1. Identify entities, relationships, ownership, lifecycle, expected queries, retention needs, and data sensitivity.
2. Define primary keys and foreign keys explicitly; choose stable identifiers and document natural-key trade-offs.
3. Normalize repeated facts to avoid update anomalies, then denormalize only for measured query or reporting needs.
4. Use appropriate types, nullability, uniqueness, check constraints, and referential actions to encode valid states.
5. Decide delete/update behavior deliberately; consider soft deletion, audit history, and retention requirements.
6. Design indexes from representative filters, joins, ordering, and cardinality; account for write amplification and storage cost.
7. Specify timestamps, time zones, units, monetary precision, and enum evolution consistently.
8. Review tenant boundaries and authorization-sensitive relationships so queries cannot accidentally cross ownership scopes.
9. Plan migration and backfill behavior for existing data, including duplicates and invalid historical records.
10. Validate with representative queries, constraint tests, and explain plans where available.

## Deliverable
- Entity relationship description or schema.
- Constraints and index rationale.
- Migration/backfill plan and data-integrity tests.

## Acceptance criteria
- Invalid states are rejected where practical.
- Relationships and deletion semantics are explicit.
- Indexes support known access patterns without indiscriminate over-indexing.
- Sensitive and tenant-scoped data has clear ownership rules.

## Guardrails
- Do not store money in floating-point types when exact decimal or integer minor units are appropriate.
- Do not assume application validation alone protects data integrity.
- Do not add indexes without considering write and storage costs.

