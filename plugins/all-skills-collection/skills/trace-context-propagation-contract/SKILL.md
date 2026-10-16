---
name: trace-context-propagation-contract
description: "Use when request traces lose causal links across services, queues, or workers; not for trace storage cost tuning."
---

# Trace Context Propagation Contract

## Purpose

Use when request traces lose causal links across services, queues, or workers; not for trace storage cost tuning.

## Required inputs

Inputs: tracing configuration, service and queue boundaries, sampling policy, instrumentation, representative flows.

## Workflow

1. Map inbound, outbound, queue, retry, scheduled-job, batch, and fan-out boundaries.
2. Test normal, retry, malformed-context, and tracing-disabled paths; inspect parent/child links.
3. Ensure untrusted baggage never serves as tenant identity or authorization, and add regression assertions.

## Verification checklist

Checks: links match boundary contracts; retries do not merge unrelated requests; baggage cannot override authorization; tracing outages do not break application behavior.

## Required output

Output: boundary matrix, trace-link evidence, instrumentation gaps, and propagation contract.

## Boundaries and failure handling

Boundary: never put secrets or personal data in spans; trace metadata is not an authorization source.

When evidence, permission, or environment details are missing, document the limitation and do not claim unrun validation passed.

## Trigger examples

- Positive: Positive: a queued task loses the trace ID of the request that scheduled it.
- Negative: Negative: choosing trace retention duration.
