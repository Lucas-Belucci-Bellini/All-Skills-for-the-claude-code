# Roadmap to 500 distinct skills by December 31, 2026

Current unique count: 425; remaining to target: 75.

Baseline date: 2026-10-16. The collection contains 425 distinct skills: the original 126-skill bundle and 299 authored skills. This milestone adds 25 skills for runtime integration/fault testing, queue and workload observability, engine allocation and stall diagnostics, simulation scale/backpressure, Rust build/lifecycle contracts and release evidence. The 500-skill target leaves 75 net-new skills.

## Milestones

| Checkpoint | Target total | Status / additions | Focus |
|---|---:|---|---|
| 2026-10-16 | 425 | Achieved early; +25 in this milestone | Runtime integration tests, queue/memory observability, simulation overload, Rust build/lifecycle and release-evidence controls |
| 2026-10-31 | 450 | +25 planned | Simulation and multiplayer correctness, runtime robustness, asset/save integration and package diagnostics |
| 2026-11-15 | 475 | +25 planned | API/data/security contracts, CI/build/release automation, plugin/MCP quality and modpack diagnostics |
| 2026-12-31 | 500 | +25 planned | Close verified gaps, remove redundancy, test triggers, validate package and freeze catalog |

## Remaining skill budget after this batch

| Domain | Planned additions | Examples |
|---|---:|---|
| Engine and Rust engine design | 12 | scheduler internals, resource lifetimes, world coordinates and runtime profiling |
| World simulation, NPCs and economies | 10 | fairness, lifecycle, pathfinding, migration and resource-flow invariants |
| Game content and quality | 9 | import/build validation, procedural distributions, save recovery and soak tests |
| Language and platform engineering | 10 | Rust API stability, async/concurrency, builds and native/WASM parity |
| Build, CI, release and security | 12 | rollback, provenance, observability, environment parity and incident response |
| Agents, plugins, MCP and skill quality | 6 | memory policy, approval gates, tool budgets, evals and workflow regression |
| Reverse engineering and evidence | 8 | additional artifact families, differential analysis and evidence provenance |
| Minecraft, modding and server operations | 3 | loader compatibility, pack release and server diagnostics |
| APIs, data, backend and frontend | 5 | SQL plans, pagination, tenancy, caching, forms and API evolution |
| Total remaining | 75 | 500 total when added to the current 425 |

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
