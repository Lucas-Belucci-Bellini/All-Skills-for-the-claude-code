---
name: frontend-route-auth-guard-audit
description: Audit frontend route guards and server authorization to prevent client-only access restrictions and redirect loops.
---

# Frontend Route Auth Guard Audit

## Goal

Keep route navigation consistent while ensuring actual data access is protected by trusted server-side authorization.

## Inputs to inspect

Router configuration, session state, protected pages, server/API authorization, loading states, and deep-link behavior.

## Workflow

1. Inventory public, authenticated, role-restricted, and tenant-restricted routes; specify required identity/permission for each.
2. Trace guard behavior across initial load, restored session, token expiry, logout, role change, and direct deep links.
3. Verify every protected data operation is authorized server-side even if the route guard is bypassed or client state is manipulated.
4. Review redirect destinations, return URLs, query preservation, and loops when session state is unknown or refresh fails.
5. Test anonymous access, valid/expired sessions, insufficient roles, tenant switching, back/forward navigation, and direct URL entry.

## Validation checklist

- [ ] Client guards improve navigation but are not treated as the security boundary.
- [ ] Protected routes have explicit allowed roles/scopes and server-side enforcement.
- [ ] Unknown session state has a deliberate loading outcome rather than a flash of protected content.
- [ ] Redirect targets cannot create an open redirect or loop.
- [ ] Deep links work correctly after login while preserving only safe navigation intent.

## Required output

Produce a route-to-permission matrix, bypass findings, redirect-flow diagram, and role/session transition tests.

## Boundaries and failure handling

Do not store authorization decisions permanently in client state; do not expose private page data while waiting for session resolution.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
