---
name: skill-broker-offline-fallback-contract
description: "Defines safe degraded behavior when a central skill broker or network is unavailable. Use when agents need resilience without silently using obsolete instructions."
---

# Skill Broker Offline Fallback Contract

## Purpose

Let clients continue safely when possible while making freshness and availability limitations visible.

## Required inputs

Broker availability objectives, local cache, pinned skill versions, revocation policy, network failures, and tasks classified by risk.

## Workflow

1. Classify tasks by whether they can use an offline cached skill, must require a fresh eligibility check, or must stop when the broker is unavailable.
2. Record cache provenance, immutable digest, fetch time, and known revocation/freshness state for every eligible offline skill.
3. Define retries with a cap and backoff; distinguish timeout, authentication denial, rate limiting, malformed payload, and a genuine no-match result.
4. Choose fallback behavior per error class; do not treat authorization denial or integrity mismatch as transient availability issues.
5. Test network loss before retrieval, midway through download, after a release, and after a simulated revocation.

## Validation checklist

- [ ] Offline use identifies the exact cached version and age.
- [ ] Untrusted or digest-mismatched content is rejected.
- [ ] Retries are bounded and do not repeat write side effects.
- [ ] No-match is distinguishable from service outage.
- [ ] High-risk tasks stop when freshness or revocation status is mandatory.

## Required output

A fallback decision table, retry policy, cache requirements, and outage test results.

## Boundaries and failure handling

Never conceal that a stale skill is being used. Do not bypass authorization or integrity checks because the broker is down.

If required evidence is missing, record the gap and stop before irreversible actions. Do not claim a test, network request, compatibility result, or approval occurred unless its evidence was observed.

## Trigger examples

- **Positive:** An agent must complete a permitted local analysis during a temporary broker outage.
- **Negative:** The task requires a freshly revoked or security-critical instruction and no safe offline mode exists.
