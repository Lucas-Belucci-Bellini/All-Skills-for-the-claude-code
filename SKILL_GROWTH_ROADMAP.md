# Roadmap to 500 distinct skills by December 31, 2026

Current unique count: 202; remaining to target: 298.

Baseline date: 2026-10-15. The collection now contains 202 distinct skills: the original 126-skill bundle, 50 skills from the first authored expansion, one dedicated MCP setup skill, and 25 skills in the second authored expansion. The final target is 500, so 298 additional distinct skills remain. Across roughly 11 weeks this requires about 28 net-new skills every week.

## Milestones

| Checkpoint | Target total | Added since prior checkpoint | Focus |
|---|---:|---:|---|
| 2026-10-15 | 202 | +25 skills in the second authored expansion | Rust safety/async, deterministic voxel generation, frame budgets, hot reload, NPC LOD/memory, modpack profiling/migration, MCP/hook security, platform parity, RLS auditing and operational testing |
| 2026-10-31 | 225 | 23 | Engine internals, rendering, Rust systems, world streaming, physics and assets |
| 2026-11-15 | 290 | 65 | NPC cognition, economy, civilization, multiplayer, procedural world generation and simulation tests |
| 2026-11-30 | 360 | 70 | APIs, data, CI, build/release, plugin/MCP architecture, security and modpack tooling |
| 2026-12-15 | 430 | 70 | Platform-specific workflows, test harnesses, content pipeline, interoperability and runtime diagnostics |
| 2026-12-31 | 500 | 70 | Fill verified gaps, remove redundancy, test triggers, validate package and freeze catalog |

## Remaining skill budget after this batch

| Domain | Planned additions | Examples |
|---|---:|---|
| Engine and Rust engine design | 52 | ECS, schedulers, memory layout, render-resource lifetimes, profiling and streaming |
| World simulation, NPCs and economies | 43 | pathfinding, perception, social networks, ecology, culture and simulation calibration |
| Game content and quality | 42 | animation/audio/physics tests, procedural content, localization, accessibility and saves |
| Language and platform engineering | 42 | Rust, TypeScript, Python, Java/C#, native interop, WASM and packaging |
| Build, CI, release and security | 33 | supply chain, artifact provenance, rollouts, fuzzing and incident diagnosis |
| Agents, plugins, MCP and skill quality | 32 | retrieval/routing tests, orchestration, memory boundaries and plugin packaging |
| Reverse engineering and evidence | 23 | additional artifact families, differential analysis and evidence provenance |
| Minecraft, modding and server operations | 14 | compatibility, configuration diffs, server metrics and pack reproducibility |
| APIs, data, backend and frontend | 17 | contracts, SQL/RLS, event flows, UI accessibility and observability |
| Total remaining | 298 | 500 total when added to the current 202 |

## Quality gate for every skill

1. A unique, recognizable task and a clear boundary from neighboring skills.
2. Frontmatter with a unique name and a specific, active-verb description stating when to use it.
3. At least three actionable workflow steps, plus a required output/artifact.
4. Verification checks for correctness, edge cases and failure recovery.
5. Guardrails for destructive actions, unsupported assumptions, external dependencies, and sensitive data.
6. Positive and negative trigger examples; check that adjacent skills do not perform the same job.
7. Verified support-file links, provenance, attribution and license notices when applicable.
8. Bundle generation and checking pass; aliases and placeholders do not increase the unique count.

## Weekly operating cycle

- Discover gaps from the current inventory, project issues, bug reports and real failed workflows.
- Define the skill's trigger, inputs, output, boundary and test cases before writing it.
- Author compact procedures and add references/templates only when they materially reduce ambiguity.
- Test positive/negative routing examples and run exact/near-duplicate checks.
- Regenerate the plugin, update catalog/versions/attribution, inspect the diff, and send a reviewed PR.

The numeric target is a planning constraint, not a reason to ship filler. Keep the repository private until unresolved third-party redistribution terms have been reviewed.
