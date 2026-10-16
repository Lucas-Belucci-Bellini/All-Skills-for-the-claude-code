---
name: queue-drain-shutdown-deadline-validation
description: "Verify workers drain in-flight and queued work within a shutdown deadline without losing, duplicating or falsely acknowledging tasks."
---

# Queue Drain Shutdown Deadline Validation

## Purpose

Make planned shutdown and rolling replacement safe for consumers with in-flight work or delayed acknowledgements.

## Required inputs

Queue semantics, consumer lifecycle, acknowledgement point, visibility/lease timeout, shutdown deadline, retry policy and termination behavior.

## Workflow

1. Document shutdown effects on intake, queued tasks, in-flight handlers and acknowledgements.
2. Define a drain budget for stopping intake, finishing work, durable checkpointing and cleanup.
3. Test shutdown before handler start, during side effects, before acknowledgement, during checkpoint and after the deadline.
4. Verify unfinished work becomes retryable and completed side effects cannot duplicate on redelivery.
5. Measure drain time and remaining queue depth under representative load; forced termination must be observable.

## Validation checklist

- [ ] Intake stops before the worker exits.
- [ ] Acknowledgement follows the required durable point.
- [ ] In-flight work completes or becomes safely retryable.
- [ ] The deadline is enforced and forced exits are visible.
- [ ] Repeated shutdown signals do not skip cleanup or wait indefinitely.

## Required output

A shutdown state machine, deadline budget, interruption matrix and operator guidance for undrained work.

## Boundaries and failure handling

Do not extend shutdown indefinitely to hide slow tasks. Do not acknowledge work merely because the process is exiting. Document duplicate/loss risk if work is neither idempotent nor resumable.

## Trigger examples

- **Positive:** A restart kills consumers after a side effect commits but before message acknowledgement.
- **Negative:** Measuring queue wait time under normal traffic only.
