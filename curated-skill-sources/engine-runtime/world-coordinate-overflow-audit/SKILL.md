---
name: world-coordinate-overflow-audit
description: Audit world-coordinate conversions, chunk indexing, origin rebasing, and integer/float limits in large procedural worlds.
---

# World Coordinate Overflow Audit

## Goal

Find precision loss and overflow hazards before distant traversal, save/load, or chunk boundaries cause world corruption.

## Inputs to inspect

World/chunk coordinate types, chunk dimensions, coordinate transforms, serialization formats, origin-rebasing logic, and supported world extents.

## Workflow

1. Document coordinate units, signedness, valid range, chunk size and boundary convention for world, region, chunk, local and render-relative spaces.
2. Inspect arithmetic for floor-vs-truncate errors at negative coordinates, overflow before division/modulo, narrowing casts and mixed signed/unsigned expressions.
3. Trace conversions to GPU floats and physics coordinates, identifying distances where precision can no longer preserve the smallest required movement or voxel boundary.
4. Test values around zero, negative chunk edges, integer extrema, region boundaries, rebasing thresholds and save/load round trips.
5. Add checked conversions or explicit range guards at system boundaries and write property tests for world-to-chunk-to-local reversibility.

## Validation checklist

- [ ] Negative coordinates map consistently to chunks and local offsets.
- [ ] Intermediate arithmetic cannot overflow before bounds checking.
- [ ] Render-relative and physics transforms retain the required precision at maximum supported distance.
- [ ] Serialized coordinates preserve sign/range and are versioned if their representation changes.

## Required output

A coordinate-domain table, boundary test matrix, verified maximum supported extent, and prioritized precision/overflow fixes.

## Boundaries and failure handling

Do not silently clamp coordinates if clamping changes world identity; return an explicit error or documented limit.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
