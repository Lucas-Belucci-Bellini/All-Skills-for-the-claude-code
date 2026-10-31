---
name: nexora-energy-network-transaction-contract
description: "Defines conserved, deterministic, transactional energy flow and priority allocation for NEXORA's planned machine energy networks."
---

# NEXORA Energy Network Transaction Contract

## Purpose

Use this skill to design or review energy transfer between generators, storage, networks, and consumers in NEXORA's Machine System. It formalizes the planned `EnergyNode`, `EnergyTransfer`, storage, priorities, and loss concepts without creating a second resource or machine runtime.

This is an architecture and implementation-readiness skill. The current Machine and Automation plan describes these concepts, but a plan is not evidence that an energy network is implemented.

## Required inputs

- Pinned NEXORA commit and current Machine and Automation plan.
- Existing resource, inventory, machine lifecycle, command, world-clock, persistence, and simulation ownership contracts.
- Accepted numeric representation and units for energy, rates, capacities, and simulation time.
- Explicit rules for transfer loss, conversion loss, distance loss, rounding, and overflow.
- Consumer priority policy, fairness expectations, and behavior during insufficient supply.
- Network topology update policy and the expected maximum nodes, edges, and transfers per tick.

If units, numeric representation, or ownership rules are not defined, record them as architecture decisions; do not invent public API behavior.

## Planned concepts to preserve

The plan sketches:

- `EnergyNode`: capacity, inputRate, outputRate, stored, and mode.
- `EnergyTransfer`: source, destination, amount, and transactionId.
- Consumer priorities: CRITICAL, HIGH, NORMAL, LOW.
- Loss categories: transferLoss, distanceLoss, conversionLoss.
- A generic network connecting generators, batteries/storage, machines, and consumers.

Treat these as planned requirements to refine. Reuse existing NEXORA resource and machine boundaries rather than duplicating them.

## Numeric and unit contract

1. Choose one canonical energy unit and document conversions at API boundaries.
2. Represent authoritative energy using deterministic integer/fixed-point quantities unless an accepted engine-wide numeric policy explicitly requires otherwise.
3. Define capacity and rate units separately; never compare energy quantities directly with per-second or per-tick rates.
4. Convert rates to per-tick budgets using the authoritative simulation tick and deterministic remainder handling.
5. Specify rounding direction for every conversion and loss calculation. Never allow rounding to create energy.
6. Use checked arithmetic for additions, multiplications, and capacity calculations; overflow must fail safely and observably.
7. Define minimum transfer granularity and behavior for values below it.
8. Keep UI formatting and floating-point display values outside authoritative simulation state.

## Transfer transaction lifecycle

Model each transfer as an explicit transaction:

1. **Plan:** identify source, destination, requested amount, path, applicable limits, and topology/version snapshot.
2. **Validate:** confirm both endpoints exist, are active, compatible, authorized, and connected through a valid path.
3. **Reserve:** atomically reserve source energy and destination capacity, including rate budgets.
4. **Calculate:** compute each loss using documented fixed-point/integer rules and the selected path.
5. **Commit:** apply source debit, destination credit, loss accounting, and transaction result exactly once.
6. **Record:** retain stable transaction identity and deterministic outcome for replay, diagnostics, and duplicate suppression.
7. **Release:** return unused reservations on cancellation or failure.

The transaction must be all-or-nothing for the accepted transfer unit. If partial delivery is supported, make it an explicit result with exact delivered, consumed, and lost quantities.

## Conservation invariant

For each committed transfer, prove:

`source_debit = destination_credit + transfer_loss + distance_loss + conversion_loss`

The equality must hold in the canonical unit after documented rounding. If conversion changes energy form or unit, record both sides in a common accounting basis and document the conversion efficiency.

Across a tick:

- Total stored energy plus accounted outputs/losses must reconcile with generation and externally injected energy.
- No transfer may debit more than the source's available energy or rate budget.
- No destination may exceed capacity or input-rate limits.
- A failed transaction must not leave a partial debit, credit, or reservation.
- Losses must never become negative or silently disappear.

If a design cannot satisfy conservation, stop and produce a failing invariant/test case rather than weakening the accounting.

## Deterministic priority allocation

1. Snapshot eligible consumers and supply for a simulation tick.
2. Sort consumers by documented priority, then stable machine/network identity; never rely on hash-map iteration.
3. Define whether a priority class is strict or weighted. Strict priority may starve lower classes; document that trade-off.
4. If fairness is required within a class, use a deterministic round-robin cursor or weighted allocation state persisted across ticks.
5. Define allocation when supply is insufficient: reject, partial allocation, or minimum operating threshold. Each consumer class must use an explicit policy.
6. Allocate against source output-rate, network throughput, destination input-rate, and destination capacity simultaneously.
7. Do not let a consumer's registration order or thread scheduling alter allocation.
8. Ensure parallel planning produces the same ordered commit set as serial deterministic planning.

## Topology, paths, and loss policy

- Version topology snapshots so a transfer cannot commit against a path that changed after validation without an explicit retry/revalidation.
- Define path selection and tie-breaking deterministically.
- Specify whether losses are per edge, per path, or per conversion stage; do not apply the same loss twice.
- Bound path search work and reject or defer oversized topologies predictably.
- Treat disconnected, stale, disabled, or incompatible nodes as unavailable with explicit reason codes.
- Prevent cycles from creating energy or causing unbounded routing work.
- Recompute topology only through the accepted network lifecycle; do not rebuild the entire graph every frame without measured justification.

## Persistence, replay, and multiplayer

- Persist stable node/network identities and only the runtime state needed to resume authoritative simulation.
- Version energy network schemas and define migration or safe rejection for unsupported versions.
- Persist fairness cursors and transaction sequence state if they affect future allocation.
- Do not persist transient reservations as committed energy; release or deterministically reconstruct them on load.
- Use simulation tick and stable transaction IDs, not wall-clock timestamps or random IDs.
- For multiplayer, execute authoritative allocation on the server/authority and replicate committed results, not client predictions as truth.
- Replay must reproduce transaction ordering, rounding, losses, and final stored energy from the same inputs and versioned rules.

## Failure and observability

Define stable outcomes for insufficient supply, full destination, rate limit, disconnected path, stale topology, invalid endpoint, overflow, incompatible unit, and duplicate transaction.

Expose counters or traces for requested/delivered energy, losses by category, rejected transfers by reason, reservation rollbacks, per-priority unmet demand, and network work budget. Observability must not mutate simulation state or change allocation order.

## Validation checklist

- [ ] Existing resource, machine, command, clock, save, and network contracts are inspected.
- [ ] Energy units, rate units, numeric representation, conversions, rounding, and overflow are explicit.
- [ ] Transfer reservation, commit, rollback, and duplicate handling are atomic.
- [ ] Conservation reconciles source debit, destination credit, and every loss category.
- [ ] Source/destination capacity and per-tick rate limits cannot be exceeded.
- [ ] Priority, fairness, and starvation behavior are deterministic.
- [ ] Path selection and topology versioning are deterministic and bounded.
- [ ] Save/load and replay preserve state that influences future allocation.
- [ ] Multiplayer authority and replication boundaries are explicit.
- [ ] Tests cover conservation, rounding, overflow, rollback, fairness, topology changes, replay, and persistence.
- [ ] No implementation or test is claimed unless it was actually changed and executed.

## Required output

1. Evidence map for existing, accepted, planned, and unknown machine/resource contracts.
2. Canonical energy unit and numeric/rate representation.
3. Transaction state machine and atomic reservation/rollback design.
4. Conservation equation and loss-accounting example.
5. Deterministic priority/fairness allocation policy.
6. Topology/path/loss rules and bounded-work limits.
7. Persistence, replay, multiplayer, and observability decisions.
8. ADR draft, test matrix, executed commands/results, and remaining risks.

## Workflow

1. Pin NEXORA and inspect the live source tree plus the current machine plan and relevant architecture decisions.
2. Mark each concept as implemented, accepted, planned, or unknown.
3. Identify existing resource and machine APIs to reuse; document any ownership conflict.
4. Define canonical units, numeric representation, rate conversion, rounding, and overflow behavior.
5. Specify the transaction lifecycle and conservation equation.
6. Specify source/destination reservation atomicity and rollback semantics.
7. Define deterministic priority allocation, fairness, and starvation behavior.
8. Define path selection, topology versioning, per-edge loss, and bounded work.
9. Specify save/load, replay, multiplayer authority, and stable transaction IDs.
10. Write an ADR and a test matrix before runtime implementation.
11. Implement only within the accepted Machine System lifecycle and simulation tick.
12. Report exact changed paths, commands, test results, and unverified behavior.

## Validation checklist

- [ ] Existing resource, machine, command, clock, save, and network contracts are inspected.
- [ ] Energy units, rate units, numeric representation, and conversions are explicit.
- [ ] Rounding, remainder, overflow, and minimum granularity are defined.
- [ ] Transfer reservation, commit, rollback, and duplicate handling are atomic.
- [ ] Conservation holds exactly in the canonical accounting unit.
- [ ] Source/destination capacities and per-tick rates cannot be exceeded.
- [ ] Priority and fairness rules are deterministic and starvation trade-offs documented.
- [ ] Path selection and topology versioning are deterministic and bounded.
- [ ] Loss categories are applied once and fully accounted.
- [ ] Save/load and replay preserve all state that influences future allocation.
- [ ] Multiplayer authority and replication boundaries are explicit.
- [ ] Tests cover conservation, rounding, overflow, rollback, fairness, topology changes, replay, and persistence.
- [ ] No implementation or test is claimed unless it was actually changed and executed.

## Required output

1. Evidence map for existing, accepted, planned, and unknown machine/resource contracts.
2. Canonical energy unit and numeric/rate representation.
3. Transaction state machine and atomic reservation/rollback design.
4. Conservation equation and loss accounting example.
5. Deterministic priority/fairness allocation policy.
6. Topology/path/loss rules and bounded-work limits.
7. Persistence, replay, multiplayer, and observability decisions.
8. ADR draft, test matrix, executed commands/results, and remaining risks.

## Boundaries and failure handling

- Do not create a parallel resource, machine, scheduler, or network runtime.
- Do not use wall-clock time or nondeterministic iteration for authoritative allocation.
- Do not use floating-point rounding that can create or destroy unaccounted energy.
- Do not debit or credit state before a transaction can commit atomically.
- Do not silently clamp overflow, invalid units, or incompatible endpoints.
- Do not treat planned concepts as implemented engine features.
- If existing NEXORA contracts conflict, stop and propose an ADR rather than bypassing ownership boundaries.

## Trigger examples

- **Positive:** Design deterministic energy transfers between generators, batteries, and machine consumers.
- **Positive:** Audit energy conservation, transfer losses, rate limits, and priority allocation.
- **Positive:** Specify transaction rollback and replay-safe energy network behavior.
- **Negative:** Design digital logic gates and signal graphs; use `nexora-machine-logic-graph-contract`.
- **Negative:** Audit an external chip library's license or source; use `nexora-digital-logic-library-integration-audit`.
