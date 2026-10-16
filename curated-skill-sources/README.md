# Curated Skill Sources

Original skills authored for this library are organized by domain below. Each skill has a unique folder with a `SKILL.md` entrypoint; the unified plugin is generated from these canonical sources. The 850-skill draft contains **724 original skills** and 126 retained/imported entries.

- `agent-tooling/`: Claude Code setup, MCP configuration, permissions, connection checks, and troubleshooting.
- `developer-cli-tooling/`: CLI behavior contracts, portable environments, and deterministic command workflows.
- `documentation-knowledge-systems/`: documentation correctness, traceability, examples, and operational runbooks.
- `engine-runtime/`: engine architecture, resource lifecycle, rendering, deterministic simulation, and performance.
- `simulation-world/`: NPC state, memory, economies, civilization, and event history.
- `minecraft-modded-environments/`: mod dependencies, crash triage, server capacity, and reproducible pack snapshots.
- `release-testing-operations/`: artifact provenance, API/database contracts, event flows, architecture maps, and CI optimization.
- `skill-library-governance/`: quality, trigger routing, deduplication, provenance, and automation risk.
- `geospatial-visualization/`, `live-public-data-systems/`, `realtime-voice-agents/`, `scene-navigation-sharing/`, `public-data-ethics/`: the 600 milestone's globe, feed reliability, realtime voice, scene-sharing, and privacy workflows.
- `osiris-intelligence-platform/`: public-source API contracts, map/camera inventories, defensive scanner scope, source attribution, forecast evidence, MCP/SSE lifecycle, and safe deployment.
- `aeris-radar-engineering/`: AERIS-10/PLFM_RADAR FPGA contracts, simulated signal-processing validation, PCB/schematic provenance, STM32 safety states, and cross-layer test evidence.
- `flipperzero-firmware-engineering/`: FBT/SCons builds, Furi/FreeRTOS lifetime, GUI/application state, HAL contracts, storage formats, transport compatibility, parser safety, JS SDK, and firmware CI.

## Research and provenance

The 850 milestone is original workflow writing informed by repository structure and documentation in [OSIRIS](https://github.com/simplifaisoul/osiris), [PLFM_RADAR / AERIS-10](https://github.com/NawfalMotii79/PLFM_RADAR), and [Flipper Zero Firmware](https://github.com/flipperdevices/flipperzero-firmware). It does not copy their implementation files, schematics, data, screenshots, binary assets, or credential/protocol samples. See `docs/research/skill-inspiration-osiris-plfm-radar-flipperzero.md` for the inspiration, source-license distinctions, and safe-use boundaries.

## Add a skill

1. Choose the best existing domain folder or propose a new one in the library catalog.
2. Create a unique skill folder containing `SKILL.md` and valid YAML frontmatter.
3. Include a specific trigger, actionable workflow, clear deliverable, validation, edge cases, and guardrails.
4. Add local references only when they contain reusable material needed by that skill.
5. Update the catalog and roadmap; check exact and semantic duplicates; regenerate and verify the plugin.
