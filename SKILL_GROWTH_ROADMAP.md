# Roadmap to 500 distinct skills by December 31, 2026

Current unique count: 300; remaining to target: 200.

Baseline date: 2026-10-15. The collection now contains 300 distinct skills: the original 126-skill bundle, 124 authored skills added across the first three expansions, and 50 skills in this milestone. The target is 500, leaving 200 net-new skills. Across roughly 11 weeks, this requires about 19 new skills per week.

## Milestones

| Checkpoint | Target total | Added since prior checkpoint | Focus |
|---|---:|---:|---|
| 2026-10-15 | 300 | +50 skills in this milestone | PostgreSQL/data contracts, UI server state, API/auth/security controls, Rust crate/build quality, agent guardrails, asset/datapack validation, engine lifecycle, NPC goals and economy invariants |
| 2026-10-31 | 325 | 25 | Engine internals, rendering, Rust systems, world streaming, physics and assets |
| 2026-11-15 | 370 | 45 | NPC cognition, economy, civilization, multiplayer, procedural world generation and simulation tests |
| 2026-11-30 | 420 | 50 | APIs, data, CI, build/release, plugin/MCP architecture, security and modpack tooling |
| 2026-12-15 | 465 | 45 | Platform-specific workflows, test harnesses, content pipeline, interoperability and runtime diagnostics |
| 2026-12-31 | 500 | 70 | Fill verified gaps, remove redundancy, test triggers, validate package and freeze catalog |

## Remaining skill budget after this batch

| Domain | Planned additions | Examples |
|---|---:|---|
| Engine and Rust engine design | 35 | rendering lifetimes, job systems, world coordinates and runtime telemetry |
| World simulation, NPCs and economies | 30 | pathfinding, social knowledge, ecology, settlement migration and resource flows |
| Game content and quality | 28 | import validation, animation timing, procedural distribution, save and UI tests |
| Language and platform engineering | 30 | Rust API stability, cross compilation, async, TypeScript and native/WASM parity |
| Build, CI, release and security | 18 | supply chain, rollback, observability, auth boundaries and incident response |
| Agents, plugins, MCP and skill quality | 18 | memory, approval gates, tool budgets, evals and workflow regression |
| Reverse engineering and evidence | 22 | additional artifact families, differential analysis and evidence provenance |
| Minecraft, modding and server operations | 4 | loader compatibility, pack release and server diagnostics |
| APIs, data, backend and frontend | 15 | SQL plans, pagination, tenancy, caching, forms and API evolution |
| Total remaining | 200 | 500 total when added to the current 300 |

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
