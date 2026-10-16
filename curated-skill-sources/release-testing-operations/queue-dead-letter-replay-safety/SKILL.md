---
name: queue-dead-letter-replay-safety
description: "Use when replaying dead-letter messages after a fix risks duplicate effects or ordering changes; not for deciding whether input is poison."
---

# Queue Dead Letter Replay Safety

## Purpose

Use when replaying dead-letter messages after a fix risks duplicate effects or ordering changes; not for deciding whether input is poison.

## Required inputs

Inputs: dead-letter format, original IDs, ordering semantics, consumer idempotency, replay tooling, staging data.

## Workflow

1. Record event identity, failure reason, attempt history, source order, and any prior side effects.
2. Define bounded selection/rate/order policy; preserve original identity and add replay identity separately.
3. Test duplicate replay, partial side effects, stale schema, dependency outage, and live traffic interleaving.
4. Reconcile downstream state; require approval for irreversible external effects.

## Verification checklist

Checks: identity survives replay; duplicate effects are guarded; ordering/staleness rules are explicit; operator actions and reconciliation are recorded.

## Required output

Output: replay runbook, bounded replay plan, idempotency results, reconciliation evidence.

## Boundaries and failure handling

Boundary: never bulk-replay production without impact assessment and approval; enqueue success is not business success.

If required evidence or permissions are missing, record the blocker and don't report unrun checks as passed.

## Trigger examples

- Positive: Positive: replay fixed failed events without charging or notifying twice.
- Negative: Negative: choosing a retry threshold before dead-lettering.
