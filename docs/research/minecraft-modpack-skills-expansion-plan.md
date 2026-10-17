# Minecraft Modpack Skills Expansion — Implementation Plan

## Scope

This work tracks two existing requests without recreating them:

- Issue #25: 100 ATM10 troubleshooting skills (50 general troubleshooting, 25 cross-mod interaction diagnosis, 25 individual mod bug investigation).
- Issue #26: 100 ProjectE/EMC skills (40 item inventory and EMC assignment, 25 progression/economy, 20 exploit and integration analysis, 15 audit and validation).

## Base and branch policy

- The 1,300-skill PR was merged and then reverted by PR #28. Do not treat the reverted merge as part of the active base.
- Start from `feat/skills-expansion-1150-from-1000-2026`, the existing 1,150-skill draft line.
- First batch branch: `feat/skills-expansion-1400-atm10-troubleshooting-2026`.
- Follow-up batch should be stacked on the verified first-batch head and add the ProjectE set.
- Keep both PRs Draft and do not merge to `main` without explicit approval.

## Research and safety rules

1. Inspect the actual modified ATM10 repository and available manifests/configuration before claiming its exact mod list, Minecraft version, loader, ProjectE version, or EMC schema.
2. Keep observations, hypotheses, and verified conclusions separate. Every troubleshooting workflow must request logs, crash reports, exact versions, recent changes, reproduction steps, and backups when relevant.
3. Never recommend deleting a world, save, or whole configuration/mod directory as an initial diagnostic step. Prefer minimal, reversible changes and rollback.
4. EMC values are proposals until confirmed against the exact installed ProjectE version and actual registered item/recipe data. Never imply a universal table covers every item.
5. Inventory coverage must report discovered, eligible, configured, pending, skipped, and unreadable items. Record reasons for exclusions and confidence for proposed values.
6. Test recipe conversion cycles, automation, renewables, compact/uncompact recipes, variants, NBT/data components, durability, and container contents before declaring an EMC configuration balanced.
7. Do not copy upstream source code or assets. Record conceptual provenance and review repository/component/dependency license boundaries.
8. Canonical skills belong under `curated-skill-sources/<category>/<skill-name>/SKILL.md`; plugin copies must be generated and byte-identical using the repository sync workflow.
9. Exact-name uniqueness and schema checks are necessary but not sufficient. Review near-duplicates and verify each workflow has task-specific steps, acceptance criteria, negative triggers, failure handling, and a concrete output.
10. Report CI, sync, runtime installation/discovery, semantic review, and licensing as separate statuses. Do not claim a check passed unless its result was observed.

## Acceptance gates

- ATM10 batch: exactly 100 new distinct skills in the 50/25/25 allocation.
- ProjectE batch: exactly 100 new distinct skills in the 40/25/20/15 allocation.
- No duplicate canonical names; source/plugin copy parity verified.
- Catalog JSON/Markdown, batch manifests, roadmap, plugin/marketplace metadata, READMEs, sync category map, and CI validation paths reconcile.
- Draft PRs describe verified work and list unresolved checks.
