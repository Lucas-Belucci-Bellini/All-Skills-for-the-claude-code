---
name: engine-startup-phase-observability
description: Instrument startup phases and readiness criteria to diagnose slow boot, hidden lazy initialization, and partially initialized subsystems.
---

# Engine Startup Phase Observability

## Goal

Make startup duration and readiness reproducible, with a clear distinction between required initialization and deferred work.

## Inputs to inspect

Bootstrap sequence, subsystem initialization hooks, asset/shader warmup, readiness checks, boot timing and first-interaction traces.

## Workflow

1. Define startup phases and record their prerequisites, criticality, outputs and the condition that marks each phase ready.
2. Measure cold start, warm-cache start and first usable frame separately, accounting for shader compilation, asset loading, migrations and deferred jobs.
3. Trace work that runs after the engine reports ready; identify expensive hidden initialization that causes first-use stutter or invalid feature availability.
4. Exercise missing/corrupt caches, slow I/O, optional subsystem failure and headless/server startup to verify the intended readiness contract.
5. Add a phase timing report and threshold for critical startup regressions, including explicit skipped/deferred phases and their reasons.

## Validation checklist

- [ ] Readiness means documented capabilities are actually available, not only that the main loop started.
- [ ] Cold and warm startup metrics are reported separately.
- [ ] Optional subsystem failure is distinguished from fatal initialization failure.
- [ ] Instrumentation has bounded event count and does not materially distort startup timings.

## Required output

A startup phase diagram, readiness criteria, cold/warm timing report and regression tests for initialization failures.

## Boundaries and failure handling

Do not hide slow required startup by reporting readiness before dependent features are usable.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
