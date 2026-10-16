---
name: queue-consumer-rebalance-drain-safety
description: "Use when consumer-group rebalances interrupt in-flight work or cause duplicate/lost processing; not for generic offset-commit recovery."
---

# Queue Consumer Rebalance Drain Safety

## Purpose

Use when consumer-group rebalances interrupt in-flight work or cause duplicate/lost processing; not for generic offset-commit recovery.

## Required inputs

Inputs: consumer framework, partition assignments, in-flight work, commit semantics, processing deadlines, rebalance logs.

## Workflow

1. Map revoke/assign callbacks, in-flight cancellation, checkpoint commits, and lease/resource release.
2. Test rolling restart, slow handler, revoke mid-work, duplicate assignment notifications, and coordinator failure.
3. Verify work completes and commits, is canceled for safe replay, or is recorded for recovery before relinquishing assignment.
4. Measure rebalance duration and churn; enforce a drain deadline without allowing stale owners to continue.

## Verification checklist

Checks: revoked owners stop mutating partition state; unfinished work isn't skipped; timeout produces explicit cancel/replay; churn and slow handlers are observable.

## Required output

Output: rebalance state diagram, fault results, drain/commit contract, operator runbook.

## Boundaries and failure handling

Boundary: use staging groups; don't trigger production-wide rebalances without approval.

If required evidence or permissions are missing, record the blocker and don't report unrun checks as passed.

## Trigger examples

- Positive: Positive: rolling deploy causes duplicate jobs because old workers process after revoke.
- Negative: Negative: diagnosing one malformed message without rebalance involvement.
