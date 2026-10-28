---
name: agent-run-replay-safety-harness
description: "Replays recorded orchestration events with external side effects replaced by fixtures. Use when validating recovery, event ordering, and state-transition behavior."
---

# Agent Run Replay Safety Harness

## Purpose

Reproduce orchestration regressions without repeating deployments, messages, or destructive commands.

## Required inputs

Redacted trace, schema version, deterministic fixtures, fake tool adapters, assertions, and side-effect allowlist.

## Workflow

1. Capture run/task/attempt identifiers, event types, sequence numbers, schemas, and non-sensitive artifact digests.
2. Remove credentials, private payloads, and unnecessary user data from fixtures.
3. Replace live tool adapters with fakes that record attempted effects and return controlled receipts.
4. Replay original order plus duplicate, delayed, reordered, and failed event sequences.
5. Assert final states, accepted artifacts, idempotency choices, and absence of non-allowlisted external calls.
6. Version fixtures with the orchestrator schema and document unmodeled production conditions.

## Validation checklist

- [ ] Replay cannot reach live side-effect endpoints by default.
- [ ] Fixtures are redacted and sufficient to reproduce the regression.
- [ ] Duplicate and reordered events are covered.
- [ ] Assertions check state and attempted actions.
- [ ] Fixture drift is detected.

## Required output

A redacted replay fixture, fake-adapter configuration, assertion report, and modeling gaps.

## Boundaries and failure handling

Replay proves only represented behavior; it does not establish production correctness or provider compatibility.

## Trigger examples

- **Positive:** A duplicate callback bug must be reproduced in CI.
- **Negative:** A user needs live provider latency measurements.
