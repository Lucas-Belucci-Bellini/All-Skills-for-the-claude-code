---
name: designing-game-combat-resolution
description: "Designs consistent, readable, testable combat hit and damage resolution. Use when implementing attacks, hit detection, hurtboxes, invulnerability, status effects, or combat feedback in a game."
---

# Designing Game Combat Resolution

## Goal
Make every attack resolve consistently: players can understand why a hit landed or failed, and implementation details do not create accidental double damage or unfair outcomes.

## Procedure
1. Write the attack contract: attacker, target eligibility, hit shape, active window, range, team/faction rules, and expected result.
2. Separate detection from resolution. Detection reports candidate contacts; a single resolver validates them and applies gameplay effects.
3. Define a canonical order for checks: attack active, target valid, faction/team eligibility, immunity/invulnerability, blocking/parry, armor/resistance, damage, status effects, hit reaction, and death handling. Adjust to the game, but make the order explicit.
4. Decide whether one attack can hit a target once, repeatedly during an active window, or once per distinct hit event. Track hit identities or cooldowns accordingly.
5. Specify edge cases: simultaneous lethal hits, attacker despawning mid-flight, target changing teams, overlapping hitboxes, piercing attacks, damage over time, and interrupted animations.
6. Keep gameplay truth separate from presentation. Hit sparks, sound, camera shake, and floating numbers should reflect the resolved outcome rather than independently deciding it.
7. Make randomness reproducible in tests where critical hits, spread, or proc chances are involved. Record inputs and random seed for a disputed result.
8. Add debug views for attack volume, active frames, target hurtboxes, collision layer, and rejection reason; make them removable from release builds.
9. Build a test matrix for boundary distance, frame boundaries, immunity, blocking, multiple colliders per actor, and repeated overlap.
10. Tune readability after correctness: telegraph attacks, communicate blocked/immune hits, and preserve meaningful player counterplay.

## Resolution record
For each representative attack, document:
- Eligibility and hit-detection rule
- Resolution order and damage formula
- Per-target repeat policy
- Status and interruption behavior
- Presentation events emitted
- Boundary and regression tests

## Acceptance criteria
- One physical overlap cannot accidentally apply damage multiple times.
- Invulnerability, blocking, resistance, and death have explicit precedence.
- Visual effects match the resolved combat outcome.
- Tests cover boundaries and multiple colliders, not only center-of-target hits.
- Combat can be debugged from logged inputs and a clear rejection/resolution reason.

## Avoid
- Applying damage directly from every collision callback without deduplication.
- Letting animation events and physics callbacks both resolve the same attack.
- Hiding unclear hit rules behind arbitrary extra damage.
- Treating hit-stop, sound, or particles as proof that gameplay damage occurred.
