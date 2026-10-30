---
name: nexora-surface-acquisition-recovery
description: "Designs and validates bounded recovery from wgpu surface acquisition and presentation failures across the NEXORA RHI and window host, without confusing surface loss with GPU device loss."
---

# NEXORA Surface Acquisition and Recovery

## Purpose

Use this workflow when NEXORA cannot acquire, render to, or present a window surface image, or when window visibility, resize, minimization, and surface lifecycle interact with frame scheduling. It owns the boundary between surface acquisition/presentation in the RHI backend and recovery policy in the native window host.

This is not a generic GPU device-loss workflow. A surface can be lost or outdated while the adapter/device remains usable. Do not recreate the GPU device, renderer, client, or world state unless evidence identifies that broader failure.

## Reuse before creating

Pair this workflow with existing skills; do not duplicate their scope:

- `nexora-device-loss-state-machine` and `engine-gpu-device-loss-recovery` for actual device loss and device recreation.
- `nexora-render-target-resize-transaction` for off-screen render-target and dependent-resource resizing.
- `nexora-render-pass-state-contract` for pass ordering and render resource dependencies.
- `nexora-gpu-resource-retirement` and `engine-resource-lifetime-ledger` for GPU resource ownership and retirement.
- `engine-window-event-loop-lifecycle` (if present in the active catalog) and the engine input/focus skills for event-loop ownership and focus semantics.

This skill owns classification and bounded recovery for the window surface plus host scheduling. It does not replace device recovery, render-target resizing, generic resource retirement, or input mapping.

## Verified NEXORA snapshot

The inspected snapshot on 2026-10-30 has the following behavior. Re-check the active checkout before applying these facts; they are snapshot observations, not permanent API guarantees.

- `engine/rhi-wgpu/src/surface.rs` defines a `Presenter` containing a `wgpu::Surface<'static>`, `SurfaceConfiguration`, blit resources, and presentation counters/timing.
- `surface::configure` queries adapter capabilities, obtains a default configuration with dimensions clamped to at least 1, prefers supported BGRA/RGBA 8-bit formats with sRGB first, selects FIFO, and enables `COPY_SRC` only when the surface supports it.
- `surface::acquire` tries at most twice. On the first `Lost` or `Outdated`, it reconfigures once and retries.
- `Timeout` and `Occluded` currently become render errors tagged `Recovery::Retry`.
- A second `Outdated` becomes `Recovery::Retry`; a second `Lost` becomes `Recovery::Manual`; `Validation` becomes `Recovery::Manual`.
- A `Suboptimal` image is returned to the caller with a flag so it can be presented and the surface can be reconfigured afterward.
- `WgpuRhi::resize` ignores zero width or height and reconfigures the surface for nonzero dimensions.
- `engine/window/src/lib.rs` owns the winit event loop. Its `Flow::Wait` schedules another attempt after 10 ms; `Flow::Continue` uses `ControlFlow::Poll`; `Flow::Exit` ends the session.
- Any error returned from `Client::frame` currently reaches `Host::after_frame`, which fails the run and exits. A client may choose `Flow::Wait` only when it can classify and handle a transient condition without returning an error.
- A window resize error currently fails the host. The host does not expose a separate minimized/surface-suspended lifecycle state in the inspected code.
- The first visible frame has a 20-second timeout. This is distinct from a per-frame surface acquisition retry policy.

Do not claim these behaviors are already improved or fully tested. The current code's `Recovery` tags alone do not prove that the host actually retries.

## Required inputs

- Pinned NEXORA commit, Rust toolchain, and active target platform.
- Current surface presenter/acquire/present code, RHI public error contract, window host event handling, and relevant ADRs.
- Existing device-loss, render-target resize, render-pass, resource-lifetime, and event-loop skills.
- Platform and backend support matrix; supported surface formats, present modes, and usage flags.
- Reproducible failure scenario and evidence: logs, error variants, GPU/backend, window state, resize sequence, and whether the device remains valid.
- Acceptance criteria for frame continuity, bounded retry, recovery latency, and safe shutdown.

## Recovery workflow

1. **Pin and trace the complete call path.** Record the commit and trace window creation → surface creation/configuration → frame render → surface acquisition → blit/present → host frame result. Identify the exact layer that observes each error and the layer that decides what happens next.
2. **Separate failure domains.** Classify the event as surface-only, window lifecycle, device/adapter loss, shader/pipeline validation, or unknown. A `SurfaceError` must not be promoted to device loss without independent device evidence.
3. **Build an explicit outcome table.** For each backend result, record whether an image exists, whether it may be presented, whether reconfiguration is valid, whether the device remains usable, and the permitted host action. Include success, suboptimal, timeout, occluded, outdated, lost, validation, and backend-specific/unknown outcomes.
4. **Define retry ownership.** Choose one owner for each retry loop. Avoid nested unbounded loops in the RHI and host. The RHI may perform a small bounded recovery attempt; the host owns delayed rescheduling and window lifecycle. Document the maximum immediate attempts, delayed attempts, backoff, reset conditions, and terminal threshold.
5. **Prevent busy loops.** Transient timeout/occlusion must not become a tight `ControlFlow::Poll` loop that repeatedly fails and logs. Use a bounded wait/backoff or event-driven redraw policy. Reset backoff only after a successful acquisition/presentation or a clearly defined lifecycle transition.
6. **Handle Lost and Outdated distinctly.** Reconfigure once only when the existing surface/configuration is still valid. If the surface itself must be recreated, route recreation through the layer that owns the window/surface lifetime. Do not call a second configuration attempt indefinitely. If the device is lost, delegate to the device-loss state machine.
7. **Handle Suboptimal without dropping a valid frame unnecessarily.** If the returned image is valid, decide whether to present it and then reconfigure. Ensure the next frame uses the new configuration and no stale image/view is reused after reconfiguration.
8. **Handle minimize and zero-sized windows explicitly.** Keep zero-sized resize events from configuring invalid targets. Define a suspended/minimized state that does not acquire images, consume CPU in a redraw loop, or count invisible attempts as successful frames. Resume on a valid nonzero resize/visibility event.
9. **Preserve client state.** A surface-only recovery must not call client initialization again, reset world/session state, clear input state incorrectly, or recreate unrelated renderer resources. Define which surface-dependent resources must be rebuilt and which survive.
10. **Make resize transactional.** Coordinate surface configuration with render-target dimensions and any presentation blit resources. If configuration fails, retain a known-good state or enter an explicit suspended/failure state; do not publish half-updated dimensions.
11. **Define host-facing semantics.** Map backend outcomes to an explicit host result such as present, retry-after-delay, suspended-until-event, recreate-surface, recreate-device, or fatal. Do not overload generic `Recovery::Retry` if the host cannot tell when or how to retry.
12. **Respect event-loop ownership.** Keep winit types and event-loop control in `nexora-window`; keep window-system-independent surface contracts in the RHI. Do not add a winit dependency to the backend merely to request redraws.
13. **Protect presentation accounting.** Increment presented/frame counters only after a frame is actually submitted/presented according to the engine's contract. Track skipped, timed-out, occluded, retried, reconfigured, and recreated attempts separately.
14. **Make diagnostics actionable.** Log the error class, attempt number, window dimensions, surface format/config, visibility/minimized state, backend/device identity where safe, elapsed wait, and selected recovery action. Rate-limit repeated transient logs and expose counters for diagnosis.
15. **Test with deterministic fault injection.** Prefer an injectable surface/acquisition adapter or narrow test seam over relying on physical GPU failure. Test each outcome and transition without requiring a real display where possible.
16. **Test lifecycle sequences.** Cover startup before visible, first-frame timeout, minimize/restore, repeated resize, zero dimensions, occlusion, focus loss/regain, surface Lost, Outdated twice, Suboptimal, configuration failure, surface recreation, device loss, and shutdown while waiting.
17. **Test state preservation.** Verify client initialization occurs once during surface-only recovery, world/session identifiers remain stable, pending input is not replayed unexpectedly, and resources are retired only when no longer referenced.
18. **Benchmark and observe.** Measure retry count, time to resume, dropped frames, host CPU while minimized/occluded, reconfiguration cost, and device recreation frequency. Report platform, GPU, backend, resolution, scenario, and sample count. Do not claim a performance gain without measurements.
19. **Document compatibility and decisions.** If behavior changes from the current error/Flow contract, write or update an ADR and public API docs. Record whether the change is backend-specific or part of a future multi-backend contract.
20. **Report evidence honestly.** Separate unit tests, headless tests, real-window/GPU smoke tests, manual platform checks, and unexecuted cases. Never infer that a real surface recovery works merely because a fake state-machine test passes.

## Validation checklist

- [ ] Surface errors are classified separately from GPU device loss.
- [ ] Immediate retries and delayed host retries have explicit finite bounds.
- [ ] Timeout and occlusion cannot create a busy redraw loop.
- [ ] Minimize/zero-size suspends acquisition and valid restore resumes safely.
- [ ] Repeated Lost/Outdated and configuration failure have explicit terminal/recreation policies.
- [ ] Surface-only recovery preserves client/world state and retires only affected resources.
- [ ] Resize, Suboptimal, shutdown-while-waiting and fault-injection cases are tested or marked unexecuted.
- [ ] Presentation counters distinguish shown, skipped, retried and failed frames.

## Validation matrix

| Scenario | Required invariant |
|---|---|
| Success | Image is presented once; counters advance once. |
| Suboptimal | Valid image is not accidentally discarded; next acquisition uses refreshed configuration. |
| First Lost / Outdated | At most one immediate reconfigure attempt; no infinite retry. |
| Repeated Lost | Surface-only failure does not silently recreate the device; host follows explicit terminal/recreate policy. |
| Repeated Outdated | No unbounded configure/acquire loop; resize or surface recreation is requested explicitly. |
| Timeout / Occluded | No busy loop; delayed or event-driven retry; no successful-frame accounting. |
| Minimized / zero size | No invalid configuration or repeated acquisition; restore resumes on valid dimensions. |
| Resize storm | Latest valid size wins; no stale target/view use or partially published configuration. |
| Configuration failure | Known-good or explicit suspended/fatal state; error includes actionable context. |
| Device loss | Delegates to device-loss workflow; surface retry does not mask it. |
| Client state | Surface recovery does not reinitialize or reset unrelated client/world state. |
| Shutdown while waiting | Event loop exits promptly and resources drop in valid lifetime order. |

## Required output

Produce a surface recovery design/report containing: pinned commit; call-path map; observed backend result variants; surface-vs-device failure classification; retry ownership and attempt bounds; host scheduling/backoff policy; minimized/restore behavior; resize/configuration transaction; client/resource preservation rules; diagnostics and counters; deterministic fault-injection plan; platform smoke-test matrix; ADR/API changes; executed and unexecuted validation evidence; and unresolved risks.

## Boundaries

- Do not add generic GPU device recreation here; use the device-loss workflow.
- Do not duplicate off-screen render-target resize logic; use the resize transaction workflow.
- Do not add winit types to the RHI backend or move event-loop ownership into the renderer.
- Do not assume a surface can always be reconfigured after loss; inspect backend/platform contracts.
- Do not treat `Recovery::Retry` as proof that a retry is scheduled.
- Do not convert every surface error into `Flow::Wait`; validation and terminal errors need explicit handling.
- Do not count skipped frames as presented frames or hide repeated failures behind log suppression.
- Do not claim surface recreation, minimized suspension, or runtime recovery is implemented unless the current source and tests prove it.

## Trigger examples

- **Positive:** A NEXORA frame fails to acquire a wgpu surface image after resize, occlusion, or surface loss.
- **Positive:** Design bounded retry/backoff and host scheduling for Lost, Outdated, Timeout, Occluded, or Suboptimal surface outcomes.
- **Positive:** Prevent a minimized NEXORA window from spinning the render loop or repeatedly configuring zero-sized surfaces.
- **Positive:** Validate that surface-only recovery preserves the client/world session and does not recreate the GPU device.
- **Negative:** The GPU device itself is lost or reset; use the device-loss recovery workflow.
- **Negative:** Only off-screen render targets or dependent textures need resizing; use the render-target resize workflow.
- **Negative:** The task concerns generic render-pass resource dependencies or GPU resource retirement.
