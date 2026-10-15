---
name: ecology-feedback-loop-validation
description: Stress-test coupled ecology systems for runaway growth, collapses, unstable feedback, and long-run numerical drift.
---

# Ecology Feedback Loop Validation

## Goal

Find unstable behavior across seasons, resource regeneration, predators, consumers, and harvesting before it reaches players.

## Inputs to inspect

Ecology rules/equations, time step, species interactions, weather, harvesting, and reproducible seeds.

## Workflow

1. Draw the causal graph for resources, producers, consumers, predators, weather, and harvesting; annotate feedback signs and delays.
2. Define invariants for nonnegative counts/resources, reproduction bounds, carrying capacity, and regeneration where applicable.
3. Create scenarios for equilibrium, drought, predator removal, overharvesting, invasive species, and low-population recovery.
4. Run accelerated long-horizon tests over multiple seeds and parameters, recording extinction chains, oscillations, explosive growth, and drift.
5. Change one parameter group at a time and document accepted gameplay abstractions when realism is not the design goal.

## Validation checklist

- [ ] Invalid negative values and numeric overflow/underflow are detected.
- [ ] Long runs remain within tolerances or transition through a documented outcome such as extinction.
- [ ] Update order and feedback delays are deterministic or intentionally stochastic.
- [ ] Shocks and recovery are tested, not just equilibrium initialization.
- [ ] The limits of the model are documented.

## Required output

Deliver causal graph, invariants, scenario matrix, long-run results, instability evidence, and tested tuning recommendations.

## Boundaries and failure handling

Do not patch runaway behavior with unexplained clamps before finding the loop; do not claim realism for a deliberately abstract game model.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
