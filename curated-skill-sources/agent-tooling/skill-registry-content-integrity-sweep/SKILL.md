---
name: skill-registry-content-integrity-sweep
description: "Periodically checks stored skill bytes against known digests. Use when files or caches may be corrupted or modified outside the release pipeline."
---

# Skill Registry Content Integrity Sweep

## Purpose

canonical catalog, expected digests, bundle directories, and scan scope

## Required inputs

Enumerate approved skill IDs and fetch or inspect each corresponding file within the allowed scope.

## Workflow

1. Identify the exact service, release, or data boundary and applicable operational/security policy before changing behavior.
2. Compare digests and metadata, quarantine mismatches, and preserve paths and timestamps as evidence.
3. An integrity sweep report with matches, missing files, mismatches, and quarantine actions.
4. Test both expected operation and the relevant denial/failure path in an isolated environment, capturing evidence without sensitive content.
5. Produce integrity mismatch must block serving the affected content; do not silently regenerate a trusted digest from suspicious bytes. with scope, observations, limitations, and safe recovery or escalation steps.

## Validation checklist

- [ ] The affected service/component and version are explicit.
- [ ] Allowed and denied/failure behavior is defined before testing.
- [ ] Evidence distinguishes observed results from assumptions and skipped checks.
- [ ] Sensitive identifiers, tokens, prompts, and private skill content are not exposed.
- [ ] Any release, revocation, credential rotation, or destructive action has explicit authorization and rollback criteria.

## Required output

Integrity mismatch must block serving the affected content; do not silently regenerate a trusted digest from suspicious bytes.

## Boundaries and failure handling

A periodic job checks whether distributed skills still match approved releases. If the operation requires production access or a security decision outside the approved scope, stop and provide a safe, actionable blocker rather than attempting it.

## Trigger examples

- **Positive:** No stored or distributed skill files exist to compare.
- **Negative:** undefined
