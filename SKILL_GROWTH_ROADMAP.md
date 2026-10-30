# Roadmap to 5,000 distinct skills

**Baseline date:** 2026-10-17
**Current draft inventory:** 2,513 distinct skills (2,513 authored + 0 retained/imported)
**Long-term planning target:** 5,000 distinct skills
**Remaining to long-term target:** 2,487
**Current milestone:** 2,513 original skills: the 2,500-skill authored milestone plus thirteen NEXORA-specific engineering workflows (greedy meshing, streaming handle/pin lifecycle, climate lattice sample reuse, biome climate weight blending, native UI design-to-code, surface acquisition recovery, RHI conformance evidence, Cutout layer integration, PBR material render bridge, lighting render extraction contract, shadow caster extraction contract, and atmosphere/fog composition contract). The catalog and aggregate bundle contain zero retained/imported skills. Claude Code strict validation and clean marketplace installation passed in run 41110416249; NEXORA runtime feature validation remains separate.
**Intermediate milestone:** 500 by 2026-12-31 — achieved in the authored inventory

The 2,500 figure remains a long-term planning target, not a reason to ship filler or a promise that every future skill will be completed by a fixed date. Count canonical skill identities only: aliases, bundle copies, alternate paths, and duplicates do not increase the total.

## Milestone sequence

| Checkpoint | Target total | Status / operating rule |
|---|---:|---|
| 425 | 425 | Draft PR #6 against `main`; clean local sync and end-to-end discovery remain unverified |
| 450 | 450 | Draft PR #9 depends on PR #6; Git-tree parity was checked for its 25 source/bundle pairs |
| 475 | 475 | Draft PR #10 depends on PR #9; catalog and source/bundle parity were checked |
| Current draft | 500 | Adds 25 distinct release/data, queue/cache, plugin governance, runtime, network, and Minecraft update workflows |
| 525 | 525 | Draft batch stacked on sync-script fix; automated sync checks pass; Claude Code runtime, provenance and semantic audits remain pending |
| 550 | 550 | Draft batch stacked on 525; CI validates sync and the 25 new skills; Claude Code runtime and license/overlap audits remain pending |
| 600 | 600 | Adds 50 original geospatial, public-feed reliability, realtime voice, scene-sharing, and privacy/provenance workflows; full runtime discovery, upstream-use and broader semantic review remain pending |
| 850 | 850 | Adds 50 OSIRIS, 75 AERIS-10/PLFM_RADAR, and 125 Flipper Zero firmware engineering skills; install/discovery and broad semantic review remain pending |
| 1,000 | 1,000 | Adds 50 Supabase/PostgreSQL, 50 Vercel AI SDK/agent reliability, and 50 OpenSSF Scorecard/supply-chain workflows; clean install/discovery and broader semantic review remain pending |
| 1,150 | 1,150 | Adds 50 Playwright E2E, 50 OpenTelemetry Collector, and 50 Temporal TypeScript durable-workflow skills; clean install/discovery and broader semantic review remain pending |
| 1,250 | 1,250 | Draft ATM10 troubleshooting batch: 50 general diagnosis, 25 cross-mod conflicts, and 25 individual-mod bug investigations; plugin/catalog and CI validation required before review |
| 1500 | 1500 | Draft stack adds 100 ProjectE EMC workflow skills (40/25/20/15) and 150 multi-agent skill infrastructure/lifecycle skills; runtime, sync, CI and editorial review remain pending |
| 1750 | 1750 | Draft stack adds 50 Engine architecture/runtime, 50 Rust/platform, 50 release/repository quality, and 25 each Supabase/PostgreSQL, Vercel AI SDK, accessibility, and technical documentation skills; semantic review, sync, CI and provenance checks remain pending |
| 2000 | 2000 | Draft stack adds 50 simulation/NPC/world-history, 50 game content/save systems, 50 networked-games/determinism, and 25 each geospatial UX, live public-data reliability, provenance/privacy/ethics and OpenTelemetry Collector observability; sync, CI, semantic review and provenance checks remain pending |
| 2085 | 2085 | Historical consolidated inventory before the engine creation expansion | 
| 2185 | 2185 | Historical engine-creation batch: 100 skills across animation, physics, rendering, editor tooling, scripting, audio, networking, deterministic world generation, voxel systems and asset pipelines |
| 2195 | 2195 | Adds 10 NEXORA-scale Rust engineering workflows; validation and review required |
| 2205 | 2205 | Adds 10 voxel world correctness, persistence, and streaming workflows |
| 2216 | 2216 | Adds 11 NEXORA runtime reliability workflows |
| 2226 | 2226 | Adds 10 rendering, asset-pipeline, mod-conflict, simulation-boundary, and startup-reliability workflows |
| 2236 | 2236 | Adds 10 NEXORA AI scheduling, NPC behavior, navigation, combat, fixed-step simulation, and ECS lifecycle workflows |
| 2246 | 2246 | Adds 10 NEXORA world-edit transactions, fluid stability, NPC persistence, scripting budgets, data validation, and network trust-boundary workflows |
| 2256 | 2256 | Adds 10 deterministic event ordering, overload handling, region locking, worldgen modifier ordering, replay minimization, large-world coordinate, and physics lifecycle workflows |
| 2266 | 2266 | Adds 10 physics CCD/broadphase/solver, audio scheduling, animation authority, large-world camera precision, collision-cache identity, and tick profiling workflows |
| 2276 | 2276 | Adds 10 asset dependency, atlas fragmentation, material schema, hot reload, provenance, mod compatibility, registry publication, asset admission, and shader reflection workflows |
| 2286 | 2286 | Adds 10 save integrity/recovery, mod permission auditing, parser hardening, startup crash recovery, telemetry/log redaction, plugin failure containment, and release reproducibility workflows |
| 2296 | 2296 | Adds 10 property tests, fuzzing, regression fixtures, benchmark contracts, CI budgets, test isolation, crash reproduction, static analysis, API compatibility, and failure classification workflows |
| 2306 | 2306 | Adds 10 network delta baselines, event ordering, backpressure, protocol gates, rate limiting, clock drift, entity generations, interest boundaries, session epochs, and desync triage workflows |
| 2316 | 2316 | Adds 10 worldgen stage contracts, density boundaries, feature reservations, streaming hysteresis/fairness, mesh version gates, lighting budgets, seed compatibility, I/O backpressure, and crash reproduction workflows |
| 2326 | 2326 | Adds 10 editor undo/redo, selection identity, command validation, dirty state, job cancellation, layout migration, debug overlay budgets, safe live inspection, preview isolation, and reproducible project manifest workflows |
| 2336 | 2336 | Adds 10 memory attribution, allocation hot paths, cache eviction, lifecycle leak tests, lock contention, worker saturation, priority inversion, frame allocation budgets, GPU pressure, and memory admission workflows |
| 2346 | 2346 | Adds 10 Rust crate dependency, public API stability, unsafe audit, feature coherence, async cancellation, lock-poison recovery, error context, resource ownership, trait-object boundaries, and workspace release-gate workflows |
| 2356 | 2356 | Adds 10 save migration rollback, forward compatibility, region index/compaction, world edit conflict, inventory/item invariants, recipe cycles, and mod event/hot-reload lifecycle workflows |
| 2366 | 2366 | Adds 10 render pass contracts, target resize, temporal history, color-space pipeline, dynamic resolution, occlusion latency, animation pose/LOD, and audio device/spatialization workflows |
| 2376 | 2376 | Adds 10 filesystem confinement, network egress, mod quotas, command permissions, plugin capability auditing, save authenticity, secure updates, secret redaction, remote console security, and security regression corpus workflows |
| 2386 | 2386 | Adds 10 structured diagnostics, health checks, watchdog deadlock reports, crash dump versions, graceful degradation, device-loss recovery, shutdown ordering, restartable tasks, deadlines, and engine SLO workflows |
| 2396 | 2396 | Adds 10 release candidate gates, rollback plans, world-format support, mod compatibility labs, upgrade preflight, config-default drift, feature removal, smoke tests, release notes, and artifact integrity workflows |
| 2406 | 2406 | Adds 10 content registry, ECS schema, network schema, config migration, asset ID, save fixture, content diff, migration observability, schema deprecation, and migration dry-run workflows |
| 2416 | 2416 | Adds 10 build graph determinism, cache trust, cross-target compilation, dependency upgrades, build provenance, CI impact selection, benchmark baselines, release channels, and build failure minimization workflows |
| 2426 | 2426 | Adds 10 gameplay replay, balance scenarios, navigation reference tests, hitbox consistency, stuck recovery, state transitions, interaction reachability, progression reachability, event scheduling, and scenario catalog workflows |
| 2436 | 2436 | Adds 10 asset golden tests, mesh topology, skin weights, animation timing, mesh LOD, reference-cycle audit, texture fallback, shader recovery, cache corruption recovery, and content load-order workflows |
| 2446 | 2446 | Adds 10 AI tool budgets, planner snapshots, action validation, determinism boundaries, NPC memory retention, navigation intent, behavior-tree budgets, failure classification, generated-content validation, and diagnostics redaction workflows |
| 2456 | 2456 | Adds 10 platform filesystem durability, path canonicalization, threading, clocks, GPU/audio capability profiles, file locking, path limits, resource-limit detection, and runtime smoke matrix workflows |
| 2466 | 2466 | Adds 10 concurrent world reads, atomic job publication, async deduplication, queue fairness, cache invalidation, resource reservations, ECS command order, event reentrancy, concurrent shutdown, and atomic generation swap workflows |
| 2476 | 2476 | Adds 10 world command permission rechecks, region access boundaries, save locks, consistent snapshots, cross-chunk transactions, region recovery, privacy exports, backup retention, cross-mod migration, and world integrity audit workflows |
| 2486 | 2486 | Adds 10 world-load admission, session ownership, save barriers, repair approval, recovery priority, safe mode, incident timelines, invariant monitors, recovery drills, and fallback regression workflows |
| 2500 | 2500 | Reaches the declared 2,500-skill authored milestone with 14 final acceptance workflows |
| 2501 | 2501 | Adds one NEXORA-specific greedy-meshing workflow grounded in the current `nexora-mesh` implementation; focused runtime validation remains pending |
| 2502 | 2502 | Adds one NEXORA streaming-handle/pin lifecycle workflow grounded in `nexora-streaming`; runtime validation remains pending |
| 2503 | 2503 | Adds one NEXORA climate-lattice sample reuse workflow grounded in `engine/world/src/terrain.rs` and ADR-0049; optimization is proposed only, benchmark/runtime validation remains pending |
| 2504 | 2504 | Adds a NEXORA biome climate-weight blending workflow grounded in `docs/plans/BIOME ENGINE.md` and generator-v3 climate fields; runtime implementation/validation remains pending |
| 2505 | 2505 | Adds a NEXORA native UI design-to-code workflow grounded in the client/window/input/render/RHI architecture; no dedicated UI crate exists in the inspected snapshot, so implementation remains a staged design decision |
| 2506 | 2506 | Adds NEXORA surface acquisition/recovery workflow for bounded Lost/Outdated/Timeout/Occluded handling, host scheduling, minimize/restore and surface-vs-device failure separation |
| 2507 | 2507 | Adds NEXORA RHI conformance evidence workflow for the active 11-case suite, NullRhi/wgpu parity, CI software adapters and commit-scoped local hardware reports |
| 2508 | 2508 | Adds the NEXORA Cutout layer integration workflow, covering alpha threshold ownership, cutout pipeline/depth writes, mip coverage, CPU reference continuation, and GPU pixel tests |
| 2509 | 2509 | Adds the NEXORA PBR material render bridge workflow, connecting six asset map roles and PBR scalars to material indexing, face tangent frames, shader bindings, lighting, and CPU/GPU reference evidence |
| 2510 | 2510 | Adds the NEXORA lighting render extraction contract, separating authoritative world light state from immutable frame snapshots, GPU buffers/textures, CPU reference, and bounded resource lifecycles |
| 2511 | 2511 | Adds NEXORA shadow caster extraction workflow for independent caster/receiver policy, camera-relative sun cascades, local-light budgets, Cutout silhouettes, cache invalidation, and GPU evidence |
| 2512 | 2512 | Adds the NEXORA atmosphere/fog composition contract, separating weather and climate authority from dimension-aware sky profiles, fog inputs, colour-space composition, and deterministic CPU/GPU references |
| 2026-12-31 | 500 | Initial target reached in draft; merge still depends on review, tests, and provenance/license checks |
| Scale-up | 2,025–2,250 | Continue in batches of 25–50; review domain balance and real usage every 100 skills |
| Extended scale | 2,275–2,500 | Prioritize demonstrated workflow gaps; consolidate or retire low-value overlap |
| Long-range scale | 2,025–2,500 | Review discoverability, maintenance burden, provenance and package size every 100 skills |
| Beyond target | Reassessment | Reassess adoption and maintenance burden before expansion beyond 2,500 |

A catalog counter alone does not complete a milestone. Each batch requires exact-name and semantic-overlap review, source/bundle parity, frontmatter/workflow checks, catalog reconciliation, manifest consistency, and diff review. If fewer than the planned batch size of useful skills are ready, ship fewer rather than inventing near-duplicates.

## Quality gate for every skill

1. **Unique scope:** identify the task and neighboring tasks it does not replace.
2. **Useful trigger:** valid YAML frontmatter, unique name, and actionable description.
3. **Runnable workflow:** concrete steps, expected inputs, and a required deliverable.
4. **Verification:** acceptance checks, edge cases, negative cases, and failure recovery.
5. **Boundaries:** assumptions, external dependencies, destructive-action controls, and stop conditions.
6. **Routing tests:** positive and negative examples; check adjacent scopes for overlap.
7. **Provenance:** preserve source attribution and notice obligations; do not claim redistribution is cleared without evidence.
8. **Distribution parity:** source and plugin copy must match byte-for-byte; report local sync tests only when actually run.
9. **Catalog integrity:** JSON/Markdown counts, category sums, paths, manifests, READMEs, and versions reconcile.
10. **Reviewable change:** use a feature branch and Draft PR; never write directly to `main`.

## Operating cycle

Identify a real workflow gap; define triggers, inputs, outputs, and boundaries; author the canonical source; check exact and semantic duplicates; add the plugin copy; update inventory/docs/metadata; inspect the diff; run available local checks; report passed, failed, and unverified items separately; then request review.

## Known validation limits

- Clean-checkout bundle synchronization/idempotence, `git diff --check`, and `sync-skill-bundles.mjs --check` passed in run 41104430907.
- Claude Code CLI 2.1.314 strict marketplace/plugin validation and isolated clean-home marketplace installation passed in run 41104430907. Interactive invocation of an individual skill is not separately covered.
- Third-party provenance and redistribution-license review remains pending.
- Do not merge PRs, rewrite shared history, force-push, or change repository visibility without explicit authorization.


## 1,500 milestone — ProjectE and multi-agent skill engineering

This stacked branch adds 250 distinct authored skill workflows on top of the 1,250-skill ATM10 draft base: 100 ProjectE/EMC workflows and 150 workflows for cross-agent discovery, broker security/operations, provider adapters, selection/context, and automated skill lifecycle. The ProjectE skills specify version discovery and evidence requirements; this batch does not set actual values in a live modpack or claim an in-game balance playtest.

- [ ] Run `node tools/sync-skill-bundles.mjs --write` and `--check` in a clean checkout.
- [ ] Run `node tools/validate-skill-batch.mjs tools/skill-batch-manifests/1500.json`.
- [ ] Review semantic overlap and trigger quality; inspect GitHub Actions results.
- [ ] Verify the actual ProjectE/Minecraft/loader version and format in the target pack before any EMC config change.
- [ ] Test Claude Code/Codex/ChatGPT integrations individually; skill documentation alone does not connect the agents.
- [ ] Finish repository-wide provenance/license review before publishing the combined third-party distribution.

This branch is intended to be reviewed as a stacked change with base `feat/skills-expansion-1250-atm10-troubleshooting-2026`. No PR or merge was created by this update.


## 1,750 milestone — cross-domain engineering workflows

This stacked branch adds 250 authored workflows on top of the 1,500-skill draft: 50 engine architecture/runtime, 50 Rust/platform engineering, 50 release/testing/repository quality, and 25 each for Supabase/PostgreSQL, Vercel AI SDK/agent reliability, accessibility, and technical documentation. This distribution follows the existing catalog gap review rather than expanding the already large Minecraft category again. The inventory is still a draft; no runtime, production, provider or accessibility conformance claim is implied.

- [ ] Run `node tools/sync-skill-bundles.mjs --write` and `--check` in a clean checkout.
- [ ] Run `node tools/validate-skill-batch.mjs tools/skill-batch-manifests/1750.json`.
- [ ] Review exact-name and semantic overlap, scope triggers, source/bundle parity, and generated diffs.
- [ ] Inspect GitHub Actions results and run `git diff --check`; do not mark CI passed until a result is available.
- [ ] Review provenance, redistribution terms, and source references before publication.
- [ ] For skills involving engine/runtime, database, agents or accessibility, test against the target project/toolchain and report untested environments honestly.

Base branch: `feat/skills-expansion-1500-projete-cross-agent-2026`. PR creation and merge remain maintainer-controlled.


## 2,000 milestone — simulation, worlds, network and trustworthy data

This branch adds 250 authored workflows on top of the 1,750-skill draft: simulation/NPCs/world history (50), game content and save systems (50), networked games/determinism (50), and 25 each for geospatial UX, live public-data reliability, public-data provenance/privacy/ethics, and OpenTelemetry Collector observability. The emphasis is on reproducibility, migration safety, authoritative boundaries, source attribution, and measurable failure handling. This is an inventory draft, not evidence that a game engine, public feed, multiplayer service or Collector is running successfully.

- [ ] Run `node tools/sync-skill-bundles.mjs --write` and `--check` in a clean checkout.
- [ ] Run `node tools/validate-skill-batch.mjs tools/skill-batch-manifests/2000.json`.
- [ ] Review exact/semantic overlaps and verify the source and plugin copies are byte-identical.
- [ ] Inspect GitHub Actions results and run `git diff --check`.
- [ ] Review provenance, upstream terms and redistribution/license obligations.
- [ ] Test representative workflows against actual engine/save versions, netcode test harnesses, providers and Collector configurations where applicable.

Base branch: `feat/skills-expansion-1750-cross-domain-2026`. PR creation and merge remain maintainer-controlled.


## Engine creation batch — 2026-10-28

- Added 100 original engine workflows covering animation, physics, rendering, editor tooling, scripting runtime, audio, networking, deterministic world generation, voxel rendering and asset pipelines.
- Canonical source path: `curated-skill-sources/engine-runtime/`; generated plugin copies use `plugins/all-skills-collection/skills/`.
- Inventory after this batch: 2,185 distinct skills (2,024 original + 161 retained/imported); 315 remain to the 2,500 target.
- The consolidation branch and PR remain unmerged pending CI/review and explicit approval.


## Remaining 315 skills — NEXORA and large-scale software engineering scope

**Scope decision (2026-10-28):** the remaining 315 skills toward the 2,500-skill milestone are reserved for code engineering workflows purpose-built for NEXORA and reusable on similarly large, long-lived projects. Avoid generic coding filler and duplicate existing skills. Skills should be implementation-oriented, testable, version-aware, and explicit about failure modes, compatibility, observability, and migration safety. NEXORA-specific workflows may assume a Rust-first voxel engine only where the task actually applies; shared workflows must remain reusable across other large projects.

| Planned area | Skills | Focus |
|---|---:|---|
| Rust engine architecture and runtime | 45 | crate boundaries, ECS/system scheduling, ownership/lifetimes, async runtime, plugin ABI, feature flags, API stability |
| Voxel world, chunks, persistence and world generation | 45 | chunk lifecycle, streaming, save recovery, region files, deterministic generation, LOD, large-coordinate safety |
| Rendering, GPU and performance engineering | 45 | renderer architecture, resource lifetime, frame pacing, shader compilation, GPU/CPU profiling, memory budgets |
| Assets, textures, materials and mod pipeline | 45 | import/build pipelines, content hashes, texture atlases, material schemas, mod compatibility, provenance and hot reload |
| Simulation, AI/NPCs and gameplay systems | 45 | authoritative simulation, behavior trees/state machines, deterministic ticks, navigation, perception, scripting boundaries |
| Networking, security and data integrity | 45 | replication, protocol versioning, anti-corruption boundaries, authentication/authorization, untrusted mod isolation, save validation |
| Developer tooling, testing, CI and release engineering | 45 | property/fuzz tests, regression fixtures, benchmarks, crash diagnostics, migration gates, reproducible builds, release/rollback |
| **Total** | **315** | **2,500-skill target** |

### Acceptance criteria for this final 315-skill tranche

- Every skill has a distinct name, clear trigger conditions, required inputs, ordered workflow, validation steps, failure handling and expected outputs.
- Include Rust-specific guidance where applicable, but do not assume NEXORA code or infrastructure exists unless verified in the repository.
- Include practical tests or measurable acceptance criteria; prefer reproducible commands and fixtures over vague advice.
- Keep canonical source and plugin copy byte-identical; update the catalog and manifest in the same change set.
- Check exact and semantic duplicates against the current inventory before adding a batch.
- Validate each batch with the repository's sync/validation scripts and GitHub Actions. Keep all work on a feature branch; do not merge into `main` without explicit approval.


## Batch 2,195 — NEXORA-scale Rust architecture (2026-10-28)

Added 10 implementation-oriented workflows for crate boundaries, feature matrices, ECS scheduling, plugin API compatibility and capabilities, lifecycle ordering, configuration migrations, runtime budgets, async cancellation, and resource lifetime tracking. They target NEXORA and similarly large Rust projects without assuming unverified infrastructure exists.


## Batch 2,205 — Voxel world correctness and persistence (2026-10-28)

Added 11 code-engineering workflows for chunk streaming budgets, large-world coordinate safety, crash-safe region saves, dirty-state contracts, neighbor-aware meshing, deterministic world generation, safe chunk eviction, save-format versioning, property-based world-generation tests, and duplicate chunk-job suppression. These workflows focus on engine-scale voxel correctness and recovery, without assuming an unverified implementation.


## Batch 2,216 — NEXORA runtime reliability (2026-10-29)

Added 10 code-engineering workflows for runtime budget regression, Rust error boundaries, async shutdown barriers, generational resource handles, transactional configuration reload, content-addressed assets, mod capability boundaries, save-corruption quarantine, deterministic tick replay, crash-report redaction, and cross-platform filesystem contracts. The batch is focused on large-engine reliability and security, and does not assume that unverified NEXORA subsystems already exist.


## Batch 2,226 — NEXORA rendering and asset reliability (2026-10-29)

Added 10 engine-focused workflows for GPU upload backpressure, shader cache identity, frame pacing, GPU resource retirement, render-graph dependencies, texture residency, importer failure isolation, deterministic mod conflict resolution, simulation/render snapshots, and startup phase gates. These skills target measurable correctness and performance without assuming an unverified NEXORA implementation.


## Batch 2,236 — NEXORA simulation foundations (2026-10-29)

Added 10 code-focused workflows covering bounded NPC AI, explicit behavior-state contracts, navigation invalidation, perception budgets, pathfinding open-set safety, authoritative combat resolution, gameplay-event idempotency, fixed-timestep simulation, ECS ownership, and entity despawn cleanup.


## Batch 2,246 — NEXORA world-state and multiplayer contracts (2026-10-29)

Added 10 workflows for transactional world edits, stable fluid simulation, authoritative time/weather, NPC save schemas, script budgets, gameplay data validation, replication interest, packet-size safety, reconnect state machines, and server authority validation.


## Batch 2,256 — NEXORA determinism and physics (2026-10-29)

Added 10 workflows for deterministic event ordering, simulation overload degradation, region lock ordering, worldgen modifier ordering, chunk simulation activation, replay divergence minimization, large-world coordinate safety, world-state hashing, physics contact lifecycle, and fixed-step physics stability.


## Batch 2,266 — NEXORA runtime systems (2026-10-29)

Added 10 workflows covering continuous collision detection, broadphase budgets, constraint solver stability, audio voice budgets and clock synchronization, skeleton compatibility, root-motion authority, camera-origin rebasing, collision-shape cache identity, and gameplay tick profiling.


## Batch 2,276 — NEXORA content pipeline (2026-10-29)

Added 10 workflows for asset dependency graphs, texture atlas fragmentation, material schema versioning, atomic hot reload, content provenance, mod dependency/API compatibility, registry publication, asset budget admission, and shader reflection contracts.


## Batch 2,286 — NEXORA integrity and release reliability (2026-10-29)

Added 10 workflows for save checksums, crash-consistent save ordering, generation recovery, mod permission auditing, hostile asset parser hardening, startup crash-loop recovery, telemetry cardinality, log redaction, plugin failure containment, and reproducible release artifacts.


## Batch 2,296 — NEXORA testing and developer tooling (2026-10-29)

Added 10 workflows for world-invariant property tests, parser fuzzing, deterministic regression fixtures, performance benchmark contracts, CI resource budgets, test isolation, minimal crash reproductions, static-analysis gates, API compatibility matrices, and test-failure classification.


## Batch 2,306 — NEXORA multiplayer resilience (2026-10-29)

Added 10 workflows for replication delta baselines, reliable event ordering, network backpressure, protocol version negotiation, input rate limits, clock drift correction, generation-safe network entity IDs, interest-boundary testing, session epoch rotation, and desynchronization triage.


## Batch 2,316 — NEXORA world generation and streaming (2026-10-29)

Added 10 workflows for worldgen stage contracts, density-field boundary consistency, cross-chunk feature reservations, streaming hysteresis and queue fairness, stale mesh rejection, bounded lighting propagation, seed-version compatibility, I/O backpressure, and minimal worldgen crash reproduction.


## Batch 2,326 — NEXORA editor and developer tooling (2026-10-29)

Added 10 workflows for transactional editor history, stable selection identity, command validation, save dirty-state tracking, background-job cancellation, layout migration, debug overlay budgets, live-inspector snapshot safety, asset preview isolation, and reproducible project manifests.


## Batch 2,336 — NEXORA performance and memory budgets (2026-10-29)

Added 10 workflows for subsystem memory attribution, hot-path allocation audits, cache eviction policy, lifecycle leak tests, lock contention profiling, worker-pool saturation, priority inversion, frame allocation budgets, GPU memory pressure, and concurrent memory admission.


## Batch 2,346 — NEXORA Rust architecture and lifecycle (2026-10-29)

Added 10 workflows for crate dependency direction, public API stability, unsafe Rust audits, Cargo feature coherence, async cancellation safety, lock-poison recovery, error context chains, resource ownership ledgers, trait-object boundaries, and workspace release gates.


## Batch 2,356 — NEXORA data and mod contracts (2026-10-29)

Added 10 workflows for save migration rollback, forward compatibility, region-index integrity and compaction, world-edit conflict resolution, inventory transactions, item-stack identity, recipe-cycle audits, mod event-subscription lifecycle, and mod hot-reload state migration.


## Batch 2,366 — NEXORA rendering, animation, and audio correctness (2026-10-29)

Added 10 workflows for render-pass state contracts, transactional target resize, temporal-history invalidation, color-space correctness, render-resolution budgets, asynchronous occlusion-query handling, animation pose-cache invalidation, skeletal LOD transitions, audio-device recovery, and spatial-audio coordinate correctness.


## Batch 2,376 — NEXORA security boundaries (2026-10-29)

Added 10 workflows for filesystem confinement, network egress policy, mod resource quotas, command permissions, plugin capability auditing, save authenticity threat modeling, secure update manifests, secret redaction, remote console authentication, and a security regression corpus.


## Batch 2,386 — NEXORA runtime observability and recovery (2026-10-29)

Added 10 workflows for structured diagnostics, subsystem health checks, watchdog deadlock diagnostics, crash dump/symbol contracts, runtime feature degradation, GPU device-loss recovery, shutdown order, restartable background jobs, task deadlines, and engine reliability objectives.


## Batch 2,396 — NEXORA release operations (2026-10-29)

Added 10 workflows for release-candidate evidence, rollback planning, world-format support matrices, mod compatibility labs, upgrade preflight reports, configuration-default drift audits, feature-flag removal gates, installation/upgrade smoke tests, release-note accuracy, and release-artifact integrity.


## Batch 2,406 — NEXORA data migration contracts (2026-10-29)

Added 10 workflows for content-registry migration, ECS component schemas, network schema evolution, idempotent configuration migration, asset-ID migration, save compatibility fixtures, semantic content diffs, migration observability, schema deprecation windows, and read-only migration dry runs.


## Batch 2,416 — NEXORA build and CI automation (2026-10-29)

Added 10 workflows for incremental build graphs, generated-code determinism, cache trust boundaries, cross-target compilation, dependency-upgrade impact, build provenance, safe CI test selection, benchmark baseline refresh, release-channel policy, and build-failure minimization.


## Batch 2,426 — NEXORA gameplay correctness (2026-10-29)

Added 10 workflows for deterministic gameplay replay, balance scenario harnesses, navigation reference tests, combat hitbox consistency, NPC stuck recovery, gameplay state-transition audits, interaction reachability, item progression reachability, world-event scheduling, and a reproducible gameplay regression catalog.


## Batch 2,436 — NEXORA asset correctness (2026-10-29)

Added 10 workflows for importer golden tests, mesh topology validation, skin-weight normalization, animation clip timing, mesh LOD transitions, asset reference-cycle auditing, texture-format fallback, shader compilation recovery, streamed-asset corruption recovery, and content load-order independence.


## Batch 2,446 — NEXORA AI/NPC engineering (2026-10-29)

Added 10 workflows for bounded AI tool execution, immutable planner snapshots, action validation, replay boundaries for nondeterministic planning, NPC memory retention, navigation intent, bounded behavior trees, AI failure classification, generated-content validation, and privacy-safe AI diagnostics.


## Batch 2,456 — NEXORA platform compatibility (2026-10-29)

Added 10 workflows for filesystem durability, portable path canonicalization, threading capability selection, monotonic clock contracts, GPU/audio capability profiles, multi-process file locking, long-path fallback, platform resource-limit detection, and a cross-platform runtime smoke matrix.


## Batch 2,466 — NEXORA concurrency safety (2026-10-29)

Added 10 workflows for coherent concurrent world reads, atomic job-result publication, async singleflight deduplication, queue fairness, concurrent cache invalidation, resource reservation atomicity, deterministic ECS command buffers, event-handler reentrancy, idempotent concurrent shutdown, and atomic generation swaps.


## Batch 2,476 — NEXORA world safety and recovery (2026-10-29)

Added 10 workflows for queued-command permission rechecks, region access boundaries, save locks/recovery markers, consistent world snapshots, cross-chunk transactions, region recovery scans, privacy-safe world exports, backup retention, cross-mod migration validation, and read-only world integrity audits.


## Batch 2,486 — NEXORA operational safety (2026-10-29)

Added 10 workflows for world-load admission, single-owner world sessions, save quiescence barriers, repair approval, recovery priority, engine safe mode, incident timelines, runtime invariant monitoring, recovery drills, and fallback regression coverage.


## Batch 2,500 — NEXORA milestone acceptance (2026-10-29)

Completed the declared catalog target with 14 final workflows covering engine readiness, alpha tester build checks, critical-path smoke tests, world-data-loss release blockers, resource-budget gates, mod compatibility gates, privacy and licensing checks, feature-flag retirement, clean-room build verification, known limitations, release evidence bundling, roadmap completion evidence, and 2,500-skill milestone acceptance.

**Important:** This milestone confirms the catalog count only after structural validation. It does not mean every NEXORA runtime feature is implemented. Claude Code strict validation and isolated marketplace installation were subsequently verified by run 41104430907; runtime engine validation remains a separate gate.
| 2339 | 2339 | Historical cleanup checkpoint: 161 retained/imported entries removed; 2,339 authored skills remained |



## Reconstituted 2,500-skill milestone — programming-language coverage (2026-10-30)

Added 161 original skills: five workflows for each of the 31 languages detected in the public profile, plus six polyglot workflows for API contracts, serialization compatibility, FFI safety, cross-runtime fixtures, language migration, and reproducible builds. The 161 removed retained/imported entries were not restored. The current catalog is 2,500 authored skills with zero retained/imported entries. The next planning target is 5,000; do not count bundle copies or aliases as additional skills.


## Batch 2,501 — NEXORA greedy meshing (2026-10-30)

Added one original workflow for NEXORA's deterministic greedy voxel mesher: neighbor-aware face culling, surface/occlusion merge identity, surface-area preservation, bounded quad dimensions, stable output order, render-layer routing and reproducible validation. The skill is grounded in the current `engine/mesh` implementation; it has not yet been executed against a local NEXORA checkout.


## Batch 2,502 — NEXORA stream handle and pin lifecycle (2026-10-30)

Added one original workflow for the NEXORA streaming request-handle contract: slot allocation/reuse, generation validation, stale cancellation, multi-handle pin aggregation, residency guarantees under pressure, deferred eviction after cancellation, and persist-before-evict failure handling. The skill is grounded in `engine/streaming/src/system.rs` and `target.rs`. Existing tests cover stale-handle reuse, pin persistence outside observer interest, and memory-pressure protection; multi-pin aggregation and generation-exhaustion tests are identified as additional coverage targets. No local runtime test execution is claimed.


## Batch 2,503 — NEXORA climate lattice sample reuse (2026-10-30)

Added one original workflow for evaluating bounded reuse of positional value-noise lattice corners across nearby NEXORA terrain columns and repeated climate/surface sampling. It is grounded in `engine/world/src/terrain.rs` and ADR-0049, which records 44 lattice-corner reads per column and explicitly defers shared-corner reuse until generation cost warrants it. The workflow requires exact Q16/reference equivalence, negative-coordinate and boundary coverage, bounded job-local memory, scheduling independence, and whole-chunk benchmarks. It does not claim that a cache has been implemented or that a speedup has been measured.


## Batch 2,506 — NEXORA surface acquisition and recovery (2026-10-30)

Added an original workflow for bounded recovery across the wgpu surface presenter and the winit window host: Lost/Outdated/Timeout/Occluded classification, retry ownership, backoff, minimized/zero-size suspension, surface-vs-device failure separation, client-state preservation, and deterministic fault-injection coverage. Grounded in `engine/rhi-wgpu/src/surface.rs` and `engine/window/src/lib.rs`; no runtime recovery implementation is claimed.

## Batch 2,507 — NEXORA RHI conformance evidence (2026-10-30)

Added an original workflow for the full RHI evidence chain: backend-neutral contract, NullRhi, wgpu conformance, native probe, software-driver CI matrix, and commit-scoped physical-GPU validation. It follows the active 11-case suite and explicitly flags historical ADR prose that still reports 9 cases. The checked-in RX 6650 XT report is treated as historical diagnostic evidence because it was generated from a dirty working tree; a clean-commit report is still required for release evidence.


## Enhancement — NEXORA transparent voxel pass ordering (2026-10-30)

The existing `engine-voxel-transparency-sort-policy` workflow was expanded with NEXORA's ADR-0051/DEBT-0056 case. The current renderer draws transparent chunk buffers in caller order despite the mesh contract requiring back-to-front sorting; the CPU reference does not judge rays crossing a second see-through face. The enhanced workflow now requires a deliberate sort granularity, deterministic depth/tie-break policy, multi-layer CPU compositing, GPU regression scenes, and measured sorting cost. This is an enhancement to an existing skill, so the unique skill count remains 2,507.


## Batch 2,508 — NEXORA Cutout layer integration (2026-10-30)

Added an original workflow for the missing renderer stage between material/mesher classification and GPU pixel output. The snapshot already routes `BlendMode::Cutout` into `LayeredMesh.cutout`, but the textured `ChunkPass` has no cutout pipeline/buffer and the material schema has no explicit alpha threshold. The workflow requires an explicit threshold decision, alpha discard with depth writes, opaque → cutout → transparent ordering, mip coverage measurements, CPU-reference continuation through discarded texels, and native pixel tests. No runtime implementation is claimed.


## Batch 2,509 — NEXORA PBR material render bridge (2026-10-30)

Added an original workflow for the missing bridge between `SurfaceMaterial`/six `MapRole` definitions and the current albedo-only textured voxel renderer. It defines staged support for normal, roughness, metallic, AO and height maps; stable GPU material identity; voxel-face tangent frames; shader/RHI layout parity; independent CPU reference; and measured memory/performance. The asset schema's PBR metadata is not treated as proof that PBR shading is implemented.


## Batch 2,510 — NEXORA lighting render extraction (2026-10-30)

Added a dedicated workflow for the boundary between authoritative world lighting and GPU rendering. The inspected world/simulation roots do not expose a lighting module, and the current render pass has no light-state input, light buffer/texture binding, dynamic-light list, or shadow pass. The workflow therefore begins with source-of-truth discovery and defines an immutable, versioned extraction contract, deterministic GPU representation, chunk-aligned sampling, dynamic-light budgets, independent CPU reference, and native GPU validation. It reuses existing propagation, invalidation, PBR, render-pass, and RHI workflows rather than duplicating them.


## Batch 2,511 — NEXORA shadow caster extraction (2026-10-30)

Added a dedicated workflow for selecting and submitting voxel/entity casters to future sun and local-light shadow passes. The current renderer has no shadow pass or caster API; the plans describe cast/receive flags, camera-relative cascades, LOD, and priority budgets. The workflow defines extraction, light-space culling, depth convention, Cutout/transparent policy, cache invalidation, resource retirement, and native GPU proof without claiming shadow maps are implemented.


## Batch 2,513 — NEXORA atmosphere/fog composition (2026-10-30)

Added a dedicated workflow for evolving the current directional sky gradient and distance haze into dimension-aware environment composition. It distinguishes climate, weather, atmosphere, sky background, sky-light surface illumination, PBR, and shadows; defines immutable frame inputs, fog representation choices, linear-light composition, water/transparent pass interactions, CPU reference parity, and analytic fallbacks. The current renderer remains a gradient/haze baseline; volumetric atmosphere is not claimed.


## Batch 2,513 — NEXORA voxel memory workload benchmark (2026-10-30)

Added an original benchmark-contract workflow for NEXORA issue #48. It defines a precise memory inclusion boundary and separates voxel payload, section/palette overhead, process RSS, auxiliary data, CPU/GPU derived data, transient buffers, and save size. It requires uniform, natural, high-diversity, heavily edited, adversarial, streaming, derived-data, and persistence workloads with pinned seeds, correctness digests, repeated median/p95 measurements, and a controlled reference representation. The historical nine-chunk baseline is preserved as a narrow baseline; no 50-million-voxel or sub-1-GiB result is claimed.


## Batch 2,513 — NEXORA voxel memory workload benchmark (2026-10-30)

Added an original benchmark-contract workflow for NEXORA issue #48. It defines a precise memory inclusion boundary and separates voxel payload, section/palette overhead, process RSS, auxiliary data, CPU/GPU derived data, transient buffers, and save size. It requires uniform, natural, high-diversity, heavily edited, adversarial, streaming, derived-data, and persistence workloads with pinned seeds, correctness digests, repeated median/p95 measurements, and a controlled reference representation. The historical nine-chunk baseline is preserved as a narrow baseline; no 50-million-voxel or sub-1-GiB result is claimed.
