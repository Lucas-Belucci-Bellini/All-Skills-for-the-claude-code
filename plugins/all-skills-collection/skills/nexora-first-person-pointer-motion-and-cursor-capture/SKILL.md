---
name: nexora-first-person-pointer-motion-and-cursor-capture
description: "Implements deterministic first-person relative mouse-look, safe cursor capture lifecycle, and crosshair alignment for NEXORA's native Rust client."
---

# NEXORA First-Person Pointer Motion and Cursor Capture

## Purpose

Use this workflow when implementing or reviewing first-person relative mouse-look, pointer capture, focus recovery, or a screen-space crosshair in the NEXORA client. The target is the gameplay path tracked by [NEXORA issue #71](https://github.com/Lucas-Belucci-Bellini/NEXORA/issues/71).

This skill owns the contract between the window host's raw relative pointer events, the player's authoritative yaw/pitch, cursor lifecycle, and the reticle's alignment with the block-interaction ray. It does not own general input rebinding, camera-origin precision, or the complete native UI architecture.

## Reuse before implementing

- `engine-input-action-mapping` for named actions, device contexts, and deterministic sampling. Pointer deltas are not ordinary normalized action axes.
- `nexora-native-ui-design-to-code` for presentation/RHI integration and design provenance.
- `nexora-native-ui-focus-navigation-contract` for focus ownership and modal input precedence.
- `nexora-camera-origin-rebasing` only when large-world render precision is involved.
- Existing player orientation, camera, raycast, RHI lifecycle, and frame-timing workflows.

Do not reproduce these skills. This workflow focuses on raw relative motion, pointer capture state, and reticle/raycast agreement.

## Verified NEXORA main snapshot

The following facts were inspected on NEXORA `main` at commit `19486829d18bd864fea00cac0711f519a5c07a70` on 2026-10-31:

- `engine/window/src/lib.rs` handles `WindowEvent::KeyboardInput`, `WindowEvent::MouseInput`, focus changes, resize, and close; it does not handle `DeviceEvent::MouseMotion` or a cursor-capture lifecycle in this snapshot.
- `engine/window/src/input.rs` translates keyboard keys and mouse buttons into signals. Its collector has no relative pointer-motion event.
- `engine/runtime/src/input.rs` defines button, axis, attach, and detach signals. Its input architecture treats pointer movement as distinct from normalized analog axes; do not reinterpret raw pixel/device deltas as `Signal::Axis`.
- `engine/simulation/src/player.rs` owns the player's yaw and pitch and defines `MAX_PITCH`. The player, not the camera, owns gameplay facing.
- `engine/client/src/lib.rs` derives the camera from the player's eye and explicitly documents pointer-look and crosshair as not built in this snapshot.
- `engine/camera/src/lib.rs` describes the camera as a derived render view, not the owner of gameplay state.
- The client already performs pixel readback checks against the CPU world ray-cast for first presentation and after world edits. A HUD reticle must not silently contaminate those world-only comparisons.

NEXORA PR #73 was open during this audit and described a candidate implementation. Its proposed code is not part of the pinned main snapshot. Always inspect the latest PR state and diff; never attribute proposed behavior to main until merged.

## Required inputs

- Pinned NEXORA commit and the current state of issue #71, PR #73, and repository-integrity issue #64.
- Target platforms, window backend, expected cursor-capture policy, sensitivity, inversion, and Escape behavior.
- Current window event loop, input collector, input signal/replay contract, player orientation API, client frame loop, interaction ray, RHI passes, and capture/readback tests.
- A reproducible event sequence and expected yaw/pitch/reticle behavior.

## Workflow

1. **Pin main and separate proposals.** Record the exact source commit. Inspect issue #71 and any open pointer-look PR, but distinguish merged source from candidate diffs. Check repository-integrity/security gates before recommending changes to the NEXORA runtime.
2. **Keep ownership boundaries.** The window host owns the event loop, platform window, device events, focus, and cursor grab. The input layer transports events. The player owns authoritative yaw/pitch. The camera derives its view from the player's eye. The interaction authority continues to cast the block ray from that same eye/orientation.
3. **Use a typed relative-motion event.** Represent raw relative deltas with a dedicated event/signal carrying finite `dx` and `dy` values. Do not convert pixel/device movement into a normalized analog axis: axes have dead zones, shaping, and held-state semantics that are wrong for relative pointer impulses.
4. **Preserve deterministic event semantics.** Preserve the order of pointer-motion events inside each frame so the sequence can be replayed. Coalescing multiple deltas is allowed only if it is proven equivalent for the chosen yaw-wrap/pitch-clamp operation; clamping after each event can differ from clamping once after a summed delta. Reject or count non-finite values rather than allowing NaN/Infinity to poison player orientation.
5. **Define the capture state machine.** At minimum model free/visible cursor, captured gameplay cursor, focus lost, and closing. Specify which event captures (for example, explicit click), which event releases (for example, Escape), and what happens on focus loss, focus regain, minimize, close, and client error. Focus regain must not unexpectedly steal the pointer unless the UX explicitly says so.
6. **Treat cursor-grab success as a host result.** Prefer the platform's locked/relative mode when available and define a tested fallback such as confined mode only when it preserves the required relative-motion semantics. If all modes fail, expose a classified failure or a safe uncaptured state; never pretend capture succeeded. Restore cursor visibility and release the grab on every exit/focus-loss path.
7. **Filter events by state.** Forward relative motion only while the window is focused and pointer capture is active. Ignore or quarantine motion while free, unfocused, closing, or after the client has exited. Do not allow stale queued events to rotate the player after release.
8. **Apply sensitivity once.** Define units explicitly (raw device units, radians per unit, or another measured convention). Apply sensitivity and optional vertical inversion in one owner. Do not multiply already-relative device deltas by frame delta unless the chosen platform API supplies velocity rather than displacement. Wrap yaw to a canonical range and clamp pitch to the player's existing `MAX_PITCH`.
9. **Keep player and camera aligned.** Apply the chosen orientation update at a documented frame/tick boundary. Rebuild/interpolate the camera from the player's eye without allowing the camera to become a second authority. If mouse-look updates between fixed simulation ticks, ensure the interaction ray uses the same authoritative orientation that the player sees; document how command timing observes it.
10. **Preserve interaction authority.** The crosshair center must correspond to the same projection ray used by `aim(&world_view, &player.eye())` or the current equivalent. Do not create a separate UI ray with different origin, FOV, aspect ratio, pitch, or sensitivity. Test hit/miss/edge cases at viewport resize and aspect-ratio changes.
11. **Integrate the reticle as presentation.** Inspect the actual RHI/pass graph before adding a crosshair. Keep it in a dedicated overlay pass or another explicitly owned presentation layer, after the world geometry it must overlay. It should not write world depth or mutate the world. Verify viewport pixel-center math, DPI/resize behavior, and depth independence.
12. **Protect world readback tests.** Existing reference captures judge the world against CPU ray-cast pixels. Decide whether HUD overlays are excluded from those captures, masked explicitly, or tested separately. Do not weaken the world verification merely to make a crosshair appear to pass.
13. **Validate lifecycle and platform fallbacks.** Test capture, release, focus loss/regain, Escape, recapture, resize/minimize, close, and device errors on each supported platform. Record which cursor mode actually succeeded; do not infer Windows/macOS/Linux behavior from a single backend.
14. **Test replay and orientation boundaries.** Cover positive/negative deltas, multiple ordered events, zero movement, non-finite values, yaw wrap, pitch clamp, sensitivity extremes, and deterministic replay. Assert that the player's eye, camera view, crosshair center, and interaction ray agree.
15. **Deliver evidence honestly.** Separate headless signal/player tests, RHI pass tests, CI platform builds, screenshot/readback comparisons, and manual Windows 10/11 gameplay smoke tests. A green unit test does not prove OS cursor capture works on a real desktop.

## Validation checklist

- [ ] Relative pointer movement has its own typed signal, not a normalized action axis.
- [ ] Event order and replay semantics are deterministic.
- [ ] Non-finite deltas are rejected or counted safely.
- [ ] Cursor capture/release is an explicit state machine with host-confirmed outcomes.
- [ ] Focus loss, focus regain, Escape, close, minimize, and error paths cannot leave the cursor trapped.
- [ ] Relative motion is accepted only while focused and captured.
- [ ] Fallback cursor modes are verified per platform.
- [ ] Sensitivity/inversion are applied once; yaw wraps and pitch clamps to the player's limit.
- [ ] Player owns facing; camera remains derived from the player's eye.
- [ ] Reticle center matches the actual block-interaction ray.
- [ ] Crosshair overlay does not write world depth or mutate gameplay state.
- [ ] Existing world-only pixel readback tests remain meaningful.
- [ ] Tests cover replay, event ordering, capture lifecycle, orientation limits, and reticle geometry.
- [ ] Windows 10/11 manual smoke is recorded separately from headless/CI checks.

## Required output

Produce a pointer-look evidence report with the pinned commit; current issue/PR state; event/signal contract; capture state machine; platform grab/fallback results; sensitivity and angular-limit policy; player/camera/raycast alignment proof; RHI crosshair pass design; readback-test treatment; unit/replay/CI/manual results; and unresolved platform risks.

## Boundaries and failure handling

- Do not treat raw pointer deltas as normalized analog axes.
- Do not put gameplay orientation ownership in the window or camera crate.
- Do not leave the cursor captured after focus loss, close, or client exit.
- Do not auto-recapture on focus regain unless explicitly specified and tested.
- Do not claim pointer capture works because the API call was attempted; inspect its result.
- Do not let the crosshair's screen-space ray diverge from the player's actual interaction ray.
- Do not weaken world pixel verification to hide overlay contamination.
- Do not claim the feature or NEXORA Alpha is ready because this skill or an unmerged PR exists.

## Trigger examples

- **Positive:** Implement or debug first-person mouse-look and pointer capture for NEXORA issue #71.
- **Positive:** Preserve deterministic relative mouse input across frame sampling and replay.
- **Positive:** Align a screen-space crosshair with the player's block-interaction ray.
- **Negative:** The task is only about keyboard/controller action rebinding; use `engine-input-action-mapping`.
- **Negative:** The task is only about large-world render-origin precision; use `nexora-camera-origin-rebasing`.
- **Negative:** The task is general Figma-to-native-UI implementation; use `nexora-native-ui-design-to-code`.
