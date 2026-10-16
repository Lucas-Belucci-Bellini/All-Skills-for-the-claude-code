---
name: scene-director-camera-tour-validation
description: "Validate authored camera-tour keyframes, interpolation bounds, and cancellation behavior before a scene is played or captured."
---

# Scene Director Camera Tour Validation

## Purpose

Make cinematic map tours smooth and reproducible without allowing invalid waypoints to produce extreme camera movement.

## Required inputs

Camera tour schema, keyframes, interpolation code, terrain rules, duration constraints, and sample tour assets.

## Workflow

1. Validate each keyframe's coordinates, heading, tilt, altitude/range, timing, and optional target reference.
2. Check interpolation between adjacent keyframes for wraparound, overshoot, zero-duration segments, and ground clearance.
3. Replay tours with missing or stale targets, interrupted playback, and user camera takeover.
4. Capture a fixed reference sequence and compare normalized poses plus declared visual tolerances.

## Validation checklist

- [ ] Keyframes reject non-finite and out-of-range values.
- [ ] Heading interpolation chooses the intended shortest path unless a full rotation is explicit.
- [ ] Tour playback cancels promptly on explicit user takeover.
- [ ] A missing live target produces a safe fallback rather than a jump to an arbitrary location.

## Required output

A camera-tour validation report, interpolation edge-case suite, and a reproducible test path.

## Boundaries and failure handling

Use synthetic or non-sensitive targets in test assets; cinematic reproducibility does not justify following private individuals.

## Trigger examples

- **Positive:** A camera tour jumps across the globe when heading wraps from 359 degrees to 1 degree.
- **Negative:** A request to automate a targeted route to follow a private person's movements.
