---
name: nexora-job-queue-admission-budget
description: "Defines and validates safe admission, queue capacity, and producer backpressure for NEXORA's prioritized runtime JobSystem."
---

# NEXORA Job Queue Admission Budget

## Purpose

Use this workflow when NEXORA's runtime job scheduler needs a defensible bound on pending work, safe overload behavior, or a producer-facing admission contract. It is specifically about the gap between a fixed worker count and the amount of work the scheduler accepts; it complements `nexora-job-system-long-run-health`, `nexora-async-queue-fairness`, and `engine-job-system-backpressure` without replacing their long-run, fairness, or generic design coverage.

## Verified source boundary

Re-check the active checkout before applying these observations. They describe the inspected NEXORA snapshot `eed3dbcb68c7540decf08b3d55f2fae7feae8833`:

- `engine/runtime/src/jobs.rs` caps worker creation with `MAX_WORKERS = 256`, but initializes `State.pending` as `BinaryHeap::new()` without an explicit queue capacity.
- `JobSystem::submit` returns a `JobHandle` directly and calls `enqueue`; the inspected enqueue path increments submitted, stores a cancellation token, and pushes the job into the pending heap.
- `JobSystem::submit_all` boxes the whole input iterator into a `Vec`, then enqueues all jobs under one lock and returns all handles. The inspected API does not expose a partial-acceptance or queue-full result.
- `JobMetrics` reports queued, running and workers separately, but the inspected metrics do not expose a configured pending capacity, rejected submissions, producer wait time, or queued-byte estimates.
- `docs/plans/JOB SYSTEM.md` states that queues use backpressure and lists quotas among the intended tests. A plan statement is not proof that the runtime API currently enforces a queue bound.
- The existing priority heap orders higher priority first and earlier submissions first within a priority. A hard capacity without reserved lanes or an admission policy could let low-priority producers consume all slots before critical work arrives.

These are source observations, not a claim that a queue limit or overload policy has already been implemented.

## Required inputs

- Pinned NEXORA commit, Rust toolchain, target platform and build profile.
- All producers and their job classes: critical frame/save work, nearby world work, normal simulation, distant/background work, streaming, persistence and tools.
- Worker count, expected burst size, steady-state arrival rate, service-time distribution and acceptable queue age per class.
- Memory budget for queued closures and captured inputs; a count-only limit may be insufficient.
- Producer context: render/main thread, simulation thread, worker thread, IO thread or external caller.
- Required semantics for single submit, batch submit, cancellation, shutdown and overload reporting.

## Workflow

1. **Pin and map the code.** Record the commit and inspect `JobSystem::submit`, `submit_all`, `enqueue`, worker dequeue, cancellation, metrics, barriers and Drop. Find every caller and record whether it can handle rejection, retry, deferral or coalescing.
2. **Separate worker count from queue budget.** Document worker capacity, pending-job capacity, running work and retained results as different quantities. Do not use `MAX_WORKERS` or `MAX_RETAINED_RESULTS` as a substitute for a pending-queue bound.
3. **Classify producers.** Assign each producer a job class, urgency, maximum burst, expected payload/capture size, deadline and overload behavior. Critical work must not be silently rejected because a background producer filled a shared queue.
4. **Derive a budget from evidence.** Estimate queued memory as fixed per-entry overhead plus captured closure/input bytes, then validate with representative workloads. Set a count cap, byte cap, or both. Record the assumptions, headroom and target-hardware measurements behind each limit.
5. **Choose explicit admission semantics.** Define whether submission is nonblocking `try_submit`, deadline-bounded `submit_wait`, reserved-capacity admission, per-class quotas, or another documented policy. Return an explicit accepted/rejected/closed result; never return a normal-looking handle for work that was not accepted.
6. **Preserve batch atomicity deliberately.** For `submit_all`, choose and document one contract: all-or-nothing reservation, explicit partial acceptance with per-item results, or caller-side chunking. Avoid silently accepting an arbitrary prefix or allocating a huge temporary `Vec` before discovering that the queue is full.
7. **Avoid blocking latency-sensitive producers.** Do not wait for queue capacity while holding engine locks or from the render/frame-critical path. Prefer immediate rejection, coalescing replaceable work, bounded deferral or a caller-selected fallback.
8. **Protect critical capacity.** If priorities share a bounded queue, define reserved slots or per-class quotas so background/low-priority floods cannot prevent critical save/frame work from admission. Define what happens when a reserved lane is itself full.
9. **Make retries safe.** A rejected submission must not be retried in a tight loop. Use bounded retry count, backoff/deadline, deduplication keys or coalescing where appropriate; preserve cancellation and shutdown behavior.
10. **Define overload observability.** Extend metrics or tracing to distinguish accepted, rejected, deferred, coalesced and cancelled-before-start jobs. Record queue depth and age by class, high-water mark, admission wait, rejection reason and approximate queued bytes. Do not label a rejected job as submitted.
11. **Test adversarial interleavings.** Cover concurrent producers racing for the final slot, batch submissions at capacity, cancellation while queued, shutdown during blocked admission, worker completion waking waiters, and critical submissions during a background flood.
12. **Test resource and fairness effects.** Run sustained and bursty mixed-class workloads. Confirm memory remains within budget, critical admission remains possible under the declared policy, and queue age/starvation criteria are met. Use `nexora-async-queue-fairness` for scheduler fairness analysis.
13. **Validate caller migrations.** Every call site must handle the new admission result. Check world generation, chunk streaming, persistence, renderer handoff, editor tasks and any batch producer. Do not hide rejection by converting it to a fake completed handle.
14. **Document rollout compatibility.** If changing public signatures, provide a deliberate migration plan, deprecation window or wrapper with truthful failure semantics. Update tests, API docs and the technical-debt register only when the implementation and evidence support it.
15. **Publish a reproducible report.** Include workload seed, commit, limits, class quotas, memory model, queue time series, accepted/rejected counts, high-water marks, latency distributions, test results and remaining risks.

## Admission contract checklist

- [ ] Pending queue capacity is explicit and independently configured from worker count.
- [ ] If queued bytes are material, a byte budget is measured or conservatively bounded.
- [ ] Single-job admission returns an explicit result when full or shutting down.
- [ ] Batch submission documents all-or-nothing or partial acceptance semantics.
- [ ] Critical capacity is protected from background saturation.
- [ ] Latency-sensitive producers never block indefinitely waiting for capacity.
- [ ] Cancellation and shutdown races have defined outcomes.
- [ ] Rejected work is not counted as accepted/submitted.
- [ ] Metrics expose queue high-water, admission rejects, queue age and class attribution.
- [ ] Caller migrations handle rejection without spinning or losing authoritative work.
- [ ] Sustained mixed-load tests verify memory, fairness and overload recovery.

## Required output

Produce a Job Queue Admission Budget Report containing: pinned commit; producer/caller inventory; job-class table; worker, queue-count and queue-byte budgets; derivation and hardware assumptions; single and batch admission contract; critical-capacity policy; overload/retry behavior; metrics and queue-age evidence; concurrency/failure test matrix; call-site migration status; commands/tests actually run with results; PASS/FAIL/INCONCLUSIVE/NOT RUN per scenario; unresolved risks and proposed debt updates.

## Boundaries and failure handling

- Do not claim the current pending queue is bounded unless the inspected implementation enforces a finite admission limit.
- Do not equate a fixed worker count with a fixed queue capacity.
- Do not invent universal queue sizes or byte budgets; derive them from target hardware and workload measurements.
- Do not block the main/render thread or hold shared engine locks while waiting for admission.
- Do not silently drop authoritative persistence, save or simulation work.
- Do not retry rejected submissions indefinitely or in a tight loop.
- Do not claim overload safety from a unit test that never fills the queue.
- Do not update the technical-debt register to resolved until the runtime contract, caller migration and overload evidence are all verified.

## Trigger examples

- **Positive:** The NEXORA job queue grows without a clear upper bound during world generation or streaming.
- **Positive:** Critical jobs cannot be admitted while background jobs occupy the scheduler.
- **Positive:** The runtime needs a safe API for queue-full results and bounded batch submission.
- **Positive:** Reviewers need to distinguish worker count, pending capacity, retained outcomes and queued memory.
- **Negative:** The task only concerns long-run worker survival and result eviction; use `nexora-job-system-long-run-health`.
- **Negative:** The task only concerns priority starvation without admission-capacity changes; use `nexora-async-queue-fairness`.
