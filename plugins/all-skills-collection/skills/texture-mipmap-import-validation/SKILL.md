---
name: texture-mipmap-import-validation
description: Validate texture import, mipmap generation, color space, compression, and streaming settings for target devices and material usage.
---

# Texture Mipmap Import Validation

## Goal

Prevent texture shimmering, incorrect color, memory spikes and unsupported imports by checking the entire texture path from source to runtime.

## Inputs to inspect

Source textures, import metadata, sampler settings, material roles, compression targets, mip-generation rules and device limits.

## Workflow

1. Classify textures by role (color/albedo, normal, roughness/metallic, mask, UI, height or data) and declare color-space, channel and precision requirements.
2. Inspect source dimensions, aspect ratio, alpha behavior, mip completeness, filter choice, wrap mode, anisotropy and compression format for the intended usage.
3. Validate that mip generation preserves semantic data—for example normal direction or packed masks—and that sRGB conversion is applied only where appropriate.
4. Check memory estimates and import outputs on each supported device tier, including non-power-of-two dimensions and maximum texture-size limits.
5. Load representative assets in runtime scenes at near/far distances and add import tests for missing mip levels, wrong color space, unsupported compression and accidental source overwrite.

## Validation checklist

- [ ] Color textures and linear data textures use the intended color-space interpretation.
- [ ] Generated mipmaps preserve normal/vector or packed data semantics for the chosen encoding.
- [ ] Compression and fallback paths are supported by target hardware and material shaders.
- [ ] Peak memory and streaming behavior are within documented asset budgets.

## Required output

A texture-role import matrix, verified settings, memory estimates, representative runtime captures and automated import checks.

## Boundaries and failure handling

Do not re-encode or overwrite source textures destructively; keep originals and distinguish visual quality choices from correctness defects.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
