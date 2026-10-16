# Roadmap to 500 distinct skills by December 31, 2026

Current unique count: 375; remaining to target: 125.

Baseline date: 2026-10-15. The collection contains 375 distinct skills: the original 126-skill bundle and 249 authored skills. This milestone adds 25 skills for NPC cognition and production, multiplayer replication and rollback, runtime tracing and lifecycle, Rust async/concurrency safety, and procedural-world/save regression testing. The target is 500, leaving 125 net-new skills.

## Milestones

| Checkpoint | Target total | Added since prior checkpoint | Focus |
|---|---:|---:|---|
| 2026-10-15 | 375 | +25 skills in this milestone | NPC memory/action contracts, multiplayer reconciliation, runtime tracing, Rust async/concurrency, procedural-world golden tests and save fault injection |
| 2026-10-31 | 400 | 25 | Engine internals, instrumentation, simulation scheduling, and bounded background work |
| 2026-11-15 | 430 | 30 | NPC cognition, economies, civilization, multiplayer and determinism |
| 2026-11-30 | 455 | 25 | APIs, data, CI, build/release, plugin/MCP architecture, security and modpack tooling |
| 2026-12-15 | 480 | 25 | Platform-specific workflows, test harnesses, content pipeline, interoperability and runtime diagnostics |
| 2026-12-31 | 500 | 20 | Fill verified gaps, remove redundancy, test triggers, validate package and freeze catalog |

## Remaining skill budget after this batch

| Domain | Planned additions | Examples |
|---|---:|---|
| Engine and Rust engine design | 18 | rendering/resource lifetimes, scheduling, memory and runtime profiling |
| World simulation, NPCs and economies | 18 | memory, action constraints, pathfinding, migration and production flows |
| Game content and quality | 15 | import/build validation, procedural distributions, save recovery and soak tests |
| Language and platform engineering | 18 | Rust API stability, async, concurrency testing and native/WASM parity |
| Build, CI, release and security | 10 | supply chain, rollback, observability, auth boundaries and incident response |
| Agents, plugins, MCP and skill quality | 10 | memory, approval gates, tool budgets, evals and workflow regression |
| Reverse engineering and evidence | 15 | additional artifact families, differential analysis and evidence provenance |
| Minecraft, modding and server operations | 3 | loader compatibility, pack release and server diagnostics |
| APIs, data, backend and frontend | 18 | SQL plans, pagination, tenancy, caching, forms and API evolution |
| Total remaining | 125 | 500 total when added to the current 375 |

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
