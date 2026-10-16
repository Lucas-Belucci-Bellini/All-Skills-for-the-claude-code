# Roadmap to 2,500 distinct skills

**Baseline date:** 2026-10-16  
**Current draft inventory:** 500 distinct skills (374 authored + 126 retained/imported)  
**Long-term planning target:** 2,500 distinct skills  
**Remaining to long-term target:** 2,000  
**Current milestone:** +25 skills from 475 to 500 on `feat/skills-expansion-500-from-475-2026`  
**Intermediate milestone:** 500 by 2026-12-31 — reached in the draft inventory, pending review and merge of the PR chain

The 2,500 figure is a long-term planning ceiling, not a reason to ship filler or a promise that every future skill will be completed by a fixed date. Count canonical skill identities only: aliases, bundle copies, alternate paths, and duplicates do not increase the total.

## Milestone sequence

| Checkpoint | Target total | Status / operating rule |
|---|---:|---|
| 425 | 425 | Draft PR #6 against `main`; clean local sync and end-to-end discovery remain unverified |
| 450 | 450 | Draft PR #9 depends on PR #6; Git-tree parity was checked for its 25 source/bundle pairs |
| 475 | 475 | Draft PR #10 depends on PR #9; catalog and source/bundle parity were checked |
| Current draft | 500 | Adds 25 distinct release/data, queue/cache, plugin governance, runtime, network, and Minecraft update workflows |
| 2026-12-31 | 500 | Initial target reached in draft; merge still depends on review, tests, and provenance/license checks |
| Scale-up | 525–1,000 | Continue in batches of 25; review domain balance and real usage every 100 skills |
| Extended scale | 1,025–1,500 | Prioritize demonstrated workflow gaps; consolidate or retire low-value overlap |
| Long-range scale | 1,525–2,000 | Review discoverability, maintenance burden, provenance and package size every 100 skills |
| Final planned range | 2,025–2,500 | Continue only while new skills add distinct value; revisit ceiling based on adoption evidence |

A catalog counter alone does not complete a milestone. Each batch requires exact-name and semantic-overlap review, source/bundle parity, frontmatter/workflow checks, catalog reconciliation, manifest consistency, and diff review. If fewer than 25 useful skills are ready, ship fewer rather than inventing near-duplicates.

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
