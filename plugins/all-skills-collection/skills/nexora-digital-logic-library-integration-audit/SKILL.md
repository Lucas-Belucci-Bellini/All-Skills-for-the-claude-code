---
name: nexora-digital-logic-library-integration-audit
description: "Audits digital-logic component libraries against NEXORA contracts, classifies reusable chips, and gates integration on architecture, licensing, determinism, and tests."
---

# NEXORA Digital Logic Library Integration Audit

## Purpose

Use this workflow when evaluating an external digital-logic or circuit-component library for possible use in NEXORA. It is designed for NEXORA issue #47 and similar library-consolidation work.

The objective is not to import the largest possible chip catalog. The objective is to identify a small, correct, legally usable set of components that fits NEXORA's existing simulation and world/runtime architecture.

This is an audit and integration-planning workflow. It does not claim that UMBRA-LIMA-ALFA or NEXORA has been inspected unless the current task actually provides repository access and pinned evidence.

## Non-negotiable evidence and license gates

1. Pin the exact commit SHA of every repository inspected. Record the default branch only as navigation metadata, not as a substitute for a commit pin.
2. Inspect the actual source tree, documentation, package manifests, dependency declarations, tests, examples, and release metadata. A repository description or search snippet is not sufficient evidence.
3. Locate and read the complete applicable LICENSE file and any nested LICENSE, NOTICE, attribution, or third-party component notices.
4. A public repository is not automatically licensed for copying, modification, redistribution, or commercial use. If the applicable license is absent, ambiguous, incompatible, or inaccessible, classify copied implementation as `BLOQUEADO_POR_LICENÇA`.
5. Do not copy source code, tests, assets, schemas, or distinctive implementation text while license status is unresolved. Record the upstream URL and commit for research only.
6. If independent reimplementation is appropriate, derive behavior from documented logic semantics and independently authored tests. Do not translate upstream code line by line or reproduce its internal structure.
7. Separate observed facts, inferred compatibility, and proposed design. Cite paths, symbols, test names, and commit SHAs for observed facts.

If any required repository cannot be read, stop the corresponding audit and produce an explicit blocked/incomplete report. Never fill missing evidence with assumptions.

## Required inputs

- Exact commit SHA and repository URL for NEXORA and the external library.
- Full source-tree access, including documentation, package manifests, tests, and every applicable LICENSE/NOTICE file.
- NEXORA's current logic/signal/bus/clock/timing contracts and the existing component catalog.
- Target use cases, supported platforms, performance budgets, and modding/persistence requirements.
- A list of candidate chips with source paths and behavioral evidence; names alone are insufficient.
- The intended distribution and modification model so license compatibility can be evaluated accurately.

If any item is unavailable, record it as blocked and narrow the conclusion. Do not substitute assumptions or repository metadata for missing source evidence.

## Audit A — external library

Inspect and record:

- Repository identity, pinned commit, license files, notices, and provenance.
- Architecture and module boundaries; chip/component registration and composition model.
- Component catalog, names, input/output pins, bit widths, truth tables, state, reset behavior, and edge semantics.
- Serialization or file formats, versioning, and compatibility guarantees.
- Public APIs, extension points, event/signal model, clock model, and timing semantics.
- Runtime dependencies, build requirements, supported targets, and dependency licenses.
- Unit, property, integration, timing, and regression tests; identify which behavior is actually tested.
- Known limitations, unsupported features, maintenance status, and security-sensitive parsing paths.

Do not infer chip behavior from a display name alone. Read the implementation or normative documentation and verify it against tests.

## Audit B — NEXORA compatibility

Before proposing an integration, inspect the pinned NEXORA repository and locate:

- Existing logic/circuit simulation modules and any overlapping chip catalog.
- Existing component, signal, port, bus, and connection contracts.
- Bit-width representation, signedness, overflow, tri-state or unknown-value semantics, if any.
- Clock source, tick ordering, propagation model, delay model, and sequential update boundaries.
- Reset/initialization rules and behavior for unconnected or invalid inputs.
- Persistence, save-game serialization, schema versioning, and migration behavior.
- Determinism requirements for replay, multiplayer, save/load, and world simulation.
- Threading, scheduling, ECS/resource ownership, and performance budgets.
- Modding/plugin registration boundaries, validation, sandboxing, and compatibility policy.

Treat NEXORA's existing architecture as the source of truth. An external library must adapt to it; do not introduce a parallel engine merely to preserve an upstream API.

## Consolidated component classification

Create one row per candidate component, with at least:

| Classification | Meaning |
|---|---|
| `EXISTENTE_NO_NEXORA` | NEXORA already provides equivalent behavior; reuse its implementation. |
| `EXISTENTE_NO_UMBRA` | The external library provides it, but no NEXORA integration decision has been made. |
| `COMPATÍVEL_PARA_INTEGRAÇÃO` | Semantics and license are verified, and a thin adapter fits existing NEXORA contracts. |
| `REQUER_REIMPLEMENTAÇÃO` | Useful behavior can be independently implemented against NEXORA contracts; upstream code is not copied. |
| `DUPLICADO` | Equivalent behavior already exists; do not add another implementation. |
| `NOVO_CHIP` | A useful, justified component not present in either catalog, with a defined contract and tests. |
| `BLOQUEADO_POR_LICENÇA` | License/provenance is absent, unclear, incompatible, or inaccessible for the proposed use. |
| `FORA_DE_ESCOPO` | Not useful to current NEXORA gameplay, simulation, or planned architecture. |

Each row must include component name, source path/API, input/output contract, bit width, combinational/sequential classification, clock/reset semantics, evidence references, license status, NEXORA overlap, proposed disposition, and required tests.

Do not label a component `COMPATÍVEL_PARA_INTEGRAÇÃO` until both semantic compatibility and legal reuse are established. A behavior can be reimplemented independently even when copying the upstream implementation is blocked, but keep that decision and its provenance explicit.

## Integration design rules

1. Prefer a small adapter that translates external concepts into existing NEXORA ports, signals, buses, scheduler, serialization, and lifecycle contracts.
2. Keep one authoritative simulation model. Never maintain two competing registries, schedulers, clock domains, or persistence formats for the same feature.
3. Define stable component identifiers and versioned serialized forms before exposing chips to saves or mods.
4. Make evaluation order explicit. Combinational propagation must converge or fail within a documented bound; sequential state changes occur only at defined clock edges/ticks.
5. Specify behavior for cycles, feedback, unconnected pins, invalid widths, overflow, reset, and unknown/high-impedance values according to NEXORA's actual supported semantics.
6. Do not silently coerce incompatible widths, timing models, or reset behavior.
7. Keep optional library integration non-blocking for worlds and builds that do not use digital logic.
8. Expose modding hooks only after input validation, resource budgets, versioning, and deterministic behavior are enforced.
9. Avoid adding dependencies solely for catalog breadth. Evaluate binary size, compile time, runtime cost, license, maintenance, and target-platform support.

## Test strategy

For every integrated or independently reimplemented component, select tests appropriate to its behavior:

- **Combinational:** exhaustive truth tables for small input spaces; boundary and width tests for larger buses.
- **Sequential:** state-transition tables, edge-triggered behavior, reset/enable priority, and repeated-tick tests.
- **Timing:** propagation delay, stable ordering, bounded convergence, and no accidental dependence on wall-clock time.
- **Determinism:** identical input/tick sequences produce identical outputs and serialized state across repeated runs.
- **Persistence:** save/load round trips, schema migration, and stable component identity.
- **Properties:** width preservation, valid output domains, no mutation outside the owning tick, and invariants under generated input sequences.
- **Integration:** mixed circuits, feedback loops, disconnected pins, invalid graph references, and adapter boundary tests.
- **Performance:** representative circuit sizes, worst-case fan-out/depth, allocation behavior, and bounded evaluation work.

Tests must exercise NEXORA's actual contracts. Upstream tests may be used as behavioral references only when their license permits; do not treat upstream green tests as proof that the NEXORA adapter works.

## Safe execution sequence

1. Pin and audit both repositories.
2. Verify license and provenance before copying or adapting any implementation.
3. Inventory NEXORA's existing logic capabilities and duplicate behavior.
4. Build the comparative catalog with evidence and explicit blocked states.
5. Select only the smallest useful integration slice.
6. Write an architecture decision record covering adapter boundaries, timing, determinism, persistence, modding, and rollback.
7. Implement behind an optional feature boundary where appropriate.
8. Add component-level and integration tests before exposing the feature to saves or mods.
9. Run targeted tests, full relevant workspace tests, formatting, linting, and cross-platform checks where supported.
10. Report exact commits, paths, commands, results, unrun checks, license conclusions, and remaining risks.

## Required deliverables

- Pinned external and NEXORA commit SHAs.
- Repository audit notes with source-path evidence.
- License/provenance table and explicit copy/reimplement/block decisions.
- Consolidated chip catalog using the exact classifications above.
- Duplicate report and NEXORA existing-capability map.
- Architecture decision record for the chosen integration slice.
- Component contracts and test matrix.
- Actual command/test results, performance measurements, and unresolved limitations.

## Failure handling and stop conditions

- If either repository is inaccessible, report that audit as incomplete; do not claim compatibility.
- If license evidence is missing or unclear, block copying and redistribution.
- If NEXORA contracts cannot be located, do not design an adapter based on guesses.
- If the integration requires a second scheduler or competing source of truth, reject or redesign it.
- If deterministic behavior cannot be demonstrated, do not expose the component to authoritative world state, saves, or multiplayer.
- If a chip has no clear gameplay or simulation value, classify it as `FORA_DE_ESCOPO`.
- If existing NEXORA behavior is equivalent, classify it as `DUPLICADO` or `EXISTENTE_NO_NEXORA`; do not inflate the catalog.

## Trigger examples

- **Positive:** Compare an external digital-logic chip library with NEXORA's existing circuit simulation before deciding what to reuse.
- **Positive:** Audit chip semantics, bus widths, clock/reset behavior, licensing, and deterministic integration.
- **Positive:** Create a provenance-backed catalog of combinational, sequential, memory, and timing components.
- **Negative:** Implement a generic Rust logic simulator without reference to NEXORA; use the appropriate general simulation workflow.
- **Negative:** Add a chip solely to increase catalog size without a defined contract and tests.
- **Negative:** Copy source code from a public repository whose license has not been verified.
