---
name: validating-game-economy-loops
description: "Evaluates resource generation, spending, scarcity, and reward loops for exploitability and meaningful player choices. Use when balancing crafting, upgrades, shops, loot, currencies, or survival resources."
---

# Validating Game Economy Loops

## Goal
Ensure the economy supports intended decisions over time and does not collapse into trivial abundance, unavoidable starvation, or a dominant exploit.

## Procedure
1. Inventory each resource, its sources, sinks, storage limits, conversion ratios, and the systems or player choices that depend on it.
2. Draw the main loops from source to use and back to source. Mark renewable sources, one-time rewards, conversion loops, and irreversible spending.
3. Define the intended player experience: which resources should feel scarce, which choices should compete, and what recovery exists after a bad decision.
4. Establish simple baseline scenarios: cautious play, average play, highly optimized play, repeated failure, optional-content skipping, and late-game production.
5. Calculate expected inflow and outflow over a representative time window. State assumptions and include ranges rather than pretending uncertain drop rates are exact.
6. Search for arbitrage loops where conversion returns more value than it costs, duplicated rewards, unbounded farming, vendor buy/sell exploits, and upgrades that pay for themselves infinitely.
7. Check bottlenecks and soft-locks: required items consumed too early, random drops gating mandatory progress, full inventory blocking critical rewards, and no recovery after spending.
8. Simulate the simplest dominant strategy. If one action always beats alternatives, adjust opportunity cost, constraints, or the value of alternatives rather than adding arbitrary complexity.
9. Test economy boundaries with deterministic fixtures and seeded randomness. Verify caps, rounding, overflow, transaction atomicity, and save/load persistence where relevant.
10. Change one major parameter family at a time; compare outcomes against the intended experience and keep a record of trade-offs.

## Deliverable
- Resource flow table (sources, sinks, conversions, caps)
- Assumptions and baseline scenarios
- Exploit and soft-lock findings ranked by severity
- Parameter changes with expected effect
- Regression tests for fixed or newly discovered exploits

## Acceptance criteria
- Every resource has documented sources and sinks, including exceptional rewards.
- Conversion cycles cannot create unintended value without an explicit design reason.
- Mandatory progress has a recovery path from plausible mistakes or unlucky outcomes.
- The dominant strategy and its consequences are known, not merely guessed.
- Balance conclusions distinguish simulation results from actual player evidence.

## Avoid
- Balancing only around an ideal player.
- Adding grind to compensate for an unexamined infinite loop.
- Removing all scarcity until every purchase is automatic.
- Treating average values as sufficient when variance can cause soft-locks.
