---
name: cross-agent-skill-adapter-contract
description: "Defines adapter boundaries between a canonical skill registry and agent-specific interfaces. Use when exposing one skill library to Claude Code, Codex, ChatGPT, or another platform."
---

# Cross-Agent Skill Adapter Contract

## Purpose

Avoid maintaining separate, drifting copies of the library while respecting that each agent exposes different skill, tool, and installation mechanisms.

## Required inputs

Canonical skill schema, target agent documentation and version, supported retrieval/install methods, authentication model, and known platform limitations.

## Workflow

1. List capabilities the adapter must expose: search, fetch immutable version, inspect metadata, list dependencies, and report compatibility; separate optional write features.
2. Map each canonical field to a platform feature or mark it unsupported; never silently drop fields that affect safety, version, or provenance.
3. Define adapter behavior for unavailable methods, authentication failures, oversized skills, unsupported references, and stale caches.
4. Build a contract test fixture that can be run against every adapter without assuming that the providers share implementation details.
5. Publish a compatibility record with tested platform version, feature coverage, limitations, and the date/evidence of the last check.

## Validation checklist

- [ ] Canonical skill IDs and versions survive the adapter round trip.
- [ ] Unsupported features are returned as unsupported, not simulated as successes.
- [ ] Read access and write/publish access are separate permissions.
- [ ] Adapter errors use normalized statuses while preserving diagnostic causes.
- [ ] At least one successful and one unsupported-capability case are tested per target.

## Required output

An adapter contract, field mapping, feature matrix, error mapping, and per-platform conformance test cases.

## Boundaries and failure handling

Do not claim ChatGPT, Codex, or Claude supports a path until verified for the target environment. A skill adapter does not transfer another provider's tools, memory, permissions, or hidden configuration.

If required evidence is missing, record the gap and stop before irreversible actions. Do not claim a test, network request, compatibility result, or approval occurred unless its evidence was observed.

## Trigger examples

- **Positive:** The same curated skills need to be available through tested connectors for Claude Code and Codex.
- **Negative:** A team is writing a provider-specific skill used only inside one already-supported local runtime.
