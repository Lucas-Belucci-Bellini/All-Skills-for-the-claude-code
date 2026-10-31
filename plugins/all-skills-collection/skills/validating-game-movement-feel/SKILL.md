---
name: validating-game-movement-feel
description: "Validates game movement controls, acceleration, collision response, and camera feedback against explicit player-intent tests. Use when character motion feels slippery, unresponsive, inconsistent, or difficult to control."
---

# Validating Game Movement Feel

## Goal
Turn subjective reports such as “movement feels wrong” into reproducible tests that distinguish input, simulation, collision, and camera problems.

## Procedure
1. Describe the movement contract: supported actions, input mapping, movement modes, acceleration, braking, air control, jump rules, and expected response to releasing input.
2. Capture a baseline with a fixed build, scene, device, frame-rate range, and control configuration. Record both the intended input and resulting movement.
3. Test basic verbs separately before combinations: start, stop, reverse direction, turn, jump, land, crouch, sprint, dash, and interact while moving.
4. Measure time and distance to accelerate, stop, reach a target, clear an obstacle, and recover control after landing or knockback. Use tolerances appropriate to the game rather than assuming one universal ideal.
5. Test collision boundaries: corners, slopes, steps, moving platforms, narrow gaps, wall sliding, ceilings, and transitions between grounded and airborne states.
6. Inspect input sampling, simulation timestep, velocity integration, friction, collision resolution, and camera smoothing as separate layers. Change one layer at a time.
7. Check responsiveness under variable frame times and input-device differences. Avoid tying movement distance to rendered frames unless the design explicitly requires it.
8. Verify camera behavior independently: follow lag, look sensitivity, clipping, occlusion, motion sickness risks, and whether camera movement obscures landing or aiming cues.
9. Include accessibility and remapping cases: alternate keys/buttons, analog dead zones, hold versus toggle, sensitivity ranges, and reduced-motion options where applicable.
10. Re-run the same route and action sequence after each change. Compare measurements and player observations before accepting a tuning adjustment.

## Test route
Keep a small deterministic course containing:
- Flat acceleration and stopping lanes
- Repeated jumps and landing targets
- Slope, corner, low ceiling, and narrow passage
- Moving platform or moving obstacle when relevant
- A precision task that reveals overshoot
- A recovery point for reset and repeat

## Acceptance criteria
- Input-to-motion behavior is consistent within the chosen frame-time envelope.
- The character can stop, turn, and recover as the design promises.
- Collision failures are reproducible and assigned to a specific layer.
- Camera tuning does not hide important movement feedback.
- Tuning changes improve a measured target without silently breaking other movement modes.

## Avoid
- Changing acceleration, friction, camera smoothing, and jump height in one pass.
- Calling a control “responsive” without testing input-to-action delay.
- Fixing every movement problem with stronger camera smoothing.
- Treating one keyboard and one frame rate as complete compatibility coverage.
