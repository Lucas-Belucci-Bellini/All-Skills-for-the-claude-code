---
name: physics-contact-resolution-regression
description: Create regression cases for contact generation, collision resolution, penetration correction, and resting-body stability.
---

# Physics Contact Resolution Regression

## Goal

Detect contact solver changes that cause tunneling, jitter, excessive penetration, unstable stacks, or incorrect friction.

## Inputs to inspect

Collision shapes, broad/narrow-phase output, contact manifolds, solver settings, physics traces and known-good scene states.

## Workflow

1. Capture a minimal scenario and record body masses, shapes, transforms, velocities, material coefficients, timestep and solver iteration settings.
2. Separate collision detection defects from manifold generation, contact normal orientation, constraint setup and iterative solver convergence.
3. Test resting contact, stacked bodies, shallow/high-speed impacts, edge/corner contacts, large mass ratios and rotating bodies with off-center contact.
4. Compare position/velocity error, penetration depth, impulse bounds and energy behavior against tolerances over a fixed sequence of simulation steps.
5. Preserve failing initial states and add a focused regression fixture before modifying global solver parameters.

## Validation checklist

- [ ] Contact normals and feature IDs are stable under small positional changes.
- [ ] Penetration correction does not add excessive energy or launch resting bodies.
- [ ] High-speed cases are tested against the engine's continuous-collision policy where applicable.
- [ ] Solver iteration increases are backed by measured convergence and bounded cost.

## Required output

A minimal failing physics scene, per-step contact metrics, root-cause separation, and regression tolerances.

## Boundaries and failure handling

Do not tune a global friction or solver setting to compensate for incorrect contact geometry or invalid mass properties.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
