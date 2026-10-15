# Skill Library Catalog

Updated: 2026-10-15. The unified bundle contains 176 distinct skills.

## Inventory summary

- Existing/imported skills retained: **126**
- Original curated skills: **50**
- Current total: **176**
- Target by 2026-12-31: **500**
- Remaining: **324**

## Categories

### Agent workflows, Claude Code & MCP (27)

- agent-development
- build-mcp-app
- build-mcp-server
- build-mcpb
- claude-automation-recommender
- claude-security
- command-development
- critiquing-own-response
- dispatching-agent-work
- example-command
- example-skill
- extracting-agent-skills
- extracting-spec-design-ladders
- gating-by-blind-restoration
- gating-expensive-batch-work
- hook-development
- mcp-integration
- migrating-agents-md-to-control-flow
- plugin-settings
- plugin-structure
- project-artifact
- receipts
- refining-workflows-from-artifacts
- session-report
- skill-creator
- skill-development
- writing-rules

### Engine architecture & runtime (15)

- asset-pipeline-provenance — NEW
- cross-platform-engine-build-matrix — NEW
- deterministic-simulation-replay — NEW
- engine-architecture-adr — NEW
- engine-performance-benchmarking — NEW
- engine-plugin-boundaries — NEW
- game-mod-api-versioning — NEW
- physics-simulation-validation — NEW
- procedural-world-generation-pipeline — NEW
- rendering-abstraction-design — NEW
- rust-game-loop-architecture — NEW
- save-schema-migration — NEW
- shader-render-pipeline-debugging — NEW
- voxel-chunk-lifecycle — NEW
- voxel-meshing-optimization — NEW

### Game content & save systems (5)

- animation-state-machine-audit — NEW
- game-save-recovery-testing — NEW
- gameplay-telemetry-balance — NEW
- procedural-content-regression-testing — NEW
- world-content-pipeline — NEW

### Game design, engines & gameplay QA (27)

- adversarially-validating-game-repairs
- arcadifying-mini-games
- auditing-game-screen-readability
- auditing-gameplay-implementation-coverage
- curating-game-concept-portfolio
- designing-mini-games
- designing-minimal-game-rules
- developing-with-crisp-game-lib
- evaluating-gameplay-balance
- exploring-game-design-space
- gating-intent-legibility
- generating-retro-arcade-concepts
- generating-semantic-game-mutants
- godot-game-dev
- implementing-gameplay-invariants
- localizing-game-state-divergence
- maximizing-game-feel
- playground
- probing-web-game-mechanics
- refining-game-prototypes
- running-headless-godot
- scaffolding-godot-mini-games
- smoke-testing-web-games
- stress-testing-game-concepts
- unity-game-dev
- unreal-game-dev
- verifying-turn-based-games

### Hardware & embedded devices (2)

- cardputer-buddy
- m5-onboard

### Mathematics (3)

- math-olympiad
- siege
- solo

### Messaging integrations (6)

- discord-access
- discord-configure
- imessage-access
- imessage-configure
- telegram-access
- telegram-configure

### Minecraft & modpack engineering (5)

- mod-loader-compatibility-matrix — NEW
- modded-minecraft-crash-triage — NEW
- modpack-dependency-triage — NEW
- modpack-reproducibility-snapshot — NEW
- modpack-server-capacity-planning — NEW

### Networked games & determinism (2)

- multiplayer-determinism-testing — NEW
- multiplayer-state-sync — NEW

### Release, tests & repository quality (6)

- api-contract-regression-testing — NEW
- build-cache-ci-optimization — NEW
- database-migration-safety — NEW
- event-driven-architecture-tracing — NEW
- repository-architecture-map — NEW
- reproducible-build-artifact-provenance — NEW

### Reverse engineering & artifact analysis (54)

- rea-android-apk-triage
- rea-android-method-analysis
- rea-android-resource-analysis
- rea-app-version-diff
- rea-assembly-pseudocode-check
- rea-browser-capture-compare
- rea-browser-passive-observation
- rea-browser-scenario-capture
- rea-changelog-update
- rea-ci-tests-audit
- rea-crash-core-analysis
- rea-dos-ghidra-analysis
- rea-dotnet-assembly-analysis
- rea-electron-ipc
- rea-electron-native-addons
- rea-elf-layout-audit
- rea-engine-architecture-learning
- rea-evm-bytecode-inspection
- rea-feature-trace
- rea-firmware-analysis
- rea-flutter-apk-inventory
- rea-ghidra-provider-workflow
- rea-har-network-analysis
- rea-ida-provider-workflow
- rea-js-app-map
- rea-js-bundle-reconstruction
- rea-js-export-shapes
- rea-js-module-graph
- rea-large-binary-investigation
- rea-native-abi-analysis
- rea-native-binary-triage
- rea-native-call-graph
- rea-native-function-analysis
- rea-native-function-reconstruction
- rea-native-string-analysis
- rea-native-xref-tracing
- rea-packet-field-discovery
- rea-pcap-summary-analysis
- rea-pe-resource-analysis
- rea-rust-artifact-source-compare
- rea-rust-binary-inventory
- rea-rust-dependency-audit
- rea-rust-dependency-graph
- rea-rust-runtime-boundary
- rea-saz-traffic-analysis
- rea-source-map-provenance
- rea-sqlite-schema-analysis
- rea-task-triage
- rea-tool-design
- rea-wasm-js-boundary
- rea-wasm-module-analysis
- rea-web-feature-tracing
- rea-windows-binary-inspection
- reverse-engineer-anything

### Rust & platform engineering (3)

- rust-async-runtime-diagnostics — NEW
- rust-crate-boundary-audit — NEW
- wasm-native-performance-comparison — NEW

### Simulation, NPCs & world history (8)

- economy-simulation-balancing — NEW
- emergent-behavior-test-design — NEW
- game-ai-decision-architecture — NEW
- large-population-simulation-lod — NEW
- npc-memory-knowledge-model — NEW
- npc-state-machine-design — NEW
- procedural-civilization-simulation — NEW
- world-history-event-sourcing — NEW

### Skill library governance (6)

- agent-artifact-quality-gates — NEW
- automation-change-risk-gating — NEW
- skill-deduplication-and-consolidation — NEW
- skill-quality-evaluation — NEW
- skill-trigger-routing-evaluation — NEW
- third-party-skill-provenance-audit — NEW

### UI, art, audio & assets (7)

- building-era-authentic-game-audio
- creating-godot-procedural-audio
- designing-retro-arcade-sound-kits
- directing-game-visuals
- frontend-design
- generating-dot-assets
- styling-web-game-typography

## Source-of-truth rules

- Each distinct skill is identified by its entrypoint and complete skill-local subtree, not merely by its name.
- Original skill source locations are preserved when bundled; new authored sources are organized under curated-skill-sources by category.
- The all-skills-collection plugin is generated output. Do not add new source skills only inside that generated directory.
- Keep third-party provenance, licenses, attribution, and required notices. A repository-level license does not automatically relicense imported content.
- Do not count placeholders, repeated aliases, or near-duplicates as additional skills.
- Regenerate and validate using the repository sync script before completing a skills batch.
