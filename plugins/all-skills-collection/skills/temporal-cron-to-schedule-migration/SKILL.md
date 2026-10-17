---
name: temporal-cron-to-schedule-migration
description: "Validate temporal cron to schedule migration with task-specific acceptance criteria, boundary cases, and reproducible evidence."
---

# Temporal Cron To Schedule Migration

## Purpose

Establish a verifiable engineering contract for temporal cron to schedule migration. Identify a concrete failure mode, reproduce it safely, and produce evidence that distinguishes expected behavior from hidden state, lost signals, or unsafe recovery.

## Required inputs

Temporal workflow/activity code, worker/client configuration, relevant history or replay fixture, retry/timeout policies, and test-environment settings.

## Workflow

1. Identify the workflow type, its activities, worker task queue, namespace, and history/version boundary relevant to temporal cron to schedule migration. Separate deterministic workflow logic from side-effecting activity code.
2. Define the durable-state invariant: expected path, activity failure/retry, timeout or cancellation behavior, and state that must survive worker restart.
3. Create a TypeScript test-environment fixture for a normal path, failed or repeated activity, and the closest replay/version boundary; use a controlled test clock where appropriate.
4. Check retries, timeouts, heartbeats, duplicate delivery, payload size, and concurrency; ensure repeated side effects have idempotency or explicit deduplication.
5. Run focused unit/integration tests and replay/version compatibility checks against representative histories; collect attempts, state transitions, and task queue evidence.
6. Simulate one worker/activity interruption and verify resume, retry, compensation, or operator intervention without changing real production executions.
7. Deliver the workflow/activity boundary, policy matrix, replay evidence, known limitations, and an operator runbook with a safe recovery decision tree.

## Validation checklist

- [ ] Workflow code is replay-deterministic and external side effects are isolated in activities.
- [ ] Retry, timeout, heartbeat, duplicate-delivery, and cancellation behavior are explicit.
- [ ] A test covers replay/version compatibility or recovery relevant to the task.
- [ ] Payload size and history growth remain within documented budgets.
- [ ] Worker identity and task-queue routing match the target environment.
- [ ] Recovery guidance distinguishes tested actions from operational assumptions.
- [ ] Production executions are not replayed, terminated, or mutated solely for the test.

## Required output

Produce a durable-execution review with workflow/activity boundaries, retry and timeout matrix, replay-compatibility evidence, and an operator recovery runbook. Include the target revision/configuration, acceptance criteria, pass/fail/blocked checks, exact command or artifact references, observed limitations, and the smallest justified next action.

## Boundaries and failure handling

Keep workflow code deterministic; move network, filesystem, random, and other side effects into activities or controlled abstractions. Make repeatable activities idempotent. If history, task queue, or external provider state cannot be inspected, mark recovery unverified; never replay or terminate production executions just to collect evidence.

## Trigger examples

- **Positive:** A long-running TypeScript workflow needs an explicit contract for temporal cron to schedule migration.
- **Negative:** A change proposes nondeterministic I/O inside workflow code or terminates active production executions without an approved recovery plan.
