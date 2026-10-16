# Roadmap to 2,500 distinct skills

**Baseline date:** 2026-10-16  
**Verified branch inventory:** 425 distinct skills (299 authored + 126 retained/imported)  
**Long-term planning target:** 2,500 distinct skills  
**Next checkpoint:** 450 distinct skills (+25)  
**Intermediate milestone:** 500 by 2026-12-31, subject to quality gates

The 2,500 figure is a planning ceiling and long-term target, not a reason to publish filler or a promise that all skills will be completed by a fixed date. Count canonical skill identities only: aliases, generated bundle copies, alternate paths, and duplicates do not increase the total. The canonical inventory is `SKILL_LIBRARY_CATALOG.json`; `SKILL_LIBRARY_CATALOG.md` is its human-readable companion.

## Milestone sequence

| Checkpoint | Target total | Operating rule |
|---|---:|---|
| Current | 425 | 25-skill branch is represented by Draft PR #6; review and validate before merging |
| Next | 450 | Add 25 distinct skills after comparing candidate scope against the current catalog |
| Intermediate | 475 | Add the next validated batch of 25 |
| 2026-12-31 | 500 | Target for the initial expansion cycle; only count skills that pass quality and packaging checks |
| Scale-up | 525–1,000 | Continue in batches of 25; re-evaluate category balance at each 100-skill interval |
| Extended scale | 1,025–1,500 | Keep adding based on demonstrated workflow gaps; retire or consolidate weak/overlapping entries |
| Long-range scale | 1,525–2,000 | Review discovery quality, maintenance burden, provenance, and package size at every 100-skill interval |
| Final planned range | 2,025–2,500 | Continue only while new skills add distinct value; the cap may be revisited based on actual use and quality results |

No future milestone should be considered complete based solely on a catalog counter. Each batch must pass duplicate checks, source/bundle parity checks, frontmatter and workflow review, catalog reconciliation, and a diff review. If the quality bar cannot be met for a full batch, ship fewer skills and document the gap rather than inventing near-duplicates.

## Domain strategy for growth

Use the existing inventory and issue reports to identify gaps before every batch. Potential areas for investigation include:

- API contracts, data migrations, database operations, tenant isolation, auth/session behavior, and observable failure handling.
- Agent execution safety, tool permission boundaries, MCP governance, plugin lifecycle and discovery, workflow evaluations, and evidence traceability.
- Engine/runtime concurrency, resource lifetime, determinism, simulation scale, world persistence, network protocols, asset pipelines, and reproducible builds.
- Release verification, dependency and artifact provenance, security regression tests, rollback drills, and incident evidence.
- Minecraft/modpack reproducibility and operations where the new scope is clearly distinct from the current diagnostics skills.

These are candidate areas, not a quota. Compare each proposed skill with existing entries by task, trigger, inputs, outputs, failure modes, and supported tools. Prefer consolidation when two entries differ only by wording or minor variants.

## Quality gate for every skill

1. **Unique scope:** state the specific task and the neighboring tasks it does not replace.
2. **Useful trigger:** frontmatter has a unique name and an actionable description saying when to use the skill.
3. **Runnable workflow:** provide concrete ordered steps, expected inputs, and a required deliverable.
4. **Verification:** include acceptance checks, edge cases, negative cases, and recovery guidance.
5. **Boundaries:** explain assumptions, external dependencies, destructive-action controls, and when to stop or ask for review.
6. **Routing tests:** include positive and negative trigger examples and check for overlap with existing skills.
7. **Provenance:** preserve attribution, source information, and license notices where relevant; do not treat redistribution review as complete unless actually completed.
8. **Distribution parity:** canonical source and packaged copy must match; the sync check must pass in a local clean checkout before reporting it as passed.
9. **Catalog integrity:** JSON and Markdown totals, categories, source paths, manifests, README counts, and versions must reconcile.
10. **Reviewable change:** work on a feature branch and use a Draft PR; never push directly to `main`.

## Operating cycle

Discover a real gap; define the trigger and boundary; author the canonical skill; run exact and semantic duplicate checks; add the generated/plugin copy; update the catalog and documentation; inspect the diff; run available local checks; report passed, failed, and unverified validations separately; then request review.

## Known validation limits

- Local clean-checkout execution of `node tools/sync-skill-bundles.mjs --write` and `--check` must be reported only after actually observing the command output.
- Claude Code installation/discovery must not be described as verified until exercised end-to-end.
- Third-party provenance and redistribution-license review remains pending; do not claim that distribution is cleared.
- Do not merge PRs, rewrite shared history, force-push, or change repository visibility without explicit authorization.
