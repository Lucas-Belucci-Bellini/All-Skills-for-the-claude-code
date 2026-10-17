---
name: engine-workload-profile-catalog
description: Build a versioned catalog of representative engine workloads for repeatable profiling, regression testing, and cross-machine comparisons.
---

# Engine Workload Profile Catalog

## Goal

Ensure performance decisions use comparable workloads and expose coverage gaps between synthetic benchmarks and real runtime behavior.

## Inputs to inspect

Engine scenes, world seeds, entity counts, asset sets, benchmark scripts, telemetry schema and supported hardware tiers.

## Workflow

1. Define workload families for startup, idle, high entity density, world streaming, asset loads, physics-heavy scenes, multiplayer traffic and shutdown.
2. For each workload, pin inputs, content revision, seed, camera/player trajectory, warmup, duration, expected output and measurement points.
3. Separate representative, worst-case and microbenchmark workloads; state what each can and cannot predict about production performance.
4. Run the same catalog against two builds and capture machine/compiler/driver/config metadata to keep comparisons interpretable.
5. Review catalog gaps when regressions escape and retire workloads only with rationale and replacement coverage.

## Validation checklist

- [ ] Workload definitions are versioned and can be reproduced from source control.
- [ ] Performance reports compare equivalent build modes, settings, seeds and sampling intervals.
- [ ] The catalog includes transitions and long-tail scenarios, not only stable empty scenes.
- [ ] Synthetic workload limitations are explicit.

## Required output

A workload manifest, scenario matrix, repeatable runner contract and guidance for interpreting profile differences.

## Boundaries and failure handling

Do not treat one aggregate benchmark score as representative of every engine subsystem or hardware tier.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
