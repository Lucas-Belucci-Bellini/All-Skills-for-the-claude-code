---
name: skill-registry-backup-restore-test
description: "Tests restoration of registry metadata and release pointers. Use before service migrations or after a storage incident."
---

# Skill Registry Backup and Restore Test

## Purpose

catalog snapshot, release manifests, backups, restore target, and expected digests

## Required inputs

Back up the canonical catalog, release metadata, and required indexes with version and integrity markers.

## Workflow

1. Identify the exact service, release, or data boundary and applicable operational/security policy before changing behavior.
2. Restore into an isolated environment and compare IDs, versions, visibility states, provenance, and search readiness.
3. A restore test report with recovery steps, digest results, and observed recovery time.
4. Test both expected operation and the relevant denial/failure path in an isolated environment, capturing evidence without sensitive content.
5. Produce do not overwrite the live registry during restore testing or call an untested backup verified. with scope, observations, limitations, and safe recovery or escalation steps.

## Validation checklist

- [ ] The affected service/component and version are explicit.
- [ ] Allowed and denied/failure behavior is defined before testing.
- [ ] Evidence distinguishes observed results from assumptions and skipped checks.
- [ ] Sensitive identifiers, tokens, prompts, and private skill content are not exposed.
- [ ] Any release, revocation, credential rotation, or destructive action has explicit authorization and rollback criteria.

## Required output

Do not overwrite the live registry during restore testing or call an untested backup verified.

## Boundaries and failure handling

The broker must prove that catalog metadata can be recovered after corruption. If the operation requires production access or a security decision outside the approved scope, stop and provide a safe, actionable blocker rather than attempting it.

## Trigger examples

- **Positive:** The registry is an immutable repository checkout with no service data to restore.
- **Negative:** undefined
