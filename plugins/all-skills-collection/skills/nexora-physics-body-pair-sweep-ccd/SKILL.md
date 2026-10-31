---
name: nexora-physics-body-pair-sweep-ccd
description: "Audits and validates continuous collision detection between moving NEXORA rigid bodies without conflating it with voxel-terrain sweeps."
---

# NEXORA Physics Body-Pair Sweep CCD

## Purpose

Use this workflow when fast dynamic or kinematic bodies can cross one another between physics substeps, when a body-pair collision is missed despite correct voxel collision, or when evaluating a bounded continuous-collision design for the NEXORA physics solver.

This skill is specifically about **body against body** continuous collision. It complements `nexora-physics-continuous-collision`, which covers fast-body tunneling at a general level, and does not replace the voxel-terrain sweep contract.

## Evidence boundary

The audited NEXORA snapshot documents that:

- `engine/physics/src/world.rs` integrates bodies against the voxel source before invoking the body-pair pass.
- `engine/physics/src/pairs.rs` builds pair candidates from end-of-substep AABBs and explicitly states that bodies can tunnel through each other because their paths are not swept.
- The pair pass uses a banded broadphase, deterministic sorting, mover filtering, wake-on-touch handling and a bounded number of solver iterations.
- Pair pushes are themselves constrained by voxel sweeps; terrain remains authoritative.

Re-check the exact commit and source before applying this workflow. Do not assume the implementation is unchanged.

## Required inputs

- Exact NEXORA commit, Rust toolchain, build profile and target platform.
- Reproduction with fixed initial body states, velocities, body types, materials, voxel source and timestep configuration.
- Relevant source for body integration, pair candidate generation, narrowphase, pair resolution and voxel collision.
- Existing deterministic/replay fixtures and physics tests.
- Candidate-count, pair-count, solver-iteration and timing measurements where available.

## Workflow

1. **Separate the collision domains.** Identify whether the missed contact is body-to-voxel, body-to-body, or both. A successful voxel sweep is not evidence that body-pair CCD exists.
2. **Pin the current discrete contract.** Record when pair candidates are generated, which AABBs are used, which body types count as movers, how sleepers are awakened, and how touching differs from overlap.
3. **Build a minimal tunneling reproduction.** Use two bodies with fixed dimensions and initial separation, then vary relative velocity and timestep so their end positions no longer overlap even though their paths intersect.
4. **Define the swept interval.** State whether motion is linear over one substep, how initial overlap is handled, and how zero relative velocity, near-parallel motion, grazing contact and non-finite values are treated.
5. **Choose a candidate-generation boundary.** Evaluate whether the existing banded broadphase can use swept bounds or whether a separate conservative candidate path is needed. Preserve the large-body fallback and avoid unbounded pair expansion.
6. **Specify narrowphase evidence.** Require a time-of-impact or equivalent conservative contact result with documented tolerances. Do not treat an expanded end-position AABB as proof of continuous collision.
7. **Preserve solver ordering.** Define deterministic tie-breaking for equal or near-equal impact times. Do not let hash iteration, thread completion order or unstable sorting change pair resolution order.
8. **Preserve terrain authority.** Any pair correction or time-of-impact response must still respect voxel collision. Test a fast body crossing another body next to a wall, floor, corner and narrow passage.
9. **Preserve wake semantics.** Verify that a swept mover wakes a sleeping body before the missed crossing, without repeatedly waking stationary stacks or creating a wake storm.
10. **Bound the cost.** Measure candidate pairs, swept tests, contacts, iterations and worst-case time for sparse movers, dense crowds, long thin bodies and oversized broadphase entries. Define a safe fallback when budgets are exceeded.
11. **Test determinism and replay.** Repeat identical scenarios with different slot allocation histories and save/load reconstruction. Compare stable state hashes or the project's established deterministic evidence.
12. **Report implementation status honestly.** Separate existing behavior, proposed algorithm, tests present, tests executed, benchmark evidence and unresolved limitations.

## Validation checklist

- [ ] Two fast dynamic bodies cross within one substep without overlapping at either endpoint.
- [ ] Dynamic body collides with a moving kinematic body.
- [ ] Grazing and near-parallel trajectories do not produce unstable false contacts.
- [ ] Initial overlap follows the existing depenetration contract.
- [ ] A body pair adjacent to a voxel wall does not push either body through terrain.
- [ ] A moving body wakes a sleeper reached along the swept path.
- [ ] Stationary stacks can still sleep and do not create repeated wake cycles.
- [ ] Large/oversized bodies preserve broadphase fallback correctness.
- [ ] Candidate and solver work remain within explicit budgets under dense workloads.
- [ ] Results remain deterministic across slot histories and replay.
- [ ] Existing voxel CCD and discrete pair behavior remain covered by regression tests.

## Required output

Return:

- The exact source revision and code paths inspected.
- A clear classification of the missed collision (voxel versus body pair).
- The proposed or implemented candidate and narrowphase contract.
- Determinism, terrain-authority, wake and cost invariants.
- Tests run with exact commands and results; skipped tests must be named.
- Candidate/solver cost measurements and workload identity, if measured.
- Remaining risks and whether the work is documentation, proposal, implementation or verified behavior.

## Boundaries and failure handling

- Do not claim body-pair CCD is implemented merely because voxel collision uses a sweep.
- Do not enable swept tests for every body pair without measuring the broadphase and narrowphase cost.
- Do not sacrifice deterministic ordering or voxel authority to simplify the response.
- If a conservative time-of-impact result cannot be established, retain the existing safe behavior and report the limitation rather than inventing a collision.
- This skill does not modify NEXORA runtime code and does not claim that engine tests or benchmarks were executed.

## Trigger examples

- **Positive:** A fast crate crosses another crate during one physics substep and the final AABBs do not overlap.
- **Positive:** Review a proposed swept-AABB or time-of-impact path for dynamic body pairs in the existing banded broadphase.
- **Positive:** Validate that body-pair CCD preserves deterministic replay and voxel-wall constraints.
- **Negative:** The issue concerns only a body tunneling through static voxel terrain.
- **Negative:** The request is unrelated to rigid-body collision or asks for generic physics tuning without a body-pair reproduction.
