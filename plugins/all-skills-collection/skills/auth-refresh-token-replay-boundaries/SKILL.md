---
name: auth-refresh-token-replay-boundaries
description: "Use when testing refresh-token rotation and reuse detection under concurrent requests or replay; not for general OAuth/OIDC configuration review."
---

# Auth Refresh Token Replay Boundaries

## Purpose

Validate the boundaries that prevent stolen or stale refresh tokens from silently creating multiple active sessions.

## Required inputs

Refresh-token lifecycle, rotation rules, token-family model, grace-window policy, session storage, revocation endpoint, and a synthetic test client.

## Workflow

1. Document the refresh state machine, including token issuance, one-time consumption, replacement, family revocation, expiration, and logout.
2. Test normal refresh, parallel refresh races, replay of a consumed token, lost response followed by retry, expired token, and refresh after logout.
3. Inspect server-side atomicity so token consumption and replacement cannot both succeed for the same token family.
4. Verify client recovery behavior for ambiguous network outcomes and confirm logs record event identifiers rather than bearer values.

## Verification checklist

- [ ] A consumed token cannot mint multiple replacements outside an explicit, bounded grace policy.
- [ ] Parallel refresh behavior is deterministic and tested.
- [ ] Replay response and family/session revocation match the documented threat model.
- [ ] Tokens are never written into test reports, traces, or exception messages.

## Required output

A refresh-token state diagram, replay/concurrency test matrix, observed revocation behavior, and remediation list.

## Boundaries and failure handling

Use synthetic identities and tokens. Do not test against real users or attempt to replay anyone else's credentials.

When required evidence, permissions, or environment details are unavailable, stop at the supported analysis, record the missing prerequisite, and do not report an unexecuted validation as passing.

## Trigger examples

- **Positive:** Two browser requests refresh the same session at nearly the same time.
- **Negative:** Auditing redirect URI settings without any refresh-token lifecycle concern.
