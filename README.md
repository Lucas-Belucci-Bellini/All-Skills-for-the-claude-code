# All Skills for Claude Code — Community Collection

This is an independent, community-maintained collection of Claude Code skills and plugins. It is **not affiliated with or endorsed by Anthropic**. The combined collection currently packages 2511 distinct skills: 2511 original skills and zero retained/imported skills. The 161 retained/imported entries were removed and replaced with 161 newly authored language-engineering workflows covering all 31 languages in the public profile.

> **Distribution note:** the 161 retained/imported skill entries and their generated bundle copies have been removed. Third-party plugin packages and their non-skill components may still exist elsewhere in this repository; their LICENSE/NOTICE and provenance requirements remain applicable. This cleanup is not blanket legal approval for every plugin in the marketplace.

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

After adding a new skill batch, run `node tools/sync-skill-bundles.mjs --write`, review the diff, then validate with `node tools/sync-skill-bundles.mjs --check`. Updates should go through a feature branch and pull request. Review source licenses and provenance before redistributing any third-party component.

The combined collection currently packages 2,501 distinct skills. Use SKILL_LIBRARY_CATALOG.md for the inventory and SKILL_GROWTH_ROADMAP.md for the long-term expansion plan beyond this completed milestone. See also the [beginner guide to setting up MCP in Claude Code (PT-BR)](docs/guides/como-configurar-mcp-no-claude-code.md).

The current catalog contains 2,501 distinct skills: 2,501 original authored skills and zero retained/imported skill entries. The 161 previously retained/imported entries were removed and replaced with original language-engineering workflows. This is a catalog count, not proof that every skill has been runtime-tested or cleared for redistribution. Third-party plugin packages and non-skill components retain their own license and NOTICE obligations; review those terms before redistribution. Strict Claude Code validation and a clean marketplace installation/discovery test should be treated as separate release checks and reported only when executed.
