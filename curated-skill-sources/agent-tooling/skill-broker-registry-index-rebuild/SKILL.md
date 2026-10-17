---
name: skill-broker-registry-index-rebuild
description: "Rebuilds a searchable index from the canonical skill catalog. Use after batch additions or schema changes."
---

# Skill Broker Registry Index Rebuild

## Purpose

canonical catalog, metadata schema, index configuration, and known expected counts

## Required inputs

Parse the source-of-truth catalog and validate stable IDs, required fields, and source paths before indexing.

## Workflow

1. Inspect the current canonical schema, relevant service/client boundary, and target environment before changing behavior.
2. Build a fresh temporary index, reconcile entry counts and fields, then atomically switch only after checks pass.
3. A rebuild report with catalog/index counts, invalid entries, timings, and promotion status.
4. Exercise positive, negative, unavailable, and malformed cases using test identities and fixture content; record actual outputs separately from expected outcomes.
5. Produce do not replace a working index with a partial build or infer missing metadata. and include exact contracts, evidence, limitations, and a safe next action.

## Validation checklist

- [ ] Inputs, outputs, and version assumptions are explicit.
- [ ] A positive path and at least one negative/failure path are tested.
- [ ] Authorization and integrity gates cannot be overridden by query relevance or client claims.
- [ ] Logs and fixtures contain no real credentials or unnecessary private content.
- [ ] Unrun runtime or provider checks are marked blocked/unverified.

## Required output

Do not replace a working index with a partial build or infer missing metadata.

## Boundaries and failure handling

New skills have been merged into the canonical catalog and search is stale. When evidence or provider capability is missing, return a structured blocker instead of guessing. Do not execute publish, revoke, deploy, or destructive operations during a read-path test.

## Trigger examples

- **Positive:** The source catalog has not changed and no index rebuild is requested.
- **Negative:** undefined
