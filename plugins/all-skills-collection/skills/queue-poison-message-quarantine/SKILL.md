---
name: queue-poison-message-quarantine
description: "Use when deterministic queue failures must be isolated without blocking healthy work; not for transient retry backoff design."
---

# Queue Poison Message Quarantine

## Purpose

Use when deterministic queue failures must be isolated without blocking healthy work; not for transient retry backoff design.

## Required inputs

Inputs: queue semantics, retry counters, message identity, error taxonomy, quarantine mechanism, retention and replay permissions.

## Workflow

1. Classify retryable failures separately from deterministic malformed/unsupported input.
2. Define bounded attempts and a quarantine record preserving event identity, failure reason, and operator context.
3. Test malformed payloads, unsupported versions, repeated exceptions, and transient dependency outages; verify unrelated messages progress.

## Verification checklist

Checks: poison/transient failures use different paths; retry count survives restart; quarantined payload access is scoped; quarantine/discard is auditable.

## Required output

Output: error taxonomy, quarantine policy, test outcomes, and recovery instructions.

## Boundaries and failure handling

Boundary: do not discard messages with unknown business impact; use synthetic queues and protect payloads.

When evidence, permission, or environment details are missing, document the limitation and do not claim unrun validation passed.

## Trigger examples

- Positive: Positive: one malformed event retries forever and blocks a partition.
- Negative: Negative: choosing backoff for a temporary network timeout.
