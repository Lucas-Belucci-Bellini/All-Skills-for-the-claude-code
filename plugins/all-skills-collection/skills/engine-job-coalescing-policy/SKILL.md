---
name: engine-job-coalescing-policy
description: Identify duplicate or obsolete engine jobs and define safe coalescing rules for repeated asset, chunk, rebuild, and refresh requests.
---

# Engine Job Coalescing Policy

## Goal

Avoid wasting bounded worker capacity on repeated requests whose earlier work has become redundant.

## Inputs to inspect

Job keys, enqueue/cancel paths, resource revisions, task side effects, priority rules and queue telemetry.

## Workflow

1. Group job types by equivalence key and determine whether repeated requests are identical, superseding, mergeable or must remain distinct.
2. Define coalescing semantics for queued versus running jobs, including how the latest revision, highest priority and all waiting callers are represented.
3. Test rapid repeated edits/requests, cancellation, failure, different parameters and work with externally visible side effects.
4. Verify that a stale job cannot publish output after a newer revision has been accepted and that all waiters receive a coherent result or error.
5. Measure reduction in enqueued/executed work and ensure deduplication metadata and key storage remain bounded.

## Validation checklist

- [ ] Only jobs proven equivalent or superseding are merged.
- [ ] Merged callers receive defined completion/error semantics; none wait forever on a removed job.
- [ ] Side effects are not duplicated or dropped when jobs are coalesced.
- [ ] Revision/version guards prevent stale results from winning a race.

## Required output

A job coalescing matrix, key and version contract, concurrent-request tests and measured queue/work reduction.

## Boundaries and failure handling

Do not coalesce operations merely because their names match; compare inputs, side effects, resource version and completion guarantees.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
