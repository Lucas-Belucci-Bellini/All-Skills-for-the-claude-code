---
name: skill-broker-search-fallback-matrix
description: "Defines fallback choices for exact, lexical, metadata, and semantic retrieval failures. Use when search modes fail independently."
---

# Skill Broker Search Fallback Matrix

## Purpose

retrieval methods, health signals, request types, and version/security constraints

## Required inputs

Map each request type to acceptable fallback methods and identify when exact-version or authorization checks cannot be skipped.

## Workflow

1. Inspect the current canonical schema, relevant service/client boundary, and target environment before changing behavior.
2. Test combinations of index outage, missing embeddings, invalid query, and catalog downtime.
3. A fallback matrix with expected status, allowed alternative, retry policy, and stop condition.
4. Exercise positive, negative, unavailable, and malformed cases using test identities and fixture content; record actual outputs separately from expected outcomes.
5. Produce do not fall back from authorization failure to an unrestricted local search. and include exact contracts, evidence, limitations, and a safe next action.

## Validation checklist

- [ ] Inputs, outputs, and version assumptions are explicit.
- [ ] A positive path and at least one negative/failure path are tested.
- [ ] Authorization and integrity gates cannot be overridden by query relevance or client claims.
- [ ] Logs and fixtures contain no real credentials or unnecessary private content.
- [ ] Unrun runtime or provider checks are marked blocked/unverified.

## Required output

Do not fall back from authorization failure to an unrestricted local search.

## Boundaries and failure handling

The semantic service fails but metadata lookup remains available. When evidence or provider capability is missing, return a structured blocker instead of guessing. Do not execute publish, revoke, deploy, or destructive operations during a read-path test.

## Trigger examples

- **Positive:** All retrieval methods are healthy and the query resolves exactly.
- **Negative:** undefined
