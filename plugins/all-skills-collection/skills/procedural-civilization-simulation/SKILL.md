---
name: procedural-civilization-simulation
description: "Models the long-term growth and interaction of settlements or civilizations. Use when generating population, culture, resources, institutions, and history from rules."
---

# Procedural Civilization Simulation

## Use when
A procedural civilization feels like random name generation rather than a coherent history shaped by geography, resources, and decisions.

## Workflow
1. Define agents, settlements, resources, institutions, time steps, and causal rules before generating narrative labels.
2. Create a small set of traceable drivers such as migration, trade, conflict, technology, climate, and governance.
3. Run deterministic seeds over historical epochs and store major transitions as events with causes and affected entities.
4. Compare multiple seeds for structural variety while checking conservation, population plausibility, and causal continuity.

## Required output
A simulation schema, causal rule list, seeded generation protocol, and example history trace.

## Validation
- Important historical changes have identifiable causes and timestamped events.
- Resource/population flows respect explicit accounting rules.
- Different seeds create variation without violating the world model.

## Guardrails
Do not hide broken simulation logic behind prose; narrative descriptions must be grounded in recorded simulated events.
