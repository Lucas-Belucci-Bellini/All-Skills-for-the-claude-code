---
name: scoping-playable-prototypes
description: "Defines a minimal playable prototype that tests one high-risk game-design assumption within a bounded effort. Use when a game idea is too broad, implementation is starting before validation, or a prototype is accumulating production features."
---

# Scoping Playable Prototypes

## Goal
Choose the smallest playable experiment that can disprove or support one important design assumption. A prototype is a learning instrument, not a miniature version of the full game.

## Procedure
1. List the three assumptions most likely to invalidate the concept (for example: movement feels controllable, the main choice is interesting, or the encounter is readable).
2. Rank them by **uncertainty × cost of being wrong**. Select the highest-risk assumption.
3. Define one observable question and the evidence that would count as support, rejection, or inconclusive.
4. Include only the player action, response, feedback, and minimal environment needed to test that question.
5. Explicitly exclude production systems such as account flows, broad progression, elaborate menus, final art, monetization, and content pipelines unless one is the assumption under test.
6. Set a timebox and a stop condition before implementation begins.
7. Build the roughest version that can generate valid evidence; use placeholders and debug controls where they do not distort the test.
8. Run the experiment with representative inputs or players. Log observations separately from interpretations.
9. Decide: iterate the hypothesis, test a different risk, or stop the concept. Record the evidence and next decision.

## Required prototype brief
- Hypothesis
- Risk if false
- Minimal included features
- Explicit exclusions
- Test procedure and sample
- Success / failure / inconclusive signals
- Timebox and stop condition
- Decision after the test

## Acceptance criteria
- Every included feature supports the chosen experiment.
- The result can change a concrete design decision.
- The test distinguishes observed facts from assumptions.
- The prototype has a clear end state and is not silently becoming production work.

## Avoid
- Building infrastructure because it may be useful later.
- Using polish, feature count, or lines of code as evidence that the idea works.
- Declaring success when the test did not exercise the risky assumption.
