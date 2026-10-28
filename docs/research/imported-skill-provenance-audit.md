# Imported-skill provenance and redistribution audit

**Status: OPEN — do not treat this file as a license approval.**

This report tracks the 161 catalog entries with `origin: existing`. The generated catalog intentionally has no `source_path` for these records, so paths below are candidate repository copies discovered by matching skill directory names in the current Git tree. A matching local path or a nearby `LICENSE`/ `NOTICE` file does **not** prove the upstream origin, copyright holder, or that redistribution in the combined plugin is permitted.

## Findings

- Catalog entries marked `existing`: **161**.
- Entries with at least one non-bundle candidate `SKILL.md`: **155**.
- Entries with no non-bundle candidate source found: **6**.
- Names with multiple candidate source paths: **6**.
- All rows remain **Pending** until a reviewer confirms upstream URL/revision, author/copyright, applicable license, required notices/attribution, and redistribution compatibility.

## Required review per row

1. Identify the original upstream repository and immutable revision, not just the current local copy.
2. Read the actual upstream license and any per-directory/per-file notices.
3. Confirm the source license permits redistribution and any modifications/aggregation made here.
4. Preserve required copyright, attribution, NOTICE, and license text.
5. Record reviewer, evidence URL/revision, decision, and any remediation before changing status from Pending.
6. For bundle-only entries or duplicate candidate paths, identify the intended canonical source and document why alternate copies are retained or excluded.

The repository's plugin README already says to keep the repository private until third-party provenance and redistribution terms have been reviewed. Keep that restriction in place until this audit and any other third-party material have been cleared.

## Inventory

| Catalog skill | Candidate source path(s) in this tree | Nearest license/notice candidate(s) | Review status |
|---|---|---|---|
| `adversarially-validating-game-repairs` | gameplay-debugging-toolkit/skills/adversarially-validating-game-repairs/SKILL.md | gameplay-debugging-toolkit/LICENSE | Pending |
| `agent-development` | plugin-dev/skills/agent-development/SKILL.md | plugin-dev/LICENSE | Pending |
| `application-observability` | .agents/skills/application-observability/SKILL.md | LICENSE | Pending |
| `arcadifying-mini-games` | retro-arcade-game-finisher/skills/arcadifying-mini-games/SKILL.md | retro-arcade-game-finisher/LICENSE | Pending |
| `async-concurrency-patterns` | .agents/skills/async-concurrency-patterns/SKILL.md | LICENSE | Pending |
| `auditing-game-screen-readability` | one-button-game-builder/skills/auditing-game-screen-readability/SKILL.md | one-button-game-builder/LICENSE | Pending |
| `auditing-gameplay-implementation-coverage` | gameplay-debugging-toolkit/skills/auditing-gameplay-implementation-coverage/SKILL.md | gameplay-debugging-toolkit/LICENSE | Pending |
| `build-mcp-app` | mcp-server-dev/skills/build-mcp-app/SKILL.md | mcp-server-dev/LICENSE | Pending |
| `build-mcp-server` | mcp-server-dev/skills/build-mcp-server/SKILL.md | mcp-server-dev/LICENSE | Pending |
| `build-mcpb` | mcp-server-dev/skills/build-mcpb/SKILL.md | mcp-server-dev/LICENSE | Pending |
| `building-era-authentic-game-audio` | retro-arcade-game-finisher/skills/building-era-authentic-game-audio/SKILL.md | retro-arcade-game-finisher/LICENSE | Pending |
| `cardputer-buddy` | cwc-makers/skills/cardputer-buddy/SKILL.md | cwc-makers/LICENSE | Pending |
| `claude-automation-recommender` | claude-code-setup/skills/claude-automation-recommender/SKILL.md | claude-code-setup/LICENSE | Pending |
| `claude-security` | claude-security/skills/claude-security/SKILL.md | claude-security/LICENSE<br>claude-security/NOTICE.md | Pending |
| `command-development` | plugin-dev/skills/command-development/SKILL.md | plugin-dev/LICENSE | Pending |
| `configuration-and-secret-management` | .agents/skills/configuration-and-secret-management/SKILL.md | LICENSE | Pending |
| `continuous-integration-pipeline-design` | .agents/skills/continuous-integration-pipeline-design/SKILL.md | LICENSE | Pending |
| `creating-godot-procedural-audio` | godot-mini-game-builder/skills/creating-godot-procedural-audio/SKILL.md | godot-mini-game-builder/LICENSE | Pending |
| `critiquing-own-response` | agent-workflow-engineering/skills/critiquing-own-response/SKILL.md | agent-workflow-engineering/LICENSE | Pending |
| `curating-game-concept-portfolio` | game-concept-workbench/skills/curating-game-concept-portfolio/SKILL.md | game-concept-workbench/LICENSE | Pending |
| `debugging-with-minimal-reproduction` | .agents/skills/debugging-with-minimal-reproduction/SKILL.md | LICENSE | Pending |
| `dependency-injection-patterns` | .agents/skills/dependency-injection-patterns/SKILL.md | LICENSE | Pending |
| `designing-game-combat-resolution` | .agents/skills/designing-game-combat-resolution/SKILL.md | LICENSE | Pending |
| `designing-game-progression` | .agents/skills/designing-game-progression/SKILL.md | LICENSE | Pending |
| `designing-mini-games` | godot-mini-game-builder/skills/designing-mini-games/SKILL.md<br>one-button-game-builder/skills/designing-mini-games/SKILL.md | godot-mini-game-builder/LICENSE<br>one-button-game-builder/LICENSE | Pending |
| `designing-minimal-game-rules` | one-button-game-builder/skills/designing-minimal-game-rules/SKILL.md | one-button-game-builder/LICENSE | Pending |
| `designing-quest-objective-dependencies` | .agents/skills/designing-quest-objective-dependencies/SKILL.md | LICENSE | Pending |
| `designing-retro-arcade-sound-kits` | retro-arcade-game-finisher/skills/designing-retro-arcade-sound-kits/SKILL.md | retro-arcade-game-finisher/LICENSE | Pending |
| `designing-stable-api-contracts` | .agents/skills/designing-stable-api-contracts/SKILL.md | LICENSE | Pending |
| `developing-with-crisp-game-lib` | web-mini-game-kit/skills/developing-with-crisp-game-lib/SKILL.md | web-mini-game-kit/LICENSE | Pending |
| `directing-game-visuals` | one-button-game-builder/skills/directing-game-visuals/SKILL.md | one-button-game-builder/LICENSE | Pending |
| `discord-access` | No non-bundle SKILL.md found | LICENSE (repo root; applicability unverified) | Pending |
| `discord-configure` | No non-bundle SKILL.md found | LICENSE (repo root; applicability unverified) | Pending |
| `dispatching-agent-work` | agent-workflow-engineering/skills/dispatching-agent-work/SKILL.md | agent-workflow-engineering/LICENSE | Pending |
| `evaluating-gameplay-balance` | one-button-game-builder/skills/evaluating-gameplay-balance/SKILL.md | one-button-game-builder/LICENSE | Pending |
| `example-command` | example-plugin/skills/example-command/SKILL.md | example-plugin/LICENSE | Pending |
| `example-skill` | example-plugin/skills/example-skill/SKILL.md | example-plugin/LICENSE | Pending |
| `exploring-game-design-space` | game-concept-workbench/skills/exploring-game-design-space/SKILL.md | game-concept-workbench/LICENSE | Pending |
| `extracting-agent-skills` | agent-workflow-engineering/skills/extracting-agent-skills/SKILL.md | agent-workflow-engineering/LICENSE | Pending |
| `extracting-spec-design-ladders` | agent-workflow-engineering/skills/extracting-spec-design-ladders/SKILL.md | agent-workflow-engineering/LICENSE | Pending |
| `frontend-design` | frontend-design/skills/frontend-design/SKILL.md | frontend-design/LICENSE | Pending |
| `gating-by-blind-restoration` | agent-workflow-engineering/skills/gating-by-blind-restoration/SKILL.md | agent-workflow-engineering/LICENSE | Pending |
| `gating-expensive-batch-work` | agent-workflow-engineering/skills/gating-expensive-batch-work/SKILL.md | agent-workflow-engineering/LICENSE | Pending |
| `gating-intent-legibility` | one-button-game-builder/skills/gating-intent-legibility/SKILL.md | one-button-game-builder/LICENSE | Pending |
| `generating-dot-assets` | retro-arcade-game-finisher/skills/generating-dot-assets/SKILL.md | retro-arcade-game-finisher/LICENSE | Pending |
| `generating-retro-arcade-concepts` | retro-arcade-game-finisher/skills/generating-retro-arcade-concepts/SKILL.md | retro-arcade-game-finisher/LICENSE | Pending |
| `generating-semantic-game-mutants` | agent-workflow-engineering/skills/generating-semantic-game-mutants/SKILL.md | agent-workflow-engineering/LICENSE | Pending |
| `git-branching-and-change-management` | .agents/skills/git-branching-and-change-management/SKILL.md | LICENSE | Pending |
| `godot-game-dev` | plugins/godot/skills/godot-game-dev/SKILL.md | LICENSE | Pending |
| `hook-development` | plugin-dev/skills/hook-development/SKILL.md | plugin-dev/LICENSE | Pending |
| `imessage-access` | No non-bundle SKILL.md found | LICENSE (repo root; applicability unverified) | Pending |
| `imessage-configure` | No non-bundle SKILL.md found | LICENSE (repo root; applicability unverified) | Pending |
| `implementing-game-ai-state-machines` | .agents/skills/implementing-game-ai-state-machines/SKILL.md | LICENSE | Pending |
| `implementing-gameplay-invariants` | gameplay-debugging-toolkit/skills/implementing-gameplay-invariants/SKILL.md<br>one-button-game-builder/skills/implementing-gameplay-invariants/SKILL.md | gameplay-debugging-toolkit/LICENSE<br>one-button-game-builder/LICENSE | Pending |
| `implementing-incremental-code-changes` | .agents/skills/implementing-incremental-code-changes/SKILL.md | LICENSE | Pending |
| `localizing-game-state-divergence` | gameplay-debugging-toolkit/skills/localizing-game-state-divergence/SKILL.md | gameplay-debugging-toolkit/LICENSE | Pending |
| `m5-onboard` | cwc-makers/skills/m5-onboard/SKILL.md | cwc-makers/LICENSE | Pending |
| `math-olympiad` | math-olympiad/skills/math-olympiad/SKILL.md | math-olympiad/LICENSE | Pending |
| `maximizing-game-feel` | one-button-game-builder/skills/maximizing-game-feel/SKILL.md | one-button-game-builder/LICENSE | Pending |
| `mcp-integration` | plugin-dev/skills/mcp-integration/SKILL.md | plugin-dev/LICENSE | Pending |
| `migrating-agents-md-to-control-flow` | agent-workflow-engineering/skills/migrating-agents-md-to-control-flow/SKILL.md | agent-workflow-engineering/LICENSE | Pending |
| `modular-software-architecture` | .agents/skills/modular-software-architecture/SKILL.md | LICENSE | Pending |
| `playground` | playground/skills/playground/SKILL.md | playground/LICENSE | Pending |
| `plugin-settings` | plugin-dev/skills/plugin-settings/SKILL.md | plugin-dev/LICENSE | Pending |
| `plugin-structure` | plugin-dev/skills/plugin-structure/SKILL.md | plugin-dev/LICENSE | Pending |
| `probing-web-game-mechanics` | web-mini-game-kit/skills/probing-web-game-mechanics/SKILL.md | web-mini-game-kit/LICENSE | Pending |
| `project-artifact` | project-artifact/skills/project-artifact/SKILL.md | project-artifact/LICENSE | Pending |
| `race-condition-detection` | .agents/skills/race-condition-detection/SKILL.md | LICENSE | Pending |
| `rea-android-apk-triage` | REA-50-Skills-Claude-Code/skills/rea-android-apk-triage/SKILL.md | LICENSE | Pending |
| `rea-android-method-analysis` | REA-50-Skills-Claude-Code/skills/rea-android-method-analysis/SKILL.md | LICENSE | Pending |
| `rea-android-resource-analysis` | REA-50-Skills-Claude-Code/skills/rea-android-resource-analysis/SKILL.md | LICENSE | Pending |
| `rea-app-version-diff` | REA-50-Skills-Claude-Code/skills/rea-app-version-diff/SKILL.md | LICENSE | Pending |
| `rea-assembly-pseudocode-check` | REA-50-Skills-Claude-Code/skills/rea-assembly-pseudocode-check/SKILL.md | LICENSE | Pending |
| `rea-browser-capture-compare` | REA-50-Skills-Claude-Code/skills/rea-browser-capture-compare/SKILL.md | LICENSE | Pending |
| `rea-browser-passive-observation` | REA-50-Skills-Claude-Code/skills/rea-browser-passive-observation/SKILL.md | LICENSE | Pending |
| `rea-browser-scenario-capture` | REA-50-Skills-Claude-Code/skills/rea-browser-scenario-capture/SKILL.md | LICENSE | Pending |
| `rea-changelog-update` | rea-agent-skills-pack (1)/rea-agent-skills-pack/skills/rea-changelog-update/SKILL.md<br>rea-agent-skills-pack/rea-agent-skills-pack/skills/rea-changelog-update/SKILL.md | LICENSE | Pending |
| `rea-ci-tests-audit` | rea-agent-skills-pack (1)/rea-agent-skills-pack/skills/rea-ci-tests-audit/SKILL.md<br>rea-agent-skills-pack/rea-agent-skills-pack/skills/rea-ci-tests-audit/SKILL.md | LICENSE | Pending |
| `rea-crash-core-analysis` | REA-50-Skills-Claude-Code/skills/rea-crash-core-analysis/SKILL.md | LICENSE | Pending |
| `rea-dos-ghidra-analysis` | REA-50-Skills-Claude-Code/skills/rea-dos-ghidra-analysis/SKILL.md | LICENSE | Pending |
| `rea-dotnet-assembly-analysis` | REA-50-Skills-Claude-Code/skills/rea-dotnet-assembly-analysis/SKILL.md | LICENSE | Pending |
| `rea-electron-ipc` | REA-50-Skills-Claude-Code/skills/rea-electron-ipc/SKILL.md | LICENSE | Pending |
| `rea-electron-native-addons` | REA-50-Skills-Claude-Code/skills/rea-electron-native-addons/SKILL.md | LICENSE | Pending |
| `rea-elf-layout-audit` | REA-50-Skills-Claude-Code/skills/rea-elf-layout-audit/SKILL.md | LICENSE | Pending |
| `rea-engine-architecture-learning` | REA-50-Skills-Claude-Code/skills/rea-engine-architecture-learning/SKILL.md | LICENSE | Pending |
| `rea-evm-bytecode-inspection` | REA-50-Skills-Claude-Code/skills/rea-evm-bytecode-inspection/SKILL.md | LICENSE | Pending |
| `rea-feature-trace` | REA-50-Skills-Claude-Code/skills/rea-feature-trace/SKILL.md | LICENSE | Pending |
| `rea-firmware-analysis` | REA-50-Skills-Claude-Code/skills/rea-firmware-analysis/SKILL.md | LICENSE | Pending |
| `rea-flutter-apk-inventory` | REA-50-Skills-Claude-Code/skills/rea-flutter-apk-inventory/SKILL.md | LICENSE | Pending |
| `rea-ghidra-provider-workflow` | REA-50-Skills-Claude-Code/skills/rea-ghidra-provider-workflow/SKILL.md | LICENSE | Pending |
| `rea-har-network-analysis` | REA-50-Skills-Claude-Code/skills/rea-har-network-analysis/SKILL.md | LICENSE | Pending |
| `rea-ida-provider-workflow` | REA-50-Skills-Claude-Code/skills/rea-ida-provider-workflow/SKILL.md | LICENSE | Pending |
| `rea-js-app-map` | REA-50-Skills-Claude-Code/skills/rea-js-app-map/SKILL.md | LICENSE | Pending |
| `rea-js-bundle-reconstruction` | REA-50-Skills-Claude-Code/skills/rea-js-bundle-reconstruction/SKILL.md | LICENSE | Pending |
| `rea-js-export-shapes` | REA-50-Skills-Claude-Code/skills/rea-js-export-shapes/SKILL.md | LICENSE | Pending |
| `rea-js-module-graph` | REA-50-Skills-Claude-Code/skills/rea-js-module-graph/SKILL.md | LICENSE | Pending |
| `rea-large-binary-investigation` | REA-50-Skills-Claude-Code/skills/rea-large-binary-investigation/SKILL.md | LICENSE | Pending |
| `rea-native-abi-analysis` | REA-50-Skills-Claude-Code/skills/rea-native-abi-analysis/SKILL.md | LICENSE | Pending |
| `rea-native-binary-triage` | REA-50-Skills-Claude-Code/skills/rea-native-binary-triage/SKILL.md | LICENSE | Pending |
| `rea-native-call-graph` | REA-50-Skills-Claude-Code/skills/rea-native-call-graph/SKILL.md | LICENSE | Pending |
| `rea-native-function-analysis` | REA-50-Skills-Claude-Code/skills/rea-native-function-analysis/SKILL.md | LICENSE | Pending |
| `rea-native-function-reconstruction` | REA-50-Skills-Claude-Code/skills/rea-native-function-reconstruction/SKILL.md | LICENSE | Pending |
| `rea-native-string-analysis` | REA-50-Skills-Claude-Code/skills/rea-native-string-analysis/SKILL.md | LICENSE | Pending |
| `rea-native-xref-tracing` | REA-50-Skills-Claude-Code/skills/rea-native-xref-tracing/SKILL.md | LICENSE | Pending |
| `rea-packet-field-discovery` | REA-50-Skills-Claude-Code/skills/rea-packet-field-discovery/SKILL.md | LICENSE | Pending |
| `rea-pcap-summary-analysis` | REA-50-Skills-Claude-Code/skills/rea-pcap-summary-analysis/SKILL.md | LICENSE | Pending |
| `rea-pe-resource-analysis` | REA-50-Skills-Claude-Code/skills/rea-pe-resource-analysis/SKILL.md | LICENSE | Pending |
| `rea-rust-artifact-source-compare` | REA-50-Skills-Claude-Code/skills/rea-rust-artifact-source-compare/SKILL.md | LICENSE | Pending |
| `rea-rust-binary-inventory` | REA-50-Skills-Claude-Code/skills/rea-rust-binary-inventory/SKILL.md | LICENSE | Pending |
| `rea-rust-dependency-audit` | REA-50-Skills-Claude-Code/skills/rea-rust-dependency-audit/SKILL.md | LICENSE | Pending |
| `rea-rust-dependency-graph` | REA-50-Skills-Claude-Code/skills/rea-rust-dependency-graph/SKILL.md | LICENSE | Pending |
| `rea-rust-runtime-boundary` | REA-50-Skills-Claude-Code/skills/rea-rust-runtime-boundary/SKILL.md | LICENSE | Pending |
| `rea-saz-traffic-analysis` | REA-50-Skills-Claude-Code/skills/rea-saz-traffic-analysis/SKILL.md | LICENSE | Pending |
| `rea-source-map-provenance` | REA-50-Skills-Claude-Code/skills/rea-source-map-provenance/SKILL.md | LICENSE | Pending |
| `rea-sqlite-schema-analysis` | REA-50-Skills-Claude-Code/skills/rea-sqlite-schema-analysis/SKILL.md | LICENSE | Pending |
| `rea-task-triage` | REA-50-Skills-Claude-Code/skills/rea-task-triage/SKILL.md | LICENSE | Pending |
| `rea-tool-design` | rea-agent-skills-pack (1)/rea-agent-skills-pack/skills/rea-tool-design/SKILL.md<br>rea-agent-skills-pack/rea-agent-skills-pack/skills/rea-tool-design/SKILL.md | LICENSE | Pending |
| `rea-wasm-js-boundary` | REA-50-Skills-Claude-Code/skills/rea-wasm-js-boundary/SKILL.md | LICENSE | Pending |
| `rea-wasm-module-analysis` | REA-50-Skills-Claude-Code/skills/rea-wasm-module-analysis/SKILL.md | LICENSE | Pending |
| `rea-web-feature-tracing` | REA-50-Skills-Claude-Code/skills/rea-web-feature-tracing/SKILL.md | LICENSE | Pending |
| `rea-windows-binary-inspection` | REA-50-Skills-Claude-Code/skills/rea-windows-binary-inspection/SKILL.md | LICENSE | Pending |
| `receipts` | receipts/skills/receipts/SKILL.md | receipts/LICENSE | Pending |
| `refactoring-with-characterization-tests` | .agents/skills/refactoring-with-characterization-tests/SKILL.md | LICENSE | Pending |
| `refining-game-prototypes` | one-button-game-builder/skills/refining-game-prototypes/SKILL.md | one-button-game-builder/LICENSE | Pending |
| `refining-workflows-from-artifacts` | agent-workflow-engineering/skills/refining-workflows-from-artifacts/SKILL.md | agent-workflow-engineering/LICENSE | Pending |
| `relational-database-schema-design` | .agents/skills/relational-database-schema-design/SKILL.md | LICENSE | Pending |
| `release-versioning-and-changelog` | .agents/skills/release-versioning-and-changelog/SKILL.md | LICENSE | Pending |
| `reliable-error-handling` | .agents/skills/reliable-error-handling/SKILL.md | LICENSE | Pending |
| `resolving-merge-conflicts-safely` | .agents/skills/resolving-merge-conflicts-safely/SKILL.md | LICENSE | Pending |
| `reverse-engineer-anything` | rea-agent-skills-pack (1)/rea-agent-skills-pack/skills/reverse-engineer-anything/SKILL.md<br>rea-agent-skills-pack/rea-agent-skills-pack/skills/reverse-engineer-anything/SKILL.md | LICENSE | Pending |
| `running-headless-godot` | godot-mini-game-builder/skills/running-headless-godot/SKILL.md | godot-mini-game-builder/LICENSE | Pending |
| `safe-database-migrations` | .agents/skills/safe-database-migrations/SKILL.md | LICENSE | Pending |
| `scaffolding-godot-mini-games` | godot-mini-game-builder/skills/scaffolding-godot-mini-games/SKILL.md | godot-mini-game-builder/LICENSE | Pending |
| `scoping-playable-prototypes` | .agents/skills/scoping-playable-prototypes/SKILL.md | LICENSE | Pending |
| `secure-coding-practices` | .agents/skills/secure-coding-practices/SKILL.md | LICENSE | Pending |
| `session-report` | session-report/skills/session-report/SKILL.md | session-report/LICENSE | Pending |
| `siege` | math-proof/skills/siege/SKILL.md | math-proof/LICENSE | Pending |
| `skill-creator` | skill-creator/skills/skill-creator/SKILL.md | skill-creator/LICENSE | Pending |
| `skill-development` | plugin-dev/skills/skill-development/SKILL.md | plugin-dev/LICENSE | Pending |
| `smoke-testing-web-games` | web-mini-game-kit/skills/smoke-testing-web-games/SKILL.md | web-mini-game-kit/LICENSE | Pending |
| `solid-design-principles` | .agents/skills/solid-design-principles/SKILL.md | LICENSE | Pending |
| `solo` | math-proof/skills/solo/SKILL.md | math-proof/LICENSE | Pending |
| `sql-query-performance` | .agents/skills/sql-query-performance/SKILL.md | LICENSE | Pending |
| `static-analysis-and-linting` | .agents/skills/static-analysis-and-linting/SKILL.md | LICENSE | Pending |
| `stress-testing-game-concepts` | game-concept-workbench/skills/stress-testing-game-concepts/SKILL.md | game-concept-workbench/LICENSE | Pending |
| `structuring-gameplay-playtests` | .agents/skills/structuring-gameplay-playtests/SKILL.md | LICENSE | Pending |
| `styling-web-game-typography` | web-mini-game-kit/skills/styling-web-game-typography/SKILL.md | web-mini-game-kit/LICENSE | Pending |
| `systematic-code-review` | .agents/skills/systematic-code-review/SKILL.md | LICENSE | Pending |
| `telegram-access` | No non-bundle SKILL.md found | LICENSE (repo root; applicability unverified) | Pending |
| `telegram-configure` | No non-bundle SKILL.md found | LICENSE (repo root; applicability unverified) | Pending |
| `testing-procedural-gameplay-encounters` | .agents/skills/testing-procedural-gameplay-encounters/SKILL.md | LICENSE | Pending |
| `unit-testing-strategy` | .agents/skills/unit-testing-strategy/SKILL.md | LICENSE | Pending |
| `unity-game-dev` | plugins/unity/skills/unity-game-dev/SKILL.md | LICENSE | Pending |
| `unreal-game-dev` | plugins/unreal/skills/unreal-game-dev/SKILL.md | LICENSE | Pending |
| `validating-game-core-loops` | .agents/skills/validating-game-core-loops/SKILL.md | LICENSE | Pending |
| `validating-game-economy-loops` | .agents/skills/validating-game-economy-loops/SKILL.md | LICENSE | Pending |
| `validating-game-movement-feel` | .agents/skills/validating-game-movement-feel/SKILL.md | LICENSE | Pending |
| `validating-game-narrative-localization` | .agents/skills/validating-game-narrative-localization/SKILL.md | LICENSE | Pending |
| `validating-multiplayer-session-lifecycle` | .agents/skills/validating-multiplayer-session-lifecycle/SKILL.md | LICENSE | Pending |
| `verifying-turn-based-games` | gameplay-debugging-toolkit/skills/verifying-turn-based-games/SKILL.md | gameplay-debugging-toolkit/LICENSE | Pending |
| `writing-rules` | hookify/skills/writing-rules/SKILL.md | hookify/LICENSE | Pending |

## High-priority finding requiring a decision

The local `claude-security/LICENSE` states that the plugin is proprietary to Anthropic and grants a limited, revocable, non-transferable and **non-sublicensable** license for internal use solely with Claude Code or other Anthropic products/services. The same directory contains a third-party `NOTICE.md`.

This is not an automatic legal determination about every use, but it is a **distribution blocker until reviewed**: do not publish or redistribute the combined plugin with this component unless the applicable terms clearly permit the intended use or written authorization is obtained. A reviewer should decide whether to exclude this component from the generated bundle, keep the package private and limited to permitted internal use, or obtain permission. Preserve its license and notice during any decision; do not replace them with the repository-wide Apache license.

The imported row for `claude-security` remains Pending.

## Content-path parity check

A Git-tree SHA comparison found that all **155** imported entries with a non-bundle candidate `SKILL.md` have a byte-identical plugin bundle copy. The six names with multiple candidate paths also have matching hashes across all their candidate copies. The remaining six entries are bundle-only and still need their original source/revision identified. This verifies local copy parity, **not** upstream authorship or redistribution permission.
