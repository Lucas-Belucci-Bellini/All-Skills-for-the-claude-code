---
name: nexora-hotbar-slot-selection-and-placement-identity
description: "Defines deterministic nine-slot hotbar selection and safe selected-block placement for NEXORA. Use when adding numeric slot keys, mouse-wheel selection, material identity, hotbar UI, or selected-block integration."
---

# NEXORA Hotbar Slot Selection and Placement Identity

## Purpose

Use this workflow to implement or review the first playable nine-slot hotbar described by [NEXORA issue #72](https://github.com/Lucas-Belucci-Bellini/NEXORA/issues/72). It covers the contract from input event to selected slot, content identity, placement authority, and the icon shown to the player.

This skill owns hotbar slot selection and the identity bridge to block placement. It does not replace the general UI design handoff, input action mapping, inventory transaction model, content registry, or command-validation workflows.

## Reuse before implementing

- `nexora-native-ui-design-to-code` for screen/state design, visual integration, and the UI renderer boundary.
- `nexora-native-ui-focus-navigation-contract` for keyboard/controller focus ownership and modal capture.
- `nexora-native-ui-layout-scale-contract` for responsive HUD geometry and hit targets.
- `engine-input-action-mapping` for device-independent actions, bindings, contexts, and deterministic sampling.
- `nexora-inventory-transaction-invariants` for inventory ownership and atomic item movement when an inventory transaction actually exists.
- Relevant registry/content-identity, command-validation, accessibility, and gameplay-regression skills.

Do not duplicate those workflows. This skill specifies the hotbar-specific invariant: the selected slot's stable content identity must be the same identity used for the placed block and its displayed icon.

## Verified NEXORA snapshot

Re-check the checkout and open pull requests before applying these observations. The following facts were inspected on NEXORA `main` at commit `19486829d18bd864fea00cac0711f519a5c07a70` on 2026-10-31:

- `engine/client/src/lib.rs` defines `BUILT_BLOCK = "nexora:block/stone"`, resolves it to a `BlockStateId`, and constructs one `BlockEditor` with that fixed state.
- `engine/simulation/src/controls.rs` binds movement/look/exit keys and mine/build mouse buttons. It does not yet bind hotbar selection actions. Its comments describe mine/build as edge intents.
- `engine/window/src/input.rs` maps keyboard keys and mouse buttons into input signals. Its `InputCollector` has no explicit mouse-wheel/scroll event path in this snapshot.
- `engine/window/src/input.rs::key_usage` already maps digit keys, but a host mapping alone does not create gameplay actions or bind them in `Controls`.
- `engine/runtime/src/input.rs` defines ordered per-frame `InputFrame` signals for buttons, axes, device attach, and detach, plus named actions and prioritized contexts. There is no wheel-specific signal in this snapshot.
- `engine/simulation/src/interaction.rs::BlockEditor::new` receives one `BlockStateId`; `BlockEditor::apply` currently constructs placement commands with an empty parameter list.
- `engine/simulation/src/commands.rs::PlaceBlockHandler` has a default state and currently interprets `Parameter::Count` as a numeric `BlockStateId` override. This is observed behavior, not a recommended stable identity contract.
- The world registry resolves namespaced content identifiers to runtime IDs. Runtime IDs are implementation-local and can depend on the registered content order; they are not atlas indices and should not be persisted as the slot's identity.

These facts describe that exact snapshot, not permanent APIs. Re-read the current code and any candidate PR before implementation; do not treat an open, unmerged PR as mainline behavior.

## Required inputs

- Pinned NEXORA commit, relevant open issue/PR state, Rust toolchain, and clean checkout.
- Nine-slot UX requirements: selection order, wheel direction, wrap/clamp policy, empty-slot behavior, and focus/modal rules.
- Content identifiers and the current registry mapping for placeable blocks.
- Current input host, `InputFrame`, `Controls`, `BlockEditor`, placement command, content/atlas lookup, and save schema.
- Explicit decision on whether hotbar state is session-only or persistent in the current save format.

## Workflow

1. **Pin the source and acceptance contract.** Record the NEXORA commit and read issue #72 plus related PRs. Separate merged code from proposals. Confirm that the first milestone is nine visible/selectable slots, not a complete inventory/crafting system.
2. **Audit reusable capabilities.** Reuse the skills listed above. Inspect whether a real inventory, item registry, UI subsystem, or save field now exists. Do not invent a second item catalog or assume a widget framework.
3. **Define the slot model.** Use exactly nine slots for the first slice. Keep the active slot within the valid range and define whether the public index is zero-based or one-based at each boundary. A slot should represent an explicit empty state or a stable namespaced content identifier, not an atlas coordinate or transient runtime integer.
4. **Separate item identity from placeable block identity.** Determine whether a slot contains a block directly or an inventory item that maps to a placeable block. If the latter system does not exist, do not pretend it does: define the smallest explicit mapping contract and keep it separate from visual texture lookup.
5. **Specify selection semantics before wiring input.** Define number-key mapping 1–9, wheel direction, one-notch behavior, multi-notch behavior, and whether the active slot wraps or clamps at either end. Define deterministic precedence for simultaneous number-key and wheel events. Empty slots remain selectable unless the UX explicitly says otherwise; selection must not silently skip to a different material.
6. **Extend the real input path.** Bind named hotbar actions through the existing `InputSystem` and its context priorities. Digit key codes being recognized by the window host is not sufficient until gameplay actions are registered and sampled. The inspected host has no explicit wheel collector: add a deliberate transient scroll event contract and carry it through the host to `InputFrame`. Do not fake wheel notches as mouse-button presses. If an axis representation is proposed instead, prove that the delta is consumed as a one-frame impulse and cannot remain stuck as a held value. Preserve event order and deterministic replay.
7. **Respect UI capture and focus.** Menus, text fields, dialogs, and future inventory screens must be able to consume selection keys/scroll before gameplay. A hotbar selection event must not also type a digit into a text field or scroll the world/camera when a UI context owns it.
8. **Keep stable identity in the model.** Store a namespaced `Identifier` (or a verified stable item identifier) in each occupied slot. Resolve it through the current world's registry when placement is requested. Do not persist `BlockStateId`, palette indices, atlas tile indices, texture handles, or GPU resource handles as the slot identity.
9. **Bridge selection to the placement authority.** The current `BlockEditor` is constructed with one fixed state and `apply` sends no placement parameters. Design an explicit, typed path for the currently selected placeable identity/state to reach the placement handler at the simulation boundary. Keep ray casting, edit-area checks, actor/body collision validation, command dispatch, and world mutation inside the existing authority pipeline. Do not let the HUD write the world directly.
10. **Validate before placement.** Resolve the identifier against the active registry and verify that it is known, placeable, and available in the current content set. An empty slot or unresolved identifier must produce a visible, classified refusal/disabled state; it must not fall back silently to stone or another default. Review the current `Parameter::Count` cast before reusing it: a generic count is not a durable content identifier, and an arbitrary numeric ID must not bypass registry validation.
11. **Keep icon and gameplay identity aligned.** Resolve the displayed thumbnail/material from the same stable identifier used by the slot. The atlas index may be derived as a render lookup result, but it must never become the slot's identity. A missing texture/icon may show an explicit placeholder while preserving the actual selected identity; it must not substitute a different block.
12. **Define same-frame ordering.** Specify whether selection is applied before a build action sampled in the same render frame, and how the choice is retained when a frame has zero simulation steps or several fixed steps. Do not lose a one-frame selection edge, apply it twice, or let a build use a stale slot by accident. Add deterministic tests for the chosen ordering.
13. **Handle persistence honestly.** Inspect the current player/world save schema. If hotbar state is not supported, label it session-only and avoid promising persistence. If it is added, serialize stable identifiers with an explicit schema/version migration and test save/load with missing or renamed content identifiers.
14. **Validate the complete user path.** Test selection, displayed icon, selected identity, and resulting world block together. A test that only asserts the active slot index does not prove the selected block was placed.
15. **Deliver evidence.** Report the pinned commit, slot and wheel policy, action/context map, identifier-resolution path, placement authority path, UI/icon mapping, tests executed, platform smoke checks, persistence status, and remaining gaps. Distinguish source inspection from tests actually run.

## Validation checklist

- [ ] Exactly nine slots exist and active index bounds are enforced.
- [ ] Number keys 1–9 map to the intended slots through named actions.
- [ ] Wheel events have explicit direction, notch, multi-event, and wrap/clamp semantics.
- [ ] Scroll input is transient and deterministic; it is not encoded as a fake mouse button.
- [ ] UI contexts can consume selection input before gameplay.
- [ ] Empty and unknown slots are explicit states with no silent material fallback.
- [ ] Slot identity is a stable namespaced identifier, not a runtime ID or atlas index.
- [ ] Identifier resolution is validated against the active registry/content set.
- [ ] Selected material reaches placement through the existing BlockEditor/command authority.
- [ ] Raycast, edit-area, collision, and command validation remain enforced.
- [ ] The icon is resolved from the same content identity used for placement.
- [ ] Selection/build ordering is defined across zero, one, and multiple simulation steps.
- [ ] Save/load claims match the actual schema and round-trip tests.
- [ ] Tests cover slot boundaries, simultaneous inputs, empty/unknown content, and placed-block identity.
- [ ] Windows smoke evidence is distinguished from headless tests and CI-only checks.

## Required output

Produce a hotbar implementation report with the pinned commit; nine-slot data model; active-slot and wheel policy; action/context mapping; host-to-InputFrame event path; stable identifier and registry-resolution contract; placement-authority integration; icon/material lookup; empty/unknown behavior; save compatibility; focused tests and platform smoke evidence; and unresolved risks.

## Boundaries and failure handling

- Do not add a second content/material catalog.
- Do not use atlas tile indices, texture handles, or runtime registry IDs as persistent slot identity.
- Do not let the UI write blocks directly or bypass `BlockEditor`, raycast, edit-area, collision, or command validation.
- Do not treat a generic numeric `Parameter::Count` as a durable block identity without a reviewed typed contract and registry validation.
- Do not silently replace an empty/unknown slot with stone.
- Do not claim mouse-wheel support until the host captures and tests scroll events.
- Do not claim hotbar persistence until save/load round-trip tests prove it.
- Do not claim the NEXORA Alpha is ready because the hotbar model or this skill exists.

## Trigger examples

- **Positive:** Implement the nine-slot hotbar requested by NEXORA issue #72.
- **Positive:** Add or debug number-key and mouse-wheel slot selection.
- **Positive:** Trace a selected material from content identifier through HUD icon to the block actually placed.
- **Negative:** The task is only about general menu layout or converting a Figma screen; use `nexora-native-ui-design-to-code`.
- **Negative:** The task is only about generic input rebinding/context priority; use `engine-input-action-mapping`.
- **Negative:** The task is only about atomic inventory transfers/crafting; use `nexora-inventory-transaction-invariants`.
