---
name: nexora-gamepad-host-signal-adapter
description: "Designs and validates the NEXORA host adapter that turns physical gamepad events into stable, ordered runtime input signals."
---

# NEXORA gamepad host signal adapter

## Purpose

Use this workflow when adding or reviewing physical gamepad support at the NEXORA platform boundary. The adapter must translate backend-specific controller events into the existing device-independent `nexora_runtime::input` contract without moving gameplay logic into the window host.

This scope is deliberately narrower than general input mapping, accessibility remapping, or hot-plug lifecycle design. It owns the physical-to-logical gamepad signal bridge, canonical control numbering, analog normalization, per-frame delivery, and adapter conformance evidence.

## Evidence baseline

The current runtime input model already defines `DeviceKind::Gamepad`, `DeviceId`, `ButtonCode`, `AxisCode`, `Signal::button`, `Signal::axis`, `Attached`, and `Detached`. The runtime consumes finite axis readings, applies action-level `AxisTuning` with a signed `[-1, 1]` contract, and resolves bindings by device kind.

The current window host uses `winit` to translate keyboard and mouse events into one `InputFrame` before each client frame. Its Cargo manifest does not currently declare a gamepad backend. ADR-0031 explicitly lists gamepads as not built. Treat these as the inspected baseline; re-check the target branch because the implementation may change.

Do not claim that a physical controller is supported because runtime unit tests can synthesize `Signal::Axis` or `Signal::button`. Backend enumeration, mapping, event collection, and physical-device execution are separate evidence levels.

## Required inputs

- Current `engine/runtime/src/input.rs`, `engine/window/src/input.rs`, `engine/window/Cargo.toml`, and window event-loop delivery path.
- Accepted input and host-boundary ADRs, especially ADR-0018 and ADR-0031.
- Candidate gamepad backend/library, its supported OSes, licensing, mapping database policy, event/polling semantics, and device identity guarantees.
- Canonical NEXORA logical button/axis table and explicit support policy for standard, unusual, and unmapped controls.
- Target OS/build, controller model/firmware, connection mode (USB/Bluetooth), and reproducible test harness or physical test device.

## Workflow

1. **Preserve the host/runtime seam.** Keep device enumeration and OS/backend APIs in the host/platform layer. Translate observations into existing `InputFrame` signals; do not poll hardware from `nexora_runtime::input`, execute commands in the adapter, or let the adapter mutate gameplay state.
2. **Select and pin the backend deliberately.** Compare maintained libraries for Windows, Linux, and macOS support, controller mapping coverage, event ordering, reconnect behavior, licensing, and build/runtime dependencies. Pin the chosen version and record mapping-database provenance/version. Do not assume `winit` provides gamepad input or add a backend solely because it is popular.
3. **Define stable logical controls.** Publish a NEXORA-owned table for common buttons and axes. Map backend-specific enums and vendor layouts into that table; never persist a dependency enum discriminant, transient enumeration index, display name, or raw platform code as a logical control. Keep optional controls explicitly optional and count/report unknown controls instead of guessing. Define how mirrored D-pad, stick-click, shoulder, trigger, and system/menu controls behave.
4. **Normalize analog values without losing meaning.** Document each backend's raw range and center, signed stick axes, one-sided triggers, inversion, and calibration. Convert to finite values with explicit clamping and stable polarity before emitting `Signal::axis`. Do not collapse two independent triggers into one signed axis unless the action model and product behavior explicitly require it. Avoid applying dead zones twice: identify whether normalization or runtime `AxisTuning` owns each transformation.
5. **Collect ordered frame signals.** Preserve event order and press/release edges across the host's frame boundary. Emit attach/detach exactly once per lifecycle transition, avoid synthetic duplicate presses from polling snapshots, and ensure a button pressed and released between frames remains observable under the runtime's established tap semantics. Define polling cadence and event queue draining so render-rate and simulation-rate differences do not silently lose input.
6. **Handle focus, disconnect, and multiple pads.** Reconcile held buttons and axes on disconnect, focus loss, sleep/wake, backend reset, and reconnect. A removed controller must not leave movement or triggers active. Distinguish a device instance from the stable logical binding kind; define player assignment separately from device enumeration. Reordered indices and two identical controllers must not silently transfer a player's controls.
7. **Build adapter-level conformance tests.** Use synthetic backend events to cover every canonical mapping, unknown control, axis endpoints/center/non-finite values, trigger semantics, repeated polls, event bursts, quick taps, simultaneous buttons, focus loss, disconnect while held, reconnect, two controllers, and backend enumeration reorder. Assert the exact emitted `InputFrame` sequence and the resulting `InputSnapshot`.
8. **Verify physical hardware per platform.** Run a documented smoke test on each claimed OS with at least one standard controller and one alternate layout where available. Record model, connection type, OS build, backend/library version, mapping database version, and observed button/axis values. Keep simulated tests, CI virtual-device tests, and physical hardware tests as separate result columns.
9. **Publish bounded support claims.** Produce the logical control table, backend mapping/version record, normalization specification, lifecycle policy, adapter conformance report, and per-platform hardware matrix. Mark unsupported devices and controls explicitly; do not infer universal gamepad compatibility from one controller.

## Validation checklist

- [ ] The runtime remains independent of OS APIs and gamepad-library types.
- [ ] Every supported physical control maps to a documented stable NEXORA logical code.
- [ ] Backend-specific codes and unstable device indices are not persisted as logical bindings.
- [ ] Signed sticks and one-sided triggers have documented, tested normalization and polarity.
- [ ] Non-finite readings and unknown controls are rejected or counted without corrupting the frame.
- [ ] Button edges and event order survive collection and frame delivery, including quick taps.
- [ ] Disconnect, focus loss, reconnect, sleep/wake, and enumeration reorder cannot leave stuck input or transfer ownership silently.
- [ ] Two simultaneous controllers remain distinguishable as device instances while sharing device-kind bindings.
- [ ] Synthetic adapter tests assert exact signals and resulting actions.
- [ ] Physical hardware results identify exact OS, backend, controller, and connection mode; untested platforms remain unclaimed.

## Required output

Return:
- Backend decision and dependency/license/platform assessment.
- Stable logical gamepad button/axis mapping table.
- Raw-to-normalized axis and trigger conversion rules.
- Event ordering, frame-delivery, focus, and device lifecycle contract.
- Adapter conformance cases and observed test results.
- Physical hardware support matrix with explicit simulated/CI/hardware evidence levels.
- Unsupported controls, unresolved backend gaps, and a GO/HOLD decision for each platform.

## Boundaries and failure handling

Do not duplicate the general rebinding/conflict-resolution workflow in `engine-input-action-mapping`, the accessibility journey audit in `gameplay-input-remapping-accessibility`, or the generic device identity/hot-plug policy in `engine-input-device-hotplug-contract`. Link to those workflows when their concerns arise; keep this skill focused on the NEXORA gamepad-to-signal adapter.

Do not alter NEXORA runtime code from this skill-only task. A runtime implementation requires a separately authorized change in the NEXORA repository. Never claim controller support, hardware validation, or platform parity without observed evidence. If no physical device or platform runner is available, report the exact synthetic/CI coverage and leave hardware status **NOT TESTED**.

## Trigger examples

- **Positive:** Add a gamepad backend to `nexora-window` and map controller events into the existing `InputFrame` contract.
- **Positive:** Review whether Xbox-style and alternate-layout controllers produce the same NEXORA logical button and axis signals.
- **Positive:** Diagnose stuck movement, trigger polarity, lost quick taps, or reordered controller identity at the host boundary.
- **Negative:** Design generic action names, mapping-context priority, or rebinding conflict UX without changing the host adapter.
- **Negative:** Audit gamepad accessibility alternatives or motor-access settings as a player-experience review.
- **Negative:** Implement gameplay behavior or directly poll physical devices inside the runtime input system.
