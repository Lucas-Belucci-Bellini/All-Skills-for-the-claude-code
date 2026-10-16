---
name: mcp-oauth-token-refresh-boundary-tests
description: "Use when an MCP integration must recover from OAuth expiry, revocation, or refresh races; not for minimizing API scopes."
---

# Mcp Oauth Token Refresh Boundary Tests

## Purpose

Use when an MCP integration must recover from OAuth expiry, revocation, or refresh races; not for minimizing API scopes.

## Required inputs

Inputs: MCP auth flow, token lifetime, refresh storage, clock assumptions, test identity provider/tenant.

## Workflow

1. Map token acquisition, expiry, refresh, rotation, persistence, and retries across client/server.
2. Test expiry mid-call, concurrent refresh, revocation, clock skew, provider outage, and restart.
3. Verify refresh state updates atomically and in-flight calls retry safely or request reauthentication.
4. Inspect logs/errors to ensure tokens and authorization headers never appear.

## Verification checklist

Checks: concurrent refresh cannot overwrite newer state; revoked credentials fail clearly; retries are bounded; logs exclude token values.

## Required output

Output: token lifecycle diagram, failure matrix, retry policy, redaction evidence.

## Boundaries and failure handling

Boundary: use test credentials and sandbox identity providers; never paste real tokens into output.

If evidence, permissions, or environment details are missing, document the limitation and don't report unrun checks as passing.

## Trigger examples

- Positive: Positive: MCP calls fail periodically because access-token expiry isn't handled.
- Negative: Negative: checking whether a token has too many scopes.
