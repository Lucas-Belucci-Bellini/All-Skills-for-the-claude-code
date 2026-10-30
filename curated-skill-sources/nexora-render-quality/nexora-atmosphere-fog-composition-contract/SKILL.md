---
name: nexora-atmosphere-fog-composition-contract
description: "Defines how NEXORA composes dimension, weather, climate, sky, atmospheric scattering, fog, and visibility inputs into a deterministic camera-relative renderer environment."
---

# NEXORA Atmosphere and Fog Composition Contract

## Purpose

Use this workflow when evolving NEXORA's current sky gradient and distance haze into a coherent environment renderer: sky/atmosphere, sun and moon tint, clouds, weather fog, altitude/depth effects, aerosols, and dimension-specific visibility.

This workflow owns the environment-to-renderer composition boundary. It does not own climate simulation, weather authority, world-light propagation, PBR material response, or shadow-map rendering.

## Reuse before creating

- `nexora-weather-time-authority` for authoritative world time, weather state, and deterministic transitions.
- `nexora-lighting-render-extraction-contract` for immutable per-frame light/celestial inputs and render snapshot revisions.
- `nexora-shadow-caster-extraction-contract` for shadow visibility and shadow-pass ownership.
- `nexora-pbr-material-render-bridge` for linear-light material shading and BRDF integration.
- `nexora-render-pass-state-contract` for sky/opaque/transparent pass ordering and attachment ownership.
- `nexora-rhi-conformance-evidence` for backend-neutral shader/resource validation and native pixel proof.
- `nexora-shader-reflection-contract` and `engine-shader-reflection-layout-contract` for environment uniform/buffer layout parity.
- `nexora-render-target-resize-transaction` for resized environment targets and history resources.
- `nexora-render-resolution-budget` for resolution and fill-rate budgets.

This skill owns the environment composition contract and fog/sky rendering evidence. Weather/climate simulation, direct lighting, material BRDF, and shadows remain separate systems.

## Verified NEXORA snapshot

Re-check the active checkout before applying these facts. They describe the inspected 2026-10-30 snapshot.

- `docs/plans/CLIMATE and ATMOSPHERE.md` distinguishes Climate (long-term/regional statistical state), Weather (immediate conditions), and Atmosphere (air properties and environmental representation).
- The plan lists fog/visibility inputs including humidity, temperature, ground conditions, terrain, cloud state, rain, snow, dust, smoke, aerosols, altitude, depth, and dimension.
- `docs/plans/RENDERER and GRAPHICS.md` proposes sky, sun, moon, clouds, stars, horizon, atmosphere scattering, fog, and dimension-aware sky as renderer features.
- `engine/render/src/atlas.rs` currently defines a simple sky gradient using `SKY_HORIZON` and `SKY_ZENITH`, plus distance haze constants `HAZE_START`, `HAZE_END`, and `HAZE_MAX`.
- `sky_linear(direction)` computes a directional colour gradient in linear light; `haze(distance)` computes a scalar blend factor. These functions do not model cloud layers, atmospheric density, weather fog, altitude/depth profiles, or physical scattering.
- ADR-0044 requires the CPU reference to independently compute the current sky and haze behavior. The current renderer/reference contract is pixel-checkable and should remain so as features are added.
- The inspected `engine/render/src/lib.rs` exposes the current sky/textured chunk pass but no complete atmosphere pipeline, cloud renderer, volumetric fog pass, or dimension/weather environment snapshot.
- The inspected `engine/simulation/src/lib.rs` does not expose an atmosphere module. The environment plan is not proof that a runtime atmosphere system is already implemented.

These facts distinguish the existing gradient/haze baseline from the larger planned environment system.

## Required inputs

- Pinned NEXORA commit, backend, renderer mode, camera projection, render origin, and target hardware.
- Authoritative world time, weather, biome, dimension, altitude/depth, cloud coverage, and visibility inputs (or explicit design assumptions if not implemented).
- Lighting extraction snapshot, sun/moon direction and intensity, and shadow visibility contract.
- Current `sky_linear`, `haze`, shader constants, CPU reference, render-pass order, and golden captures.
- Colour-space/exposure rules, target visual style, and frame-time/fill-rate budget.

## Workflow

1. **Separate authoritative domains.** Identify the owners of climate, weather, world time, dimension profile, celestial state, and atmospheric composition. The renderer consumes immutable snapshots; it must not simulate weather or mutate world state.
2. **Define an environment frame snapshot.** Capture world time, dimension, sun/moon direction, weather revision, cloud coverage, fog profile, altitude/depth context, visibility, and exposure inputs under a consistent frame revision.
3. **Keep background and surface illumination distinct.** The sky background colours rays that hit no geometry. Sky-light illumination affects surfaces and belongs to the lighting extraction/PBR contract. Do not treat the current sky gradient as a physical environment light.
4. **Preserve a deterministic baseline.** Keep current `sky_linear(direction)` and `haze(distance)` behavior as a named baseline or compatibility mode. New environment features must be individually switchable and independently testable.
5. **Compose sky profiles by dimension.** Define horizon/zenith colours, celestial bodies, star visibility, cloud layers, and transition rules per dimension. Avoid hardcoded Earth-only assumptions in a multi-dimension engine.
6. **Define sun/moon inputs once.** Consume authoritative celestial direction, angular size, colour, and intensity from the time/lighting snapshot. Do not compute a second divergent sun path inside the sky shader.
7. **Model atmosphere in stages.** Start with a stable analytic gradient and controlled horizon tint; add approximate scattering only when inputs, colour-space rules, CPU reference, and performance budget are defined. Avoid claiming physically based Rayleigh/Mie behavior for an artistic approximation.
8. **Compose fog from explicit fields.** Derive density/colour from the environment profile using declared inputs such as humidity, temperature, weather, terrain, altitude, depth, aerosols, and dimension. Define which values are authoritative and which are renderer-side artistic modifiers.
9. **Choose fog representation deliberately.** Compare distance fog, height fog, analytic ray integration, froxel/volumetric grids, and local volumes. State quality, temporal stability, memory, bandwidth, and fill-rate trade-offs before implementation.
10. **Use camera-relative distances.** Compute view distance and height/depth from stable camera-relative coordinates. Avoid precision loss from large absolute world coordinates; test render-origin shifts.
11. **Define composition order.** Specify whether fog is applied before/after transparent blending, how sky and geometry depths participate, and how Cutout/transparent surfaces are treated. Avoid applying fog twice to sky or water.
12. **Keep linear-light composition.** Convert sRGB profile colours once, blend radiance/fog in linear space, and encode for output at the defined final stage. Exposure and tone mapping must have a single owner.
13. **Handle temporal transitions.** Blend weather fronts, cloud coverage, day/night, dimension changes, and altitude transitions without popping. Snapshot revisions must prevent a frame mixing a new sky profile with stale fog uniforms.
14. **Integrate water and underwater visibility explicitly.** Ocean depth may alter fog colour, attenuation, and visibility; keep underwater composition distinct from atmospheric air fog and water-surface reflection/refraction.
15. **Avoid hidden lighting duplication.** Sun tint, cloud shadow, ambient sky contribution, and shadow-map visibility must each have one owner. The atmosphere pass must not silently darken surfaces already shaded by the PBR/light path.
16. **Extend the independent CPU reference.** Compute sky, fog, dimension profile, and transition blend independently from WGSL. Preserve deterministic per-pixel comparisons; if volumetric sampling is stochastic, define seeded sampling and explicit tolerances.
17. **Create deterministic golden scenes.** Include clear horizon, high-altitude mountain, humid valley fog, dry dusty biome, rain/snow visibility, underwater scene, night sky, alien dimension, and weather/dimension transition.
18. **Test camera and projection changes.** Cover near/far planes, FOV changes, aspect ratio, render resolution, origin shifts, and camera movement through height-fog boundaries.
19. **Test interaction with other passes.** Verify opaque, Cutout, blended transparent, water, sky, and UI composition order; ensure fog does not affect UI unless explicitly designed.
20. **Profile by quality tier.** Measure environment snapshot cost, shader instructions, volumetric samples, overdraw, temporal history memory, GPU time, and frame percentiles at target resolutions.
21. **Define graceful fallback.** If volumetric resources or temporal history are unavailable, use a documented analytic fog/sky fallback. Do not fail the entire frame for an optional atmosphere quality tier.
22. **Report evidence honestly.** Separate climate/weather simulation tests, snapshot consistency, shader/reflection tests, NullRhi validation, native GPU pixels, platform smoke tests, and performance measurements.

## Validation checklist

- [ ] Climate, weather, time, dimension, lighting, and renderer ownership are explicit.
- [ ] Environment snapshot is immutable, revisioned, and frame-consistent.
- [ ] Sky background is distinct from sky-light surface illumination.
- [ ] Current sky/haze baseline remains reproducible and independently referenceable.
- [ ] Fog density/colour inputs and composition order are explicit.
- [ ] Dimension, altitude, depth, weather, and aerosol profiles are deterministic.
- [ ] All blending and exposure happen in the documented colour space/stage.
- [ ] Render-origin changes preserve distance/height calculations.
- [ ] Opaque, Cutout, transparent, water, and UI interactions are tested.
- [ ] CPU reference independently matches deterministic native GPU scenes.
- [ ] Optional atmosphere tiers degrade to a defined analytic fallback.
- [ ] GPU cost, memory, overdraw, and frame percentiles are measured.

## Validation matrix

| Scenario | Required invariant |
|---|---|
| Clear daytime | Sky gradient, sun direction, and fog baseline agree with reference. |
| Night | Celestial/sky profile transitions without reusing daytime tint. |
| Humid valley | Height/ground fog follows explicit density and terrain inputs. |
| Dry dusty region | Aerosol visibility profile is distinct from humidity fog. |
| Rain/snow | Weather visibility modifies fog without changing authoritative weather state. |
| Underwater | Water attenuation is not accidentally treated as air fog. |
| Dimension transition | Sky and fog profiles switch coherently under one snapshot revision. |
| Render-origin shift | Horizon, distance, and height remain stable. |
| Transparent water | Fog is applied at the defined composition stage exactly once. |
| CPU/GPU reference | Independent reference agrees within declared tolerances. |
| Volumetric fallback | Missing history/volume resources use deterministic analytic mode. |

## Required output

Produce an atmosphere/fog composition report containing: pinned commit; authoritative environment inputs; implemented/planned status by domain; snapshot/revision schema; sky profile and celestial inputs; fog fields and composition order; colour-space/exposure rules; chosen representation and rejected alternatives; water/transparent/UI interactions; CPU reference and golden-scene evidence; NullRhi/native GPU results; performance and memory measurements; fallback behavior; and unresolved risks.

## Boundaries and failure handling

- Do not claim a complete atmosphere engine because a sky gradient and distance haze exist.
- Do not confuse weather simulation, atmospheric state, sky background, sky-light illumination, PBR lighting, and shadow visibility.
- Do not compute a second sun/moon authority inside the renderer.
- Do not blend fog or sky in sRGB when the contract requires linear light.
- Do not apply fog twice across sky, water, transparent, or post-processing passes.
- Do not let absolute world coordinates destabilize fog at large distances.
- Do not claim physically based scattering without a specified model and measured reference.
- Do not claim volumetric quality or performance without native GPU evidence.

## Trigger examples

- **Positive:** Evolve NEXORA's fixed horizon/zenith gradient into dimension-aware sky profiles.
- **Positive:** Add fog driven by weather, altitude, depth, terrain, and aerosols without moving weather authority into the renderer.
- **Positive:** Define how clouds, sun/moon, sky light, and fog snapshots transition together.
- **Positive:** Keep CPU reference parity while adding height or volumetric fog.
- **Negative:** The task is world weather/time authority or climate simulation; use the simulation/weather workflows.
- **Negative:** The task is PBR material lighting, world light extraction, or shadow maps; use their dedicated workflows.
