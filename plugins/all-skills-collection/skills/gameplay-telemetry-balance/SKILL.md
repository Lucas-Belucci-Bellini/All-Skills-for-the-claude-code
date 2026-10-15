---
name: gameplay-telemetry-balance
description: "Uses gameplay telemetry to diagnose progression and balance problems. Use when difficulty spikes, players stall, resources overflow, or one strategy dominates."
---

# Gameplay Telemetry Balance

## Use when
Balance changes are driven by isolated anecdotes or average completion times that hide player segments and edge cases.

## Workflow
1. Choose events and measures tied to hypotheses: attempts, decisions, failures, resource flows, progression, and recovery opportunities.
2. Check sampling, session segmentation, missing-event rates, and whether instrumentation changed between versions.
3. Compare distributions and cohorts, inspect representative replays, and distinguish causation from correlation.
4. Design a small controlled change and define guard metrics that catch regressions in fun, accessibility, exploitability, and completion.

## Required output
A hypothesis-driven telemetry report, cohort/distribution analysis, candidate adjustment, and guard-metric plan.

## Validation
- Measures have clear event definitions and denominators.
- Outliers and segments are visible instead of averaged away.
- Recommendations state uncertainty and propose a validation experiment.

## Guardrails
Do not collect personal data unnecessarily or infer player intent beyond what the instrumented events support.
