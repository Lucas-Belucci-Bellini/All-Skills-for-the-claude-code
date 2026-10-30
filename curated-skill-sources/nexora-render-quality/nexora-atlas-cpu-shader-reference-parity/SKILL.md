---
name: nexora-atlas-cpu-shader-reference-parity
description: "Keep the CPU atlas shading reference and WGSL textured pass mathematically equivalent for texel selection, linear-light shading, AO, sky and haze."
---

# NEXORA Atlas CPU and Shader Reference Parity

## Purpose

Catch visual regressions in the atlas renderer by maintaining an independent CPU expectation and proving that the shader produces the same pixel result for supported cases.

## Verified NEXORA facts

- The inspected `engine/render/src/atlas.rs` keeps `texel_of`, `FACE_SHADE`, `shade_texel`, haze and sky-related functions together and documents the WGSL implementation as a transcription.
- The atlas treats albedo as sRGB, uploads the atlas in an sRGB format so the GPU decodes it, and performs lighting multiplication in linear space before the sRGB target encodes output.
- The renderer's CPU reference is intended to judge pixels independently of the GPU path; shared implementation code would weaken its ability to detect defects.

## Required inputs

- Pinned atlas CPU functions, WGSL source, target texture format and current reference-ray implementation.
- Small deterministic atlas fixtures covering saturated colors, grayscale ramps, alpha edges and high-contrast neighboring tiles.
- Known face directions, AO corner values, haze distances and sky directions.

## Workflow

1. List every pixel-affecting operation in order: face/texel selection, sRGB decode, face shade, corner AO, haze/sky composition and target encoding.
2. Write the CPU expected result from the documented contract without calling the WGSL implementation or sharing shader-specific helpers that could reproduce the same bug.
3. Create a compact fixture matrix that isolates one operation at a time, then add combined cases for corners, haze and directional sky.
4. Verify that sRGB color data is decoded exactly once, non-color data is not accidentally gamma-decoded, and linear-light multiplication occurs before output encoding.
5. Compare CPU and GPU results per pixel, recording exact matches and any tolerance only where the backend/format contract justifies it.
6. When a mismatch occurs, classify it by texel coordinate, transfer function, face shade, AO interpolation, haze/sky mix or output encoding before changing code.
7. Keep reference coverage independent of the mesher and rasterizer where possible; document pixels intentionally excluded because another chunk owns the boundary.

## Validation checklist

- [ ] The CPU reference and WGSL path implement the same ordered color-space and shading operations.
- [ ] sRGB decode and encode occur at the intended boundaries exactly once.
- [ ] AO and haze/sky contributions match for the same face and fixture inputs.
- [ ] The reference remains independent enough to detect shared-coordinate, meshing and rasterization defects.
- [ ] Every comparison records the pinned commit, backend, format, fixture and exact PASS/FAIL/UNVERIFIED state.

## Required output

A pixel-operation map, deterministic fixture matrix, CPU/GPU per-pixel report, mismatch classification and regression test plan.

## Boundaries and failure handling

Do not call a CPU helper from the GPU path or reuse the same faulty coordinate function in both expected and actual calculations. Do not label approximate visual similarity as pixel parity.

## Trigger examples

- **Positive:** The textured pass changes its color-space, AO, haze or face-shading math.
- **Positive:** A shader refactor must prove that the GPU output still matches the CPU reference.
- **Negative:** The issue is only backend upload/readback conformance without atlas shading; use the RHI conformance evidence workflow.
- **Negative:** The task adds normal/roughness/metallic PBR bindings; use the PBR material render bridge.
