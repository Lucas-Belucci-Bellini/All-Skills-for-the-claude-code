---
name: nexora-surface-present-blit-fidelity
description: "Validates NEXORA's final wgpu surface blit for texel orientation, nearest-sampled scaling, channel order, format negotiation, and truthful surface readback."
---

# NEXORA Surface Present Blit Fidelity

## Purpose

Use this workflow when the image rendered into a NEXORA off-screen target looks different after it reaches the window, when changing the wgpu surface format or final blit shader, or when a window probe must prove that presentation preserved the intended pixels.

This skill owns the *pixel-transfer contract at the final presentation boundary*: supported surface format selection, the full-screen blit, texel orientation, nearest-sampled scaling, channel order, and optional readback evidence. It does not own surface-loss recovery, general HDR/color management, or GPU resource retirement.

## Reuse before creating

- `nexora-surface-acquisition-recovery` owns acquisition outcomes, resize/minimize behavior, retries, and surface lifecycle.
- `nexora-color-space-pipeline-contract` owns the wider linear-light and display color-space pipeline.
- `nexora-rhi-conformance-evidence` owns backend-wide contract evidence and commit-scoped native validation.
- `gpu-readback-stall-audit` owns CPU/GPU synchronization and asynchronous readback performance.
- `nexora-render-target-resize-transaction` owns off-screen target resizing and dependent resource generations.

Do not broaden this workflow into those adjacent responsibilities.

## Verified NEXORA snapshot

The inspected NEXORA `main` revision was `eed3dbcb68c7540decf08b3d55f2fae7feae8833`. Re-check the active checkout before relying on these observations.

- `engine/rhi-wgpu/src/surface.rs` owns `PREFERRED`, `readable`, `configure`, the presentation WGSL, the full-screen blit pipeline, its sampler, and surface acquisition.
- The preferred 8-bit surface formats are ordered: `Bgra8UnormSrgb`, `Rgba8UnormSrgb`, `Bgra8Unorm`, then `Rgba8Unorm`. The sRGB formats are preferred first; the unorm formats are fallbacks.
- `configure` queries adapter/surface capabilities, obtains the default configuration using dimensions clamped to at least one, selects the first supported preferred format, selects FIFO, and adds `COPY_SRC` only when the surface advertises that usage.
- `readable(format)` is true only for the four listed formats. A surface may present successfully without supporting the optional capture path.
- The presentation WGSL uses one full-screen triangle. Its UV convention maps the RHI's top-left texel origin to the surface; the fragment shader samples the off-screen frame.
- The blit sampler uses `ClampToEdge` and `Nearest` for both minification and magnification. The image is stretched to the configured surface dimensions; this code does not add an aspect-ratio-preserving letterbox.
- `engine/rhi-wgpu/src/lib.rs` exposes `SurfaceInfo`, `PresentedFrame`, `present_and_capture`, and `surface`. Captured texels are documented as four bytes per texel, row-major from the top-left, in the reported surface format's channel order.
- `engine/window/src/probe.rs` builds a 16×16 four-quadrant target, reads back the first presented frame when supported, accounts for BGRA versus RGBA, and checks the nearest-sampled source texel at each destination pixel centre. Ambiguous centres exactly on a source-texel boundary are skipped.
- `engine/window/tests/window.rs` checks that a readable surface is actually captured and that every checked texel matches. A non-readable surface is reported as such rather than treated as a pixel-validation pass.
- ADR-0027 records historical X11/Xvfb, Win32/WARP, and AppKit/virtual-device evidence. Treat that as historical, commit-scoped software/virtual display evidence, not proof for every physical GPU or the current HEAD.

These observations describe the inspected revision; they are not permanent API guarantees.

## Required inputs

- Exact NEXORA commit, Rust toolchain, `wgpu` version, OS, window system, adapter/backend, and driver.
- Current `surface.rs`, `WgpuRhi::present` / `present_and_capture`, `PresentedFrame`, window probe, window tests, and ADR-0027.
- Source render-target format and expected pixel pattern, destination dimensions, and expected scaling policy.
- Surface capability snapshot: supported formats, present modes, and usages.
- Whether the task requires visible presentation, readback capture, or both.

## Workflow

1. **Pin the implementation and trace the path.** Record the NEXORA commit. Trace the renderer target through `Rhi::present`, surface acquisition, the final blit, submission/present, and optional `PresentedFrame` readback. Keep acquisition/recovery decisions in the surface-recovery workflow.
2. **Separate source and destination formats.** Record the off-screen target format and the selected surface format independently. Do not assume that an RGBA source means the window surface is RGBA; BGRA is a valid platform choice.
3. **Re-evaluate capability negotiation.** Read the live surface capability list. Verify the selected format is actually supported, the preference order is intentional, FIFO is available, and `COPY_SRC` is added only when advertised. If no preferred format is supported, inspect the default configuration and explicitly classify the resulting capture capability.
4. **Check color encoding at the boundary.** Determine whether the selected target is sRGB or linear and where the display transfer function is applied. An sRGB render target performs encoding on writes; an sRGB surface performs its own target conversion. Do not add a shader gamma transform merely because a screenshot looks dark, and do not assume the unorm fallback is visually equivalent to an sRGB surface. Use known mid-tone patches to expose double-encoding or missing encoding; pure 0/255 quadrants alone cannot validate mid-tone transfer.
5. **Audit the full-screen triangle and UVs.** Derive the triangle's clip-space positions and interpolated UVs from the active WGSL. Verify top-left maps to top-left, vertical orientation is not inverted, the image is not mirrored, and all destination pixels are covered. Do not infer correctness from a shader compiling.
6. **Verify sampler semantics.** Confirm both minification and magnification use nearest filtering and both address axes clamp to edge. Test an integer enlargement and a non-integer scale; use the probe's pixel-centre mapping rather than assuming every destination pixel maps to an integer source coordinate.
7. **Verify channel order.** Read the reported surface format and convert BGRA bytes to logical RGBA only when the format is BGRA. Never infer channel order from the host OS name alone. Reject unsupported formats instead of silently interpreting them as four-channel RGBA.
8. **Treat capture as a capability, not a guarantee.** Require both a readable format and surface `COPY_SRC` support before expecting `present_and_capture` to return a frame. `None` on a non-readable surface means capture is unavailable; it does not mean presentation failed or pixel fidelity passed.
9. **Use an asymmetric test pattern.** Preserve distinct top-left, top-right, bottom-left, and bottom-right colours so vertical flips, mirroring, and red/blue swaps are detectable. Add mid-tone and alpha cases when testing color transfer or blending; the four opaque quadrant colours alone only prove orientation/channel placement for those values.
10. **Validate dimensions and row layout.** Check `PresentedFrame.width`, `height`, `format`, byte count, row-major order, and top-left origin. Confirm the expected destination-to-source mapping for each pixel centre and document boundary pixels that are intentionally excluded.
11. **Test capability combinations.** Cover each preferred format individually, BGRA/RGBA variants, sRGB/unorm variants, surfaces without `COPY_SRC`, and a default format outside the readable set. A fake capability test proves selection logic only; retain at least one real-window presentation test where the environment supports it.
12. **Separate evidence classes.** Report shader/source inspection, unit tests of mapping/format logic, headless RHI tests, real-window surface tests, readback comparison, CI virtual adapters, and local physical GPU checks separately. A passing null backend cannot prove pixels reached a window.
13. **Report discrepancies precisely.** Include source and destination format, dimensions, backend, first mismatching coordinate, expected logical RGBA, raw stored bytes, and whether the mismatch is orientation, channel order, sampling, color encoding, or unsupported capture.
14. **Update compatibility claims.** Tie every platform claim to the exact commit and adapter class. Historical ADR results must not be presented as current physical-device coverage.

## Validation checklist

- [ ] The source target format and selected surface format are recorded separately.
- [ ] The selected format and present mode are supported by the active surface capabilities.
- [ ] `COPY_SRC` is enabled only when advertised; capture-unavailable is not misreported as failure or pass.
- [ ] Full-screen triangle coverage and top-left UV orientation are verified.
- [ ] Nearest filtering and clamp-to-edge behavior are preserved for both axes.
- [ ] BGRA/RGBA channel conversion follows the reported format, not an OS assumption.
- [ ] sRGB encoding is applied exactly once; unorm fallback behavior is tested independently.
- [ ] The asymmetric quadrant pattern catches vertical flip, mirroring, and channel swap.
- [ ] Mid-tone patches are used when validating transfer functions.
- [ ] Captured byte count, row layout, dimensions, and pixel-centre mapping are checked.
- [ ] Real-window and physical-GPU evidence are labelled separately from headless and virtual CI evidence.

## Required output

Produce a presentation fidelity report containing the pinned commit, source and surface formats, surface capability snapshot, selected format/present mode/usages, blit shader and sampler invariants, expected pixel mapping, readback availability, pattern results, first mismatch if any, backend/driver/platform, tests actually executed, evidence class, and unresolved limitations.

## Boundaries and failure handling

- Do not handle Lost, Outdated, Timeout, Occluded, minimize, resize retry, or surface recreation here; use `nexora-surface-acquisition-recovery`.
- Do not define the entire HDR/tone-mapping pipeline here; use `nexora-color-space-pipeline-contract`.
- Do not treat a successful present call as proof that the displayed pixels match the source.
- Do not treat a missing readback as a successful visual comparison.
- Do not claim a format is readable solely because it has four channels; use the backend's explicit format/capture contract.
- Do not assume old ADR/CI evidence proves the current commit or a physical GPU.
- Do not change the shader, sampler, format order, or output transform without a regression pattern that exposes the relevant failure.

## Trigger examples

- **Positive:** A NEXORA frame appears upside down, mirrored, scaled with blur, or with red and blue swapped after presentation.
- **Positive:** Changing wgpu surface format selection or `COPY_SRC` capability affects window capture.
- **Positive:** Validate that the final blit preserves a 16×16 voxel-art target when stretched to a window.
- **Positive:** Diagnose whether a darker window image comes from sRGB/unorm output handling or an earlier material stage.
- **Negative:** The surface image cannot be acquired after resize or occlusion; use `nexora-surface-acquisition-recovery`.
- **Negative:** The problem is material-map encoding, lighting, or the general HDR pipeline; use `nexora-color-space-pipeline-contract`.
- **Negative:** The task concerns generic GPU readback latency or staging-buffer reuse; use `gpu-readback-stall-audit`.
