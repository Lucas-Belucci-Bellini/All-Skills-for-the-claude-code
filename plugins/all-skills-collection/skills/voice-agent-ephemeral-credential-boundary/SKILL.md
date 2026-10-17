---
name: voice-agent-ephemeral-credential-boundary
description: "Audit a real-time voice client so permanent API secrets stay server-side and client credentials expire quickly."
---

# Voice Agent Ephemeral Credential Boundary

## Purpose

Keep credentials out of browser bundles, logs, URLs, and client-visible configuration while allowing a limited real-time session.

## Required inputs

Token broker, deployment environment, browser network traces, credential lifetime, authentication mode, and security tests.

## Workflow

1. Classify permanent secrets, short-lived client tokens, public keys, and non-secret configuration separately.
2. Trace credential minting, delivery, use, expiry, refresh, and diagnostics across server and browser boundaries.
3. Inspect bundle output, request URLs, logs, error messages, and persisted settings for secret exposure.
4. Test expiry, rejected credential, loopback-only authentication modes if present, and server-side configuration absence.

## Validation checklist

- [ ] Permanent provider keys never appear in client assets or API responses.
- [ ] Ephemeral credentials are short-lived and scoped to the minimum supported capability.
- [ ] Logs redact secret material even when token negotiation fails.
- [ ] The client fails closed when the credential is expired or unavailable.

## Required output

A credential-flow diagram, browser/log leakage checklist, and automated boundary tests.

## Boundaries and failure handling

Never copy real keys into fixtures or share links; do not treat any browser-injected value as secret.

## Trigger examples

- **Positive:** A browser-based voice agent requests short-lived access without exposing the permanent service key.
- **Negative:** A request to extract, store, or reuse another user's live voice credentials.
