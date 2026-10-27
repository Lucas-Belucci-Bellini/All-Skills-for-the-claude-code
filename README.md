# All Skills for Claude Code

English | [日本語](README.ja.md)

A personal, work-in-progress library of agent skills for Claude Code, maintained by [Lucas Belucci Bellini](https://github.com/Lucas-Belucci-Bellini). The skills grew out of my own game-development, Minecraft modpack, and software projects.

> **Not affiliated with Anthropic.** This is an independent project. It is not an official Anthropic repository, marketplace, or plugin directory. Some folders contain third-party material, credited below under its original license.

## Status

- The unified plugin currently packages 1499 distinct skills: 1,374 written for this library and 125 retained from third-party sources. See [SKILL_LIBRARY_CATALOG.md](SKILL_LIBRARY_CATALOG.md).
- Many of the newer skills were drafted with AI assistance from templates, and **a quality repair is in progress**. Some files still have template errors (for example, a literal `undefined` in trigger examples). These will be fixed, merged, or removed.
- Skill counts and milestone numbers in the issues and roadmap are **planning targets**, not claims that the work is finished or validated.

## Install

Add this repository as a marketplace in Claude Code, then install the plugin:

```
/plugin marketplace add Lucas-Belucci-Bellini/All-Skills-for-the-claude-code
/plugin install all-skills-collection@all-skills-for-the-claude-code
```

The marketplace is defined in [.claude-plugin/marketplace.json](.claude-plugin/marketplace.json) and offers two plugins:

| Plugin | Purpose |
| --- | --- |
| [`all-skills-collection`](plugins/all-skills-collection/README.md) | The unified, generated skill bundle |
| [`skill-library-maintainer`](plugins/skill-library-maintainer/README.md) | Commands to audit and regenerate the library |

Review a skill before relying on it. Skills are instructions for an agent and can suggest commands that change your system.

## Repository layout

| Path | What it is |
| --- | --- |
| `curated-skill-sources/<category>/<skill>/SKILL.md` | **Canonical source** for the skills written for this library |
| `plugins/all-skills-collection/skills/` | Generated copy that gets installed. Do not edit by hand. |
| `tools/sync-skill-bundles.mjs` | Regenerates the bundle, catalog, and roadmap from the sources |
| `tools/validate-skill-batch.mjs`, `tools/skill-batch-manifests/` | Batch validation |
| `SKILL_LIBRARY_CATALOG.{md,json}`, `SKILL_GROWTH_ROADMAP.md` | Generated inventory and roadmap |
| `docs/` | Guides and research notes |
| Other top-level folders | Third-party material (see below) |

## Maintaining the library

After changing a skill under `curated-skill-sources/`:

```
node tools/sync-skill-bundles.mjs --write
node tools/sync-skill-bundles.mjs --check
```

Review the diff, then open a pull request. The CI workflow ([.github/workflows/skill-sync-validation.yml](.github/workflows/skill-sync-validation.yml)) runs the same check.

## Third-party material and licenses

The [root LICENSE](LICENSE) (Apache-2.0) covers this repository's own content. **It does not relicense third-party material.** Each folder below keeps its upstream license file, which takes precedence.

| Folders | Origin | License |
| --- | --- | --- |
| `agent-sdk-dev`, `clangd-lsp`, `claude-code-setup`, `code-review`, `code-simplifier`, `commit-commands`, `csharp-lsp`, `cwc-makers`, `example-plugin`, `explanatory-output-style`, `feature-dev`, `frontend-design`, `gopls-lsp`, `hookify`, `jdtls-lsp`, `kotlin-lsp`, `learning-output-style`, `lua-lsp`, `math-olympiad`, `math-proof`, `mcp-server-dev`, `mcp-tunnels`, `php-lsp`, `playground`, `plugin-dev`, `pr-review-toolkit`, `project-artifact`, `pyright-lsp`, `ralph-loop`, `receipts`, `ruby-lsp`, `rust-analyzer-lsp`, `security-guidance`, `session-report`, `skill-creator`, `swift-lsp`, `typescript-lsp` | [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official) | Apache-2.0 |
| `asana`, `context7`, `discord`, `fakechat`, `imessage`, `telegram`, `external_plugins/` | [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official) (external plugins) | See each folder and its upstream |
| `agent-workflow-engineering`, `game-concept-workbench`, `gameplay-debugging-toolkit`, `godot-mini-game-builder`, `one-button-game-builder`, `retro-arcade-game-finisher`, `web-mini-game-kit` (and their `.json` files), `marketplace.json`, `schema.json`, `PLUGIN_RELEASE.md` | [abagames/agentic-gamedev-skills](https://github.com/abagames/agentic-gamedev-skills) | MIT, © abagames |
| `plugins/godot`, `plugins/unity`, `plugins/unreal`, `scripts/` | [IvanMurzak/ai-game-dev-plugin](https://github.com/IvanMurzak/ai-game-dev-plugin) | Apache-2.0 |
| `REA-50-Skills-Claude-Code`, `rea-agent-skills-pack` | Companion skills for [morluto/rea](https://github.com/morluto/rea) (independently written; see `REA-50-Skills-Claude-Code/NOTICE.txt`) | REA itself is MIT. The packs have no license file yet. |

Anthropic's `claude-security` plugin was included here by mistake. Its proprietary license does not permit redistribution, so it has been removed, and `tools/sync-skill-bundles.mjs` now excludes it from the bundle.

The generated bundle also copies some of these skills. See [plugins/all-skills-collection/ATTRIBUTION.md](plugins/all-skills-collection/ATTRIBUTION.md). A per-source license review is still pending.

Skills inspired by public projects (OSIRIS, AERIS-10/PLFM_RADAR, Flipper Zero firmware, and others) are original workflow writing. They do not copy upstream code, schematics, or assets. See [docs/research/](docs/research/).

## Responsible use

Some skills cover reverse engineering, radio hardware, firmware, or security testing. Use them only on systems and artifacts you own or are explicitly authorized to test.

## Contact

Open an issue in this repository.
