---
name: agent-adapter-refresh-token-boundary
description: "Tests token refresh and expiry handling without leaking credentials across agent integrations. Use when the broker uses OAuth or refreshable tokens."
---

# Adapter Refresh Token Boundary Test

## Purpose

auth flow docs, test identity, token expiry controls, adapter logs, and revocation policy

## Required inputs

Use disposable test credentials to exercise expiry, refresh success, refresh denial, and token revocation.

## Workflow

1. Identify the exact target provider/version, package or connection path, and relevant official contract before relying on platform behavior.
2. Confirm secrets are not placed in request traces, skill content, exception strings, or cache keys.
3. A refresh boundary test report with redacted evidence and recovery behavior.
4. Run the positive and negative conformance cases in an isolated environment, recording observed results and any untested capabilities.
5. Produce never use a real personal token or print token material into diagnostics. with provider/version, evidence, limitations, and the next safe action.

## Validation checklist

- [ ] Tested provider and environment versions are recorded.
- [ ] Supported, unsupported, and unverified capabilities are distinguishable.
- [ ] At least one success path and one negative or failure path are covered.
- [ ] Private data and credentials are excluded from fixture output.
- [ ] No compatibility claim exceeds the evidence from the target environment.

## Required output

Never use a real personal token or print token material into diagnostics.

## Boundaries and failure handling

A provider connection expires and should recover through the documented auth flow. If official documentation, workspace settings, or runtime evidence are unavailable, state the blocker and do not present integration as complete.

## Trigger examples

- **Positive:** The integration is unauthenticated and no token lifecycle exists.
- **Negative:** undefined
