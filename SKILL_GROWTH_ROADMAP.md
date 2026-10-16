# Roadmap to 2,500 distinct skills

**Baseline date:** 2026-10-16  
**Current draft inventory:** 450 distinct skills (324 authored + 126 retained/imported)  
**Long-term planning target:** 2,500 distinct skills  
**Remaining to long-term target:** 2,050  
**Current milestone:** +25 skills from 425 to 450 on `feat/skills-expansion-450-2026`  
**Intermediate milestone:** 500 by 2026-12-31, subject to the quality gates below

The 2,500 figure is a long-term planning ceiling, not a commitment to ship low-value entries or to finish the entire expansion by a fixed date. Count canonical skill identities only: aliases, generated bundle copies, alternate paths, and duplicates do not increase the total. The canonical inventory is `SKILL_LIBRARY_CATALOG.json`; `SKILL_LIBRARY_CATALOG.md` is its human-readable companion.

## Milestone sequence

| Checkpoint | Target total | Status / operating rule |
|---|---:|---|
| Prior milestone | 425 | Draft PR #6 contains the 425-skill baseline; sync script and end-to-end Claude Code discovery are still unverified locally |
| Current draft | 450 | Adds 25 distinct API/data, security/release, MCP/agent and runtime/game-engine workflows; review this branch before merging |
| Next checkpoint | 475 | Add 25 only after checking names and neighboring scopes against the 450 catalog |
| Intermediate | 500 | Target for 2026-12-31 if every batch passes the quality and packaging gates |
| Scale-up | 525–1,000 | Continue in batches of 25; re-evaluate category balance and actual usage every 100 skills |
| Extended scale | 1,025–1,500 | Prioritize demonstrated workflow gaps; consolidate or retire low-value overlap |
| Long-range scale | 1,525–2,000 | Review discoverability, maintenance burden, provenance and package size at every 100-skill interval |
| Final planned range | 2,025–2,500 | Continue only while new skills add distinct value; revisit the ceiling using adoption and quality evidence |

A catalog counter alone does not complete a milestone. Each batch must pass exact-name and semantic-overlap review, source/bundle parity, frontmatter and workflow review, catalog reconciliation, manifest consistency, and diff review. If fewer than 25 useful skills are ready, ship fewer and document the gap rather than inventing near-duplicates.

## Quality gate for every skill

1. **Unique scope:** state the task and neighboring tasks it does not replace.
2. **Useful trigger:** valid frontmatter, unique name, and actionable usage description.
3. **Runnable workflow:** concrete steps, expected inputs, and a required deliverable.
4. **Verification:** acceptance checks, edge cases, negative cases, and recovery guidance.
5. **Boundaries:** assumptions, external dependencies, destructive-action controls, and stop conditions.
6. **Routing tests:** positive and negative examples; check adjacent skills for overlap.
7. **Provenance:** preserve attribution and source/license notices where relevant; redistribution review must not be claimed complete without evidence.
8. **Distribution parity:** source and generated/plugin copy must match byte-for-byte; a local sync check is reported only if actually run.
9. **Catalog integrity:** JSON/Markdown totals, category sums, source paths, manifests, README counts and versions must reconcile.
10. **Reviewable change:** use a feature branch and Draft PR; never write directly to `main`.

## Operating cycle

Discover a real gap; define trigger, inputs, boundary and outputs; author the canonical source; check exact and semantic duplicates; add the package copy; update catalogs and version metadata; inspect the diff; run available local checks; report passed, failed and unverified items separately; then request review.

## Known validation limits

- A clean-checkout run of `node tools/sync-skill-bundles.mjs --write` and `--check` is unverified until actual command output is observed.
- Claude Code plugin installation/discovery has not been verified end-to-end in this workflow.
- Third-party provenance and redistribution-license review remains pending; do not claim that distribution is cleared.
- Do not merge PRs, rewrite shared history, force-push, or change repository visibility without explicit authorization.
