---
name: nexora-edit-remesh-snapshot-refresh
description: "Defines bounded DenseSnapshot reuse and safe incremental worker remeshing for NEXORA voxel edits, including border refresh, cache invalidation, version checks, and frame-safe publication."
---

# NEXORA Edit Remesh Snapshot Refresh

## Purpose

Use this workflow when reducing the frame cost of player/editor voxel edits in NEXORA by reusing `DenseSnapshot` data, refreshing only changed cells, and optionally moving multi-region remeshing to the existing job system.

This skill owns the **edit-triggered remesh path** from authoritative world edits through snapshot refresh, CPU mesh generation, version validation, vertex regeneration, and GPU upload. It does not replace general stale-mesh version gates, generic job cancellation, result-publication transactions, GPU upload backpressure, or frame-pacing analysis.

## Reuse before creating

- `nexora-chunk-mesh-version-gate` for chunk and neighbor revision checks before mesh publication.
- `nexora-job-result-publication-transaction` for staging and publishing complete worker results.
- `nexora-editor-background-job-cancellation` for cancellation and obsolete editor work.
- `nexora-simulation-render-snapshot-boundary` for authoritative world versus immutable worker inputs.
- `nexora-gpu-upload-backpressure` for bounded GPU upload work.
- `nexora-frame-pacing-budget` for wall/work/presentation attribution and tail-latency measurement.
- `nexora-chunk-change-feed-gap-recovery` only when a consumer uses the bounded change journal; it is not a substitute for the edit list passed to remeshing.

The distinct concern is maintaining a bounded, reusable per-region voxel snapshot across edits and using it safely in the client edit path.

## Verified NEXORA snapshot

Inspected NEXORA `main` at commit `eed3dbcb68c7540decf08b3d55f2fae7feae8833`, including:

- `engine/client/src/scene.rs`
- `engine/client/src/lib.rs`
- `engine/mesh/src/snapshot.rs`
- `engine/runtime/src/jobs.rs`
- `docs/adr/ADR-0047-a-move-of-the-square-is-meshed-on-the-job-system-and-the-frame-waits-for-it.md`
- `docs/plans/NEXORA TECHNICAL DEBT REGISTER.md` (DEBT-0027 and DEBT-0029).

Snapshot facts:

- `Scene::remesh` collects touched region indices for each changed cell and its six axis neighbours. It then builds a `WorldSurfaces` view, reads a new `DenseSnapshot` per touched region, meshes it synchronously, and replaces the region's CPU mesh.
- `Scene::reupload` separately checks neighbouring region corner data and returns only regions whose vertex bytes may have changed.
- `Scene` already owns an optional `Arc<JobSystem>`. `recentre` uses `mesh_all` to read snapshots on the calling thread, submit a multi-region wave with `submit_all(Priority::Critical, ...)`, and wait for each handle. `vertices_all` also uses a worker wave when more than one region is requested.
- The current edit path in `engine/client/src/lib.rs` applies editor commands, collects changed block positions, then calls `Scene::remesh`, `Scene::reupload`, vertex generation, and GPU upload during the same frame's RenderPrep stage.
- `DenseSnapshot::refresh` already updates only supplied positions that fall inside the snapshot, including its one-cell border. It refreshes surface and occlusion answers, adds newly observed surface layers, removes layers no cell shows any more, and returns the number of supplied cells held by the snapshot.
- The inspected snapshot has tests for refresh equality against a fresh read, layer-table cleanup, and no-op refresh. The client Scene edit path does not yet retain or refresh snapshots; it reads each touched region again.
- `DenseSnapshot::byte_len` accounts for per-cell surface and occlusion arrays but excludes the layer map. The snapshot module documents 8 bytes for `Option<SurfaceId>` plus one occlusion byte per cell and a hard cap of 2,000,000 cells.
- A drawn slab is 32×16×32 cells plus a one-cell border: 34×18×34 = 20,808 cells, approximately 187,272 bytes of cell arrays (about 183 KiB) before the layer map. At radius 1, the seven-layer scene has 63 slabs, about 11.25 MiB if every snapshot is cached. At maximum radius 7, 1,575 slabs would be about 281 MiB before layer-map and cache overhead. These are arithmetic estimates, not measured resident-memory results.
- ADR-0047 moved the entering slabs and region vertex generation for scene movement to workers, while the frame waits for those jobs. It explicitly leaves one- or two-slab edit remeshing on the frame thread and says `DenseSnapshot::refresh` is not wired into that path.
- DEBT-0027 records a historical edit cost of roughly 17 ms after earlier corner/vertex improvements, with about 8 ms still spent on snapshot plus mesh work on the frame thread. The same register records that move meshing was improved by ADR-0047; do not describe all meshing as still synchronous.

These are pinned-snapshot observations, not permanent API guarantees. Recheck current call sites, scene geometry, job thresholds, and benchmark evidence before implementing a cache or changing frame semantics.

## Required inputs

- Pinned NEXORA commit and current `Scene::remesh`, `DenseSnapshot::refresh`, `Scene::reupload`, and client frame call sites.
- Exact edit batch: changed positions, material/surface changes, and any world or chunk revision metadata.
- Region extents, slab layout, scene radius/layers, and the one-cell snapshot-border contract.
- Worker-pool configuration, job priorities, result-retention behavior, cancellation policy, and frame wait semantics.
- Measured snapshot bytes, layer-map overhead, edit frequency, cache hit rate, remesh p50/p95/p99, and frame budget.
- GPU upload ownership and the current resource replacement/destruction sequence.

## Workflow

1. Trace the real edit path from `BlockEditor::apply` through changed-cell collection, `Scene::remesh`, `Scene::reupload`, vertex generation, and `ChunkPass` upload.
2. Define a cache identity that includes region extent and the relevant world/scene generation and chunk-neighbour revisions; extent alone is not a safe identity across unload, reload, or recenter.
3. Establish a strict byte budget before retaining snapshots. Account for the layer map and cache metadata in addition to `DenseSnapshot::byte_len`; use bounded LRU or another explicit eviction policy.
4. For each changed edit batch, find every touched region using the existing cell-plus-six-neighbours rule, then refresh every cached snapshot whose region or one-cell border contains an actually changed cell.
5. If a snapshot is absent, invalidated, or cannot account for the changed cells, rebuild it from the current `WorldSurfaces` view. Do not use a partial refresh as proof that an unrelated stale snapshot is valid.
6. Build candidate meshes from owned snapshots. Keep `World`, `RefCell`, and live `WorldSurfaces` references on the calling thread; workers receive only detached `DenseSnapshot` values and immutable inputs.
7. Use a multi-job wave only when the touched-region count and measured cost justify scheduling. Preserve the existing synchronous fallback for a single region unless measurements show a better threshold.
8. Collect outcomes by their assigned region slots, validate all required versions, and stage the complete mesh result set before replacing the Scene's published meshes.
9. Recompute affected neighbour vertices with `Scene::reupload`, generate CPU vertex bytes, and keep GPU API calls/resource destruction on the render-owning thread.
10. Preserve the current same-frame/ray-cast contract unless a separate ADR explicitly accepts deferred meshes across frames and updates the validation model.
11. Measure cache effectiveness and frame impact, then test region lifecycle, edit bursts, stale jobs, cancellation, and memory-budget exhaustion.

## Snapshot refresh contract

- Pass the actual changed positions from the editor, not the six-neighbour expansion used only to discover touched mesh regions. Neighbours whose contents did not change do not need their snapshot cells rewritten.
- A region snapshot includes a one-cell border because face culling asks about adjacent cells across the region edge. An edit just outside a region can therefore still change a cell held in that region's border and must refresh that snapshot.
- Preserve both answers stored per cell: surface identity and occlusion. Never reconstruct occlusion from surface presence; glass and foliage may have a surface without hiding what is behind them.
- Preserve the layer mapping. A newly introduced surface must acquire its current layer; a removed surface must leave the map only when no cell in the snapshot still uses it.
- Treat the return value from `refresh` as the number of changed positions actually contained by that snapshot. If a touched region's cached snapshot reports zero held changed cells unexpectedly, investigate the cache key and border assumptions; fall back to a fresh read rather than silently reusing it.
- If material definitions or the surface-to-layer table change independently of voxel edits, invalidate or refresh the affected layer metadata explicitly. A changed voxel-position list alone does not prove the material table stayed constant.
- A snapshot cache miss is a normal condition. Full `DenseSnapshot::read` remains the correctness fallback.

## Cache and memory policy

- Do not retain a snapshot for every visible region by default. The documented slab arithmetic implies roughly 11.25 MiB of cell arrays at radius 1 and roughly 281 MiB at radius 7, before layer maps and allocator overhead.
- Start with a bounded cache of recently edited/hot regions, not a full-scene mirror. Select the byte budget from the actual client memory budget and measured hit rate.
- Account bytes on insertion, refresh, eviction, region drop, scene recenter, world replacement, and shutdown. Expose current bytes, peak bytes, entries, hits, misses, refresh-held cells, full-read fallbacks, and evictions.
- Evict least-recently-used snapshots when the budget is reached. Eviction must not remove authoritative world data, published meshes, or a snapshot currently owned by an active worker.
- Avoid cloning large snapshots merely to hand them to a worker if ownership can be moved safely. If a cache must retain its copy while a worker runs, account for both copies in the budget.
- Invalidate cached snapshots when their region is dropped, the scene/world generation changes, a dependency chunk is unloaded/reloaded, or relevant neighbour/material revisions no longer match.
- Do not silently raise the cache budget to improve hit rate; report the memory/performance trade-off.

## Worker and publication contract

- Read or refresh snapshots on the caller thread while the authoritative world view is valid; a worker must never traverse the live world.
- For multiple touched regions, submit one wave with `submit_all` where appropriate; do not pay one worker wake-up per region when a batch can be submitted together.
- Keep result order tied to explicit region slots, not completion order. A faster neighbour must not reorder the region/mesh association.
- Wait on each required handle or use an explicit asynchronous state machine. Do not use a global pool barrier to wait for unrelated work.
- Treat `Cancelled`, `Failed`, `Panicked`, and `Forgotten` outcomes as non-success. Never publish a missing or partial result set.
- Before publishing, validate the source region/chunk and neighbour versions using `nexora-chunk-mesh-version-gate`.
- Stage all candidate meshes and publish the set only after every required job and version check succeeds, reusing `nexora-job-result-publication-transaction`.
- If work is allowed to cross frames, coalesce repeated edits, cancel or supersede obsolete requests, bound queued work, and discard stale completions. That is a separate behavioral change from ADR-0047's same-frame wait.
- Keep GPU upload, RHI calls, and destruction of old GPU resources on the render-owning thread. Worker output is CPU mesh/vertex data only.

## Validation scenarios

| Scenario | Required invariant |
|---|---|
| One edit inside a region | Refreshed snapshot equals a fresh read and produces the same mesh. |
| Edit on region boundary | The one-cell border is refreshed and face culling matches a fresh read. |
| Edit at chunk/column boundary | Every affected region and neighbour dependency is included exactly once. |
| Build into previously empty cell | New surface and render layer are inserted. |
| Remove last cell of a surface | Unused layer entry is removed. |
| Remove one of several cells of a surface | Layer entry remains while another cell still uses it. |
| No-op refresh | Snapshot bytes and mesh remain unchanged. |
| Cache miss or invalid key | Full snapshot read is used; no stale cache data is reused. |
| Cache budget exceeded | LRU eviction keeps memory within the declared cap. |
| Region recenter/unload/reload | Snapshot from the old region incarnation cannot be applied to the new one. |
| Multiple regions in one edit batch | Result slots preserve region order regardless of completion order. |
| One worker fails or is forgotten | No partial mesh set is published; failure is reported and retry/fallback is explicit. |
| Newer edit arrives during old work | Old result fails the version gate and cannot overwrite newer geometry. |
| Worker and synchronous paths | Meshes and resulting vertex bytes are equal for the same edit sequence. |
| GPU upload failure | Old GPU resource is retained until the replacement for that region is ready. |
| Edit burst | Queue, cache bytes, stale jobs, and frame p95/p99 remain bounded. |

## Existing test anchors in the inspected source

Recheck names and behavior before relying on them. These tests were present in the pinned snapshot:

From `engine/mesh/src/snapshot.rs`:
- `a_refreshed_snapshot_equals_one_read_after_the_edit`
- `a_surface_no_cell_shows_any_more_leaves_the_layer_table`
- `refreshing_a_cell_that_did_not_change_changes_nothing`
- `a_snapshot_is_send_so_a_worker_can_own_one`
- `meshing_through_a_snapshot_produces_the_same_mesh_as_the_source`

From `engine/client/src/scene.rs`:
- `a_move_meshed_on_workers_is_the_move_meshed_here`

The inspected source did not contain a Scene-level test proving that the client edit path retains and refreshes snapshots across consecutive edits. These are source-inspected anchors; this skill authoring task does not claim NEXORA tests were executed.

## Validation checklist

- [ ] Actual edit-to-render call sites were inventoried.
- [ ] Snapshot identity includes scene/world generation and relevant region dependencies.
- [ ] Snapshot refresh receives actual changed positions, including edits in the one-cell border.
- [ ] Surface, occlusion, and layer-table semantics match a fresh snapshot read.
- [ ] Cache bytes include layer-map/metadata overhead and stay under a declared cap.
- [ ] Cache invalidation covers recenter, unload/reload, world replacement, and neighbour changes.
- [ ] Cache misses and refresh inconsistencies fall back to a fresh snapshot read.
- [ ] Workers receive detached snapshots and never access the live world.
- [ ] Multi-region results retain slot ordering and are staged before publication.
- [ ] Stale versions, cancellation, failure, panic, and forgotten results are rejected.
- [ ] GPU/RHI operations remain on the render-owning thread.
- [ ] Synchronous and worker paths produce byte-identical meshes and vertex data.
- [ ] Frame p50/p95/p99, cache hit rate, and resident cache bytes are measured on repeatable workloads.

## Required output

Produce an edit-remesh integration report containing the pinned commit; edit call-site inventory; touched-region algorithm; snapshot cache key and invalidation rules; byte budget and per-slab arithmetic; cache hit/miss/eviction measurements; refresh-versus-full-read counts; worker scheduling threshold and priority; version/publication protocol; GPU upload ownership; test commands/results; frame p50/p95/p99; and unresolved risks. State whether the result provides synchronous correctness, bounded incremental reuse, worker offload, deferred cross-frame publication, and verified GPU presentation—these are separate claims.

## Boundaries and failure handling

- Do not cache every visible snapshot without a measured memory budget.
- Do not let workers read `World`, `WorldSurfaces`, or mutable simulation state.
- Do not refresh only region-interior cells; the one-cell border participates in culling.
- Do not infer layer or occlusion from surface presence.
- Do not publish a partial multi-region result set or ignore a stale version.
- Do not block the render thread on a global job-pool barrier.
- Do not move GPU/RHI operations into worker closures.
- Do not claim deferred rendering is safe while ADR-0047's ray-cast/frame contract still expects the move's geometry before return.
- Do not claim a performance improvement until the client edit report and cache metrics are measured on a repeatable workload.

## Trigger examples

- **Positive:** Wire `DenseSnapshot::refresh` into repeated player/editor edits to avoid rereading an entire region for a handful of changed voxels.
- **Positive:** Add a bounded cache of hot region snapshots and prove that border edits, neighbour changes, and region lifecycle remain correct.
- **Positive:** Move multi-region edit remeshing to the existing worker pool while preserving slot order, version gates, and same-frame correctness.
- **Positive:** Diagnose edit-frame spikes where snapshot reads and mesh generation remain on the frame thread.
- **Negative:** The task only defines stale mesh version checks; use `nexora-chunk-mesh-version-gate`.
- **Negative:** The task only defines generic worker result publication; use `nexora-job-result-publication-transaction`.
- **Negative:** The task only changes GPU upload queue limits; use `nexora-gpu-upload-backpressure`.
