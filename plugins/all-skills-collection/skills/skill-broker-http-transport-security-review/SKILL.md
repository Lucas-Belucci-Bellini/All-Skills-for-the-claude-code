---
name: skill-broker-http-transport-security-review
description: "Reviews the remote transport and endpoint configuration used by a skill broker. Use when a broker serves agents over HTTPS or another remote channel."
---

# Skill Broker HTTP Transport Security Review

## Purpose

deployment topology, endpoint URLs, TLS setup, authentication, proxy and network policy

## Required inputs

Verify transport protection, host validation, redirect behavior, certificate trust, and authentication header handling.

## Workflow

1. Inspect the current canonical schema, relevant service/client boundary, and target environment before changing behavior.
2. Test downgrade, invalid certificate, redirect to untrusted host, and token leakage in diagnostic errors using safe fixtures.
3. A transport security report with risk, evidence, and remediation priorities.
4. Exercise positive, negative, unavailable, and malformed cases using test identities and fixture content; record actual outputs separately from expected outcomes.
5. Produce do not transmit private skill content or tokens over untrusted plaintext transport. and include exact contracts, evidence, limitations, and a safe next action.

## Validation checklist

- [ ] Inputs, outputs, and version assumptions are explicit.
- [ ] A positive path and at least one negative/failure path are tested.
- [ ] Authorization and integrity gates cannot be overridden by query relevance or client claims.
- [ ] Logs and fixtures contain no real credentials or unnecessary private content.
- [ ] Unrun runtime or provider checks are marked blocked/unverified.

## Required output

Do not transmit private skill content or tokens over untrusted plaintext transport.

## Boundaries and failure handling

A remote broker connection is being prepared for multiple agents. When evidence or provider capability is missing, return a structured blocker instead of guessing. Do not execute publish, revoke, deploy, or destructive operations during a read-path test.

## Trigger examples

- **Positive:** The whole registry is local and no network transport exists.
- **Negative:** undefined
