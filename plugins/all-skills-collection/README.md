# All Skills Collection — Claude Code Plugin

A generated plugin containing **1525 distinct skills**, with authored workflows across software reliability, geospatial intelligence, AERIS-10 radar/embedded testing, Flipper Zero firmware, live public-data pipelines, realtime agents, privacy-aware device engineering, and multi-agent orchestration runtime controls. Supporting files local to each skill are preserved. Add new authored skills to curated-skill-sources; do not hand-edit the generated plugin copy.

## Install

In Claude Code, add this repository as a marketplace and install all-skills-collection. If the repository is private, the account installing it must have repository access.

## Inventory and growth plan

- Full inventory: SKILL_LIBRARY_CATALOG.md
- Machine-readable inventory: SKILL_LIBRARY_CATALOG.json
- Long-term roadmap to 2,500 distinct skills (500 is the 2026 intermediate milestone): SKILL_GROWTH_ROADMAP.md
- Canonical authored sources: curated-skill-sources/README.md

## Refresh after new skills

From the repository root run the commands below, review the diff, and open a pull request.

    node tools/sync-skill-bundles.mjs --write
    node tools/sync-skill-bundles.mjs --check

The sync script removes identical skill subtrees from the output, namespaces real naming collisions, preserves executable modes, updates the bundle version/catalog and refuses an empty collection. It does not merge or publish.

## Agent orchestration runtime batch (1,525 draft)

The 1,525 draft adds 25 workflow skills for state transitions, fan-out reconciliation, delegation graph bounds, independent review context, compensating actions, deadline allocation, shared-state conflicts, subtask readiness, quorum decisions, liveness, and execution evidence. These are portable procedures and review gates, not an implementation of a production agent orchestration service.

## Limits and provenance

This bundle includes skill entrypoints and skill-local files. It does not automatically include every upstream plugin's agents, slash commands, hooks, MCP server implementation or runtime dependencies. Keep the repository private until third-party provenance and redistribution terms have been reviewed.
