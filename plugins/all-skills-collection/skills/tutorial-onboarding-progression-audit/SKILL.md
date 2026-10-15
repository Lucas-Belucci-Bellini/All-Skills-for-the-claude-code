---
name: tutorial-onboarding-progression-audit
description: Audit onboarding steps for clarity, timing, player agency, failure recovery, and whether required mechanics are taught before being tested.
---

# tutorial onboarding progression audit

## Goal

Reduce early-game confusion by aligning each instruction with the moment players need its knowledge.

## Inputs to inspect

Tutorial triggers, introductory level/script, quest objectives, UI prompts, telemetry, and first-session feedback if available.

## Workflow

1. Map the first-session journey to player goals, unlocks, required actions, and the first time each core mechanic becomes necessary.
2. For each prompt, verify trigger timing, concise action language, visible target, current input binding, and whether the player can dismiss/revisit it.
3. Test interruption states such as pause, death/retry, leaving the area, changed input bindings, and completing the taught action before the prompt appears.
4. Check that failure provides a recoverable hint and does not softlock progress when a player ignores or misunderstands the prompt.
5. Use playtest/telemetry evidence to find repeated retries, idle time, prompt dismissals, and abandoned steps; validate a revised flow with fresh players when possible.

## Validation checklist

- [ ] A mechanic is explained before the first mandatory use unless discovery is intentional.
- [ ] Prompts match active controls and current UI state.
- [ ] Tutorial state survives or resets across retry/pause according to explicit rules.
- [ ] Players can recover from missed prompts without restarting the game unnecessarily.
- [ ] Behavioral evidence is distinguished from anecdotal interpretation.

## Required output

Deliver a step-by-step onboarding map, trigger and recovery defects, proposed instruction changes, and a playtest/telemetry validation plan.

## Boundaries and failure handling

Do not add more text as the default solution to every confusion signal; do not infer comprehension only from successful completion.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
