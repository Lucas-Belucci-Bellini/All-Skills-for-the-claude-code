---
name: nexora-native-ui-focus-navigation-contract
description: "Specify keyboard and controller focus movement for native engine interfaces. Use when menus, dialogs or HUD panels need predictable non-pointer navigation."
---

# NEXORA Native UI Focus Navigation Contract

## Purpose

Make native menus operable without a mouse by defining focus ownership, traversal order, modal boundaries and input cancellation behavior.

## Required inputs

- The UI screen graph and interactive controls present in each state.
- Keyboard, gamepad and accessibility input bindings actually supported by the engine.
- Modal/dialog behavior, focus restoration expectations and relevant interaction tests.

## Workflow

1. Inventory focusable controls and classify them by screen, group, modal layer and interaction role.
2. Define initial focus, next/previous traversal, directional navigation and explicit overrides for non-linear layouts.
3. Specify focus ownership during modal open/close, screen transitions, disabled controls and asynchronous content replacement.
4. Ensure pointer hover does not silently steal keyboard/controller focus unless that behavior is an intentional documented policy.
5. Handle repeated input, key-up/key-down distinctions, cancellation and device hot-plug without leaving focus in a detached or disabled control.
6. Test full flows using keyboard only and controller only, including nested dialogs, empty lists, dynamic lists and return-to-previous-screen behavior.

## Validation checklist

- [ ] Every interactive flow has a deterministic initial focus target.
- [ ] Focus cannot escape an active modal boundary unintentionally.
- [ ] Focus restoration never points to a destroyed or disabled control.
- [ ] Keyboard and controller flows can complete without pointer input.

## Required output

A focus graph, traversal rules, modal ownership table, input-state notes and executable test scenarios.

## Boundaries and failure handling

Do not assume the engine has a particular widget toolkit or controller abstraction. If the input layer is incomplete, document the missing contract instead of inventing APIs.

## Trigger examples

- **Positive:** A pause menu must be fully navigable with a gamepad.
- **Positive:** A dialog closes but focus is lost or returns to a control that no longer exists.
- **Negative:** The task only changes colors, typography or texture assets.
- **Negative:** The target screen is intentionally pointer-only and has no focusable controls.
