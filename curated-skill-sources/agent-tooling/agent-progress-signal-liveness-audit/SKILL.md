---
name: agent-progress-signal-liveness-audit
description: "Distinguishes healthy long-running work from stalled agents using heartbeats, progress milestones, and deadlines. Use when an orchestrator must detect hung child tasks."
---

# Agent Progress Signal Liveness Audit

## Purpose

Detect stalls without cancelling slow but healthy work or leaving dead workers active forever.

## Required inputs

Worker event stream, heartbeat cadence, progress milestones, tool duration profile, deadline, and stop semantics.

## Workflow

1. Define heartbeat cadence separately from semantic progress such as completed steps or produced artifacts.
2. Choose silence thresholds by task class using observed duration and known long-running tool behavior.
3. Track last heartbeat, last progress, current tool operation, and remaining deadline as separate signals.
4. Classify workers as healthy, slow, suspicious, timed out, or unreachable using a documented rule.
5. Use a bounded status probe before cancellation when it is safe and useful.
6. Report cancellation requested separately from verified worker termination.

## Validation checklist

- [ ] Heartbeat and semantic progress are not interchangeable.
- [ ] Thresholds account for legitimate long tool calls.
- [ ] Liveness timeout is not treated as proof of failure.
- [ ] Probe and cancellation steps are bounded and observable.

## Required output

A liveness decision table, thresholds, worker timeline, and slow/stalled/disconnected fixtures.

## Boundaries and failure handling

Remote work may continue after client timeout; do not duplicate side-effecting work without idempotency or fencing.

## Trigger examples

- **Positive:** A coordinator needs to detect hung workers during a long build.
- **Negative:** A user is measuring product adoption progress.
