# All Skills Collection — Claude Code Plugin

A generated plugin containing **126 distinct skills** from this repository and preserving skill-local supporting files. Add new skills to the repository's source directories, then regenerate this payload; do not edit generated skill copies by hand.

## Install

In Claude Code:

```text
/plugin marketplace add Lucas-Belucci-Bellini/All-Skills-for-the-claude-code
/plugin install all-skills-collection@all-skills-for-the-claude-code
```

The repository is private, so the installing GitHub/Claude Code identity must have access.

## Included

REA and reverse engineering; game design, Godot, Unity, Unreal and web games; gameplay testing; Claude Code plugin/agent/hook/command development; MCP server/app development; security; frontend design; mathematics; hardware onboarding; and messaging integration skills. Skill-local references, scripts, assets, templates, examples, and applicable license files are preserved.

## Update after a new batch

From the repository root, run:

```bash
node tools/sync-skill-bundles.mjs --write
node tools/sync-skill-bundles.mjs --check
```

The sync script deduplicates identical subtrees, namespaces genuine name collisions, preserves executable modes, updates the unified plugin's version/catalog entry, and refuses an empty collection. Review and validate the diff on a feature branch and PR; the script does not merge or publish.

Use the separate **Skill Library Maintainer** plugin for the maintenance workflow.

## Limits and provenance

This bundle includes skill entrypoints and files local to each skill. It does not automatically include every upstream plugin's agents, slash commands, hooks, MCP server implementation, or runtime dependencies. Keep the repo private until the third-party licensing/provenance audit is complete.
