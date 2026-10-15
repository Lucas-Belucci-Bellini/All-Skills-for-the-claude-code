---
name: emergent-behavior-test-design
description: "Tests emergent simulation behavior using invariants and scenario distributions. Use when NPCs, economies, factions, or procedural worlds combine in unexpected ways."
---

# Emergent Behavior Test Design

## Use when
Complex systems pass unit tests but collapse over long runs, rare seeds, or interactions between otherwise correct systems.

## Workflow
1. Define high-level invariants and unacceptable outcomes instead of asserting one exact emergent story.
2. Generate fixed, seeded scenarios that vary population, starting resources, geography, and system activation order.
3. Run bounded simulations and summarize distributional metrics, worst cases, and the first violated invariant.
4. Minimize a failing seed into a short reproducible case and preserve it as a regression fixture.

## Required output
A scenario generator contract, invariant list, run budget, aggregate metric report, and minimized failure fixture.

## Validation
- Tests cover broad seeds and adversarial parameter combinations.
- Metrics reveal rare failures rather than hiding them in averages.
- Every discovered failure can be rerun deterministically where the model permits.

## Guardrails
Do not hard-code a desired narrative outcome as the only success criterion for an emergent system.
