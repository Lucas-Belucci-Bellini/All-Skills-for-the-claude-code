---
name: nexora-job-system-long-run-health
description: "Audits NEXORA's bounded worker pool under sustained and bursty workloads, including worker survival, queue pressure, retained-result eviction, and truthful long-run health reporting."
---

# NEXORA Job System Long-Run Health

## Purpose

Use this workflow when the NEXORA runtime job pool must be validated under prolonged use, burst submissions, cancellation, failures, panics, shutdown, or result-consumer lag. It focuses on the concrete contract in `engine/runtime/src/jobs.rs`: a fixed worker pool, cooperative cancellation, priority scheduling, panic containment, bounded outcome retention, and metrics that expose forgotten outcomes.

This is not a generic thread-pool sizing guide and it is not a replacement for `nexora-worker-pool-saturation`, `nexora-async-queue-fairness`, `nexora-performance-benchmark-contract`, `engine-job-system-backpressure`, or `simulation-long-run-memory-stability`. Reuse those for their respective concerns; this workflow validates the NEXORA-specific long-run interactions and evidence.

## Verified source boundary

Re-check the active checkout before applying these observations. They describe the inspected NEXORA snapshot `eed3dbcb68c7540decf08b3d55f2fae7feae8833`:

- `engine/runtime/src/jobs.rs` declares `MAX_WORKERS = 256`, a fixed worker pool, priority-ordered pending jobs, cooperative cancellation tokens, and caller-owned job handles.
- `JobOutcome` distinguishes `Completed`, `Cancelled`, `Failed`, `Panicked`, and `Forgotten`. `Forgotten` is explicitly not success and means the pool no longer knows the outcome.
- `MAX_RETAINED_RESULTS = 65_536` bounds retained outcomes. Oldest outcomes are evicted and counted in `forgotten_results`; callers must not assume every historical handle remains answerable.
- `JobMetrics` exposes submitted/completed/cancelled/failed counts, queued/running/worker counts, retained results, and forgotten results.
- A panicking job is caught so its worker can continue serving work. The source tests verify a subsequent job completes with a single worker.
- Existing tests cover barriers, pool drop/join, batch submission, cancellation, priority order, retained-result cap, oldest-result eviction, unknown handles, repeated waits, and the distinction between running and forgotten handles.
- `docs/plans/JOB SYSTEM.md` states that queues use backpressure and lists shutdown, starvation, deterministic results and quotas as test concerns. Do not infer that every listed policy is implemented merely because it appears in the plan.
- The inspected `State.pending` is a `BinaryHeap`; this source snapshot does not show an explicit pending-queue capacity. Treat admission/backpressure as a separate contract to verify, not as a proven property of the fixed worker count.

These are source observations, not a claim that the long-run test plan has already been executed.

## Required inputs

- Pinned NEXORA commit, Rust toolchain, build profile and target platform.
- Worker count and workload mix, including priority distribution and job duration distribution.
- Result-consumption policy: which caller waits for handles, when results are intentionally not collected, and how long they may remain outstanding.
- Cancellation, error and panic injection plan.
- Sampling interval and export format for `JobMetrics`.
- Run duration, warmup, repetition count, stop conditions and artifact-retention policy.

## Workflow

1. **Pin the implementation.** Record commit SHA and inspect `JobSystem::new`, submit/batch submit, cancel, wait, barrier, metrics, worker loop and Drop. Re-check constants and semantics rather than copying historical assumptions.
2. **Separate worker capacity from admission capacity.** Record worker count, queued jobs and running jobs independently. A fixed number of workers does not by itself bound the pending queue. If the queue can grow faster than workers consume it, identify the caller-side admission/backpressure mechanism and its actual limit.
3. **Define workload phases.** Include steady-state throughput, short bursts, sustained overload, mixed priorities, long-running jobs, cancellation-heavy work, failing jobs, panicking jobs, and periods with delayed result collection. Keep seeds and generated workload descriptors stable.
4. **Capture a baseline.** Sample submitted/completed/cancelled/failed, queued/running/workers, retained_results and forgotten_results at fixed intervals. Also capture process RSS/heap where available, CPU utilization, queue wait, execution duration, and shutdown duration; label each metric with its source and measurement method.
5. **Verify worker survival.** Inject a controlled panic and then submit a known-success job to the same pool. Confirm the panic is recorded, the worker remains available, and the follow-up job completes. Do not use a process-wide panic hook message alone as proof of worker health.
6. **Exercise retention deliberately.** Drive enough completed/cancelled outcomes to cross the configured retention cap in a controlled test. Verify retained_results stays at or below the cap, forgotten_results increases by the expected amount, the oldest result becomes Forgotten, and recent retained results remain queryable.
7. **Preserve outcome honesty.** Verify Forgotten is never interpreted as Completed, including in batch aggregation, telemetry, retries, persistence, and caller-facing reports. An unknown handle and an evicted result may share the public Forgotten outcome; callers must not infer which case occurred unless a separate identity/diagnostic field exists.
8. **Test wait semantics under concurrency.** Confirm wait blocks for a genuinely queued/running handle, returns a known terminal outcome after completion, can read a retained result repeatedly if that is the contract, and does not hang forever on a handle the pool never issued.
9. **Test cancellation races.** Cover cancellation before dequeue, after dequeue but before work begins, during cooperative work, after completion, and after the outcome has been evicted. State which races are guaranteed and which are intentionally best-effort.
10. **Check priority starvation.** Run sustained high-priority arrivals alongside low/background work. Measure queue wait by priority and define a project-approved starvation criterion. Do not assume FIFO fairness across priorities when the scheduler is priority-first.
11. **Check backlog and memory attribution.** Correlate queued/running counts with RSS and the MemoryLedger, but do not equate queue length with bytes. Measure captured closure/input sizes where feasible; identify whether caller-owned handles, queued closures, retained results or external result buffers dominate memory.
12. **Exercise barriers and shutdown.** Confirm barriers account for all outstanding work at the intended scope. During shutdown, verify queued work policy, cooperative cancellation behavior, worker joins, and a finite shutdown deadline. A test must have an escape path for blocked workers to avoid deadlocking the test process itself.
13. **Repeat and compare.** Run multiple identical trials after warmup. Report median and tail values (p95/p99 where sample count supports them), throughput, queue wait, backlog slope, memory slope, forgotten-result rate and shutdown latency. Keep build mode, hardware, worker count and workload constant for comparisons.
14. **Classify outcomes.** Mark each scenario PASS, FAIL, INCONCLUSIVE or NOT RUN. A run that ends before the workload drains is not a pass; a flat RSS line does not prove no logical leak; a bounded retained-results map does not prove the pending queue is bounded.
15. **Publish actionable findings.** For each failure include the first divergent metric, time window, workload phase, relevant handles/priorities, reproduction seed and smallest reproduction. Separate confirmed defects from hypotheses and follow-up design proposals.

## Long-run acceptance checklist

- [ ] Worker count remains within the configured construction limit.
- [ ] Queued and running counts reconcile with submitted and terminal outcomes.
- [ ] Queue growth is measured separately from worker count and retained results.
- [ ] Panics are recorded without silently removing a worker.
- [ ] Cancellation outcomes match the documented race semantics.
- [ ] Retained results never exceed the configured cap.
- [ ] Evicted outcomes increment forgotten_results and are never reported as success.
- [ ] Unknown handles return without indefinite waiting.
- [ ] Priority starvation is measured rather than assumed absent.
- [ ] Memory/RSS and queue backlog are tracked as separate signals.
- [ ] Barriers and shutdown complete within explicit test deadlines.
- [ ] Repeated runs include workload identity, build, hardware and metric provenance.

## Required output

Produce a Job System Long-Run Health Report containing: pinned commit and toolchain; worker count; workload phases and deterministic seed; sampling interval; queue/running/worker time series; submitted and terminal outcome reconciliation; retained/forgotten result counts; panic and cancellation injection outcomes; queue wait and execution latency distributions; memory/RSS trend; priority starvation observations; barrier and shutdown results; executed/unexecuted commands; PASS/FAIL/INCONCLUSIVE/NOT RUN per scenario; confirmed defects, hypotheses and unresolved risks.

## Boundaries and failure handling

- Do not claim the pending queue is bounded merely because the worker pool is fixed-size.
- Do not claim a job succeeded when its outcome is Forgotten or unknown.
- Do not treat a panic log as proof that the worker survived; submit and await follow-up work.
- Do not interpret RSS alone as allocator leak evidence or queue length as a byte count.
- Do not claim starvation freedom without mixed-priority sustained-load evidence.
- Do not use unbounded or indefinitely blocking test jobs without an external release/deadline path.
- Do not prescribe a universal worker count or queue capacity without target-hardware measurements.
- Do not claim long-run stability from unit tests alone; distinguish deterministic contract tests from sustained runtime trials.

## Trigger examples

- **Positive:** Verify the NEXORA job pool remains healthy after hours of mixed workloads and injected panics.
- **Positive:** Diagnose rising queued jobs, forgotten outcomes or memory growth during sustained generation/streaming work.
- **Positive:** Validate retention-cap behavior and ensure callers never treat Forgotten as successful completion.
- **Positive:** Test shutdown and barrier behavior while work is queued, running and being cancelled.
- **Negative:** The task is only generic worker-pool saturation or capacity sizing; reuse `nexora-worker-pool-saturation` and `engine-worker-capacity-sizing`.
- **Negative:** The task is only generic simulation memory soak methodology; reuse `simulation-long-run-memory-stability` and `simulation-soak-test-design`.
