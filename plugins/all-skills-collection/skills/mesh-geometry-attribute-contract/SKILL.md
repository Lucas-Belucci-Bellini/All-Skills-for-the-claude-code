---
name: mesh-geometry-attribute-contract
description: Audit mesh vertex/index layouts and renderer input declarations for attribute, stride, offset, and index-format mismatches.
---

# Mesh Geometry Attribute Contract

## Goal

Ensure CPU mesh generation, asset import, GPU buffers and shader vertex inputs agree on one explicit geometry contract.

## Inputs to inspect

Vertex and index structs, vertex descriptors, importer/exporter settings, shader signatures, draw commands, and mesh validation logs.

## Workflow

1. Extract each vertex stream's semantic, format, offset, stride, rate, and normalization rules from CPU, asset and GPU representations.
2. Compare generated and imported meshes with pipeline input declarations; check missing/extra attributes, packed formats, alignment, tangent conventions, winding and index width.
3. Inspect procedural mesh and LOD paths separately because they may bypass the standard importer or choose different buffer layouts.
4. Add validation for vertex/index count bounds, index range, buffer byte length and format conversions before uploading meshes.
5. Create tiny known-geometry fixtures (triangle, UV seam, mirrored tangent and large index range) and assert both structural layout and rendered result.

## Validation checklist

- [ ] Every shader-consumed attribute is provided at the expected location and numeric format.
- [ ] Offsets and strides are byte-correct and satisfy backend alignment restrictions.
- [ ] No index references a vertex outside the uploaded buffer and no count multiplication silently overflows.
- [ ] Importer conversion preserves coordinate handedness, winding, normals, UVs and tangent-space expectations.

## Required output

A cross-layer geometry schema, confirmed layout mismatches, fixture meshes, and reusable mesh validation assertions.

## Boundaries and failure handling

Do not fix a format mismatch by changing only the shader or importer without checking every producer and consumer of the affected mesh type.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
