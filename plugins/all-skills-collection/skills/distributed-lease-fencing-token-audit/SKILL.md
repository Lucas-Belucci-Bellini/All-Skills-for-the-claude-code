---
name: distributed-lease-fencing-token-audit
description: "Detect stale lease holders and verify monotonically scoped fencing tokens prevent expired workers from committing late writes."
---

# Distributed Lease Fencing Token Audit

## Purpose

Protect distributed work when a lease expires, a worker pauses or a new worker acquires ownership before the old worker resumes.

## Required inputs

Lease acquisition/renewal code, expiry semantics, clock assumptions, storage/write path, owner identity and fencing-token model.

## Workflow

1. Identify lease scope, expiry, renewal interval, clock source and how ownership is proven.
2. Trace every side effect after lease acquisition, including writes, publication, external calls and cleanup.
3. Verify each new lease gets a token that monotonically advances for that resource scope.
4. Test an old worker resuming after expiry while a new owner starts; downstream state must reject stale tokens.
5. Exercise restart, token persistence and downstreams that cannot enforce fencing; document residual split-brain risk.

## Validation checklist

- [ ] Lease scope and token lifetime are explicit.
- [ ] Tokens advance monotonically and are not reused after restart.
- [ ] Durable writes reject older accepted tokens.
- [ ] Worker cancellation is not the only protection against stale side effects.
- [ ] Unfenced downstream operations have a documented compensation or exclusivity mechanism.

## Required output

A lease/resource map, token contract, stale-owner tests and a list of unprotected side effects.

## Boundaries and failure handling

A distributed lock alone does not prove stale writes are impossible. Do not claim fencing is effective if protected storage never checks the token.

## Trigger examples

- **Positive:** A paused worker resumes after losing its lease and overwrites a newer result.
- **Negative:** Auditing ordinary database lock-wait latency without lease ownership.
