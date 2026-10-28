# Roadmap to 2,500 distinct skills

**Baseline date:** 2026-10-17
**Current draft inventory:** 2,085 distinct skills (1,924 authored + 161 retained/imported)
**Long-term planning target:** 2,500 distinct skills  
**Remaining to long-term target:** 415
**Current milestone:** Consolidation PR #169 on `feat/all-skills-consolidated-2026` tracks the 2,085-skill inventory; structural CI passes, while imported-skill provenance/licensing and real Claude Code installation/discovery remain pending. The 2,000-skill branch below is a historical source milestone.
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
| 2085 | 2085 | Adds 25 agent-tooling skills for orchestration state, delegation safety, reconciliation and lifecycle reliability; pending complete generated-artifact review |
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
