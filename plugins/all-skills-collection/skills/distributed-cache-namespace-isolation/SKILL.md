---
name: distributed-cache-namespace-isolation
description: "Use when shared caches serve tenants, environments, or app versions and key collisions/cross-scope reads are possible; not for database authorization tests."
---

# Distributed Cache Namespace Isolation

## Purpose

Use when shared caches serve tenants, environments, or app versions and key collisions/cross-scope reads are possible; not for database authorization tests.

## Required inputs

Inputs: key builders, trusted tenant context, serialization/version rules, invalidation paths, cache topology, synthetic identities.

## Workflow

1. Trace cache reads/writes and define required namespace dimensions for each data class.
2. Inspect canonicalization, separators, encoding, truncation, optional fields, and user-controlled segments.
3. Test same logical key across tenants/environments/versions, missing context, context switch, and rolling invalidation.
4. Ensure namespace comes from trusted context and incompatible entries are versioned or invalidated.

## Verification checklist

Checks: keys include required tenant scope; user segments can't escape boundaries; missing context doesn't fall back globally; rolling key changes are explicit.

## Required output

Output: namespace map, isolation/collision tests, migration plan, residual risks.

## Boundaries and failure handling

Boundary: use synthetic tenants; namespacing complements rather than replaces authorization.

If required evidence or permissions are missing, record the blocker and don't report unrun checks as passed.

## Trigger examples

- Positive: Positive: two tenants intermittently receive each other's cached result for the same slug.
- Negative: Negative: TTL tuning for a public static asset.
