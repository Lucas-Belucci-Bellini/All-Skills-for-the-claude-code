---
name: nexora-texture-art-direction-coherence-audit
description: "Audits NEXORA texture detail, material readability, and cross-family visual coherence without copying third-party art or inventing inspections."
---

# NEXORA Texture Art-Direction and Coherence Audit

## Purpose

Use this workflow when reviewing or improving the visual quality of NEXORA's existing PNG textures, especially when material families differ in detail density, readability, contrast, palette behavior, or perceived finish. It supports NEXORA issue #44.

This workflow owns the visual review contract across representative materials. It does not replace Texture Forge build-plan validation, PBR map correctness, atlas seam checks, asset provenance, or runtime renderer validation.

## Reuse before reviewing

- `nexora-texture-forge-build-plan-integrity` for deterministic build plans, recipes, external art sets, and safe generated output.
- `nexora-texture-preview-seam-review` for tile-edge continuity and numeric seam validation.
- `nexora-pbr-material-render-bridge` for material-map interpretation and renderer integration.
- `nexora-content-provenance-manifest` for source, license, and generation provenance.
- `nexora-asset-import-golden-tests` for importer regression fixtures and semantic output comparison.
- General pixel-art, color, composition, and visual QA skills where their scope is broader than NEXORA.

Do not duplicate those procedures. This skill evaluates visual identity, detail hierarchy, readability, and consistency across material families.

## Evidence boundary

NEXORA issue #44 requests inspection of the actual PNG assets, a representative first pass, original improvements, and integration through the existing Texture Forge pipeline. The issue explicitly forbids claiming an image was inspected when the file was not available.

No individual texture is considered reviewed merely because its filename, material definition, prompt, or generated preview exists. Record the exact files and variants actually opened. Treat Minecraft and other commercial games only as abstract quality references for readability and consistency; never copy pixels, recognizable patterns, distinctive palettes, sprites, or layouts.

## Required inputs

- Pinned NEXORA commit and the current asset/material catalog.
- Actual PNG files or image previews available for inspection, with exact paths and hashes.
- Material family, intended use, target resolution, tiling expectations, and distance/readability context.
- Texture Forge version, build plan/recipe, source prompt or authoring provenance, and license status.
- Existing reference captures and accepted visual direction, if available.
- A small representative review set and explicit acceptance criteria.

## Workflow

1. **Pin the evidence.** Record the NEXORA commit, toolchain where relevant, material catalog revision, Texture Forge version, and exact asset paths. Hash the inspected files so findings can be tied to immutable inputs.
2. **Verify access before judging.** Open the actual PNG or trustworthy image preview. If only metadata, a prompt, or a path is available, mark visual inspection as not performed and do not infer appearance.
3. **Build a representative sample.** Select a small set spanning high-frequency and low-frequency materials, such as stone, wood, soil, sand, vegetation, brick, metal, and glass. Include variants from the same family to reveal internal drift.
4. **Preserve a baseline.** Capture the current texture and its in-engine or Texture Forge preview before editing. Record resolution, format, alpha behavior, tiling status, and material identifier.
5. **Evaluate silhouette and recognition.** At native resolution and intended in-game scale, check whether the material reads correctly without relying on excessive contrast, tiny isolated pixels, or decorative noise.
6. **Evaluate detail hierarchy.** Separate large value/color masses, medium structural forms, and small surface accents. Identify whether high-frequency detail obscures the material's primary structure or disappears entirely at gameplay distance.
7. **Evaluate palette discipline.** Check hue/value range, highlight and shadow roles, saturation, temperature, and family-level palette relationships. Avoid forcing every material into one palette when material identity requires controlled variation.
8. **Evaluate texture density.** Compare cluster size, edge frequency, visual noise, and apparent texel/detail density across materials at the same display scale. Distinguish intentional material roughness from accidental pixel noise or inconsistent authoring scale.
9. **Evaluate repetition and tiling.** Inspect repeated patterns, obvious motifs, directional bias, seams, and large-scale repetition. Use the dedicated seam-review skill for numeric edge continuity and PBR-map seam checks.
10. **Evaluate lighting independence.** Ensure the albedo communicates material identity without baking in strong directional lighting. Review normal, roughness, metallic, and occlusion maps through the PBR workflow rather than compensating for incorrect maps with albedo edits.
11. **Compare families side by side.** Use a fixed display scale, neutral background, and consistent preview conditions. Record which materials appear too flat, too noisy, too sharp, too soft, too saturated, or visually inconsistent, with a concrete image-region example.
12. **Score findings, not taste alone.** For each asset, record readability, detail hierarchy, palette coherence, repetition, material identity, and family consistency as pass, concern, or blocked. Attach a short rationale and evidence crop or coordinates where possible.
13. **Prioritize the smallest useful first pass.** Choose only a few assets with clear defects and broad visual impact. Preserve assets that already meet the direction; do not redesign a texture solely to create activity.
14. **Create original revisions.** Author new pixel arrangements, shapes, palette relationships, and surface patterns from scratch. Abstract quality goals from references; do not trace, recolor, or closely imitate third-party textures.
15. **Keep source and generated output separate.** Edit source definitions, recipes, or approved art-set inputs. Let Texture Forge produce derived assets. Do not hand-edit generated registry or bundle outputs.
16. **Validate the integrated result.** Rebuild through the existing pipeline, inspect the generated PNGs, verify dimensions/format/alpha and material references, then run importer/golden and seam checks where applicable. A successful build alone does not establish visual quality.
17. **Compare before and after.** Use identical scale, lighting, camera, and preview settings. Record improvements and regressions for each reviewed criterion; reject changes that improve detail but harm readability, identity, or family coherence.
18. **Report limitations honestly.** Separate files visually inspected, files unavailable, generated previews, automated checks, and in-engine/manual review. List commands and results actually executed; mark all other checks not run.

## Validation checklist

- [ ] NEXORA commit, material catalog revision, Texture Forge version, and asset hashes are recorded.
- [ ] Every asset marked visually reviewed was actually opened or rendered for inspection.
- [ ] The sample covers multiple material families and representative variants.
- [ ] Native-resolution and intended gameplay-scale readability are both evaluated.
- [ ] Detail hierarchy distinguishes primary forms, secondary structure, and surface accents.
- [ ] Palette, contrast, saturation, noise, and apparent detail density are compared consistently.
- [ ] Repetition and tiling concerns are recorded separately from numeric seam validation.
- [ ] Albedo judgments are not used to hide incorrect normal, roughness, metallic, or occlusion maps.
- [ ] Existing textures that already meet the direction are preserved.
- [ ] Revisions are original and do not reproduce recognizable third-party art.
- [ ] Source inputs are changed instead of hand-editing generated outputs.
- [ ] Texture Forge build, importer checks, seam checks, and visual review are reported separately.
- [ ] Before/after comparisons use consistent preview conditions.
- [ ] Unavailable images and unexecuted checks are explicitly listed.

## Required output

Produce a texture art-direction review containing:

1. Pinned commit, catalog/Forge revision, inspected asset paths, hashes, and access limitations.
2. Representative sample and reason for selection.
3. Per-asset findings for readability, detail hierarchy, palette, noise, repetition, material identity, and family coherence.
4. Evidence crops or coordinates for each significant concern when available.
5. A prioritized keep/change/blocked decision with a short rationale.
6. Original revision plan, source files to edit, and expected generated outputs.
7. Build/import/seam/visual validation commands and their actual results.
8. Before/after comparison and unresolved artistic or technical questions.

## Boundaries and failure handling

- Do not claim to have inspected PNG files that were inaccessible.
- Do not copy, trace, recolor, or closely imitate Minecraft or any other third-party texture.
- Do not treat a higher resolution or more pixels as automatic visual improvement.
- Do not add random noise or micro-detail that reduces material readability at gameplay distance.
- Do not alter a texture that already satisfies the accepted visual direction without a concrete reason.
- Do not hand-edit generated assets, resource indexes, or plugin copies.
- Do not add engine dependencies or change renderer architecture for an art-direction task.
- If provenance or license is unknown, block redistribution until it is resolved.
- If a visual concern is actually a shader, color-space, mipmap, or PBR issue, route it to the owning workflow instead of making an albedo-only workaround.

## Trigger examples

- **Positive:** Review actual NEXORA PNG textures for visual detail, readability, and consistency across stone, wood, soil, vegetation, brick, and metal.
- **Positive:** Decide which few material textures deserve an original visual-quality pass and which should remain unchanged.
- **Positive:** Compare texture families at a consistent scale to find detail-density or palette drift.
- **Negative:** The task only concerns numeric seam continuity; use `nexora-texture-preview-seam-review`.
- **Negative:** The task concerns Texture Forge plan validation or deterministic generation; use `nexora-texture-forge-build-plan-integrity`.
- **Negative:** The task concerns PBR channel interpretation or renderer binding; use `nexora-pbr-material-render-bridge`.
