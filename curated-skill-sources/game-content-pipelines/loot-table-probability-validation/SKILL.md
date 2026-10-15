---
name: loot-table-probability-validation
description: Validate weighted loot tables, drop guarantees, pity rules, and reward distribution with calculations and seeded simulations.
---

# loot table probability validation

## Goal

Make loot behavior match documented probabilities and avoid unreachable, biased, or exploit-prone reward outcomes.

## Inputs to inspect

Loot table definitions, weights, nested rolls, rarity guarantees, seed/RNG handling, and economy/balance goals.

## Workflow

1. Normalize the table structure and distinguish raw weights, probabilities, independent rolls, conditional branches, and guaranteed/pity outcomes.
2. Calculate exact probabilities for each simple branch and combine nested probabilities using the documented sampling model.
3. Check zero/negative weights, unreachable entries, overflow, rounding bias, invalid empty tables, and how changes alter legacy save or economy behavior.
4. Run seeded simulations with enough trials to compare observed distribution against expected intervals; separately test deterministic guarantees and pity counters.
5. Review edge cases such as rerolls, interrupted rewards, repeated claims, multiplayer duplication, and rollback/replay paths.

## Validation checklist

- [ ] Each reward probability is mathematically derivable from the configured selection rules.
- [ ] Observed distribution falls within justified statistical intervals for the chosen sample size.
- [ ] Guaranteed drops/pity rules have explicit reset and persistence semantics.
- [ ] No invalid weights or empty conditional tables silently produce unintended rewards.
- [ ] RNG/reward execution cannot be repeated to duplicate an already committed reward.

## Required output

Provide the probability table, assumptions/calculations, simulation report, edge-case findings, and a reviewed diff for any tuning changes.

## Boundaries and failure handling

Do not treat one random sample as proof of a probability bug; do not change reward odds without stating the impact on player-facing guarantees.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
