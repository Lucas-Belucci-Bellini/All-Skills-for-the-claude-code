---
name: skill-cache-coherence-audit
description: "Audits version freshness and invalidation across agents, local caches, and broker nodes. Use when clients may retain outdated skills after a release."
---

# Skill Cache Coherence Audit

## Purpose

Ensure agents do not continue to receive stale or revoked skill versions after an approved library update.

## Required inputs

Registry and cache metadata, release versions/digests, refresh policy, invalidation events, and client logs stripped of sensitive content.

## Workflow

1. Enumerate all cache layers and write down their key: stable skill ID, version, agent adapter, tenant, and any compatibility dimensions.
2. Choose and document freshness guarantees, time-to-live, explicit refresh behavior, and how revoked versions differ from ordinary new releases.
3. Trace a release through registry, broker, client cache, and returned skill; record the version/digest at each boundary.
4. Simulate stale cache, failed invalidation, disconnected clients, duplicated events, and a revoked version still requested by a client.
5. Report stale-version windows and introduce the smallest fix that meets the declared freshness/security requirement.

## Validation checklist

- [ ] Cache entries are keyed by immutable identity, not name alone.
- [ ] Release and revocation events are safe to process more than once.
- [ ] Revoked or unsafe versions cannot be returned as eligible latest.
- [ ] Offline clients disclose that their local copy may be stale.
- [ ] Freshness measurements state the test method and observed delay.

## Required output

A cache map, observed propagation timeline, invalidation failure cases, and remediation plan.

## Boundaries and failure handling

Do not assume a cache refresh succeeded merely because a release event was emitted. Avoid logging skill bodies or user prompts to prove freshness.

If required evidence is missing, record the gap and stop before irreversible actions. Do not claim a test, network request, compatibility result, or approval occurred unless its evidence was observed.

## Trigger examples

- **Positive:** Claude Code and Codex appear to use different versions of the same shared skill after an update.
- **Negative:** A task only requires reading a single static file without any cache or version lifecycle.
