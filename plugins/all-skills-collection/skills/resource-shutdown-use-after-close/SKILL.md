---
name: resource-shutdown-use-after-close
description: "Use when asynchronous tasks or callbacks may access a resource after its owner has begun or completed shutdown; not for a general shutdown-order or startup dependency graph."
---

# Resource Shutdown Use After Close

## Purpose

Detect late resource access and unclear ownership at teardown boundaries.

## Required inputs

Resource lifecycle, handle/reference API, worker queues, callbacks, shutdown phases, error reporting, and a test harness that can delay operations.

## Workflow

1. Inventory resources with explicit open/closing/closed states and identify every task, callback, or handle that may retain access across shutdown.
2. Inject delayed work around close transitions, including queued callbacks, cancellation races, concurrent disposal, and repeated shutdown.
3. Check whether handles reject post-close operations safely and whether outstanding users are awaited, canceled, or detached according to contract.
4. Add assertions and tests for exactly-once release, readable diagnostics, and deterministic behavior when shutdown times out.

## Verification checklist

- [ ] The lifecycle contract specifies behavior for calls during closing and after closed.
- [ ] Resource release occurs once and outstanding work cannot access freed state.
- [ ] Shutdown waits have bounded timeouts and report which dependency remains active.
- [ ] Failure paths do not hide use-after-close symptoms as unrelated null or I/O errors.

## Required output

A resource lifecycle table, delayed-work test results, ownership gaps, and a remediation plan.

## Boundaries and failure handling

Use sanitizers, mocks, or a debug build where possible. Do not treat swallowing every post-close exception as proof that ownership is correct.

When required evidence, permissions, or environment details are unavailable, stop at the supported analysis, record the missing prerequisite, and do not report an unexecuted validation as passing.

## Trigger examples

- **Positive:** A queued job uses a renderer or file handle after the level was unloaded.
- **Negative:** Determining which subsystem should start first during normal application boot.
