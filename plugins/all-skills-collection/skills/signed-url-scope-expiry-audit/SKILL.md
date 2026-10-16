---
name: signed-url-scope-expiry-audit
description: "Use when reviewing pre-signed object URLs for narrow permissions, expiry, and leakage risk; not for general access-control policy design."
---

# Signed Url Scope Expiry Audit

## Purpose

Use when reviewing pre-signed object URLs for narrow permissions, expiry, and leakage risk; not for general access-control policy design.

## Required inputs

Inputs: URL-signing code, object scope, method, expiry, constraints, log paths, provider semantics.

## Workflow

1. Map issuance to user, object, operation, content constraints, and max lifetime.
2. Inspect signature inputs/canonicalization including key encoding, method, headers, and response overrides.
3. Test expiry, altered method/path/header, cross-object substitution, revocation assumptions, and URL leakage.
4. Verify URL redaction and document the provider's actual invalidation behavior.

## Verification checklist

Checks: method/scope/expiry are explicit; tampering is rejected; revocation limits are honest; URLs/query signatures are redacted.

## Required output

Output: permission/expiry matrix, tampering results, exposure paths, remediation list.

## Boundaries and failure handling

Boundary: use disposable objects/test credentials; don't promise instant revocation without verified support.

If evidence or permissions are missing, record the blocker and don't report unrun validation as passed.

## Trigger examples

- Positive: Positive: an upload link remains reusable too long or targets another object.
- Negative: Negative: reviewing a service role that never issues signed URLs.
