---
name: skill-distribution-permission-segregation
description: "Separates access to public skills, private skills, draft proposals, and release operations. Use when a shared registry serves agents or teams with different trust levels."
---

# Skill Distribution Permission Segregation

## Purpose

Ensure access to a skill's contents does not implicitly grant access to private sources, draft changes, other tenants, or release controls.

## Required inputs

Skill visibility labels, team and tenant model, registry endpoints, adapter identities, storage paths, and release permissions.

## Workflow

1. Classify each skill and support artifact as public, internal, project-restricted, secret-bearing (not eligible for skill storage), or unpublished draft.
2. Map identities and actions to minimum permissions: search metadata, read content, submit feedback, propose changes, approve, publish, revoke, and administer.
3. Enforce access checks on the server for both discovery and content retrieval; hiding names in the UI is not authorization.
4. Test direct-ID fetch, guessed paths, cross-tenant lookups, draft access, and attempts to invoke write endpoints with read-only credentials.
5. Document how access is removed when a user's role, workspace, or integration credential is revoked.

## Validation checklist

- [ ] Unauthorized clients cannot fetch restricted content by guessing its ID.
- [ ] Read permission does not imply propose, approve or publish permission.
- [ ] The same rules cover search results and direct content fetches.
- [ ] Credentials and private configuration are not stored in skills.
- [ ] Revocation has a documented and testable propagation path.

## Required output

A skill visibility taxonomy, endpoint permission matrix, negative-access test cases, and revocation procedure.

## Boundaries and failure handling

Never embed secrets in skills even if the folder is private. Do not rely on prompt instructions to enforce server-side access control.

If required evidence is missing, record the gap and stop before irreversible actions. Do not claim a test, network request, compatibility result, or approval occurred unless its evidence was observed.

## Trigger examples

- **Positive:** A private skills repository is being exposed to multiple agents, workspaces, or customer tenants.
- **Negative:** The task only reorganizes a local public collection with no restricted data or remote access.
