---
name: nexora-machine-logic-graph-contract
description: "Defines deterministic typed-signal and logic-graph contracts for NEXORA Phase 5 machine automation without introducing a parallel simulation engine."
---

# NEXORA Machine Logic Graph Contract

## Purpose

Use this workflow when designing or reviewing the optional logic layer in NEXORA's planned Machine and Automation system. It turns the existing planning concepts—signals, logic gates, controllers, and machine commands—into explicit contracts before implementation.

The current NEXORA plan describes signals with `value`, `type`, `source`, and `timestamp`; lists AND, OR, NOT, XOR, and COMPARE gates; and sketches Sensor → Comparator → Controller → Machine. The development roadmap places machines and automation in Phase 5. Treat these as planned requirements, not proof that the engine already implements them.

This skill is separate from `nexora-digital-logic-library-integration-audit`: this one defines NEXORA's native graph semantics; the integration audit evaluates whether an external library can fit those semantics.

## Required inputs

- Pinned NEXORA commit and the current Machine and Automation plan.
- Current Phase 5 roadmap and architecture/freeze status.
- Existing command, world-clock, event, persistence, content-definition, and modding contracts.
- Intended signal types, value domains, source identities, timestamp semantics, and delivery rules.
- Target graph size, tick frequency, fan-out/depth budgets, and expected machine use cases.
- Explicit policy for feedback, delays, memory, reset, missing inputs, and invalid graph references.

If a contract is not present in the code or accepted architecture documents, mark it as a proposal requiring an ADR. Do not invent a public API or claim an implementation exists.

## Evidence and phase gate

1. Inspect the current NEXORA tree, not only old plans or previous reports.
2. Confirm whether Phase 5 is active and whether a machine/automation implementation has been accepted.
3. Separate normative architecture, proposed plans, existing code, and historical reports.
4. Do not build the logic graph during an earlier phase solely to consume an external chip catalog.
5. If Phase 5 is not active, produce the contract and readiness checklist only; defer runtime implementation.

## Core model

Use the smallest model that fits the current NEXORA architecture:

- **Signal:** a typed, validated value with source identity and simulation-time timestamp.
- **Port:** a named, typed input or output boundary with explicit cardinality and width rules.
- **Node:** a stable graph element with a declared operation, ports, version, and evaluation class.
- **Edge:** a validated connection from one output port to one input port.
- **Graph:** a versioned collection of nodes and edges with deterministic evaluation semantics.
- **Controller:** consumes evaluated outputs and produces validated commands through NEXORA's existing command boundary.
- **Machine:** receives commands and updates through the existing machine lifecycle and simulation ownership.

Do not make signals generic untyped JSON blobs. Do not let graph nodes mutate world state directly.

## Signal contract

Define the signal contract before gate implementation:

1. `value` must have an explicit value domain, such as boolean, bounded integer, fixed-width bit vector, or a separately specified structured value.
2. `type` must be machine-readable and validated at graph construction and load time.
3. `source` must identify the producing node/port or trusted external source using stable identity, not a display label.
4. `timestamp` must use NEXORA simulation/world time. Do not sample wall-clock time in authoritative evaluation.
5. Specify whether a signal is a snapshot, event, or retained state. These are not interchangeable.
6. Specify missing, stale, invalid, disconnected, and duplicate signals explicitly. Never silently convert them to zero/false unless the accepted type contract says so.
7. Specify bit width, signedness, overflow, and coercion rules. Reject incompatible connections before runtime.
8. Define ordering for multiple inputs and multiple updates in the same simulation tick.

The plan's four fields are a starting point, not a complete schema. Add fields only when a concrete invariant requires them.

## Gate and node semantics

Implement only the planned primitives initially:

| Node | Contract to define |
|---|---|
| AND | Boolean inputs; output true only when every required input is true. |
| OR | Boolean inputs; output true when at least one required input is true. |
| NOT | Exactly one boolean input; invert its value. |
| XOR | Boolean parity semantics; define behavior for two or more inputs explicitly. |
| COMPARE | Typed comparison with explicit operator and compatible operand types. |

For each node, define input count, output count, type constraints, default/missing-input behavior, evaluation class, and failure mode.

Keep arithmetic, memory, counters, timers, edge detectors, and programmable controllers out of the initial primitive set unless an accepted use case and ADR justify them. Do not infer these features from an external library's catalog.

## Deterministic graph evaluation

1. Evaluate against an immutable world/simulation snapshot for a defined tick.
2. Assign stable node and port identifiers; never use hash-map iteration order as execution order.
3. Use a stable topological ordering with a documented tie-break for independent nodes.
4. Reject combinational cycles at graph validation unless a separately specified sequential/delay node creates an explicit tick boundary.
5. Do not attempt unbounded fixed-point propagation. If a future node requires convergence, define a strict iteration/work budget and deterministic failure result.
6. Evaluate pure combinational nodes without side effects.
7. Collect controller outputs, validate them, and submit commands through the existing command system.
8. Apply machine/world mutations only at the owning simulation boundary.
9. Use the authoritative `WorldClock` or the accepted simulation tick source; never read host time for graph behavior.
10. Ensure identical graph version, inputs, world snapshot, and tick sequence produce identical outputs and command ordering.

## Persistence, content, and modding

- Persist graph definitions separately from runtime state when the existing content/save architecture supports that distinction.
- Version graph schemas and node definitions; provide explicit migration or reject unsupported versions safely.
- Persist stable node identity and required sequential state, not derived combinational outputs unless a documented recovery invariant requires them.
- Validate every node type, port, edge, width, and reference when loading a save or mod.
- Treat mod-provided graph definitions as untrusted data: enforce node-count, edge-count, fan-out, depth, and per-tick work budgets.
- Keep unknown node types recoverable and diagnosable; do not execute arbitrary code as a fallback.
- Do not bypass existing permissions, content provenance, or mod compatibility boundaries.

## Workflow

1. Pin NEXORA and inspect the current roadmap, machine plan, relevant ADRs, command boundary, world clock, persistence, and modding contracts.
2. Mark each requirement as implemented, accepted architecture, proposed plan, or unknown.
3. Write a signal schema with value domain, type, source identity, simulation timestamp, delivery semantics, and invalid-state behavior.
4. Define stable node, port, edge, and graph identifiers with versioning rules.
5. Specify the five initial gate semantics and all input/output type constraints.
6. Specify deterministic graph evaluation, cycle policy, tick boundaries, stable ordering, and bounded work.
7. Define the controller-to-command adapter and ensure graph nodes cannot mutate authoritative world state directly.
8. Define save/load, migration, mod validation, and resource budgets.
9. Record the decisions in an ADR and update the machine-system plan before implementation.
10. Implement only when Phase 5 is active and the architecture owner has accepted the ADR.
11. Add unit, property, determinism, persistence, invalid-graph, and integration tests before exposing the graph to content or mods.
12. Report actual code paths, commands, test results, deferred decisions, and limitations.

## Validation checklist

- [ ] Phase 5 readiness is confirmed from current roadmap/status evidence.
- [ ] Existing command, clock, persistence, content, and modding contracts are inspected.
- [ ] Signal value domain, type, source, timestamp, and delivery semantics are explicit.
- [ ] Gate input/output arity, type rules, and invalid-input behavior are defined.
- [ ] Node, port, edge, and graph identifiers are stable and versioned.
- [ ] Evaluation order is deterministic and independent of hash-map iteration.
- [ ] Combinational cycles are rejected or handled by an explicit sequential tick boundary.
- [ ] Evaluation work is bounded and has deterministic failure behavior.
- [ ] Controllers emit validated commands through the existing command boundary.
- [ ] Saves and mods validate graph schema, references, and resource budgets.
- [ ] Tests cover truth tables, properties, determinism, persistence, invalid graphs, and integration.
- [ ] No runtime implementation or test is claimed unless it was actually changed and executed.

## Required output

1. Evidence map separating existing code, accepted architecture, planned requirements, and unknowns.
2. Signal schema and value-domain contract.
3. Gate/node contract table with arity, types, outputs, and failure behavior.
4. Graph identity, versioning, ordering, cycle, and bounded-evaluation decisions.
5. Controller-to-command boundary and machine ownership diagram.
6. Persistence, migration, mod validation, and resource-budget rules.
7. ADR draft and Phase 5 implementation readiness decision.
8. Test matrix with actual commands/results and explicitly unrun checks.

## Boundaries and failure handling

- Do not claim NEXORA already has a digital-logic engine based on planning documents.
- Do not treat UMBRA-LIMA-ALFA or another external catalog as an implementation dependency.
- Do not copy external chip code or assets without verified license and provenance.
- Do not introduce a parallel clock, scheduler, command system, persistence format, or machine runtime.
- Do not use wall-clock timestamps for authoritative graph evaluation.
- Do not allow arbitrary node code to mutate world state or bypass command validation.
- Do not silently resolve type, width, cycle, or missing-input errors.
- If Phase 5 is not active, stop at architecture/readiness artifacts and defer runtime code.

## Trigger examples

- **Positive:** Define deterministic AND/OR/NOT/XOR/COMPARE graph semantics for NEXORA's planned machine automation.
- **Positive:** Specify typed signals, stable node IDs, tick ordering, cycle handling, and controller command boundaries.
- **Positive:** Review whether a proposed logic graph is ready for Phase 5 implementation and mod support.
- **Negative:** Audit an external chip repository's license and source compatibility; use `nexora-digital-logic-library-integration-audit`.
- **Negative:** Build a standalone digital-logic simulator unrelated to NEXORA's architecture.
