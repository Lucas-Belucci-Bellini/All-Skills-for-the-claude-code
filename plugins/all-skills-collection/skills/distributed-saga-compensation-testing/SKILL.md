---
name: distributed-saga-compensation-testing
description: "Use when a multi-service workflow needs compensating actions after partial success; not for general transactional outbox implementation."
---

# Distributed Saga Compensation Testing

## Purpose

Verify safe outcomes when a workflow step fails after earlier steps committed.

## Required inputs

Saga state machine, forward steps, compensations, retry policies, idempotency, durable state, fault-injection harness.

## Workflow

1. Enumerate states, irreversible steps, completion conditions, and compensation for each committed action.
2. Inject failures after each step, during compensation, and after timeouts where remote completion is ambiguous.
3. Test retries, duplicate callbacks, process restart, compensation ordering, and manual-recovery states.
4. Verify durable records expose partial progress and alert operators about stuck compensation.

## Verification checklist

- [ ] Every forward step has a recovery or explicit irreversible-action policy.
- [ ] Compensation is idempotent or duplicate-guarded.
- [ ] Lost responses do not imply remote failure automatically.
- [ ] Stuck/exhausted compensation is visible and resumable by an authorized operator.

## Required output

A saga failure matrix, compensation results, alert requirements, and manual recovery runbook.

## Boundaries and failure handling

Use staging/synthetic events; never trigger destructive/financial compensation in production during testing.

When evidence, permissions, or environment details are missing, stop at the supported analysis, record the missing prerequisite, and do not report unexecuted validation as passing.

## Trigger examples

- **Positive:** Order reserves stock/payment but shipment creation fails.
- **Negative:** Ensuring one database transaction rolls back atomically.
