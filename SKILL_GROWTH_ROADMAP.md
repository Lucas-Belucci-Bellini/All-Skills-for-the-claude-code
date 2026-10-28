# Roadmap to 25,000 canonical distinct skills

**Baseline date:** 2026-10-17
**Current draft inventory:** 1,545 distinct skills (1,419 authored + 126 retained/imported)
**Long-term planning target:** 25,000 distinct skills
**Remaining to long-term target:** 23,455
**Current milestone:** +25 skills from 1,500 to 1,525 on `feat/skills-expansion-1525-agent-orchestration-2026`
**Intermediate milestone:** 500 by 2026-12-31 — reached in the draft inventory, pending review and merge of the PR chain

> **Strategic target supersession (2026-10-27):** the 2,500-skill ceiling below is a historical planning milestone for the original collection. The proposed portfolio-wide destination is now 25,000 canonical skills with a 150-role specialist-agent architecture. See [the new strategy](docs/roadmaps/REA_INSPIRED_25000_SKILLS_150_AGENTS.md). The source-sync inventory and the long-range target are separate figures; the target does not mean 25,000 skills already exist.

The 2,500 figure is now an intermediate checkpoint inside the portfolio-wide 25,000-skill strategy, not the ultimate ceiling. Never treat a count as a quota: aliases, bundle copies, alternate paths, and duplicates do not increase the total.

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
| 1525 | 1525 | Adds 25 agent orchestration runtime workflows for state transitions, fan-out reconciliation, delegation guards, independent review, compensation, deadlines, shared-state conflicts, readiness, quorum, liveness, and execution evidence; structural, CI, runtime and provenance review remain required |
| 1540 | 1540 | Adds 15 repository-to-skill synthesis workflows with curated sources and identical plugin/bundle copies; semantic review and runtime validation remain required |
| 2026-12-31 | 500 | Initial target reached in draft; merge still depends on review, tests, and provenance/license checks |
| Scale-up | 1,525–1,750 | Continue in batches of 25–50; review domain balance and real usage every 100 skills |
| Extended scale | 1,525–2,000 | Prioritize demonstrated workflow gaps; consolidate or retire low-value overlap |
| Intermediate scale | 2,025–2,500 | Review discoverability, maintenance burden, provenance and package size every 100 skills |
| Long-range scale | 5,000–25,000 | Advance only through reviewed batches, semantic quality gates, and maintenance-health checks |

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


## 1,525 milestone — Agent orchestration runtime controls

This batch adds 25 original workflow skills under `curated-skill-sources/agent-tooling/` and matching generated entrypoints in the unified plugin. Its focus is runtime coordination of delegated work rather than another registry, broker, adapter, cache, or skill-lifecycle batch.

- [ ] Run `node tools/sync-skill-bundles.mjs --write` and `--check` in a clean checkout.
- [ ] Run `node tools/validate-skill-batch.mjs tools/skill-batch-manifests/1525.json` and `git diff --check`.
- [ ] Review semantic overlap and trigger quality; inspect GitHub Actions results.
- [ ] Test representative concurrency, delayed-callback, partial-failure, and recovery fixtures.
- [ ] Complete repository-wide third-party provenance and license review before publishing the combined distribution.

These skill documents define procedures and acceptance checks; they do not implement a production orchestrator, enforce runtime permissions by themselves, or connect external providers. This stacked branch targets `feat/skills-expansion-1500-projete-cross-agent-2026` and does not modify `main`.


## 1,545 milestone — Engine creation and platform correctness

Adds five original engine-creation workflows: render-graph hazard analysis, plugin ABI compatibility, deterministic replay debugging, platform capability matrices, and save-format migration. Source and bundle mirrors are included. Catalog/manifest updates are draft branch changes; sync CI, semantic overlap review, and runtime discovery remain to be observed.
