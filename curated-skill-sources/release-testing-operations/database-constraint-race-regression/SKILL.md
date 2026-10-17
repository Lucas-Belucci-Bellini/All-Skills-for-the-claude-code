---
name: database-constraint-race-regression
description: "Use when concurrent transactions can both pass an application check and violate a uniqueness/relational invariant; not for broad isolation-level design."
---

# Database Constraint Race Regression

## Purpose

Use when concurrent transactions can both pass an application check and violate a uniqueness/relational invariant; not for broad isolation-level design.

## Required inputs

Inputs: schema constraints, competing transaction flow, isolation level, retry behavior, keys, multi-session harness.

## Workflow

1. Identify invariants checked only in application code versus enforced by database constraints.
2. Synchronize concurrent sessions through the critical read/check/write path using same and different keys.
3. Inspect conflicts, retries, idempotency response, and persisted rows.
4. Add a regression that fails reliably without the constraint or serialization control.

## Verification checklist

Checks: invariant enforced at database boundary where possible; tests force overlap; conflicts return documented outcomes; retries restart the full transaction when needed.

## Required output

Output: race reproduction, invariant map, concurrent results, corrective plan.

## Boundaries and failure handling

Boundary: disposable database and synthetic records; review production lock impact before constraint changes.

If required evidence or permissions are missing, record the blocker and don't report unrun checks as passed.

## Trigger examples

- Positive: Positive: simultaneous sign-ups both pass availability checks and create duplicates.
- Negative: Negative: selecting a composite index for performance without correctness concerns.
