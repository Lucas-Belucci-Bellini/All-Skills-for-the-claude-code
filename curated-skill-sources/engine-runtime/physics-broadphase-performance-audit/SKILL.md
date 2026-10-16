---
name: physics-broadphase-performance-audit
description: Profile physics broadphase candidate generation and identify excessive pair counts, poor spatial partitioning, and pathological object distributions.
---

# Physics Broadphase Performance Audit

## Goal

Reduce broadphase cost while preserving conservative detection so potentially colliding pairs are never incorrectly omitted.

## Inputs to inspect

Spatial index/grid/BVH, body counts and bounds, pair-generation counters, representative scenes and narrowphase timings.

## Workflow

1. Capture baseline pair counts, candidate-to-contact ratio, index update time and total broadphase duration across sparse, dense and highly clustered scenes.
2. Inspect spatial cell size, tree quality, fat bounds, static/dynamic partitioning and update policy for the actual distribution of body sizes and motion.
3. Stress large objects, many small objects, high-speed movement, dense stacks and frequent spawn/despawn to reveal pathological candidates or rebuild costs.
4. Prototype one structure/tuning change and compare both cost and a correctness oracle that detects any missed overlap candidate.
5. Add counters for broadphase population, pair churn, duplicate pairs and update/rebuild time; define workload-specific regression thresholds.

## Validation checklist

- [ ] The broadphase remains conservative for rotated, fast-moving and differently sized shapes supported by the engine.
- [ ] Candidate reduction is not achieved by missing legitimate collision pairs.
- [ ] Update cost, memory overhead and worst-case behavior are reported alongside average frame time.
- [ ] Static-world and rapidly moving-body paths are tested separately when they use different structures.

## Required output

A broadphase profile, candidate-quality metrics, correctness comparison and an evidence-backed spatial-index adjustment.

## Boundaries and failure handling

Do not tune a broadphase index from one scene; representative object-size and density distributions are necessary.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
