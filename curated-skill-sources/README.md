# Curated Skill Sources

Original skills authored for this library are organized by domain below. Each skill has a unique folder with a `SKILL.md` entrypoint; the unified plugin is generated from these canonical sources. The current 1,525-skill draft contains **1,399 original skills** and 126 retained/imported entries.

- `agent-tooling/`: agent request contracts, provider adapters, Skill Broker access, MCP configuration, permissions, connection checks, orchestration state, fan-out reconciliation, delegation guards, and recovery workflows.
- `developer-cli-tooling/`: CLI behavior contracts, portable environments, and deterministic command workflows.
- `documentation-knowledge-systems/`: documentation correctness, traceability, examples, and operational runbooks.
- `engine-runtime/`: engine architecture, resource lifecycle, rendering, deterministic simulation, plugin ABI compatibility, platform capability matrices, save-format migration, and performance.
- `simulation-world/`: NPC state, memory, economies, civilization, and event history.
- `minecraft-modded-environments/`: 50 general modpack diagnostic workflows, 25 cross-mod interaction investigations, and 25 individual-mod bug investigations for modified Minecraft packs.
- `release-testing-operations/`: artifact provenance, API/database contracts, event flows, architecture maps, and CI optimization.
- `skill-library-governance/`: quality, trigger routing, semantic deduplication, provenance, version lifecycle, automated validation, and release risk.
- `geospatial-visualization/`, `live-public-data-systems/`, `realtime-voice-agents/`, `scene-navigation-sharing/`, `public-data-ethics/`: the 600 milestone's globe, feed reliability, realtime voice, scene-sharing, and privacy workflows.
- `osiris-intelligence-platform/`: public-source API contracts, map/camera inventories, defensive scanner scope, source attribution, forecast evidence, MCP/SSE lifecycle, and safe deployment.
- `aeris-radar-engineering/`: AERIS-10/PLFM_RADAR FPGA contracts, simulated signal-processing validation, PCB/schematic provenance, STM32 safety states, and cross-layer test evidence.
- `flipperzero-firmware-engineering/`: FBT/SCons builds, Furi/FreeRTOS lifetime, GUI/application state, HAL contracts, storage formats, transport compatibility, parser safety, JS SDK, and firmware CI.
- `playwright-e2e-engineering/`: browser-context and fixture isolation, deterministic locators/time/network, accessibility/visual checks, parallelism, retries, and failure evidence.
- `opentelemetry-collector-engineering/`: receiver/processor/exporter graph, signal loss accounting, cardinality, backpressure, memory/queue budgets, TLS, and config rollout.
- `temporal-durable-workflows/`: deterministic workflow history, activity retries/timeouts/heartbeats, cancellation, versioning/replay, schedules, worker recovery, and operations.
- `supabase-database-engineering/`: RLS and tenant isolation, migrations, PostgreSQL performance/recovery, Realtime, Storage, Edge Functions, and safe evidence drills.
- `ai-sdk-agent-reliability/`: provider compatibility, tool boundaries, streaming/cancellation, evaluation, grounding, budgets, and human approval gates.
- `secure-software-supply-chain/`: Scorecard evidence, least-privilege CI, SBOM/provenance, artifact identity, dependency risk, and release controls.

## Research and provenance

The 850 milestone is original workflow writing informed by repository structure and documentation in [OSIRIS](https://github.com/simplifaisoul/osiris), [PLFM_RADAR / AERIS-10](https://github.com/NawfalMotii79/PLFM_RADAR), and [Flipper Zero Firmware](https://github.com/flipperdevices/flipperzero-firmware). It does not copy their implementation files, schematics, data, screenshots, binary assets, or credential/protocol samples. See `docs/research/skill-inspiration-osiris-plfm-radar-flipperzero.md` for the inspiration, source-license distinctions, and safe-use boundaries.

## Add a skill

1. Choose the best existing domain folder or propose a new one in the library catalog.
2. Create a unique skill folder containing `SKILL.md` and valid YAML frontmatter.
3. Include a specific trigger, actionable workflow, clear deliverable, validation, edge cases, and guardrails.
4. Add local references only when they contain reusable material needed by that skill.
5. Update the catalog and roadmap; check exact and semantic duplicates; regenerate and verify the plugin.


## Repository-to-skill synthesis

New canonical source workflows for this pilot live under `curated-skill-sources/repository-to-skill-synthesis/`. Keep plugin mirrors byte-identical and regenerate the central bundle using `node tools/sync-skill-bundles.mjs --write`.
