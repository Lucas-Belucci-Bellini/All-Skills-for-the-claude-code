# Roadmap to 2,500 distinct skills

**Baseline date:** 2026-10-16  
**Current draft inventory:** 1,150 distinct skills (1,024 authored + 126 retained/imported)  
**Long-term planning target:** 2,500 distinct skills  
**Remaining to long-term target:** 1,350  
**Current milestone:** +150 skills from 1,000 to 1,150 on `feat/skills-expansion-1150-from-1000-2026`  
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
| 2026-12-31 | 500 | Initial target reached in draft; merge still depends on review, tests, and provenance/license checks |
| Scale-up | 1,175–1,500 | Continue in batches of 25–50; review domain balance and real usage every 100 skills |
| Extended scale | 1,525–2,000 | Prioritize demonstrated workflow gaps; consolidate or retire low-value overlap |
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
