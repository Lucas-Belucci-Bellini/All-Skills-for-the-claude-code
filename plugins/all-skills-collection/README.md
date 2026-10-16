# All Skills Collection — Claude Code Plugin

A generated plugin containing **375 distinct skills**, with authored workflows across engine memory/cache profiling, GPU/render validation, backend/API design, Rust concurrency, multiplayer determinism, NPC/civilization simulation, secure agent orchestration, Minecraft operations, world streaming, save recovery, asset integrity and incremental content builds. Supporting files local to each skill are preserved. Add new authored skills to curated-skill-sources; do not hand-edit the generated plugin copy.

## Install

In Claude Code, add this repository as a marketplace and install all-skills-collection. If the repository is private, the account installing it must have repository access.

## Inventory and growth plan

- Full inventory: SKILL_LIBRARY_CATALOG.md
- Machine-readable inventory: SKILL_LIBRARY_CATALOG.json
- Roadmap to 500 by December 31, 2026: SKILL_GROWTH_ROADMAP.md
- Canonical authored sources: curated-skill-sources/README.md

## Refresh after new skills

From the repository root run the commands below, review the diff, and open a pull request.

    node tools/sync-skill-bundles.mjs --write
    node tools/sync-skill-bundles.mjs --check

The sync script removes identical skill subtrees from the output, namespaces real naming collisions, preserves executable modes, updates the bundle version/catalog and refuses an empty collection. It does not merge or publish.

## Limits and provenance

This bundle includes skill entrypoints and skill-local files. It does not automatically include every upstream plugin's agents, slash commands, hooks, MCP server implementation or runtime dependencies. Keep the repository private until third-party provenance and redistribution terms have been reviewed.
