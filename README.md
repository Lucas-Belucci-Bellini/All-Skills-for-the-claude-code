# All Skills for Claude Code — Community Collection

This is an independent, community-maintained collection of Claude Code skills and plugins. It is **not affiliated with or endorsed by Anthropic**. The generated aggregate plugin currently packages 2,205 distinct skills (2,044 authored + 161 retained/imported), and component provenance and license terms vary.

> **Distribution warning:** this repository is currently public, and the imported-skill provenance/licensing audit is not complete. In particular, `claude-security` carries a restrictive, non-sublicensable license. Do not publish or redistribute the combined plugin until the applicable terms are reviewed and the repository owner has resolved the visibility/distribution decision. See [the imported-skill provenance audit](docs/research/imported-skill-provenance-audit.md).

## Repository structure

- `curated-skill-sources/` — canonical source files for newly authored skills.
- `plugins/all-skills-collection/` — generated aggregate plugin; do not edit its skill copies by hand.
- `plugins/` — plugin packages in this collection, including imported and community-maintained components. Check each component's README, LICENSE, and NOTICE.
- `external_plugins/` — upstream plugin sources and supporting files; their own license and provenance notices remain applicable.
- `roadmap/skill-batches/` — planning folders for future skill batches; these folders are not counted as completed skills.

## Validate and test locally

From a clone of this repository, with a current Claude Code CLI:

```bash
claude plugin validate . --strict
claude plugin validate ./plugins/all-skills-collection --strict
```

For a disposable local installation test, add this checkout as a marketplace and install the aggregate plugin:

```text
/plugin marketplace add /absolute/path/to/All-Skills-for-the-claude-code
/plugin install all-skills-collection@all-skills-for-the-claude-code
```

The installation/discovery smoke test is documented in [docs/research/plugin-install-smoke-test.md](docs/research/plugin-install-smoke-test.md). Passing repository CI does not substitute for running the real Claude Code validator and installation test.

## Contributing

- Add new authored skills under `curated-skill-sources/`; do not hand-edit the generated plugin copies.
- Run `node tools/sync-skill-bundles.mjs --write`, inspect the diff, then run `node tools/sync-skill-bundles.mjs --check`.
- Validate the active batch with its manifest and keep changes on a feature branch with a pull request.
- For imported components, record the upstream repository/revision, preserve required LICENSE/NOTICE/attribution, and verify redistribution terms before adding or publishing them.

## Plugin Structure

Each plugin follows a standard structure:

```
plugin-name/
├── .claude-plugin/
│   └── plugin.json      # Plugin metadata (required)
├── .mcp.json            # MCP server configuration (optional)
├── commands/            # Slash commands (optional)
├── agents/              # Agent definitions (optional)
├── skills/              # Skill definitions (optional)
└── README.md            # Documentation
```

## Plugin names are immutable

The `name` field in a marketplace entry is an **immutable slug**. Once a plugin has been published, its `name` must not change — users have it installed under that slug, and renaming it breaks their install with a `plugin-not-found` error.

- To change how a plugin is labeled in the UI, set or update `displayName` instead.
- If a rename is genuinely unavoidable, add an entry to the top-level `renames` map in `.claude-plugin/marketplace.json` so existing installs auto-migrate:

```json
"renames": {
  "old-name": "new-name"
}
```

The Claude Code plugin loader reads this map and transparently rewrites the old slug to the new one on the user's next sync.

## Skill-bundle plugins

When a plugin's source repository ships skills (`SKILL.md` files) without a `.claude-plugin/plugin.json` manifest, the marketplace entry can declare the skills directly using `strict: false` and an explicit `skills` array.

```json
{
  "name": "example-bundle",
  "description": "Brief description of the bundled skills.",
  "author": { "name": "Author Name" },
  "category": "development",
  "source": {
    "source": "git-subdir",
    "url": "https://github.com/example-org/sdk.git",
    "path": "packages/agent-skills",
    "ref": "main",
    "sha": "<commit sha>"
  },
  "strict": false,
  "skills": [
    "./skill-a",
    "./skill-b",
    "./skill-c"
  ],
  "homepage": "https://github.com/example-org/sdk"
}
```

Each path in `skills` is relative to `source.path` and points at a directory containing a `SKILL.md`. Paths can reach deeper than a single level — for example, `["./libA/skill-1", "./libB/skill-2"]` exposes a curated subset across multiple library subdirectories. Each skill is registered as `<plugin-name>:<skill-name>` in Claude Code.

For the underlying schema, see [Strict mode](https://code.claude.com/docs/en/plugin-marketplaces) in the marketplace documentation.

## License

Please see each linked plugin for the relevant LICENSE file.

## Documentation

For more information on developing Claude Code plugins, see the [official documentation](https://code.claude.com/docs/en/plugins).


## Unified Skills Library (Lucas's collection)

This repository also maintains a unified Claude Code plugin that gathers distinct skill sources while preserving each skill's supporting files.

- [All Skills Collection plugin](plugins/all-skills-collection/README.md)
- [Skill Library Maintainer plugin](plugins/skill-library-maintainer/README.md)
- [Source refresh script](tools/sync-skill-bundles.mjs)

After adding a new skill batch, run `node tools/sync-skill-bundles.mjs --write`, review the diff, then validate with `node tools/sync-skill-bundles.mjs --check`. Updates should go through a feature branch and pull request. Keep this repository private until all source license and provenance terms have been reviewed.

The combined collection currently packages 2276 distinct skills. Use SKILL_LIBRARY_CATALOG.md for the inventory and SKILL_GROWTH_ROADMAP.md for the long-term plan to reach 2,500 distinct skills (with 500 as the 2026 intermediate milestone). See also the [beginner guide to setting up MCP in Claude Code (PT-BR)](docs/guides/como-configurar-mcp-no-claude-code.md).

The `feat/skills-expansion-2000-simulation-worlds-2026` branch is a historical source milestone, not the current consolidation head. The current consolidation is tracked by [PR #169](https://github.com/Lucas-Belucci-Bellini/All-Skills-for-the-claude-code/pull/169) on `feat/all-skills-consolidated-2026`: the generated catalog lists 2,085 distinct skills (1,924 authored + 161 retained/imported), with 415 remaining to the 2,500 planning target. Structural CI is green, but PR #169 remains Draft while imported-skill provenance/licensing and real Claude Code install/discovery checks are pending. This status is not approval to merge or publicly distribute the package. See [roadmap issue #39](https://github.com/Lucas-Belucci-Bellini/All-Skills-for-the-claude-code/issues/39).
