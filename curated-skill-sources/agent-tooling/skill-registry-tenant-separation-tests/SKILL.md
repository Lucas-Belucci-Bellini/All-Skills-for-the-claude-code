---
name: skill-registry-tenant-separation-tests
description: "Tests tenant isolation across registry search, fetch, cache, and gap-report operations. Use when private skills are scoped to teams or workspaces."
---

# Skill Registry Tenant Separation Tests

## Purpose

tenant fixtures, test identities, skill visibility labels, and endpoint matrix

## Required inputs

Create test records visible to only one tenant and exercise all search, exact-fetch, alias, and cached-retrieval paths.

## Workflow

1. Identify the exact service, release, or data boundary and applicable operational/security policy before changing behavior.
2. Try cross-tenant and guessed-ID access with least-privilege identities and assert consistent denial.
3. A tenant isolation suite with allowed/denied results and paths not yet covered.
4. Test both expected operation and the relevant denial/failure path in an isolated environment, capturing evidence without sensitive content.
5. Produce do not use real customer data or credentials; synthetic fixtures are sufficient. with scope, observations, limitations, and safe recovery or escalation steps.

## Validation checklist

- [ ] The affected service/component and version are explicit.
- [ ] Allowed and denied/failure behavior is defined before testing.
- [ ] Evidence distinguishes observed results from assumptions and skipped checks.
- [ ] Sensitive identifiers, tokens, prompts, and private skill content are not exposed.
- [ ] Any release, revocation, credential rotation, or destructive action has explicit authorization and rollback criteria.

## Required output

Do not use real customer data or credentials; synthetic fixtures are sufficient.

## Boundaries and failure handling

Two teams share infrastructure but must not read one another's private skills. If the operation requires production access or a security decision outside the approved scope, stop and provide a safe, actionable blocker rather than attempting it.

## Trigger examples

- **Positive:** All content is public and no tenant boundary exists.
- **Negative:** undefined
