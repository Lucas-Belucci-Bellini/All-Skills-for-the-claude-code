---
name: gameplay-input-remapping-accessibility
description: Audit input remapping and accessibility alternatives for conflict-free actions, device parity, and motor-access needs.
---

# gameplay input remapping accessibility

## Goal

Ensure gameplay remains completable with different input devices and personalized bindings.

## Inputs to inspect

Action mapping layer, default bindings, controller/keyboard support, accessibility options, and core gameplay flows.

## Workflow

1. Enumerate required and optional gameplay actions and mark which actions need hold, repeat, chord, analog precision, or simultaneous input.
2. Test remapping of each critical action across supported devices, including duplicated actions, conflicting chords, disconnected devices, and invalid saved mappings.
3. Check whether timing-sensitive or multi-button actions have an accessible alternative such as toggle/hold mode, adjustable repeat, or remappable sequence where design permits.
4. Verify UI navigation, focus, prompts, and tutorial text update when a binding changes; do not leave stale hard-coded key prompts.
5. Run end-to-end flows using keyboard-only, alternate controller layout, remapped controls, and relevant accessibility settings.

## Validation checklist

- [ ] Critical actions can be rebound and saved with clear conflict feedback.
- [ ] Input prompts are derived from the active binding/device rather than hard-coded labels.
- [ ] Disconnect/reconnect and corrupted settings have safe defaults.
- [ ] Accessibility alternatives preserve gameplay intent without creating hidden mandatory simultaneous inputs.
- [ ] Acceptance tests cover complete gameplay journeys, not only the settings screen.

## Required output

Produce an action coverage matrix, remapping conflict list, accessibility gap report, and end-to-end input test scenarios.

## Boundaries and failure handling

Do not describe one fixed control scheme as universally accessible; do not clear player bindings silently during schema updates.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
