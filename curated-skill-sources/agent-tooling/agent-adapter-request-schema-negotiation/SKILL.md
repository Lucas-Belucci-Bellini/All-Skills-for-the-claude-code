---
name: agent-adapter-request-schema-negotiation
description: "Negotiates request/response schema versions across an adapter and broker. Use when one component updates before another."
---

# Agent Adapter Request Schema Negotiation

## Purpose

schema versions, supported fields, client/server compatibility policy, and fixture payloads

## Required inputs

Advertise supported schema ranges and define how required/optional fields are handled.

## Workflow

1. Identify the exact target provider/version, package or connection path, and relevant official contract before relying on platform behavior.
2. Test old-client/new-server and new-client/old-server cases, preserving safety-critical fields and stable statuses.
3. A schema compatibility matrix and fallback behavior.
4. Run the positive and negative conformance cases in an isolated environment, recording observed results and any untested capabilities.
5. Produce do not silently ignore unknown security-sensitive fields or coerce incompatible requests into a different action. with provider/version, evidence, limitations, and the next safe action.

## Validation checklist

- [ ] Tested provider and environment versions are recorded.
- [ ] Supported, unsupported, and unverified capabilities are distinguishable.
- [ ] At least one success path and one negative or failure path are covered.
- [ ] Private data and credentials are excluded from fixture output.
- [ ] No compatibility claim exceeds the evidence from the target environment.

## Required output

Do not silently ignore unknown security-sensitive fields or coerce incompatible requests into a different action.

## Boundaries and failure handling

A new broker adds optional metadata while some agents remain on an older adapter. If official documentation, workspace settings, or runtime evidence are unavailable, state the blocker and do not present integration as complete.

## Trigger examples

- **Positive:** Both sides are pinned to one schema version and no compatibility transition is planned.
- **Negative:** undefined
