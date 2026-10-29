# Roadmap to 2,500 distinct skills

**Baseline date:** 2026-10-17
**Current draft inventory:** 2,346 distinct skills (2,185 authored + 161 retained/imported)
**Long-term planning target:** 2,500 distinct skills  
**Remaining to long-term target:** 154
**Current milestone:** Consolidation PR #169 on `feat/all-skills-consolidated-2026` tracks the 2,185-skill inventory; structural CI passes, while imported-skill provenance/licensing and real Claude Code installation/discovery remain pending. The 2,000-skill branch below is a historical source milestone.
**Intermediate milestone:** 500 by 2026-12-31 — reached in the draft inventory, pending review and merge of the PR chain

The 2,500 figure is a long-term planning ceiling, not a reason to ship filler or a promise that every future skill will be completed by a fixed date. Count canonical skill identities only: aliases, bundle copies, alternate paths, and duplicates do not increase the total.

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
| 2346 | 2346 | Adds 10 Rust crate dependency, public API stability, unsafe audit, feature coherence, async cancellation, lock-poison recovery, error context, resource ownership, trait-object boundaries, and workspace release-gate workflows for budgets, Rust errors, shutdown, handles, config reload, asset identity, mod capabilities, save recovery, replay, diagnostics, and filesystem portability |
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

- A clean-checkout run of `node tools/sync-skill-bundles.mjs --write` and `--check` remains unverified until actual output is observed.
- Claude Code installation/discovery has not been verified end-to-end in this workflow.
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
