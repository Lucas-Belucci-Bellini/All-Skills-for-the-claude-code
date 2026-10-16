---
name: render-resolution-scaling-policy
description: Design and validate dynamic render-resolution scaling using frame-time targets, hysteresis, quality constraints, and platform capabilities.
---

# Render Resolution Scaling Policy

## Goal

Use resolution scaling to manage measured GPU load without oscillation or unexpected loss of readability and rendering quality.

## Inputs to inspect

GPU frame-time history, target refresh rate, scaling range, UI composition rules, upscaler capabilities and quality captures.

## Workflow

1. Define the target GPU budget, allowed render-scale range, minimum dwell time and which passes are eligible for scaling.
2. Separate GPU-bound from CPU-bound scenes and choose a stable measurement window so scaling does not react to unrelated CPU stalls.
3. Design hysteresis and step sizes, with explicit response to sustained overload, recovered headroom, scene transitions and thermal/power changes.
4. Test text/UI sharpness, temporal artifacts, motion, thin geometry, transparency and low-light scenes at each scale on representative device tiers.
5. Record scale transitions and frame-time outcomes; add guardrails preventing rapid oscillation and enforcing a minimum acceptable visual-quality floor.

## Validation checklist

- [ ] The scaler uses GPU evidence and does not chase CPU-bound frame-time spikes.
- [ ] Hysteresis/dwell behavior is tested under fluctuating load.
- [ ] UI and post-processing stages follow a documented scale/composition policy.
- [ ] Minimum quality and unsupported-device behavior are explicit and measured.

## Required output

A scaling state machine, target/threshold table, transition tests and visual/performance evidence across supported tiers.

## Boundaries and failure handling

Do not declare a fixed scaling percentage universally optimal; validate the policy for each representative workload and platform.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
