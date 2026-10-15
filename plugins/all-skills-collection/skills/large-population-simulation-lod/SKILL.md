---
name: large-population-simulation-lod
description: "Scales NPC and world-agent simulation with explicit levels of detail. Use when hundreds or thousands of actors exceed CPU, memory, or scheduling budgets."
---

# Large Population Simulation Lod

## Use when
Full-fidelity simulation for every agent every frame makes the world scale with entity count instead of player relevance.

## Workflow
1. Partition agents into full, reduced, statistical, and dormant simulation tiers based on distance, visibility, relevance, and gameplay obligations.
2. Define exactly which state variables and events remain active in each tier and how tier transitions preserve invariants.
3. Batch updates by system, schedule low-frequency work deterministically where required, and budget worst-case bursts.
4. Compare tiered simulation against full simulation on sampled scenarios to measure bias in economy, survival, pathing, and world history.

## Required output
A simulation-tier policy, per-tier state/update contract, budget table, and quality-versus-cost measurements.

## Validation
- Moving an agent between tiers does not duplicate or lose inventory, time, or identity.
- Aggregate simulation preserves declared invariants and conservation rules.
- Performance tests include worst-case crowds and tier-transition spikes.

## Guardrails
Do not call statistical approximation equivalent to full simulation; state the behaviors and time scales it approximates.
