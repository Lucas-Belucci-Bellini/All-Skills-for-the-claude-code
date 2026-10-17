---
name: skill-broker-content-digest-verification
description: "Verifies that retrieved skill bytes match their immutable digest. Use when distributing skill content through APIs or caches."
---

# Skill Broker Content Digest Verification

## Purpose

skill ID/version, expected digest, returned bytes, digest algorithm, and cache metadata

## Required inputs

Compute the digest over the exact agreed byte representation before parsing or transforming content.

## Workflow

1. Inspect the current canonical schema, relevant service/client boundary, and target environment before changing behavior.
2. Compare source, transport, and cache digests and reject mismatches before use.
3. A digest verification receipt with expected/observed hashes and content source.
4. Exercise positive, negative, unavailable, and malformed cases using test identities and fixture content; record actual outputs separately from expected outcomes.
5. Produce do not treat a matching name or version label as proof that the bytes are unchanged. and include exact contracts, evidence, limitations, and a safe next action.

## Validation checklist

- [ ] Inputs, outputs, and version assumptions are explicit.
- [ ] A positive path and at least one negative/failure path are tested.
- [ ] Authorization and integrity gates cannot be overridden by query relevance or client claims.
- [ ] Logs and fixtures contain no real credentials or unnecessary private content.
- [ ] Unrun runtime or provider checks are marked blocked/unverified.

## Required output

Do not treat a matching name or version label as proof that the bytes are unchanged.

## Boundaries and failure handling

A client downloads a pinned skill and must verify integrity. When evidence or provider capability is missing, return a structured blocker instead of guessing. Do not execute publish, revoke, deploy, or destructive operations during a read-path test.

## Trigger examples

- **Positive:** The task only reasons from instructions already included in the conversation.
- **Negative:** undefined
