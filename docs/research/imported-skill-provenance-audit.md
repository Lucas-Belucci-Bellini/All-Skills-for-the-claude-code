# Retained/imported skill removal record

**Status: COMPLETED IN THIS BRANCH — pending review, CI, and merge.**

On 2026-10-30, the 161 catalog entries previously marked `origin: existing` were removed from the canonical source directories and from the generated `all-skills-collection` bundle. Their skill-local supporting files were removed with them. The cleanup preserves unrelated package metadata and LICENSE/NOTICE files; it does not claim those remaining third-party packages are cleared for redistribution.

## Resulting inventory

- Before cleanup: 2,500 catalog entries (2,339 authored + 161 retained/imported).
- After cleanup: **2,339 entries, all marked `new-authored`**.
- Retained/imported skill entries remaining in catalog: **0**.
- Target remains 2,500 original skills; remaining to target: **161**.
- Removed source skill directories: 167 (including duplicate candidate copies).
- Removed source and generated bundle files: 832.
- Generated plugin version: 2.1.22.

## Scope and safeguards

- Deleted each of the 167 source skill directory candidates identified by the prior inventory, including duplicate candidate copies and all skill-local references, scripts, assets, and fixtures.
- Deleted all 161 corresponding generated bundle skill directories.
- Preserved root and package-level LICENSE/NOTICE files and unrelated plugin agents, commands, hooks, and runtime components. These are not skill entries and still require their own provenance/license review before redistribution.
- Kept all 2,339 authored canonical source entries.
- No repository visibility changes were made.
- This record does not claim the Claude Code strict validators or disposable marketplace installation test have passed.

## Removed catalog identities

- `agent-development`
- `build-mcp-app`
- `build-mcp-server`
- `build-mcpb`
- `claude-automation-recommender`
- `claude-security`
- `command-development`
- `critiquing-own-response`
- `dispatching-agent-work`
- `example-command`
- `example-skill`
- `extracting-agent-skills`
- `extracting-spec-design-ladders`
- `gating-by-blind-restoration`
- `gating-expensive-batch-work`
- `hook-development`
- `mcp-integration`
- `migrating-agents-md-to-control-flow`
- `plugin-settings`
- `plugin-structure`
- `project-artifact`
- `receipts`
- `refining-workflows-from-artifacts`
- `session-report`
- `skill-creator`
- `skill-development`
- `writing-rules`
- `designing-stable-api-contracts`
- `relational-database-schema-design`
- `safe-database-migrations`
- `adversarially-validating-game-repairs`
- `arcadifying-mini-games`
- `auditing-game-screen-readability`
- `auditing-gameplay-implementation-coverage`
- `curating-game-concept-portfolio`
- `designing-game-combat-resolution`
- `designing-game-progression`
- `designing-mini-games`
- `designing-minimal-game-rules`
- `developing-with-crisp-game-lib`
- `evaluating-gameplay-balance`
- `exploring-game-design-space`
- `gating-intent-legibility`
- `generating-retro-arcade-concepts`
- `generating-semantic-game-mutants`
- `godot-game-dev`
- `implementing-game-ai-state-machines`
- `implementing-gameplay-invariants`
- `localizing-game-state-divergence`
- `maximizing-game-feel`
- `playground`
- `probing-web-game-mechanics`
- `refining-game-prototypes`
- `running-headless-godot`
- `scaffolding-godot-mini-games`
- `scoping-playable-prototypes`
- `smoke-testing-web-games`
- `stress-testing-game-concepts`
- `structuring-gameplay-playtests`
- `testing-procedural-gameplay-encounters`
- `unity-game-dev`
- `unreal-game-dev`
- `validating-game-core-loops`
- `validating-game-economy-loops`
- `validating-game-movement-feel`
- `validating-game-narrative-localization`
- `verifying-turn-based-games`
- `application-observability`
- `async-concurrency-patterns`
- `configuration-and-secret-management`
- `continuous-integration-pipeline-design`
- `debugging-with-minimal-reproduction`
- `dependency-injection-patterns`
- `designing-quest-objective-dependencies`
- `git-branching-and-change-management`
- `implementing-incremental-code-changes`
- `modular-software-architecture`
- `race-condition-detection`
- `refactoring-with-characterization-tests`
- `release-versioning-and-changelog`
- `reliable-error-handling`
- `resolving-merge-conflicts-safely`
- `secure-coding-practices`
- `solid-design-principles`
- `sql-query-performance`
- `static-analysis-and-linting`
- `systematic-code-review`
- `unit-testing-strategy`
- `validating-multiplayer-session-lifecycle`
- `cardputer-buddy`
- `m5-onboard`
- `math-olympiad`
- `siege`
- `solo`
- `discord-access`
- `discord-configure`
- `imessage-access`
- `imessage-configure`
- `telegram-access`
- `telegram-configure`
- `rea-android-apk-triage`
- `rea-android-method-analysis`
- `rea-android-resource-analysis`
- `rea-app-version-diff`
- `rea-assembly-pseudocode-check`
- `rea-browser-capture-compare`
- `rea-browser-passive-observation`
- `rea-browser-scenario-capture`
- `rea-changelog-update`
- `rea-ci-tests-audit`
- `rea-crash-core-analysis`
- `rea-dos-ghidra-analysis`
- `rea-dotnet-assembly-analysis`
- `rea-electron-ipc`
- `rea-electron-native-addons`
- `rea-elf-layout-audit`
- `rea-engine-architecture-learning`
- `rea-evm-bytecode-inspection`
- `rea-feature-trace`
- `rea-firmware-analysis`
- `rea-flutter-apk-inventory`
- `rea-ghidra-provider-workflow`
- `rea-har-network-analysis`
- `rea-ida-provider-workflow`
- `rea-js-app-map`
- `rea-js-bundle-reconstruction`
- `rea-js-export-shapes`
- `rea-js-module-graph`
- `rea-large-binary-investigation`
- `rea-native-abi-analysis`
- `rea-native-binary-triage`
- `rea-native-call-graph`
- `rea-native-function-analysis`
- `rea-native-function-reconstruction`
- `rea-native-string-analysis`
- `rea-native-xref-tracing`
- `rea-packet-field-discovery`
- `rea-pcap-summary-analysis`
- `rea-pe-resource-analysis`
- `rea-rust-artifact-source-compare`
- `rea-rust-binary-inventory`
- `rea-rust-dependency-audit`
- `rea-rust-dependency-graph`
- `rea-rust-runtime-boundary`
- `rea-saz-traffic-analysis`
- `rea-source-map-provenance`
- `rea-sqlite-schema-analysis`
- `rea-task-triage`
- `rea-tool-design`
- `rea-wasm-js-boundary`
- `rea-wasm-module-analysis`
- `rea-web-feature-tracing`
- `rea-windows-binary-inspection`
- `reverse-engineer-anything`
- `building-era-authentic-game-audio`
- `creating-godot-procedural-audio`
- `designing-retro-arcade-sound-kits`
- `directing-game-visuals`
- `frontend-design`
- `generating-dot-assets`
- `styling-web-game-typography`

## Validation required before merge

1. Run `node tools/sync-skill-bundles.mjs --write` and inspect the resulting diff.
2. Run `node tools/sync-skill-bundles.mjs --check` and verify catalog/source/bundle parity.
3. Run both strict Claude Code plugin validations.
4. Install the marketplace in a disposable Claude Code environment and verify skill discovery.
5. Confirm no removed name or source directory remains in the catalog or generated bundle.
