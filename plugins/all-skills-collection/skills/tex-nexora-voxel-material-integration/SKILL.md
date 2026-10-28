---
name: tex-nexora-voxel-material-integration
description: "Integrate original texture sets into a voxel engine with deterministic IDs, atlas rules and streaming-safe resource handling. Use when adding new block, ore, terrain or item textures to NEXORA or a similar Rust voxel runtime."
---

# NEXORA Voxel Material Integration

## Purpose

Integrate original texture sets into a voxel engine with deterministic IDs, atlas rules and streaming-safe resource handling.

## Trigger

Use when adding new block, ore, terrain or item textures to NEXORA or a similar Rust voxel runtime.

## Required inputs

Inputs: texture source set, block/material registry, atlas or array strategy, chunk mesher contract and GPU budget.

## Workflow

1. 1. Define stable material identifiers separately from texture filenames and display names.
2. 2. Validate tile dimensions, color-space flags, normal conventions and atlas padding before import.
3. 3. Map each face/material variant to deterministic registry entries and test chunk-boundary consistency.
4. 4. Measure GPU memory and upload behavior for initial load, chunk streaming and hot reload.
5. 5. Run a fixture world containing all new materials, then verify save compatibility and fallback behavior.

## Expected output

An integration manifest, validation fixtures and performance observations for the NEXORA asset pipeline.

## Guardrails

Use original or appropriately licensed assets; keep material IDs stable across saves and never block the render thread on texture I/O.

## Validation checklist

- [ ] Required inputs and target platform are recorded.
- [ ] Findings are backed by a reproducible test or capture.
- [ ] Source assets are preserved and any proposed change is reversible.
- [ ] Results are checked in the actual target renderer or engine.

## Required output

Deliver the evidence-backed artifact described above, including scope, assumptions, findings, severity, recommended next action and a regression check.

## Boundaries and failure handling

If inputs are missing or renderer conventions are unknown, stop short of a definitive diagnosis, list the missing evidence and provide a safe test plan. Do not overwrite source assets or apply bulk changes without review.

## Trigger examples

- Review this texture set before integrating it into the project.
- Diagnose this texture artifact using the target engine's import and rendering settings.

- **Positive:** The asset has a visible seam, incorrect material response, or a pipeline mismatch that needs evidence-based diagnosis.
- **Negative:** The task is to create an unrelated image from scratch or to change art direction without a texture-pipeline validation need.
