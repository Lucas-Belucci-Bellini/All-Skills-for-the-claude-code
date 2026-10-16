---
name: engine-shutdown-deadline-budget
description: Allocate and verify a bounded shutdown budget across task cancellation, persistence flushes, GPU draining, plugin unload, and subsystem teardown.
---

# Engine Shutdown Deadline Budget

## Goal

Prevent exit hangs while giving essential state and resources enough time to finish safe cleanup.

## Inputs to inspect

Shutdown coordinator, per-subsystem cleanup, pending jobs, persistence queues, GPU fences, plugins and service deadlines.

## Workflow

1. Enumerate shutdown phases and dependencies, assigning a deadline, completion condition and failure policy to each phase.
2. Measure phase duration and tail behavior under empty, normal and overloaded states; identify waits without deadlines or cancellation paths.
3. Inject slow storage, blocked worker tasks, failed plugins, pending GPU work and repeated shutdown requests to test the global deadline.
4. Define which phases must finish, which may checkpoint/defer, and how the process reports incomplete work without corrupting saves or unloading live code.
5. Add shutdown timing telemetry and integration tests asserting bounded termination, correct persistence disposition and safe resource retirement.

## Validation checklist

- [ ] Every wait has a timeout or a documented reason it must block, with a recovery decision when exceeded.
- [ ] Deadline budget accounts for dependency order and leaves time for critical durability work.
- [ ] Repeated shutdown signals are idempotent and do not start competing teardown sequences.
- [ ] Timeout does not trigger unsafe release of resources still accessed by workers or the GPU.

## Required output

A shutdown phase/deadline table, timeout recovery policy, measured timing distribution and fault-injection tests.

## Boundaries and failure handling

Do not claim graceful shutdown if the process simply exits after the deadline with unfinished durable or ownership-critical work.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
