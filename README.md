# Claude Code Plugins Directory

A curated directory of high-quality plugins for Claude Code.

> **⚠️ Important:** Make sure you trust a plugin before installing, updating, or using it. Anthropic does not control what MCP servers, files, or other software are included in plugins and cannot verify that they will work as intended or that they won't change. See each plugin's homepage for more information.

## Structure

- **`/plugins`** - Internal plugins developed and maintained by Anthropic
- **`/external_plugins`** - Third-party plugins from partners and the community

## Installation

Plugins can be installed directly from this marketplace via Claude Code's plugin system.

To install, run `/plugin install {plugin-name}@claude-plugins-official`

or browse for the plugin in `/plugin > Discover`

## Contributing

### Internal Plugins

Internal plugins are developed by Anthropic team members. See `/plugins/example-plugin` for a reference implementation.

### External Plugins

Third-party partners can submit plugins for inclusion in the marketplace. External plugins must meet quality and security standards for approval. To submit a new plugin, use the [plugin directory submission form](https://clau.de/plugin-directory-submission).

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

The combined collection currently packages 1540 distinct skills according to the source-to-bundle sync on this branch. The count uses exact subtree de-duplication; it is not a claim that semantic review of every entry is complete. This PR adds 15 original repository-to-skill synthesis workflows and 10 read-only specialist agents, while planning a 25,000-skill portfolio and 150-role architecture. See the [repository-to-skill intake template](docs/templates/repository-to-skill-intake.md) and [25,000-skill roadmap](docs/roadmaps/REA_INSPIRED_25000_SKILLS_150_AGENTS.md). See the [25,000-skill roadmap](docs/roadmaps/REA_INSPIRED_25000_SKILLS_150_AGENTS.md) and [150-agent registry](docs/roadmaps/REA_INSPIRED_AGENT_REGISTRY_150.md); the older SKILL_GROWTH_ROADMAP.md records historical milestones. See also the [beginner guide to setting up MCP in Claude Code (PT-BR)](docs/guides/como-configurar-mcp-no-claude-code.md).

The current working milestone `feat/skills-expansion-1525-agent-orchestration-2026` contains a draft inventory of 1,525 distinct skills: the 1,500-skill ProjectE/multi-agent base plus 25 agent-orchestration runtime workflows covering run state, fan-out reconciliation, delegation boundaries, independent review, compensation, deadlines, and evidence. This remains a branch-level draft; it does not claim that production orchestration, broker services, or provider runtime integrations have been implemented. This is a branch-level draft, not a claim that the changes are merged to `main` or that broker/provider runtime integration has been completed. See [roadmap issue #39](https://github.com/Lucas-Belucci-Bellini/All-Skills-for-the-claude-code/issues/39), [ProjectE issue #26](https://github.com/Lucas-Belucci-Bellini/All-Skills-for-the-claude-code/issues/26), and [multi-agent issue #43](https://github.com/Lucas-Belucci-Bellini/All-Skills-for-the-claude-code/issues/43).

## Agent Orchestration Workbench

A separate Claude Code plugin provides six scoped subagents for multi-agent software workflows: architecture design, deterministic test engineering, independent runtime review, security auditing, incident triage, and evaluation design. See the [Agent Orchestration Workbench](plugins/agent-orchestration-workbench/README.md) for each agent's scope and validation steps.

The agents are permission-scoped: five are read-only, while only the test engineer can edit files and run local test commands. They do not implement or connect a production orchestration service, and they do not bypass Claude Code's host permissions.


## Artifact Analysis Workbench

An independent plugin proposes 10 scoped specialist agents and 15 original evidence-led workflows informed by public reverse-engineering capability areas in REA. It is not REA and does not bundle REA code or skill text. See the roadmap at docs/roadmaps/REA_INSPIRED_25000_SKILLS_150_AGENTS.md; review the Draft PR and CI before treating the plugin as available.


## General coding skills

These reusable workflows complement the engine and game-development skills:

- [implementing-incremental-code-changes](.agents/skills/implementing-incremental-code-changes/SKILL.md) — deliver small, reviewable changes with explicit scope and proportionate verification.
- [debugging-with-minimal-reproduction](.agents/skills/debugging-with-minimal-reproduction/SKILL.md) — isolate defects using reproducible evidence and falsifiable hypotheses.
- [refactoring-with-characterization-tests](.agents/skills/refactoring-with-characterization-tests/SKILL.md) — improve internal structure while protecting observable behavior.

- [unit-testing-strategy](.agents/skills/unit-testing-strategy/SKILL.md) — design deterministic tests around observable behavior and meaningful edge cases.
- [secure-coding-practices](.agents/skills/secure-coding-practices/SKILL.md) — apply safer defaults at input, identity, data, filesystem, and network boundaries.
- [systematic-code-review](.agents/skills/systematic-code-review/SKILL.md) — review diffs for consequential defects with evidence and actionable findings.
- [designing-stable-api-contracts](.agents/skills/designing-stable-api-contracts/SKILL.md) — specify predictable, secure, and evolvable service interfaces.

- [solid-design-principles](.agents/skills/solid-design-principles/SKILL.md) — apply SOLID pragmatically to real change pressures.
- [modular-software-architecture](.agents/skills/modular-software-architecture/SKILL.md) — define cohesive modules, explicit ownership, and dependency rules.
- [dependency-injection-patterns](.agents/skills/dependency-injection-patterns/SKILL.md) — wire dependencies and resource lifetimes explicitly.
- [relational-database-schema-design](.agents/skills/relational-database-schema-design/SKILL.md) — model relationships, constraints, and indexes from data requirements.
- [safe-database-migrations](.agents/skills/safe-database-migrations/SKILL.md) — roll out schema and data changes with compatibility and recovery plans.
- [sql-query-performance](.agents/skills/sql-query-performance/SKILL.md) — diagnose query plans and benchmark optimizations with evidence.
- [async-concurrency-patterns](.agents/skills/async-concurrency-patterns/SKILL.md) — bound async work and define cancellation, retries, and failures.
- [race-condition-detection](.agents/skills/race-condition-detection/SKILL.md) — reason about shared state and test unsafe interleavings.

- [git-branching-and-change-management](.agents/skills/git-branching-and-change-management/SKILL.md) — isolate changes, keep commits reviewable, and integrate deliberately.
- [resolving-merge-conflicts-safely](.agents/skills/resolving-merge-conflicts-safely/SKILL.md) — resolve conflicts by preserving intent and validating behavior.
- [continuous-integration-pipeline-design](.agents/skills/continuous-integration-pipeline-design/SKILL.md) — build trustworthy CI checks with least-privilege permissions.
- [static-analysis-and-linting](.agents/skills/static-analysis-and-linting/SKILL.md) — configure consistent static checks and manage warning baselines.
- [release-versioning-and-changelog](.agents/skills/release-versioning-and-changelog/SKILL.md) — prepare traceable releases and useful changelogs.
- [application-observability](.agents/skills/application-observability/SKILL.md) — instrument logs, metrics, traces, alerts, and health signals.
- [reliable-error-handling](.agents/skills/reliable-error-handling/SKILL.md) — define error contracts, bounded retries, and safe recovery.
- [configuration-and-secret-management](.agents/skills/configuration-and-secret-management/SKILL.md) — validate configuration and protect secrets across environments.
