---
name: engine-input-action-mapping
description: Design a device-independent input action layer with rebinding, conflict detection, context priority, and deterministic sampling.
---

# engine input action mapping

## Goal

Separate gameplay actions from keyboard, mouse, controller, and future input devices.

## Inputs to inspect

Current input polling, gameplay action code, UI contexts, controller support, rebind persistence, and networking/replay needs.

## Workflow

1. Inventory raw device inputs and map them to named actions, including analog axes, press/release edges, holds, and repeat semantics.
2. Define input contexts and priority rules for menus, gameplay, overlays, text fields, accessibility navigation, and modal dialogs.
3. Implement rebinding storage with schema versioning, device-specific alternatives, conflict detection, and a safe reset path. Preserve multiple bindings where intended.
4. Choose a tick boundary for sampling authoritative gameplay input and specify how render-rate polling feeds simulation ticks, replays, or network commands.
5. Test simultaneous inputs, lost focus, device disconnect/reconnect, duplicate bindings, analog dead zones, and UI capture precedence.

## Validation checklist

- [ ] Gameplay systems consume actions rather than hard-coded device keys.
- [ ] Conflicts explain which actions are affected and offer a predictable resolution.
- [ ] Input edge events are not lost or duplicated when render and simulation rates differ.
- [ ] Bindings survive version changes or migrate deliberately, and invalid settings have safe defaults.
- [ ] Accessibility bindings and UI focus rules are testable without a physical controller.

## Required output

Deliver an action schema, context priority table, binding persistence format, conflict-resolution behavior, and a device/edge-case test plan.

## Boundaries and failure handling

Do not silently steal a critical binding; do not encode input directly into gameplay state in a way that prevents replay or rebinding.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
