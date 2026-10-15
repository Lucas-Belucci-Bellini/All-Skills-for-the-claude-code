---
name: shader-render-pipeline-debugging
description: "Localizes shader and render-pipeline defects with controlled captures. Use when materials are black, lighting differs, passes are missing, or GPU output changes across backends."
---

# Shader Render Pipeline Debugging

## Use when
A render defect is being debugged through random shader edits without isolating pipeline stage, resource state, or backend differences.

## Workflow
1. Capture the failing scene, renderer/backend, shader variant, pipeline state, relevant uniforms, textures, and validation output.
2. Reduce the scene to one material and one light while preserving the defect; identify the first pass where output diverges.
3. Check coordinate spaces, color space, depth convention, bindings/layout, texture formats, and shader compilation defines independently.
4. Compare a known-good minimal shader and a frame capture, then restore features one at a time.

## Required output
A minimal repro, pipeline-stage diagnosis, resource/binding table, and validated fix.

## Validation
- The defect can be reproduced from a stated scene and configuration.
- Shader compile success is not mistaken for correct GPU output.
- Both the original failure and neighboring material/pass cases are re-tested.

## Guardrails
Do not treat screenshots alone as sufficient evidence for a synchronization, memory, or resource-binding bug.
