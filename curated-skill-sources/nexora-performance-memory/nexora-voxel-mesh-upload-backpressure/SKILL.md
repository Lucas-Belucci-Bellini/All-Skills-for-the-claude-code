---
name: nexora-voxel-mesh-upload-backpressure
description: "Control CPU-to-GPU voxel mesh upload pressure with bounded staging memory and explicit scheduling. Use when chunk meshing completes faster than render uploads can be consumed."
---

# NEXORA Voxel Mesh Upload Backpressure

## Purpose

Keep chunk mesh publication responsive without allowing completed CPU meshes, staging buffers or upload commands to accumulate without a memory bound.

## Required inputs

- The current chunk mesh production path and the point where completed meshes enter the render/upload queue.
- GPU upload API, staging allocator or ring-buffer design, and any fence/timeline completion data.
- Target memory budget, chunk priority rules, cancellation semantics and frame-time constraints.

## Workflow

1. Measure producer and consumer rates, queued mesh bytes, upload latency, staging occupancy and frame-time impact under a repeatable camera/chunk workload.
2. Define separate limits for queued CPU mesh bytes, in-flight staging bytes and per-frame upload bytes; do not collapse them into one arbitrary item count.
3. Choose an admission policy that preserves useful priority (visible/near chunks before distant work) while preventing starvation of older eligible work.
4. When capacity is exhausted, apply explicit backpressure: defer lower-priority uploads, coalesce superseded mesh versions, or release safely cancellable results; never overwrite in-flight staging memory.
5. Tie staging-slot reuse to GPU completion signals and reject stale mesh versions before submission or publication.
6. Test burst load, camera teleport, rapid block edits, cancellation, device stalls and shutdown; report peak bytes and recovery time.

## Validation checklist

- [ ] All queue and staging capacities are expressed in bytes as well as item counts where relevant.
- [ ] In-flight upload memory is not reused before its completion signal.
- [ ] Superseded mesh versions are discarded without publishing stale geometry.
- [ ] Priority policy is bounded and cannot permanently starve distant work.

## Required output

A queue-capacity table, scheduling/admission policy, instrumentation plan, and stress-test results or explicitly unrun tests.

## Boundaries and failure handling

Do not claim a fixed upload budget is optimal without measurement. Do not block the render thread on routine capacity exhaustion; reserve blocking waits for documented lifecycle boundaries.

## Trigger examples

- **Positive:** Chunk meshing produces a burst of completed meshes after a fast player movement.
- **Positive:** GPU upload stalls cause staging memory or pending mesh queues to grow.
- **Negative:** The issue is incorrect greedy-mesh topology or face culling.
- **Negative:** The workload is dominated by disk/network chunk reads rather than GPU uploads.
