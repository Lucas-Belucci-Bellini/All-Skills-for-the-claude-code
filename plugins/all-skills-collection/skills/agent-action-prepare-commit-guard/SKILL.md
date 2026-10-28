---
name: agent-action-prepare-commit-guard
description: "Separates validation and preparation from consequential commits in agent workflows. Use when an action must be reviewed before publishing, deleting, or changing external state."
---

# Agent Action Prepare and Commit Guard

## Purpose

Bind approval to the exact prepared target and payload, then verify the committed postcondition.

## Required inputs

Requested action, target, dry-run support, permissions, approval policy, idempotency mechanism, and post-action check.

## Workflow

1. Resolve the exact target, operation, payload, and expected side effects before committing.
2. Run non-destructive validation such as schema, permission, diff, and freshness checks.
3. Bind required approval to payload digest, target, actor, scope, and expiry.
4. Revalidate the target and authority immediately before commit so stale previews are rejected.
5. Commit once with provider idempotency where available and persist the receipt.
6. Verify the postcondition independently and distinguish committed, rejected, unknown, and partial outcomes.

## Validation checklist

- [ ] Preparation does not cause the protected side effect.
- [ ] Approval covers the exact payload and expires.
- [ ] Target drift invalidates stale approval.
- [ ] Unknown outcomes trigger reconciliation, not blind retries.

## Required output

A prepare/commit state machine, approval binding, idempotency rule, and postcondition report.

## Boundaries and failure handling

If the API lacks dry-run or idempotency, document that limit and require a stronger review path.

## Trigger examples

- **Positive:** An agent prepares a release or bulk edit that needs approval.
- **Negative:** A read-only inventory query has no consequential side effect.
