---
name: reduced-motion-interaction-equivalence
description: "Verify that reduced-motion preferences preserve important state changes and actions without relying on nonessential movement."
---

# Reduced Motion Interaction Equivalence

## Purpose

Keep interaction meaning and completion feedback available when users request less motion.

## Required inputs

Animated states, transition library, platform preference behavior, critical flows and visual acceptance criteria.

## Workflow

1. Inventory motion that communicates navigation, progress, hierarchy, success, error or spatial relationship.
2. Separate essential feedback from decorative motion and document a non-motion equivalent for each essential behavior.
3. Enable reduced-motion preference and exercise navigation, dialogs, progress, parallax, autoplay and repeated interactions.
4. Verify disabling movement does not suppress completion, focus changes, loading state, cancellation or operation of controls.
5. Change the preference during an active animation and ensure the UI does not remain stuck between states.

## Validation checklist

- [ ] Reduced motion removes or shortens nonessential movement.
- [ ] Important outcomes remain perceptible through stable text, state or focus.
- [ ] Progress does not depend exclusively on animation.
- [ ] Continuous motion follows the product's accessibility policy.
- [ ] Preference changes do not freeze controls or stale transitions.

## Required output

A motion inventory, reduced-motion matrix, failures and regression coverage for critical flows.

## Boundaries and failure handling

Do not indiscriminately disable movement if it removes necessary feedback or causes disruptive layout jumps. Do not report platform testing complete when only preference emulation was used.

## Trigger examples

- **Positive:** A large animated route transition needs an equivalent reduced-motion path.
- **Negative:** Adjusting static icon spacing with no motion behavior.
