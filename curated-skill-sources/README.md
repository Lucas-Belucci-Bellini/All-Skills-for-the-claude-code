# Curated Skill Sources

Original skills authored for this library are organized by domain below. Each skill is a unique folder with a `SKILL.md` entrypoint; the unified plugin is regenerated from these sources. The current authored corpus contains **474 original skills**; the 600 milestone adds 50 focused workflows in geospatial visualization, live-feed reliability, realtime voice control, scene sharing/replay, and public-data privacy/provenance.

- `agent-tooling/`: Claude Code setup, MCP configuration, connection checks, and troubleshooting.
- `developer-cli-tooling/`: CLI behavior contracts, portable environments, and deterministic command workflows.
- `documentation-knowledge-systems/`: documentation correctness, traceability, examples, and operational runbooks.
- `accessibility-inclusive-ux/`: inclusive navigation, forms, announcements, and layout behavior.
- `engine-runtime/`: engine architecture, resource lifecycle, rendering, deterministic simulation, and performance.
- `simulation-world/`: NPC state, population LOD, memory, economies, civilization, and event history.
- `networked-games/`: multiplayer synchronization and determinism.
- `minecraft-modded-environments/`: mod dependencies, crash triage, server capacity, and reproducible pack snapshots.
- `rust-platform-engineering/`: Rust crate/runtime design and WASM/native benchmarking.
- `release-testing-operations/`: artifact provenance, API/database contracts, event flows, architecture maps, and CI optimization.
- `skill-library-governance/`: skill quality, trigger routing, deduplication, provenance, agent artifact gates, and automation risk.
- `game-content-pipelines/`: procedural regression, animation state, telemetry, content integration, and save recovery.
- `geospatial-visualization/`: coordinate parsing, camera and layer contracts, attribution, and globe rendering budgets.
- `live-public-data-systems/`: adapter contracts, freshness, retry budgets, schema drift, and source health.
- `realtime-voice-agents/`: credential boundaries, turn races, structured actions, context snapshots, and session lifecycle.
- `scene-navigation-sharing/`: scene links, import preview, camera tours, version migrations, and reproducible replay.
- `public-data-ethics/`: source terms, attribution boundaries, location minimization, retention, and privacy-safe exports.

## Research and provenance

The geospatial/voice/scene batch is original workflow writing informed by a structural review of [God's Eye View](https://github.com/bilawalsidhu/gods-eye-view). It does not copy the project's implementation files or bundle its datasets and visual assets. See the source review at `docs/research/gods-eye-view-skill-inspiration.md` for the inspiration scope and licensing boundary.

## Add a skill

1. Choose the best existing domain folder or propose a new one in the library catalog.
2. Create a unique skill folder containing `SKILL.md` and valid YAML frontmatter.
3. Include a specific trigger, actionable workflow, clear deliverable, validation, edge cases, and guardrails.
4. Add local references only when they contain reusable material needed by that skill.
5. Update the catalog and roadmap; check unique names and subtree similarity; regenerate and verify the plugin.
