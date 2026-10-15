---
name: utility-ai-score-calibration
description: Calibrate utility-AI curves and consideration scales to produce interpretable decisions without oscillation or hidden priority collisions.
---

# Utility Ai Score Calibration

## Goal

Make action selection stable, testable, and tunable across representative NPC states.

## Inputs to inspect

Action definitions, score curves, normalization rules, decision traces, and sample states.

## Workflow

1. List each action's considerations, units, valid input range, normalization, and expected behavioral effect.
2. Tabulate score ranges across ordinary and boundary states; identify dominant, flat, discontinuous, or incorrectly inverted curves.
3. Separate hard legality/safety constraints from soft preferences. Define tie-breaking, hysteresis, and cooldown behavior for near-equal scores.
4. Replay representative state samples while sweeping parameters; measure action distributions, decision flips, and starvation of necessary actions.
5. Add scenario tests describing expected choices and regression thresholds for action frequency and stability.

## Validation checklist

- [ ] Each consideration has a documented range and influence.
- [ ] Hard constraints cannot be outweighed by a large preference score.
- [ ] Small sensor noise does not cause rapid action switching.
- [ ] Calibration covers state distributions, not one curated example.
- [ ] Parameter changes can be compared through versioned decision traces.

## Required output

Deliver an action/consideration matrix, score tables, parameter-sweep results, tie policy, and regression scenarios.

## Boundaries and failure handling

Do not tune only until one example looks correct; do not encode non-negotiable rules as weak utility weights.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
