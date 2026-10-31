---
name: testing-procedural-gameplay-encounters
description: "Tests procedurally assembled encounters for solvability, pacing, fairness, and reproducibility. Use when levels, rooms, enemy groups, objectives, or rewards are composed from seeds and reusable pieces."
---

# Testing Procedural Gameplay Encounters

## Goal
Catch generated encounters that are technically valid but unfair, unreadable, trivial, repetitive, or impossible to complete.

## Procedure
1. Define hard constraints separately from quality goals. Hard constraints include reachable objectives, valid spawn positions, required exits, navigation connectivity, and resource prerequisites; quality goals include variety, pacing, and strategic choice.
2. Record the generator version, content-data version, seed, difficulty parameters, and relevant player capabilities for every failing example.
3. Create a small deterministic seed corpus: representative ordinary seeds, edge-case seeds, previously failing seeds, and seeds selected to exercise rare combinations.
4. Validate structural invariants before play simulation: graph connectivity, safe spawn spacing, bounds, collision clearance, required-resource availability, and valid entrance/exit relationships.
5. Run cheap automated agents or scripted traversal to identify unreachable goals, unavoidable damage, dead ends without recovery, enemy overlap, and impossible jumps. Treat bot success as a signal, not proof of fun or fairness.
6. Measure encounter properties such as time-to-first-threat, cover and escape availability, enemy composition, reward density, backtracking, and difficulty spikes. Compare distributions across seeds rather than relying on a single average.
7. Detect repetitive layouts and dominant solutions. Compare meaningful features or player choices, not only raw geometry hashes.
8. Add human playtests for cases where readability, tension, or perceived fairness cannot be inferred from structural checks.
9. Preserve every confirmed failure as a regression fixture. A fix should make the seed pass without disabling broad classes of valid content.
10. When changing generator logic, compare old and new distributions, generation failure rate, runtime cost, and reproducibility. Document intentional changes to output.

## Failure report
Include:
- Exact seed and generator/content versions
- Player capability and difficulty parameters
- Expected invariant or experience
- Minimal reproduction steps or saved generated artifact
- Observed failure and severity
- Regression test added
- Whether the issue is structural, balance-related, or subjective

## Acceptance criteria
- A failing generated encounter can be recreated from recorded inputs.
- Hard constraints are checked automatically where practical.
- Test corpus includes edge cases and confirmed regressions.
- Quality is evaluated across a seed distribution, not one showcase seed.
- Automated checks are not presented as a substitute for human playtesting.

## Avoid
- Silently discarding difficult seeds until the generator appears healthy.
- Calling every reachable level fair or every varied level interesting.
- Fixing a bad seed with a one-off exception when a general invariant is missing.
- Reporting only average difficulty when rare cases can soft-lock progression.
