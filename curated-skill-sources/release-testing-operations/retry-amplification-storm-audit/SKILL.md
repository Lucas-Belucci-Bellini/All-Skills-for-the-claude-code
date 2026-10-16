---
name: retry-amplification-storm-audit
description: "Trace retries across clients, gateways, services and workers to detect multiplicative load amplification and coordinated retry storms."
---

# Retry Amplification Storm Audit

## Purpose

Find cross-layer retry interactions that turn one failing request into uncontrolled work.

## Required inputs

Call graph, retry policies at each layer, attempt counters, traffic rates, timeout behavior, backoff/jitter configuration and dependency capacity.

## Workflow

1. Map retry-capable layers on a representative path, distinguishing transport, application, queue redelivery and client retries.
2. Calculate the worst-case attempt multiplier for nested policies and identify additional fan-out or side effects.
3. Compare retry budgets with dependency capacity and caller deadlines; inspect shared fixed backoff intervals.
4. Simulate throttling, intermittent errors, timeout-after-commit and correlated failures; record original requests versus downstream attempts.
5. Recommend bounded attempts, jitter, server retry hints and overload shedding, then retest the measured attempt ratio.

## Validation checklist

- [ ] Each retry layer and maximum attempts are inventoried.
- [ ] Nested retries have a calculated bound and fit within deadlines.
- [ ] Retry rates are observable separately from original demand.
- [ ] Backoff avoids synchronized bursts.
- [ ] Timeout-after-commit does not repeat unsafe side effects.

## Required output

A retry topology, worst-case amplification calculation, observed metrics and prioritized remediation plan.

## Boundaries and failure handling

Do not multiply maxima without validating actual nesting. Do not replay a production failure to test amplification unless the blast radius is approved.

## Trigger examples

- **Positive:** Client, gateway and worker each retry the same failed request, causing a surge after recovery.
- **Negative:** Designing one queue's retry schedule without looking at other layers.
