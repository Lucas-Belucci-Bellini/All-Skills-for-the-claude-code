---
name: occlusion-culling-replay-validation
description: Reproduce occlusion-culling decisions from saved camera and visibility state to diagnose flicker and false-negative rendering.
---

# Occlusion Culling Replay Validation

## Goal

Make time-dependent occlusion decisions explainable and replayable when occluder history, motion or depth precision changes results.

## Inputs to inspect

Occlusion system, camera transforms, object bounds, depth history, temporal buffers, scene transforms and debug captures.

## Workflow

1. Define a compact replay record containing camera/projection state, relevant occluder and candidate bounds, frame history and algorithm settings.
2. Capture scenes where visible objects disappear, flicker or return late; preserve the earliest frame that disagrees with reference visibility.
3. Replay with temporal history disabled, frozen camera, frozen occluders and alternate conservative bounds to isolate stale history versus geometry/precision issues.
4. Inspect invalidation after camera cuts, object teleportation, resize, streaming and depth-buffer changes; verify history uses matching view and resource versions.
5. Build deterministic fixtures for the confirmed trigger and add counters for culled/rejected/uncertain objects and history resets.

## Validation checklist

- [ ] Replay inputs are sufficient to reproduce the decision or missing data is called out explicitly.
- [ ] Temporal history is invalidated when its coordinate/projection assumptions no longer hold.
- [ ] False negatives are distinguished from intentional conservative false positives.
- [ ] Debug mode reports which culling stage rejected an object and why.

## Required output

A minimal visibility replay, earliest divergence, history invalidation findings and a regression fixture for the culling system.

## Boundaries and failure handling

Do not conclude that culling is correct merely because disabling it hides the symptom; compare expected visibility and performance impacts.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
