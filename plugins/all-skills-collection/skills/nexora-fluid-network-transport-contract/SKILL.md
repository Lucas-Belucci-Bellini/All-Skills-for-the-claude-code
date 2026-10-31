---
name: nexora-fluid-network-transport-contract
description: "Defines deterministic, conserved fluid transport across NEXORA machine ports, pipes, pumps, and tanks without creating a parallel fluid simulation runtime."
---

# NEXORA Fluid Network Transport Contract

## Purpose

Use this skill when designing, implementing, or reviewing the planned Fluid Network in NEXORA's Machine System. It turns the Machine and Automation plan's Fluid Network, FluidPort, routing, pumps, pipes, tanks, pressure, and multi-network machine integration into explicit contracts.

This skill complements the existing `nexora-fluid-simulation-stability` workflow: that skill addresses numerical stability of fluid simulation; this one addresses network topology, port compatibility, transport transactions, capacity, routing, and machine integration. Do not duplicate the Fluid Engine or infer that planned runtime behavior already exists.

## Required inputs

- Pinned NEXORA commit and the current `docs/plans/Machine and Automation.md`.
- Existing Fluid Engine ownership, fluid identity/tag registry, world simulation clock, machine lifecycle, inventory/resource, persistence, networking, and command-boundary contracts.
- Declared fluid quantities and units (volume or mass), numeric representation, density/temperature semantics where relevant, and conversion policy.
- Port definitions: stable IDs, direction, accepted fluid IDs/tags, connection faces, throughput, and pressure limits.
- Pipe, pump, tank, and machine endpoint capacities, transfer rates, topology rules, and failure behavior.
- Determinism requirements, tick budget, multiplayer authority, and persistence/versioning constraints.

## Workflow

1. **Establish ownership before designing behavior.** Locate the existing Fluid Engine and machine/network abstractions. Fluid state and thermodynamic simulation remain owned by the Fluid Engine; the Machine System owns ports, connectivity, routing requests, and transport scheduling. Reuse shared resource and simulation APIs.
2. **Define canonical quantities.** Choose one canonical stored quantity per fluid (mass or fixed-point volume) and define conversions explicitly. Never mix units in a sum or silently treat temperature, density, pressure, and volume as interchangeable. If density varies with temperature or pressure, use the Fluid Engine's authoritative conversion contract.
3. **Specify typed ports.** Every port has a stable identifier, owner, direction (`INPUT`, `OUTPUT`, or explicitly supported `BOTH`), accepted fluid IDs/tags, capacity or rate limits, connection faces, and optional pressure envelope. Reject incompatible fluid types, directions, dimensions, or unsupported adapters before creating an edge.
4. **Model topology as a graph.** Represent pipe segments, junctions, pumps, tanks, and machine ports as typed nodes/edges with stable IDs. Separate physical adjacency from logical connectivity. Define whether a component is a passive edge, storage node, active pressure source, or endpoint; do not encode all behavior as a generic pipe.
5. **Discover and update only affected components.** On placement, removal, rotation, port reconfiguration, or chunk load/unload, mark the affected region dirty and rebuild its connected components deterministically. Merge and split operations must preserve unaffected network identities where possible. Avoid a full-world scan on every tick.
6. **Resolve routes deterministically.** Use stable node/edge ordering and an explicit route-cost policy (for example hop count, resistance, priority, or configured preference). Specify tie-breaking, cycle handling, maximum path length, and behavior when topology changes between planning and commit.
7. **Calculate bounded transport.** For each simulation tick, cap work by source availability, destination free capacity, edge throughput, pump capacity, and any pressure/flow constraints. Apply backpressure and rate limits before committing. Do not let route discovery or a cyclic graph create unbounded work.
8. **Use atomic transfer transactions.** Plan against a topology/version snapshot; validate source amount, destination capacity, every edge's remaining throughput, fluid compatibility, and pressure constraints; reserve all required capacity; calculate losses/conversions; commit all debits and credits together; then record the result. If any validation or reservation fails, release reservations and leave fluid quantities unchanged.
9. **Enforce conservation.** For a transfer expressed in one canonical quantity, require `source_debit = destination_credit + declared_transfer_loss + declared_conversion_loss`. If a domain has no physical loss, the corresponding term is zero. Never silently discard fluid due to rounding, overflow, chunk unload, or route invalidation. Use deterministic fixed-point arithmetic and explicit remainder handling.
10. **Treat pressure as a constraint, not a guessed flow formula.** The Fluid Engine must own pressure/flow physics. The network layer supplies declared pump head, pipe limits, elevation or resistance inputs only where supported by the existing Fluid Engine contract. Reject unsupported pressure models rather than inventing a simplified runtime equation.
11. **Define pump and tank semantics.** Pumps are active transfer/pressure devices with input/output ports, rate, operating state, and failure policy. Tanks are bounded storage nodes with capacity, current quantity, accepted fluid policy, and optional level/pressure limits. A tank must not be counted as both source and destination capacity in the same transaction.
12. **Integrate machines through ports.** A machine may expose multiple fluid inputs/outputs alongside energy, item, heat, and signal ports. Port direction and fluid acceptance are machine configuration; processing recipes and machine state remain owned by their existing systems. Cross-network operations must use explicit transaction boundaries, not direct mutation of another subsystem's internals.
13. **Handle failures explicitly.** Specify behavior for empty sources, full tanks, blocked ports, disconnected routes, insufficient pump head, overpressure, leaks (only if supported), invalid fluid IDs, stale topology snapshots, chunk unload, and transaction interruption. Fail closed: no partial transfer unless a separately specified streaming protocol explicitly supports it.
14. **Persist and replicate authoritative state.** Persist fluid quantities, tank state, stable topology references, and schema versions through the existing save system. Rebuild derived connectivity after load rather than trusting stale caches. In multiplayer, the authoritative simulation commits transfers; clients consume validated state/events and never independently create authoritative fluid.
15. **Budget simulation and observability.** Batch network work on the simulation tick, not the render frame. Define per-tick budgets for graph rebuilds, route searches, and transfers. Expose counters for active components, queued requests, transferred quantity, blocked requests, pressure-limit failures, and budget exhaustion without logging sensitive or unbounded per-tick data.
16. **Verify with invariant-driven tests.** Cover compatible/incompatible ports, directionality, deterministic route ties, graph merge/split, capacity and throughput limits, pump/tank boundaries, stale topology, transaction rollback, conservation, fixed-point remainders, save/load rebuild, chunk lifecycle, multiplayer authority, and adversarial cycles. Add property tests for conservation and bounded execution.
17. **Separate design readiness from implementation evidence.** Report which contracts are documented, which code paths exist, and which tests actually ran. A plan or skill file is not evidence of a working fluid network, pressure solver, or Fluid Engine integration.

## Validation checklist

- [ ] Fluid Engine remains the sole owner of fluid-state and physical simulation semantics.
- [ ] Port IDs, directions, fluid compatibility, capacities, and rate units are explicit.
- [ ] Graph topology uses stable identifiers and deterministic merge/split/rebuild behavior.
- [ ] Routing tie-breaks, cycle handling, and computational bounds are specified.
- [ ] Source, destination, pipe, and pump limits are all applied before commit.
- [ ] Transfer reservations and rollback prevent partial mutation on failure.
- [ ] Conservation accounts for every declared loss and deterministic rounding remainder.
- [ ] Pressure constraints use an existing authoritative Fluid Engine contract.
- [ ] Pumps and tanks have explicit state, capacity, and failure semantics.
- [ ] Machine integration uses typed ports and existing subsystem boundaries.
- [ ] Persistence rebuilds derived topology and preserves authoritative quantities.
- [ ] Multiplayer transfer authority and client replication are unambiguous.
- [ ] Tests cover invariants, failure paths, persistence, determinism, and bounded work.
- [ ] Documentation distinguishes planned behavior from implemented and tested behavior.

## Required output

Produce a reviewable fluid-network contract or implementation plan containing:

- Current evidence and pinned source references.
- Ownership boundaries and canonical quantity/unit definitions.
- Port, node, edge, pump, tank, and topology schemas.
- Deterministic discovery, routing, scheduling, and transaction lifecycle.
- Conservation equation, rounding policy, and all declared loss terms.
- Pressure/flow assumptions delegated to the Fluid Engine.
- Failure matrix, persistence/multiplayer rules, and performance budgets.
- Test matrix with named invariants and actual execution results.
- Explicit gaps between the current repository state and the proposed design.

## Trigger examples

- **Positive:** Design the fluid-network transport contract for typed ports, pumps, pipes, tanks, and machine endpoints.
- **Positive:** Review whether a transfer is deterministic, capacity-safe, atomic, bounded, and conserved.
- **Positive:** Specify how topology rebuilds after a connection changes or a simulation region is unloaded.
- **Negative:** Implement a separate fluid solver or numerical-stability workflow; use the owning simulation-system skill.
- **Negative:** Create an energy-network transfer contract; use the dedicated energy-network skill.
- **Negative:** Build a generic item conveyor or storage-routing network; use the relevant logistics skill.
- **Negative:** Claim runtime behavior is implemented based only on a design document; require code and test evidence.

- **Positive:** Design the NEXORA fluid network contract for pumps, pipes, tanks, and machine fluid ports.
- **Positive:** Review whether fluid transfers are deterministic, capacity-safe, atomic, and conserved.
- **Negative:** Implement a new fluid simulation solver; use the existing fluid simulation stability workflow and Fluid Engine ownership instead.
- **Negative:** Create an energy network transfer contract; use the NEXORA energy network transaction skill.

## Boundaries and failure handling

- Do not create a second Fluid Engine, independent pressure solver, or parallel machine lifecycle.
- Do not assume all fluids are incompressible or that volume is conserved when the authoritative model uses mass.
- Do not invent density, viscosity, pressure, flow, or leak equations. Delegate physical semantics to the existing Fluid Engine or mark the dependency unresolved.
- Do not silently clamp, discard, duplicate, or partially transfer fluid to recover from invalid state.
- Do not mutate machine inventories or fluid state outside the owning subsystem's authorized transaction API.
- Do not perform full-world topology scans or unbounded path searches on the simulation tick.
- On stale topology, failed reservation, incompatible ports, capacity overflow, or invalid pressure state, abort the transaction, release reservations, preserve quantities, and emit a bounded diagnostic.
- If the required Fluid Engine contract or source evidence is absent, stop at a clearly labeled design proposal and list the missing dependency.
