---
name: nexora-environmental-vfx-event-bridge
description: "Defines the non-authoritative event-to-particle presentation boundary for NEXORA environmental and weather effects."
---

# NEXORA Environmental VFX Event Bridge

## Purpose

Use this workflow when implementing or reviewing transient environmental effects in NEXORA: rain and snow particles, wind-blown dust, smoke, ambient motes, splashes, impact bursts, trails, and other short-lived visual phenomena.

This workflow owns the boundary from semantic effect events to client-side VFX definitions, emitters, particle simulation, and renderer submission. It does not own authoritative weather/time transitions, sky/cloud/fog composition, gameplay physics, or world lighting.

## Reuse before creating

- `nexora-weather-time-authority` for authoritative world time, weather state, deterministic transitions, and replay boundaries.
- `nexora-atmosphere-fog-composition-contract` for sky, cloud layers, atmospheric visibility, fog, and dimension-aware environment composition.
- `nexora-lighting-render-extraction-contract` for immutable light/celestial inputs; VFX must not create a second lighting authority.
- `nexora-render-pass-state-contract` for pass ordering, attachment ownership, and transparent composition.
- `nexora-rhi-conformance-evidence` for backend-neutral resource checks and native GPU pixel evidence.
- `nexora-gpu-upload-backpressure`, `nexora-gpu-resource-retirement`, and `nexora-device-loss-state-machine` for bounded uploads, in-flight resource lifetime, and device-loss recovery.
- `nexora-render-resolution-budget` and `nexora-frame-pacing-budget` for fill-rate and frame-time evidence.
- Existing generic VFX, pooling, LOD, and asset workflows where their contracts already cover the task.

Do not create another weather authority, cloud renderer, fog composer, particle allocator, or render-pass policy under this skill.

## Verified NEXORA snapshot

Re-check the active checkout before applying these facts. They describe the inspected 2026-10-30 main snapshot.

- `docs/plans/VFX AND PARTICLE SYSTEM.md` defines the intended semantic flow: gameplay/world fact → VFX event → effect definition → emitter/system → CPU/GPU simulation → renderer.
- That plan states that VFX is presentation, never simulation authority; it calls for pooling, lifetime/spawn budgets, distance culling, screen-size LOD, graceful degradation, and headless-safe behavior.
- The plan explicitly says to replicate semantic triggers when needed rather than raw per-particle state, and says dedicated servers must not require GPU simulation.
- The plan's `IVFXSystem` TypeScript-like interface is conceptual documentation, not evidence of a Rust API. Do not port its names or signatures without an architecture decision.
- `engine/render/src/lib.rs` documents the current renderer as a chunk pass over the RHI and explicitly lists broader rendering features as not built. The inspected render crate has no verified particle emitter, particle buffer, VFX pass, or particle simulation API.
- `engine/client/src/lib.rs` currently runs the client frame through input, fixed-step simulation, physics, render preparation, and render. The inspected client does not prove that a VFX event bus or particle runtime exists.
- `docs/plans/CLIMATE and ATMOSPHERE.md` distinguishes climate, immediate weather, and atmospheric representation. A plan is not proof that climate or weather runtime modules exist.
- The current renderer has a sky gradient and distance haze baseline; sky/cloud/fog composition belongs to `nexora-atmosphere-fog-composition-contract`, not this workflow.

Treat these as a bounded snapshot, not permanent API guarantees.

## Required inputs

- Pinned NEXORA commit, target platform, active render backend, and client/headless mode.
- Source of each semantic event and the authoritative owner of its cause.
- Effect definition schema, version, asset references, and deterministic event identity.
- Particle lifetime, spawn rate, bounds, collision requirements, and visual importance.
- Target hardware and explicit CPU, GPU, memory, upload, and overdraw budgets.
- Existing render-pass order, transparent blend/depth rules, resource handles, and device-loss behavior.
- Replay/network requirements and evidence distinguishing semantic replication from cosmetic local simulation.

## Workflow

1. **Trace the fact to its owner.** Find the authoritative world, gameplay, or weather transition that justifies the effect. Emit a semantic event with stable identity and revision; do not infer rain, snow, wind, or damage from renderer-local timers.
2. **Keep presentation downstream.** Convert the event into an effect request. VFX may read immutable frame/environment snapshots, but it must not mutate blocks, weather, physics, inventory, or authoritative time.
3. **Separate event, definition, and instance.** The event says what happened and where; the versioned definition describes appearance and parameters; the emitter/instance owns transient age, particles, and local resources. Do not serialize transient GPU buffers as world state.
4. **Define deterministic admission.** Derive cosmetic variation from a stable event seed and definition version when repeatable output is useful. Define a stable priority/tie-break rule for spawn-budget overflow. GPU execution need not be bitwise deterministic unless the product explicitly requires it.
5. **Choose CPU or GPU simulation by responsibility.** Use CPU simulation only when a real interaction/query requires it or when a measured platform fallback needs it. Purely cosmetic high-volume particles may use GPU simulation only after the RHI/resource contract exists. Neither path becomes gameplay authority.
6. **Make headless behavior explicit.** A dedicated/headless process must be able to process or ignore semantic events without creating a window, GPU device, particle buffers, or renderer dependency. Tests must prove the headless path does not initialize presentation-only resources.
7. **Bound every resource.** Specify maximum active effects, particles per effect, total particles, spawn rate per tick, lifetime, retained emitter count, upload bytes, and memory. State the overflow policy: reject, coalesce, reduce density, or replace lower-priority cosmetic work.
8. **Pool without hiding ownership.** Reuse emitter/particle storage where profiling supports it. Give handles generations or equivalent stale-reference protection; define cancellation, stop, natural expiry, reset, and shutdown behavior. Avoid unbounded pools that retain peak memory forever.
9. **Cull and degrade in stages.** Apply world-distance and frustum culling, screen-size LOD, density reduction, update-rate reduction, and effect-class fallback in a declared order. Preserve critical gameplay readability; cosmetic weather must not obscure interaction targets.
10. **Respect pass and blend contracts.** Place effects in the correct opaque, Cutout, transparent, or later composition stage. Specify depth test/write, blend mode, sorting, soft-particle depth inputs if available, and whether fog is applied before or after the effect. Avoid applying atmosphere/fog twice.
11. **Tie assets and resources to lifecycle.** Validate effect assets before runtime use; define missing-asset fallback. Retire GPU resources only after their last submitted use completes. Device loss must invalidate/recreate presentation resources without losing authoritative world state.
12. **Keep network traffic semantic.** Replicate event triggers or authoritative weather revisions only when required. Let clients construct cosmetic particles locally from stable seeds. Do not stream every particle transform unless a separately justified feature requires it.
13. **Measure before tuning.** Capture active particle counts, spawn/drop counts, CPU update time, GPU time, upload bytes, overdraw/fill cost, pool high-water marks, and frame percentiles. Compare identical scenes, seeds, camera paths, and quality settings.
14. **Validate the whole lifecycle.** Test spawn, budget overflow, culling/unculling, LOD transitions, pause/resume, event replay, save/load boundaries, device loss, resource retirement, and shutdown. Keep the CPU reference or deterministic analytic fixture independent of the GPU path where practical.
15. **Report implementation status honestly.** Separate design-only contracts, implemented CPU path, implemented GPU path, headless proof, native GPU evidence, network/replay proof, and measured performance. A skill or plan is not implementation evidence.

## Validation checklist

- [ ] Every effect has a traceable semantic cause and authoritative owner.
- [ ] Weather/time authority is reused; the renderer does not invent weather transitions.
- [ ] VFX cannot mutate authoritative simulation or gameplay state.
- [ ] Event, effect definition, and transient instance have separate identities/lifecycles.
- [ ] Spawn admission and overflow behavior are deterministic and bounded.
- [ ] CPU/GPU responsibilities and platform fallbacks are explicit.
- [ ] Headless mode requires no GPU or window resources.
- [ ] Active particles, memory, uploads, and overdraw have hard budgets.
- [ ] Pool reset, stale handles, cancellation, expiry, and shutdown are tested.
- [ ] Culling and LOD preserve critical gameplay visibility.
- [ ] Pass order, depth, blending, sorting, and fog interaction are tested.
- [ ] GPU resources retire only after in-flight use completes.
- [ ] Network replication sends semantic events, not unnecessary raw particle state.
- [ ] Benchmarks use repeatable scenes and report frame percentiles.
- [ ] Claims distinguish planned, implemented, and verified behavior.

## Validation matrix

| Scenario | Required invariant |
|---|---|
| Rain/snow event | Particles follow an authoritative weather revision; VFX does not change weather. |
| Wind-blown dust | Visual drift consumes a declared wind snapshot and remains cosmetic. |
| High event burst | Spawn budget is respected and overflow follows a stable priority policy. |
| Far-away emitter | Distance/frustum culling reduces work and resumes without stale particles. |
| Screen-size LOD | Density/update rate changes without changing gameplay facts. |
| Headless server | No window, GPU device, or presentation-only resource is required. |
| Missing effect asset | A bounded fallback is used and a diagnostic is emitted. |
| Device loss | Cosmetic resources are recreated or dropped; world state remains intact. |
| Shutdown during effects | Emitters stop, jobs cancel, and GPU resources retire safely. |
| Network replay | Semantic event identity is stable; client-local particle details need not match bitwise. |
| Fog/transparent pass | Effects compose once in the documented stage without double fog or incorrect depth writes. |
| Budget pressure | Cosmetic density degrades before simulation correctness or critical readability. |

## Required output

Produce an environmental VFX integration report containing: pinned commit; event sources and authority owners; effect-definition schema/version; CPU/GPU split; headless behavior; spawn/memory/upload/overdraw budgets; pooling and handle lifecycle; culling/LOD order; pass/depth/blend/fog integration; asset fallback; network/replay semantics; test matrix and results; native GPU/performance evidence; and unresolved gaps.

## Boundaries and failure handling

- Do not claim NEXORA has a VFX runtime because a planning document describes one.
- Do not treat the TypeScript-like plan interface as an implemented Rust API.
- Do not let particles alter world state or become the source of weather truth.
- Do not require GPU initialization in headless mode.
- Do not replicate cosmetic particle state by default.
- Do not allow unbounded particle counts, pools, upload queues, or retained GPU memory.
- Do not access or mutate resources after device loss or before in-flight retirement completes.
- Do not hide quality degradation; expose counters and diagnostics.
- Do not claim visual correctness or performance without native evidence on the target backend.

## Trigger examples

- **Positive:** Implement rain, snow, dust, smoke, or ambient particle presentation driven by authoritative world/weather events.
- **Positive:** Add a client-only VFX emitter lifecycle with bounded spawn budgets, culling, and headless-safe behavior.
- **Positive:** Integrate particle resources into a new render pass while preserving RHI, transparent, and fog contracts.
- **Positive:** Diagnose particle overdraw, pool growth, GPU upload pressure, or device-loss recovery.
- **Negative:** Change authoritative weather transitions or world time; use `nexora-weather-time-authority`.
- **Negative:** Implement sky/cloud layers, fog profiles, or atmosphere composition; use `nexora-atmosphere-fog-composition-contract`.
- **Negative:** Change PBR lighting, shadow extraction, or generic render-pass state; use the corresponding dedicated workflow.
