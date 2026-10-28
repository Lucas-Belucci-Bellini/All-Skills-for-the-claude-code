---
name: engine-input-device-hotplug-contract
description: Specify reliable input-device discovery and hot-plug behavior, including stable device identity, action rebinding, disconnect recovery, and test coverage.
---

# Engine Input Device Hot-Plug Contract

## Purpose

Make controller, keyboard, mouse, and other supported input-device changes predictable while gameplay or editor sessions are active.

## Required inputs

Input abstraction, supported device types, OS/backend event APIs, action mapping, device identity model, focus policy, and platform test hardware.

## Workflow

1. Inventory device events and backend guarantees for connect, disconnect, remap, focus loss, and device sleep/wake.
2. Define stable device identity and distinguish a physical device from a transient enumeration index or connection handle.
3. Specify what happens to held buttons, axes, active action bindings, and player ownership when a device disconnects mid-input.
4. Handle duplicate device names, identical controllers, reordered enumeration, reconnects, and permission failures without binding input to the wrong user.
5. Ensure input events are timestamped or sequenced consistently with the engine tick model and define behavior for late or missing events.
6. Build tests for disconnect while buttons are held, rapid reconnect, focus loss, controller remap, device removal during rebinding, and multiple identical devices.
7. Expose diagnostics for device state and recovery decisions while avoiding unnecessary collection of identifying hardware data.

## Validation checklist

- [ ] Device identity does not rely solely on an unstable enumeration index.
- [ ] Disconnect clears or reconciles held state so actions cannot remain stuck.
- [ ] Reconnect and player reassignment follow a documented policy.
- [ ] Hot-plug and focus-loss cases have automated or clearly specified hardware tests.

## Required output

A device lifecycle state machine, identity/binding rules, recovery policy, and hot-plug regression matrix.

## Boundaries and failure handling

Do not assume all OS backends deliver identical event ordering. Mark platform-specific gaps and do not infer physical identity from a display name alone.

## Trigger examples

- **Positive:** The task concerns controller detection, device hot-plug, reconnect behavior, stuck inputs, or input ownership changes.
- **Negative:** The task only concerns designing new gameplay keybinds without device lifecycle or backend behavior.
