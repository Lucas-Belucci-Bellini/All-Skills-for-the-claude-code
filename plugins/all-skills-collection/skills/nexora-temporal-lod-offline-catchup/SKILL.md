---
name: nexora-temporal-lod-offline-catchup
description: "Designs and validates bounded time catch-up when NEXORA entities, regions, ecology or climate move between FULL, REGIONAL and ABSTRACT simulation LOD."
---

# NEXORA Temporal LOD Offline Catch-up

## Purpose

Use this workflow when a distant or sleeping NEXORA region stops receiving detailed per-tick simulation and later returns to higher fidelity. It governs the temporal handoff: what state is retained, how elapsed authoritative world time is accounted for, how aggregate simulation advances, and how detailed entities are rehydrated without duplicated or lost progress.

This is not a generic entity activation or AI tick-budget workflow. It specifically covers the correctness of state across time spent at lower simulation fidelity, including long absences, save/load, time scaling, and transitions between FULL, REGIONAL and ABSTRACT representations.

## Verified source boundary

The audited NEXORA documentation snapshot is `92cc410999c05b0afcb8210c3d8bd4cdbec33d9e`. Re-check current implementation and plans before relying on these observations:

- `docs/plans/Entity System.md` describes rehydration from regional state, entity sleep/wake triggers (player, event, proximity, schedule), simulation priorities, component frequencies (AI at 10 Hz, health event-driven, animation per frame, needs per minute), and an `EntityScheduler` responsible for tick/wake/sleep/priority.
- The same plan describes temporal LOD: FULL uses high frequency, REGIONAL uses low frequency, and ABSTRACT is a lower-detail representation. These are design statements, not evidence that a complete runtime handoff already exists.
- `docs/plans/MOB ECOLOGY + CIVILIZATION + ECONOMY + EMERGENT AI.md` distinguishes FULL individual simulation near the player from REGIONAL population/production/trade summaries farther away. It calls out event-driven daily economy, weekly settlement and seasonal ecology updates, plus multiple AI time scales.
- `docs/plans/CLIMATE and ATMOSPHERE.md` describes FULL local weather, REGIONAL aggregated weather and ABSTRACT statistical climate, with detailed state loaded when the player approaches.
- `docs/plans/TIME AND CALENDAR SYSTEM.md` defines one authoritative world clock, world-time scheduling, persistence of current world time/calendar/persistent tasks, and explicitly says authoritative simulation uses world time rather than wall-clock time except for local presentation services.

The audited plans do not, by themselves, specify a complete persisted temporal checkpoint format, deterministic catch-up algorithm, event coalescing policy, or proof that every subsystem can be reconstructed losslessly. Treat those as open design/implementation questions.

## Required inputs

- Exact NEXORA commit, active world-time implementation and simulation scheduler.
- Entity/region lifecycle state machine and FULL/REGIONAL/ABSTRACT ownership definitions.
- Persistent entity state, region aggregate schemas, and save/load checkpoint boundaries.
- Systems that advance while distant: needs, health/status, AI goals, population, production, trade, ecology, climate, weather and scheduled world events.
- Time-scale, pause, time dilation and server/client authority policies.
- Existing deterministic replay fixtures, region transition tests and workload budgets.

## Workflow

1. **Pin the implementation.** Record the exact commit and trace world clock, scheduler, entity sleep/wake, region LOD transitions, save/load, and all systems that consume world time. Distinguish code that exists from planning documents.
2. **Define the LOD state machine.** Specify legal transitions among FULL, REGIONAL, ABSTRACT, SLEEPING and UNLOADED where those states exist. Define the owner of authoritative state at each stage and make transitions idempotent.
3. **Choose the temporal checkpoint.** Persist the last processed authoritative `WorldTime` (or monotonic simulation tick) for every independently advanced region/domain. Never infer simulation elapsed time from process uptime or wall-clock timestamps unless a separately documented offline-time feature explicitly requires it.
4. **Partition state by fidelity.** Identify which values remain exact, which can be aggregated, which are derived, and which are intentionally frozen while distant. For every approximation, define its error bound and reconciliation behavior.
5. **Define catch-up semantics per subsystem.** Do not apply one generic catch-up loop to everything. Needs/status, population, production, trade, ecology, weather and scheduled events have different equations, event ordering and acceptable approximation policies.
6. **Use bounded advancement.** Process elapsed world time in bounded windows or mathematically safe aggregates. Cap per-load work, expose remaining catch-up debt, and allow continuation across ticks. Never run an unbounded loop proportional to years of elapsed time on the critical activation path.
7. **Preserve event semantics.** Classify scheduled events as exact, coalescible, replaceable by a summary, or safely skippable. Preserve ordering for causally dependent events and never silently discard authoritative, player-visible, economic or persistence events.
8. **Prevent double advancement.** When a region moves between LODs, establish a single handoff watermark. The detailed simulation must start strictly after the time already represented by the regional aggregate; do not replay time twice or leave a gap.
9. **Rehydrate deterministically.** Convert aggregate state into detailed entities using stable IDs/seeds and documented allocation rules. Define how population, inventories, resources, schedules and pending events map back to individual actors.
10. **Handle partial interruption.** Make catch-up resumable and idempotent. Persist progress or use deterministic replay so a crash halfway through does not duplicate production, consume needs twice, or lose an event.
11. **Coordinate world time.** Respect pause, time scale, custom calendars and server authority. A client must not independently advance authoritative region state. Wall-clock time is not a substitute for world time.
12. **Test boundary transitions.** Cover FULL→REGIONAL, REGIONAL→ABSTRACT, ABSTRACT→REGIONAL, REGIONAL→FULL, sleep/wake, unload/reload, server restart, player proximity and event-triggered wake.
13. **Test long absences and extremes.** Include zero elapsed time, one tick, one day, multiple seasons, long absence, large time-scale changes, clock pause/resume, catch-up budget exhaustion and malformed checkpoints.
14. **Compare equivalent histories.** Compare a region simulated continuously at high detail with one advanced through the declared lower-LOD model. Define exact equality for conserved/authoritative quantities and tolerances for intentionally approximate outcomes.
15. **Measure the activation cost.** Track catch-up duration, debt remaining, events processed/coalesced, entities rehydrated, aggregate-to-detail conversion cost, and worst-case region activation latency.
16. **Document approximation explicitly.** Report what is exact, approximate, frozen, discarded by policy, or still unknown. Never claim full simulation equivalence when regional summaries intentionally lose detail.

## Validation checklist

- [ ] Every LOD state and transition has one authoritative state owner.
- [ ] A persisted world-time watermark exists for each independently advanced region/domain.
- [ ] World time, not wall-clock time, drives authoritative catch-up.
- [ ] Each subsystem has explicit catch-up or freeze semantics.
- [ ] Aggregate state has defined invariants, error bounds and rehydration rules.
- [ ] Handoff watermarks prevent both duplicate and skipped advancement.
- [ ] Scheduled events preserve causal ordering and authoritative outcomes.
- [ ] Catch-up is bounded, resumable and idempotent under interruption.
- [ ] Save/load preserves checkpoint and catch-up progress.
- [ ] Server/client authority and pause/time-scale behavior are explicit.
- [ ] Continuous-FULL versus lower-LOD histories are compared with declared tolerances.
- [ ] Tests cover long absences, transitions, crashes and budget exhaustion.
- [ ] Metrics expose catch-up debt and worst-case activation latency.
- [ ] Exact tests run, approximations, skipped checks and unresolved risks are reported.

## Required output

Return:

- Exact NEXORA commit and code/docs paths inspected.
- LOD state machine and authoritative owner at each state.
- Per-subsystem temporal policy: exact, aggregate, frozen, derived or intentionally omitted.
- Checkpoint/watermark schema and catch-up algorithm.
- Event ordering/coalescing and idempotency strategy.
- Rehydration mapping and deterministic identity rules.
- Equivalence fixtures, tolerances, workload measurements and test results.
- Explicit approximation/loss report and unresolved risks.
- A decision: safe to implement, safe with bounded approximation, migration required, or inconclusive.

## Boundaries and failure handling

- Do not conflate chunk streaming residency with simulation fidelity; a loaded chunk may still be regionally simulated, and an unloaded region may retain persistent abstract state.
- Do not conflate entity sleep with pausing world time; timers must follow their declared world-time policy.
- Do not use wall-clock elapsed time for authoritative simulation unless offline progression is an explicit product rule.
- Do not reconstruct thousands of actors synchronously without a bounded activation budget.
- Do not silently discard authoritative events or financial/resource transactions to meet a frame budget.
- Do not claim deterministic equivalence when aggregate LOD intentionally loses detail.
- This workflow specifies an audit and validation method. It does not assert that NEXORA currently implements complete offline catch-up or modify runtime code.

## Trigger examples

- **Positive:** A distant settlement must advance production and population while represented only by a regional summary.
- **Positive:** A sleeping NPC wakes after several in-game days and needs correct needs, schedules and pending events.
- **Positive:** A weather region changes from aggregate climate to local cloud simulation when a player approaches.
- **Positive:** A save/load or server restart interrupts regional catch-up and must resume without duplicate simulation.
- **Negative:** The task only adjusts per-agent AI work each tick; use the AI tick-budget workflow.
- **Negative:** The task only changes chunk residency/pinning; use the chunk simulation activation or streaming lifecycle workflows.
- **Negative:** The task only defines the global fixed timestep; use the world simulation fixed-timestep workflow.
