---
name: skill-broker-stale-index-detection
description: "Detects when a search index no longer represents the canonical catalog. Use after catalog changes or failed refreshes."
---

# Skill Broker Stale Index Detection

## Purpose

catalog revision/digest, index build metadata, last refresh, and expected counts

## Required inputs

Compare index source revision, digest, entry counts, and required metadata against the canonical catalog.

## Workflow

1. Inspect the current canonical schema, relevant service/client boundary, and target environment before changing behavior.
2. Define thresholded behavior: rebuild, serve last-known-good with stale warning, or fail closed for version-sensitive operations.
3. A staleness report with age, mismatches, last known-good state, and recovery action.
4. Exercise positive, negative, unavailable, and malformed cases using test identities and fixture content; record actual outputs separately from expected outcomes.
5. Produce do not return revoked or access-restricted content simply because an old index still references it. and include exact contracts, evidence, limitations, and a safe next action.

## Validation checklist

- [ ] Inputs, outputs, and version assumptions are explicit.
- [ ] A positive path and at least one negative/failure path are tested.
- [ ] Authorization and integrity gates cannot be overridden by query relevance or client claims.
- [ ] Logs and fixtures contain no real credentials or unnecessary private content.
- [ ] Unrun runtime or provider checks are marked blocked/unverified.

## Required output

Do not return revoked or access-restricted content simply because an old index still references it.

## Boundaries and failure handling

The catalog has new skills but search still returns older results. When evidence or provider capability is missing, return a structured blocker instead of guessing. Do not execute publish, revoke, deploy, or destructive operations during a read-path test.

## Trigger examples

- **Positive:** The index is immutable and built into the same versioned local package.
- **Negative:** undefined
