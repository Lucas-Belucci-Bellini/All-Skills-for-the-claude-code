---
name: rust-panic-boundary-observability
description: "Use when reviewing panic containment and reporting at thread/task/FFI/service boundaries; not for general unsafe-code inventory."
---

# Rust Panic Boundary Observability

## Purpose

Ensure panic behavior is contained or surfaced according to boundary and recovery contracts.

## Required inputs

Thread/task entrypoints, panic strategy, FFI boundaries, worker supervision, telemetry hooks, recovery policy.

## Workflow

1. Inventory boundaries where panic may unwind, abort, kill a worker, or be caught.
2. Review catch_unwind applicability and panic=abort/foreign-unwind constraints for supported builds.
3. Inject a controlled test panic in isolated test workers and verify process/task outcome and diagnostic context.
4. Check cleanup and restart behavior for stuck queues, locks, and shared state after worker failure.

## Verification checklist

- [ ] Panic strategy and unwind boundary are explicit.
- [ ] FFI does not permit unsupported unwind across foreign frames.
- [ ] Caught panics emit failure signals and do not imply corrupted state is safe.
- [ ] Supervision prevents silent restart loops and preserves cause.

## Required output

A panic-boundary map, controlled failure results, observability gaps, and recovery recommendations.

## Boundaries and failure handling

Use isolated tests; never trigger intentional production panics as an experiment.

When evidence, permissions, or environment details are missing, stop at the supported analysis, record the missing prerequisite, and do not report unexecuted validation as passing.

## Trigger examples

- **Positive:** A task panics and the service stays up but silently loses a queue consumer.
- **Negative:** Finding every unsafe block without examining panic recovery.
