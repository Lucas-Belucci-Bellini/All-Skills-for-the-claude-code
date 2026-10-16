# Roadmap to 500 distinct skills by December 31, 2026

Current unique count: 400; remaining to target: 100.

Baseline date: 2026-10-16. The collection contains 400 distinct skills: the original 126-skill bundle and 274 authored skills. This milestone adds 25 skills for scheduler deadlines, runtime observability/configuration, task dependency and shutdown diagnostics, simulation fairness/backlog controls, and reproducible runtime evidence. The 500-skill target leaves 100 net-new skills.

## Milestones

| Checkpoint | Target total | Status / additions | Focus |
|---|---:|---|---|
| 2026-10-16 | 400 | Achieved early; +25 in this milestone | Runtime instrumentation, scheduler fairness/deadlines, simulation backlog controls, and reproducible crash/build evidence |
| 2026-10-31 | 425 | +25 planned | Bounded background work, runtime integration tests, memory/queue observability and release diagnostics |
| 2026-11-15 | 450 | +25 planned | Simulation, multiplayer determinism, NPC/economy validation and platform correctness |
| 2026-11-30 | 475 | +25 planned | API/data/security contracts, build/release automation, plugin/MCP governance and modpack diagnostics |
| 2026-12-31 | 500 | +25 planned | Close verified gaps, remove redundancy, test triggers, validate package and freeze catalog |

## Remaining skill budget after this batch

| Domain | Planned additions | Examples |
|---|---:|---|
| Engine and Rust engine design | 15 | scheduler internals, resource lifetimes, world coordinates and runtime profiling |
| World simulation, NPCs and economies | 15 | fairness, lifecycle, pathfinding, migration and resource-flow invariants |
| Game content and quality | 12 | import/build validation, procedural distributions, save recovery and soak tests |
| Language and platform engineering | 15 | Rust API stability, async/concurrency, builds and native/WASM parity |
| Build, CI, release and security | 10 | crash evidence, provenance, rollback, observability and incident response |
| Agents, plugins, MCP and skill quality | 8 | memory policy, approval gates, tool budgets, evals and workflow regression |
| Reverse engineering and evidence | 12 | additional artifact families, differential analysis and evidence provenance |
| Minecraft, modding and server operations | 3 | loader compatibility, pack release and server diagnostics |
| APIs, data, backend and frontend | 10 | SQL plans, pagination, tenancy, caching, forms and API evolution |
| Total remaining | 100 | 500 total when added to the current 400 |

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
