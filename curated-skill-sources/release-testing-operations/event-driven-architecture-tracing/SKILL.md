---
name: event-driven-architecture-tracing
description: "Traces event flows across producers, brokers, consumers, and persisted state. Use when asynchronous workflows duplicate, drop, reorder, or stall events."
---

# Event Driven Architecture Tracing

## Use when
The same user action crosses many components, making it hard to identify where the event was lost or applied twice.

## Workflow
1. Map event producers, schemas, delivery guarantees, consumers, retries, dead-letter paths, and side effects.
2. Add stable correlation/causation IDs and record event version, consumer outcome, retry count, and processing latency.
3. Check idempotency, ordering boundaries, transactional outbox/inbox patterns, and poison-message behavior.
4. Replay a representative failure with duplicate, delayed, missing, and reordered events in a test environment.

## Required output
An event topology map, correlation scheme, delivery-semantics table, and failure reproduction/test plan.

## Validation
- Every critical event has an observable route and terminal status.
- Retry behavior cannot duplicate non-idempotent side effects silently.
- Monitoring distinguishes queue delay from consumer processing time.

## Guardrails
Do not infer exactly-once processing from a broker feature name; describe the actual end-to-end semantics.
