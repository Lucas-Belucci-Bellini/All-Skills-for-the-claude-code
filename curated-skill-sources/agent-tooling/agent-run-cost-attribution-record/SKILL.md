---
name: agent-run-cost-attribution-record
description: "Attributes usage, latency, and retry overhead to parent runs, child tasks, and attempts. Use when a multi-agent workflow needs auditable budgets or cost-per-result metrics."
---

# Agent Run Cost Attribution Record

## Purpose

Explain where resources were spent without assigning shared or failed work to the last responding worker.

## Required inputs

Run/task/attempt IDs, provider usage fields, tool timings, pricing version, retries, cache hits, and retention rules.

## Workflow

1. Define stable ledger keys for parent run, child task, attempt, provider call, and tool operation.
2. Record provider-reported usage separately from local estimates and mark absent data explicitly.
3. Include retries, timeouts, cancellations, cache reuse, and failed calls so overhead remains visible.
4. Pin pricing model, timestamp, and units for monetary estimates.
5. Aggregate child events with deduplication and explicit rules for shared-cost allocation.
6. Report cost per accepted result with measurement coverage and precision caveats.

## Validation checklist

- [ ] Usage events deduplicate by call or operation identity.
- [ ] Observed, estimated, and absent values are distinct.
- [ ] Pricing version and units are explicit.
- [ ] Failed and retried work remains visible without logging secrets.

## Required output

A versioned cost-event schema, reconciliation, parent/child roll-up, and measurement-gap list.

## Boundaries and failure handling

Provider usage may be delayed or rounded; estimates are not invoices and must be labeled.

## Trigger examples

- **Positive:** A run fans research out to many agents and needs branch-level cost analysis.
- **Negative:** A local single-agent step has no meaningful usage accounting.
