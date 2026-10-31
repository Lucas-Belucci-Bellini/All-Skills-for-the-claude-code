---
name: nexora-memory-ledger-pressure-reporting
description: "Interprets NEXORA MemoryLedger pool reports, pressure thresholds, high-water marks, refusal counts, ownership boundaries, and at-rest leak signals without misclassifying retained memory."
---

# NEXORA Memory Ledger Pressure and Reporting

## Purpose

Use this workflow when investigating NEXORA memory pressure, reviewing subsystem pool reports, deciding whether a pool is over budget, or diagnosing suspected leaks after a frame/stage/lifecycle reaches a defined resting point.

This skill owns the interpretation and wiring of the Foundation `MemoryLedger` reporting contract. It does not replace concurrent memory admission, subsystem attribution/profiling, cache eviction policy, or lifecycle leak testing.

## Reuse before creating

- `nexora-memory-budget-admission` owns reservations and preventing concurrent producers from oversubscribing a shared ceiling.
- `nexora-memory-budget-attribution` owns workload baselines, subsystem measurement, growth traces, and contributor analysis.
- `nexora-memory-leak-lifecycle-test` owns repeated load/unload lifecycle leak experiments.
- `engine-memory-budget-profiling` owns broader CPU/GPU/process memory profiling.
- `nexora-cache-eviction-policy` owns cache victim selection and eviction behavior.

Use this workflow to interpret the ledger and its reports; route the adjacent tasks to their existing skills.

## Verified NEXORA snapshot

The inspected NEXORA `main` revision was `eed3dbcb68c7540decf08b3d55f2fae7feae8833`. Re-check the active checkout before relying on these observations.

- `engine/foundation/src/memory.rs` defines eight `MemoryClass` values: Engine, World, Frame, Streaming, Gpu, Network, Script, and Editor.
- `MemoryPool` is an account, not an allocator. The owner measures its total and calls `record(bytes)`; the pool stores the latest total, high-water mark, record count, refusal count, current pressure, and worst pressure.
- `record(bytes)` overwrites the recorded total; it is not a delta API. Calling it with a delta instead of the owner's absolute current total makes the report incorrect.
- The four thresholds are ordered `target <= warning <= critical <= emergency`; pressure is based on the highest threshold the usage is strictly above. Usage equal to a threshold remains in the lower pressure class.
- `MemoryBudget::capacity(bytes)` puts all four thresholds at capacity: a full cache is Nominal; only usage above capacity is Emergency.
- `PoolSpec::new` defaults `drains_at_rest` from the memory class. Frame scratch defaults to draining; persistent world memory does not. An owner may explicitly override this expectation with `PoolSpec::drains_at_rest()`.
- `MemoryLedger::register` rejects empty and duplicate names. Names are unique owner identities; two owners sharing one name would overwrite each other's totals.
- The ledger uses a `BTreeMap`, so reports are ordered by pool name. `MemoryReport::current_in` totals current recorded bytes by class; `worst()` reports the worst pressure seen by any pool.
- `suspected_leaks()` is meaningful only when the caller knows the system is at rest. It returns pools marked to drain whose current recorded bytes remain above zero.
- The ledger's `report()` and `pool()` methods default on a poisoned read lock rather than returning an error. An empty report or missing pool after a lock-poison event is therefore not proof that memory usage is zero; correlate diagnostics and registration failures.
- Pool atomics use relaxed ordering and each report is described as a consistent-enough picture, not a globally transactional snapshot. Do not treat concurrent multi-pool sampling as one exact instant.
- The source tests cover threshold boundaries, cache capacity semantics, high-water/worst-pressure retention, advisory admission, duplicate names, at-rest leak classification, class totals, stable name order, and shared pool use across threads.

These observations describe the inspected revision; they are not permanent API guarantees.

## Required inputs

- Exact NEXORA commit, Rust toolchain, and the phase at which the report is collected.
- Pool names, owners, classes, thresholds, `drains_at_rest` settings, and expected retained resources.
- Current `engine/foundation/src/memory.rs`, owner call sites for `record` / `refuse`, and relevant memory policy documents.
- The workload timeline: startup, active frame, chunk streaming, world save/load, shutdown, or another named resting boundary.
- Relevant structured diagnostics and the exact report snapshot; redact unrelated machine-identifying data.

## Workflow

1. **Pin the source and phase.** Record the NEXORA commit and identify whether the sample is taken during active work, between frames, after a stage, after unload, or after shutdown. Leak classification is invalid without a defined resting point.
2. **Inventory ownership before reading totals.** For every pool, identify the subsystem that actually holds the bytes. Register one pool per owner; do not create a second Streaming pool for chunk bytes that remain owned by World merely because Streaming decides residency.
3. **Verify pool identity.** Check names are non-empty, stable, and unique. A duplicate name is an ownership collision, not a harmless label conflict; registration should fail rather than combine two owners' totals.
4. **Check class and drain semantics.** Confirm the pool's `MemoryClass` and `drains_at_rest` flag match its lifetime. Frame scratch should drain; persistent world chunks may remain; a retained/transient staging pool may need an explicit override. Never classify every nonzero pool as a leak.
5. **Validate the record contract.** Inspect each owner call site and confirm it records the absolute bytes currently held. If an owner reports allocation deltas, cumulative totals, compressed input only, or a partial subset, correct the measurement model before interpreting pressure.
6. **Reconstruct the pressure boundary.** Verify threshold order and classify usage using strict greater-than comparisons: at target is Nominal, just above target is Elevated, just above warning is Warning, just above critical is Critical, and only above emergency is Emergency. Record exact bytes and threshold values.
7. **Interpret cache budgets separately.** For a capacity budget, full is Nominal and over-capacity is Emergency. Use refusal/eviction counts to understand a cache that is repeatedly full; do not label a correctly full cache as a warning merely because it is near capacity.
8. **Read current and historical signals together.** Compare current bytes, high-water mark, record count, current pressure, worst pressure, and refusals. A low current value does not erase a prior spike; a high-water mark alone does not prove a leak.
9. **Use refusal counts as demand evidence.** Correlate refusal increments with the owner operation and requested work. A refusal is a count of work turned down to stay within budget, not a count of bytes refused; collect the requested size separately if the diagnosis needs it.
10. **Run leak checks only at rest.** Query `suspected_leaks` after the documented boundary. Investigate only pools whose `drains_at_rest` is true and whose recorded current bytes remain nonzero. Persistent pools are not leaks merely because they retain legitimate world or cache state.
11. **Check ledger health before trusting absence.** If a pool unexpectedly disappears or the report is empty, inspect lock-poison diagnostics and registration failures. Because read-side methods can return `None` or an empty default on poison, do not interpret absence as zero usage without confirming ledger health.
12. **Account for snapshot concurrency.** Record the sampling time and phase. If owners update pools concurrently, report values are useful diagnostics but not a transactionally consistent global snapshot. For an exact experiment, quiesce the workload or add an explicitly coordinated sampling boundary.
13. **Compare class totals without double counting.** Use `current_in(class)` only after confirming each byte belongs to one owner pool. Never sum a parent's aggregate with its child pools or count a borrowed/resident view as a second allocation.
14. **Validate the implementation.** Run `cargo test -p nexora-foundation` for the current Foundation package, then add focused tests for any changed boundary or owner wiring. Inspect test output; do not claim the suite passed merely because these tests exist.
15. **Report actionable evidence.** Include pool owner/name/class, thresholds, current/high-water/worst pressure, records, refusals, drain policy, sample phase, ledger health, exact commands/results, and whether the finding is pressure, refused demand, retained cache, suspected leak, or unverified.

## Validation checklist

- [ ] Every pool has one real byte owner and a stable unique name.
- [ ] Owners call `record` with absolute current totals, not deltas.
- [ ] Class and `drains_at_rest` match the resource's actual lifetime.
- [ ] Threshold order and strict boundary comparisons are verified.
- [ ] Current pressure is interpreted alongside high-water, worst pressure, records, and refusals.
- [ ] A full cache is treated as nominal when using `MemoryBudget::capacity`.
- [ ] Leak checks run only at an explicitly named resting boundary.
- [ ] Lock-poison/default-empty behavior is considered before trusting absent reports.
- [ ] Concurrent sampling is not described as a globally atomic snapshot.
- [ ] Class totals do not double-count the same bytes across owners.
- [ ] Test and benchmark claims are tied to commands and outputs actually observed.

## Required output

Produce a memory-ledger interpretation report with the pinned commit, sample phase, pool ownership map, class and drain policies, threshold table, per-pool current/high-water/worst/refusal signals, class totals, suspected-leak list, ledger-health status, executed validation, unverified assumptions, and recommended owner-specific follow-up.

## Boundaries and failure handling

- Do not implement atomic reservations or solve concurrent oversubscription here; use `nexora-memory-budget-admission`.
- Do not replace subsystem profiling or growth attribution; use `nexora-memory-budget-attribution`.
- Do not infer leaks from a high-water mark, nonzero persistent pool, or process RSS alone.
- Do not query suspected leaks during active work and call the result a leak.
- Do not assume a full cache is over budget when its budget is configured as capacity.
- Do not silently treat a poisoned-lock empty report as zero memory.
- Do not sum overlapping parent/child or owner/borrower memory accounts.
- Do not publish fixed memory limits without measured hardware/workload evidence.

## Trigger examples

- **Positive:** A NEXORA memory report shows high pressure and the owner needs to distinguish current usage, a past spike, and refused work.
- **Positive:** A team needs to decide whether a nonzero pool after a frame, world save, or unload is a real leak.
- **Positive:** A memory pool reports zero or disappears unexpectedly and ledger lock health must be verified.
- **Positive:** Review a new `MemoryPool` integration for correct ownership, absolute totals, thresholds, and reporting.
- **Negative:** Multiple producers need atomic reservation before allocating; use `nexora-memory-budget-admission`.
- **Negative:** The task is broad process/GPU profiling or workload growth attribution; use `nexora-memory-budget-attribution`.
- **Negative:** The task is a repeated load/unload resource-lifecycle leak experiment; use `nexora-memory-leak-lifecycle-test`.
