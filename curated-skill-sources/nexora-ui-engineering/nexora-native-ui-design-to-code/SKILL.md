---
name: nexora-native-ui-design-to-code
description: "Turns verified UI designs into tested native-engine UI slices for NEXORA by mapping screens, states, input, assets, and rendering to the repository's real Rust contracts."
---

# NEXORA Native UI Design-to-Code

## Purpose

Use this workflow when converting a concrete design into a functional NEXORA client/editor interface. It covers the complete handoff from design evidence to an integrated, testable Rust implementation—not just a visual mockup.

This skill is intentionally repository-aware. In the inspected NEXORA main snapshot, the client host is in `engine/client`, window and input ownership are in `engine/window`, rendering contracts are in `engine/render` and `engine/rhi`, and the first backend is `engine/rhi-wgpu`. There is no `engine/ui` crate in that snapshot. Do not claim that a reusable widget tree, layout engine, font system, UI renderer, or accessibility runtime already exists. Recheck the checkout before each implementation.

## Reuse before creating

Pair this workflow with existing skills where applicable; do not copy their scope:
- `ui-state-transition-invariant-testing` for state-machine and transition invariants.
- `engine-input-action-mapping` for device-independent input actions and context priority.
- `nexora-editor-docking-layout-migration` for persisted editor layout schema and recovery.
- Relevant accessibility skills for keyboard navigation, contrast, focus, motion, and nonvisual alternatives.
- Rendering/RHI and Rust architecture skills for backend contracts, resource lifecycle, and crate boundaries.

This skill owns the design handoff and end-to-end integration workflow. It does not replace general UI accessibility, input mapping, editor docking, or renderer engineering.

## Required inputs

- Pinned NEXORA commit and clean checkout state.
- Actual design artifact or reference: Figma file/frame, Claude Design artifact, image, annotated screenshot, or code-native prototype. Record the exact artifact/version and what was actually inspected.
- Screen inventory and intended user tasks, including player HUD, menus, settings, inventory, pause, dialogs, or editor panels as applicable.
- Target window sizes, DPI/scaling expectations, platform set, keyboard/mouse/gamepad requirements, and accessibility constraints.
- Existing crate/module/API map, Cargo manifests, ADRs, design tokens, asset licenses/provenance, and test commands.
- Acceptance criteria for behavior and visuals; unresolved decisions must be explicit.

## Workflow

1. **Pin and inspect the repository.** Record the commit, toolchain, target platforms, and relevant Cargo manifests. Trace the real startup path from client to window host, input delivery, render pass, RHI, and backend. Mark each UI capability as implemented, partial, planned, or absent.
2. **Audit skill reuse.** Search the current catalog by capability, not just title. Reuse the UI state, input mapping, accessibility, editor layout, rendering, and QA workflows listed above. Create a new skill only for a demonstrated gap in design-to-engine handoff.
3. **Capture design provenance.** Record the artifact link or local path, revision/frame IDs, author/source, license/permission, inspection date, and any unavailable details. If only an image is available, do not infer hidden component behavior or responsive rules.
4. **Build a screen and state inventory.** For each screen list purpose, entry/exit, navigation, primary/secondary actions, loading/empty/error/success states, focus states, disabled states, modal behavior, and back/escape behavior. Include overlays and HUD layers separately from world rendering.
5. **Extract design tokens.** Define color roles, typography families/weights/sizes, spacing scale, radii, borders, elevation, icon rules, animation timing, and density. Preserve semantic roles rather than scattering literal values. Record font and icon licenses and fallback behavior.
6. **Specify geometry and scaling.** Record logical design dimensions, anchor constraints, safe areas, minimum/maximum sizes, aspect-ratio behavior, DPI scaling, clipping, scroll regions, and resize behavior. Test the smallest supported window and at least one wide/tall configuration; do not assume browser CSS semantics.
7. **Map interaction semantics.** Define pointer hit targets, hover/pressed/selected/focused/disabled states, keyboard navigation order, shortcut scope, mouse capture, controller focus navigation, analog input where relevant, and text-entry ownership. Reuse the engine's input action/context contract rather than reading raw device keys from widgets.
8. **Map the design onto real engine boundaries.** Determine which behavior belongs in client/application state, UI presentation, input routing, asset loading, render preparation, and RHI commands. The current window host owns the event loop and calls the client; the current render crate is a world renderer. Do not insert UI code into world meshing or bypass the RHI abstraction.
9. **Resolve the missing UI architecture explicitly.** If the checkout still has no UI subsystem, prepare a minimal ADR/design proposal before implementation: ownership of widget/tree state, layout, text shaping/rasterization, clipping, hit testing, accessibility semantics, input focus, draw batching, texture/font resources, and renderer integration. Compare a small immediate-mode prototype with a retained-mode model only against actual NEXORA requirements. Do not add egui, bevy, iced, winit UI helpers, or another framework without a dependency/architecture decision and measured rationale.
10. **Choose a thin vertical slice.** Implement one real screen or overlay with a complete interaction path (for example, pause/settings shell or a minimal title/menu flow). Include layout, text, assets, input, state transitions, render integration, and recovery. Keep world gameplay and UI ownership separate.
11. **Integrate assets safely.** Use existing asset/resource/image contracts where suitable. Validate dimensions, formats, color space, font licensing, atlas limits, fallback glyphs, and device loss/reload behavior. Avoid embedding unlicensed reference art or silently replacing missing assets with blank output.
12. **Implement explicit UI states.** Model loading, ready, empty, error, disabled, focused, modal, and transition states as appropriate. Prevent contradictory combinations and stale asynchronous results. Route actions through named commands/actions with clear ownership.
13. **Validate visual correctness.** Compare captures at documented window sizes and scaling factors. Check clipping, alignment, text baseline/wrapping, contrast, overlap, safe areas, focus visibility, and state-specific appearance. Use golden/screenshot tests only when the renderer and CI environment can produce trustworthy captures; otherwise document the manual review procedure.
14. **Validate input behavior.** Test keyboard-only operation, mouse hit testing, controller navigation if supported, focus loss/regain, escape/back, simultaneous inputs, text fields, modal priority, and input consumed by UI versus gameplay. Ensure UI focus does not accidentally move or edit the world.
15. **Validate accessibility.** Audit semantic labels/roles, navigation order, non-color status cues, contrast, scalable text, reduced motion, focus indication, and alternatives for information conveyed only visually. If the engine lacks accessibility APIs, document the gap and propose a staged contract rather than claiming conformance.
16. **Test failure and lifecycle cases.** Cover missing fonts/textures, invalid design tokens, zero-sized/minimized surfaces, resize storms, device/surface recreation, cancellation during screen changes, repeated open/close, and shutdown with pending UI resources.
17. **Measure cost.** Record CPU time, allocations, draw calls/batches, texture/font memory, upload volume, and frame-time impact in a representative screen. Separate measured values from estimates and do not set hard budgets without a baseline.
18. **Deliver traceability.** Link each design requirement to implementation location and a test/manual evidence item. Report unsupported design details, deviations, follow-up decisions, and exact commands/results. Do not claim Figma/Claude Design inspection, screenshot generation, or runtime execution unless performed.

## Validation checklist

- [ ] Design source, revision, provenance, and inspection limits are recorded.
- [ ] Current UI capabilities are classified as implemented, partial, planned, or absent.
- [ ] Existing skills were audited and reused without semantic duplication.
- [ ] Screen inventory covers navigation and all relevant UI states.
- [ ] Tokens, typography, geometry, scaling, and asset licenses are explicit.
- [ ] UI input is routed through real engine contracts and cannot leak into gameplay.
- [ ] Crate boundaries and RHI integration follow the current architecture.
- [ ] Any missing UI subsystem has an ADR/design decision before broad implementation.
- [ ] A functional vertical slice exists; the result is not only a mockup.
- [ ] Resize, DPI, clipping, focus, keyboard, mouse, and supported controller cases are tested.
- [ ] Accessibility limitations and verified behavior are accurately reported.
- [ ] Visual captures/golden tests are distinguished from headless tests and manual review.
- [ ] Asset/device/lifecycle failures have safe recovery behavior.
- [ ] Performance claims include baseline, hardware, scenario, and measurement method.
- [ ] Requirements map to code and evidence; unexecuted checks are clearly marked.

## Required output

Produce a design-to-code handoff containing: pinned commit; inspected design artifact and provenance; screen/state inventory; token and geometry specification; interaction/focus map; current engine capability map; reused skills; architecture decision or missing-subsystem proposal; vertical-slice implementation map; asset provenance; test/capture evidence; accessibility findings; performance measurements; deviations; and unresolved risks.

## Boundaries and failure handling

Do not invent a UI crate, widget API, layout system, text renderer, accessibility layer, or Figma import capability. Do not assume a design artifact was inspected merely because a URL was supplied. Do not implement a static screenshot as if it were interactive UI. Do not bypass the RHI or place presentation state inside world-generation/meshing code.

If the engine lacks a UI subsystem, stop broad implementation and produce the smallest architecture decision and vertical-slice proposal. If visual tests cannot run in CI, state why and provide a reproducible manual capture matrix. If a font, icon, or image has unclear provenance, quarantine it until rights are clear. Never claim the NEXORA Alpha is ready because this skill or one UI screen exists.

## Trigger examples

- **Positive:** Convert a Figma/Claude Design/reference screen into a working NEXORA Rust client or editor UI.
- **Positive:** Plan the first native UI vertical slice when the current engine has window, input, and RHI contracts but no dedicated UI crate.
- **Positive:** Review design-token, layout, input-focus, accessibility, and visual-regression handoff for an engine-native screen.
- **Negative:** The task only changes editor panel docking persistence; use the dedicated editor layout migration workflow.
- **Negative:** The task only changes generic input action bindings; use the engine input mapping workflow.
- **Negative:** The task only tests UI state transitions independent of design handoff; use the UI state invariant testing workflow.
- **Negative:** The task only implements a shader/render pass without a screen, interaction, or design artifact.
