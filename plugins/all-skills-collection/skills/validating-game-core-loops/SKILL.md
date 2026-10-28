---
name: validating-game-core-loops
description: "Evaluates whether a game's core loop produces understandable, repeatable decisions and meaningful feedback. Use when defining, reviewing, or revising the central player action cycle before expanding content."
---

# Validating Game Core Loops

## Goal
Turn a vague gameplay premise into a testable loop: **observe → decide → act → receive feedback → face a changed situation**. Do not add content until this loop is understandable and worth repeating.

## Inputs
- Target player and intended play session
- Player verbs and available choices
- Win, loss, progress, or stopping conditions
- Current prototype, if one exists

## Procedure
1. Write the loop in one sentence using concrete player actions and visible consequences.
2. List the player's choices at each decision point. If there is only one viable choice, record that as a design risk rather than inventing variety.
3. Identify the information the player needs before acting and the feedback shown immediately afterward.
4. Describe how the world or challenge changes after each loop. Distinguish meaningful change from cosmetic animation.
5. Create a paper or gray-box test with the smallest possible set of rules, objects, and UI.
6. Ask a reviewer unfamiliar with the design to explain the goal, available action, risk, and consequence after observing one cycle.
7. Run at least five cycles. Record where choices become automatic, feedback is missed, or progress stalls.
8. Change one major variable at a time and repeat the test; keep notes on what changed and what evidence justified it.

## Deliverable
Provide:
- Loop statement
- Decision points and consequences
- Required player information and feedback
- Observed friction or dominant strategy
- One prioritized revision with a measurable acceptance criterion

## Acceptance criteria
- A new observer can explain the immediate goal and action without coaching.
- Actions produce visible, causally related feedback.
- Repeating the loop changes the situation or advances a meaningful objective.
- Known assumptions and untested hypotheses are labeled explicitly.

## Avoid
- Treating more levels, enemies, upgrades, or lore as a substitute for a compelling loop.
- Calling a loop validated based only on the designer's intuition.
- Changing several major variables in one test and claiming causality.
