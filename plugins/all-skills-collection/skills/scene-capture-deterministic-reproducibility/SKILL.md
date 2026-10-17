---
name: scene-capture-deterministic-reproducibility
description: "Make scene capture and scripted globe demonstrations reproducible within declared timing and rendering tolerances."
---

# Scene Capture Deterministic Reproducibility

## Purpose

Separate deterministic scene-state preparation from unavoidable provider, GPU, and network variation.

## Required inputs

Capture scripts, scene fixtures, data snapshots, frame/timing controls, environment metadata, and comparison artifacts.

## Workflow

1. Separate deterministic inputs such as saved camera pose and fixed fixtures from nondeterministic inputs such as live network feeds.
2. Build a capture mode that records scene/config versions and source-data freshness alongside output.
3. Run the same scripted sequence repeatedly with live sources disabled or pinned where appropriate.
4. Compare state transitions and toleranced visual regions, and classify unexplained variance separately from expected provider changes.

## Validation checklist

- [ ] Each artifact records code revision and relevant scene/fixture identifiers.
- [ ] Tests do not fail solely due to permitted GPU antialiasing or live-data drift.
- [ ] Deterministic fixtures never claim to represent the current world.
- [ ] Capture cleanup restores normal interaction and releases temporary state.

## Required output

A reproducibility protocol, fixture/capture manifest, and variance report separating deterministic failures from expected noise.

## Boundaries and failure handling

Do not claim a live-world recording is repeatable when its source feed changes between runs.

## Trigger examples

- **Positive:** A demo or regression capture needs to replay the same scene state across several runs.
- **Negative:** A request to falsify recording metadata or label synthetic data as a live event.
