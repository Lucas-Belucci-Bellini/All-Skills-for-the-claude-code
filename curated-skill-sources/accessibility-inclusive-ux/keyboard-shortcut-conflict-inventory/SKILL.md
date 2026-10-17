---
name: keyboard-shortcut-conflict-inventory
description: "Inventory application shortcuts and test conflicts with text entry, browser commands, assistive technology and user remapping."
---

# Keyboard Shortcut Conflict Inventory

## Purpose

Keep shortcuts discoverable and safe without intercepting ordinary typing, browser navigation or assistive-technology commands unexpectedly.

## Required inputs

Shortcut registry, keyboard handlers, supported browsers, input surfaces, assistive-technology scope and customization support.

## Workflow

1. Collect shortcuts from the app, screens, editors, dialogs and third-party components; record scope and configurability.
2. Identify shortcuts fired while focus is in text inputs, content-editable regions or embedded editors, including browser/AT conflicts.
3. Confirm single-character shortcuts can be disabled, remapped or restricted to the relevant component where required.
4. Test modifier differences, keyboard layouts, IME composition, repeated events, focus changes and shortcuts inside dialogs.
5. Ensure help text reflects the actual mapping and conflicts have explicit resolutions.

## Validation checklist

- [ ] Each shortcut has an action, scope, trigger and conflict resolution.
- [ ] Ordinary text entry does not trigger unrelated commands.
- [ ] Customization or disablement works where supported.
- [ ] Keyboard layout and composition do not trigger destructive actions.
- [ ] Shortcut help matches the implementation.

## Required output

A shortcut registry, conflict matrix, remapping rules and regression tests for collisions.

## Boundaries and failure handling

Do not intercept system or assistive-technology combinations without a tested product requirement. Destructive shortcuts need clear confirmation and recovery.

## Trigger examples

- **Positive:** Typing a letter in a comment editor triggers global navigation.
- **Negative:** Testing Tab reachability without any shortcut concern.
