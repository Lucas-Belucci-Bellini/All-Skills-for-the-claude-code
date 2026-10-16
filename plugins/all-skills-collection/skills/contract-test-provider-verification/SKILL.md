---
name: contract-test-provider-verification
description: "Use when a provider service must verify compatibility with consumer-driven API contracts in CI; not for schema linting alone."
---

# Contract Test Provider Verification

## Purpose

Use when a provider service must verify compatibility with consumer-driven API contracts in CI; not for schema linting alone.

## Required inputs

Inputs: versioned consumer contracts, provider revision, verification harness, realistic fixtures.

## Workflow

1. Select required consumer contracts and record pending/deprecated exceptions.
2. Verify the candidate provider in an isolated environment with representative auth, routing, and data.
3. Classify failures as provider regression, stale contract, environment mismatch, or invalid test; attach a minimal reproduction.
4. Gate release on required contracts and document any approved exclusion.

## Verification checklist

Checks: results bind to provider revision and contract version; missing infrastructure cannot pass; exclusions have owner/expiry; sensitive payloads are not logged.

## Required output

Output: provider-contract results, failure classification, and release recommendation.

## Boundaries and failure handling

Boundary: do not alter consumer contracts just to make the provider pass; contract tests complement integration and security tests.

When evidence, permission, or environment details are missing, document the limitation and do not claim unrun validation passed.

## Trigger examples

- Positive: Positive: a release must satisfy contracts published by consuming teams.
- Negative: Negative: formatting a JSON schema without provider interactions.
