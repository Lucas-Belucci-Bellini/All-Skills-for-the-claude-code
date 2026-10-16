---
name: api-conditional-request-contract
description: "Use when validating ETag, If-Match, If-None-Match, or modification-time HTTP conditions; not for general cache invalidation."
---

# Api Conditional Request Contract

## Purpose

Make revalidation and optimistic concurrency behavior explicit and testable.

## Required inputs

Endpoint contract, resource version model, ETag generation, conditional headers, mutation semantics, fixtures.

## Workflow

1. Specify whether each endpoint supports cache revalidation, optimistic concurrency, or both.
2. Test matching/nonmatching validators, weak/strong tags where relevant, missing resources, representation changes, and concurrent updates.
3. Verify failed mutation preconditions prevent lost updates and 304 responses omit bodies while preserving required metadata.
4. Check proxies/transforms do not reuse validators across different representations.

## Verification checklist

- [ ] Validators change when the selected representation changes as defined.
- [ ] A failed mutation precondition cannot overwrite a newer version.
- [ ] 304 and precondition failure statuses follow the contract.
- [ ] Multiple/malformed validators and weak tags have fixture coverage.

## Required output

A conditional-request behavior matrix and HTTP fixture results with concurrency findings.

## Boundaries and failure handling

Do not use weak validators as strong mutation controls unless the contract supports it; review breaking default changes.

When evidence, permissions, or environment details are missing, stop at the supported analysis, record the missing prerequisite, and do not report unexecuted validation as passing.

## Trigger examples

- **Positive:** Two clients update the same resource and the later update must detect stale state.
- **Negative:** Choosing CDN cache expiration duration.
