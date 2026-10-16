---
name: civilization-resource-reservation
description: Validate atomic resource reservation and release across civilization production, construction, trade, and competing agent plans.
---

# Civilization Resource Reservation

## Goal

Prevent multiple simulated actors from spending the same inventory while preserving clear recovery when plans fail or are cancelled.

## Inputs to inspect

Inventory ledgers, resource-consuming plans, job queues, reservation tokens, cancellation paths and save/load behavior.

## Workflow

1. Map physical inventory, available quantity, reserved quantity, in-transit quantity and committed consumption as separate concepts.
2. Trace each plan from reservation request through confirmation, work progress, cancellation, failure, completion and persistence.
3. Create competing-plan scenarios that request the same scarce resources and prove reservations are atomic or serialized under the chosen concurrency model.
4. Inject crashes and cancellations between reservation and consumption; verify tokens are released, resumed or reconciled without duplication.
5. Add invariants and metrics for over-reservation, orphaned tokens, reservation age and resources blocked by abandoned plans.

## Validation checklist

- [ ] Available quantity never becomes negative and never includes resources already reserved by another owner.
- [ ] A reservation has a stable owner/plan ID and a clear expiry or recovery policy when the owner disappears.
- [ ] Consumption and reservation release are idempotent across retry and save/load.
- [ ] Trade, production and construction agree on the inventory ledger's source of truth.

## Required output

A reservation state machine, concurrency/cancellation tests and ledger invariants for competing civilization plans.

## Boundaries and failure handling

Do not fix double-spending by silently dropping a plan; preserve fairness and produce a visible conflict/retry reason.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
