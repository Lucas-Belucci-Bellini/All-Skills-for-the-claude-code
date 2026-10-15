---
name: physics-simulation-validation
description: "Validates physics behavior, integration stability, and collision invariants. Use when movement, contacts, rigid bodies, or fixed-step physics change."
---

# Physics Simulation Validation

## Use when
Physics bugs appear only at certain speeds, frame rates, collision shapes, or object densities.

## Workflow
1. List the governing invariants: non-penetration tolerance, velocity limits, momentum behavior, sleep/wake transitions, and coordinate units.
2. Create minimal reproducible scenes for isolated collision types and difficult interactions such as thin geometry, corners, stacked bodies, and high-speed motion.
3. Run each scenario at multiple render rates while keeping the simulation-step policy controlled; capture state traces and error bounds.
4. Compare solver/config changes against the same scene fixtures and keep visual inspection separate from numeric assertions.

## Required output
A physics scenario matrix, invariant definitions, trace format, and before/after stability report.

## Validation
- Tests cover tunneling, repeated contacts, boundary conditions, and timestep stress.
- Tolerances have units and a rationale.
- A change that improves one scene does not silently destabilize other fixtures.

## Guardrails
Do not describe an approximate simulation as physically exact; document engine limitations and measured error.
