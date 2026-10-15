---
name: economy-simulation-balancing
description: "Balances resource flows and economic loops in simulation-heavy games. Use when crafting, production, trade, inflation, scarcity, or NPC livelihoods become unstable."
---

# Economy Simulation Balancing

## Use when
A resource loop creates runaway accumulation, permanent shortages, degenerate trade strategies, or unearned wealth.

## Workflow
1. Map resource sources, sinks, transformations, storage caps, transport delays, and actors that create or consume each resource.
2. Run baseline, scarcity, abundance, disruption, and exploit scenarios while logging stocks, flows, prices, and agent welfare.
3. Identify positive feedback loops and unintended arbitrage; test the smallest rule change that breaks the instability.
4. Use parameter sweeps or Monte Carlo seeds to determine whether balance survives small world and behavior variations.

## Required output
A flow diagram, metric definitions, scenario matrix, suspected feedback loops, and change recommendation.

## Validation
- Stocks and flows reconcile to an accounting balance where the model requires conservation.
- Results include multiple seeds and time horizons.
- A proposed fix does not merely transfer the failure to another resource.

## Guardrails
Do not tune an economy to one hand-picked seed or optimize a single metric at the expense of world stability.
