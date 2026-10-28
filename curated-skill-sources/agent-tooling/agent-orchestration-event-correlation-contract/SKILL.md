---
name: agent-orchestration-event-correlation-contract
description: "Standardizes run, task, attempt, parent, and event identifiers across agent logs and artifacts. Use when tracing execution across workers, tools, and callbacks."
---

# Agent Orchestration Event Correlation Contract

## Purpose

Make a run traceable without storing raw prompts or secrets in correlation fields.

## Required inputs

Event schemas, log backend, logical IDs, provider trace IDs, privacy rules, and retention policy.

## Workflow

1. Define stable IDs for run, logical task, attempt, parent task, worker, and event sequence.
2. Propagate IDs through supported tool metadata, callbacks, and artifact manifests without embedding private prompt text.
3. Keep provider-specific trace IDs separate from library-level logical IDs.
4. Validate required identifier syntax at ingestion and surface providers that drop unsupported metadata.
5. Test nested delegation, retries, duplicate callbacks, asynchronous tools, and adapter boundaries.
6. Build a timeline query and label events whose correlation could not be preserved.

## Validation checklist

- [ ] Logical task and attempt IDs are not conflated.
- [ ] Correlation survives delegation where the platform supports it.
- [ ] IDs contain no secrets or raw private payloads.
- [ ] Lost metadata is visible in the report.
- [ ] Timeline joins use sequence or parent references, not timestamps alone.

## Required output

A versioned event schema, propagation map, privacy-reviewed ID policy, and sample timeline query.

## Boundaries and failure handling

Correlation IDs do not prove causality; use sequence numbers or explicit event-parent references for race-sensitive decisions.

## Trigger examples

- **Positive:** An operator must reconstruct a failed run across nested agents and tools.
- **Negative:** A local function has no asynchronous or cross-component event path.
