---
name: nexora-character-moving-platform-velocity-inheritance
description: "Validates character movement relative to moving NEXORA supports, including grounded velocity inheritance and platform transition behavior."
---

# NEXORA Character Moving-Platform Velocity Inheritance

## Purpose

Use this workflow when a player or NPC rides a moving kinematic platform, walks relative to a moving support, slips when a platform starts or stops, or transitions between grounded and airborne movement.

This skill covers the character-controller/support-velocity contract. It is not a generic rigid-body collision workflow and does not assume that a character inherits every component of a support body's motion.

## Evidence boundary

The audited NEXORA snapshot documents:

- `engine/physics/src/character.rs` writes character horizontal velocity from movement intent rather than applying generic rigid-body forces.
- Grounded characters receive full horizontal control authority; airborne control is scaled by the configured `air_control`, clamped to the supported range.
- When grounded on another body, the controller adds the support body's horizontal `ground_velocity` to the requested walking velocity. Vertical support behavior remains the pair solver's responsibility.
- `engine/physics/tests/pairs.rs` covers a character standing still on a moving kinematic platform and walking relative to the platform.
- The test fixture documents a first-tick transition: when a platform begins moving, the character initially sees the previous substep's support velocity and slips slightly; subsequent ticks carry it correctly.
- The same test module covers a sleeping body waking when its moving platform begins to move.

Re-check the exact NEXORA revision before applying this workflow. Do not treat the documented first-tick behavior as a universal engine guarantee.

## Required inputs

- Exact NEXORA commit, Rust toolchain, target platform and build profile.
- `CharacterController`, `MoveIntent`, `GroundState`, body support fields and pair-solver update order.
- Platform body type, transform/velocity source, timestep and movement schedule.
- Reproduction fixtures for stationary, translating, stopping and reversing supports.
- Existing contact, sleeping/wake, jump and replay tests.
- Explicit product expectations for first-tick transition, vertical support motion and behavior after losing contact.

## Workflow

1. **Trace movement authority.** Identify which system owns player intent, which system writes horizontal velocity, and which system owns vertical motion. Do not merge those responsibilities by assumption.
2. **Pin the grounded contract.** Record how the controller decides grounded state, obtains support velocity and combines it with walking intent.
3. **Pin the airborne contract.** Record the configured air-control factor, its clamp, and which support-derived velocity components must stop contributing after contact is lost.
4. **Trace update order.** Follow platform motion, pair resolution, ground-state refresh and controller application across a complete tick. Determine whether the controller reads support velocity from the current or previous substep.
5. **Reproduce the transition tick.** Start with a settled character, begin platform motion and measure the relative offset on the first tick and subsequent ticks. Distinguish a documented transient from cumulative drift.
6. **Validate standing still.** With zero movement intent, verify the character remains supported and its relative position remains stable during steady platform translation.
7. **Validate relative walking.** Compare character displacement with platform displacement; the difference should reflect requested walking speed, not world-space speed accidentally added twice.
8. **Validate support changes.** Test platform stop, reversal, direction changes and transfer to another support. Check that stale support velocity is not retained after the contact contract says it should end.
9. **Validate jump and airborne transitions.** Confirm jump authorization is based on grounded state, horizontal control follows the airborne policy, and unsupported platform motion is not silently retained.
10. **Validate support wake behavior.** If the support or rider can sleep, verify moving platforms wake affected bodies without waking unrelated stationary bodies or causing repeated wake cycles.
11. **Check determinism and numerical boundaries.** Repeat identical platform paths, including zero velocity and direction reversal, and compare relative state under the project's deterministic test method.
12. **Report limitations precisely.** Separate existing behavior, first-tick transients, tested behavior, proposed changes and product decisions still required.

## Validation checklist

- [ ] Grounded movement intent is combined with support velocity exactly once.
- [ ] A stationary rider remains at a stable relative offset during steady horizontal platform motion.
- [ ] Walking speed is measured relative to the platform, not accidentally relative to world origin.
- [ ] The first tick after platform motion begins is tested and any transient is quantified.
- [ ] Platform stop and reversal do not leave stale support velocity.
- [ ] Losing support transitions to the declared airborne-control behavior.
- [ ] Jump is accepted only under the current grounded contract.
- [ ] Vertical support motion remains owned by the documented solver/controller boundary.
- [ ] Sleeping riders or supported bodies wake when required by platform movement.
- [ ] Repeated identical fixtures produce deterministic relative motion.
- [ ] Tests distinguish controller intent, platform motion and solver-applied displacement.
- [ ] Source and generated plugin copies are byte-identical and catalog metadata reconciles.

## Required output

Return:

- Exact source revision and relevant controller, body and pair-solver paths.
- A movement-authority diagram or concise ownership description.
- The grounded and airborne velocity equations, with units and component ownership.
- A tick-order timeline explaining which support velocity the controller reads.
- Relative-offset and relative-speed results for first-tick and steady-state fixtures.
- Jump, support-loss, stop/reversal and sleep/wake test results.
- Exact commands and test outcomes; skipped GPU/runtime tests must be named.
- Remaining risks and whether the result is an audit, proposal, implementation or verified behavior.

## Boundaries and failure handling

- Do not treat a character as an ordinary dynamic crate; controller intent and support velocity have distinct authority.
- Do not add support velocity twice or silently change between world-space and support-relative movement.
- Do not assume vertical or angular platform velocity is inherited; inspect the actual contract and solver ownership.
- Do not hide a first-tick slip by reporting only steady-state behavior.
- Do not keep stale support velocity after the character is airborne unless an explicit movement design requires it.
- If the current update order exposes previous-substep support state, document the transition and evaluate a change separately; do not claim it is already solved.
- This skill does not change NEXORA runtime code or claim that engine tests/benchmarks were executed.

## Trigger examples

- **Positive:** A character standing still slides off a kinematic platform after it begins moving.
- **Positive:** Validate that walking speed on a moving platform is relative to the platform and not added twice.
- **Positive:** Review jump and airborne transitions after a character leaves a moving support.
- **Negative:** The task concerns only rigid-body pair collision with no character controller or support-relative movement.
- **Negative:** The task is about rendering platform animation and does not involve physics support velocity.
