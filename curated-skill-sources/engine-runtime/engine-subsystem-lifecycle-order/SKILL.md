---
name: engine-subsystem-lifecycle-order
description: Specify startup, running, pause, device-loss, reload, and shutdown transitions for engine subsystems with owned resources.
---

# Engine Subsystem Lifecycle Order

## Goal

Make lifecycle transitions explicit so systems do not update after shutdown, leak resources, or resume with stale state.

## Inputs to inspect

Subsystem interface, state transitions, event dispatch, async jobs, resources, pause/resume, and shutdown handling.

## Workflow

1. List subsystem states and events that cause transitions, such as initialize, ready, pause, resume, device reset, world reload, and shutdown.
2. Define legal transitions and invariants, including when update/render callbacks are permitted and which resources must exist in each state.
3. Trace asynchronous work and callbacks across lifecycle changes; cancel, drain, or fence them before releasing dependent resources.
4. Test repeated transitions, initialization failure halfway through, pause during load, device/context loss where supported, and shutdown with pending work.
5. Add assertions/telemetry for illegal transition attempts and verify teardown behavior is deterministic under repeated runs.

## Validation checklist

- [ ] Each subsystem has a documented finite set of legal transitions.
- [ ] Updates cannot run before readiness or after terminal shutdown.
- [ ] Pause/resume preserves or deliberately rebuilds the state required by the subsystem.
- [ ] Async results are discarded or reconciled when their lifecycle generation is stale.
- [ ] Partial initialization and repeated teardown are safe and tested.

## Required output

Produce a lifecycle state diagram, transition/invariant table, async cancellation rules, and transition test matrix.

## Boundaries and failure handling

Do not encode lifecycle as unrelated booleans that permit impossible combinations; do not release resources while callbacks can still use them.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
