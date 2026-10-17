---
name: cli-temp-artifact-cleanup-invariants
description: "Verify temporary files, staging directories and locks are removed or recoverable across success, failure, cancellation and restart."
---

# Cli Temp Artifact Cleanup Invariants

## Purpose

Prevent leftover artifacts from leaking data, blocking future runs or being mistaken for complete output.

## Required inputs

Temporary path creation, backup replacement logic, locks, cleanup handlers and resumability rules.

## Workflow

1. Inventory temp, stage, backup and lock artifacts with owner, lifetime and sensitivity.
2. Define cleanup for success, validation failure, write failure, cancellation and forced termination.
3. Check temporary names avoid collisions and deletion verifies ownership.
4. Simulate crashes between stage creation, replacement and backup removal.
5. Add diagnostics for stale artifacts when blind deletion would be risky.

## Validation checklist

- [ ] Temporary files use expected locations and appropriate permissions.
- [ ] Cleanup is idempotent and cannot delete unrelated files.
- [ ] Interrupted replacement leaves a recoverable state.
- [ ] Sensitive temporary content follows retention rules.
- [ ] Stale locks use ownership/age checks, not blind removal.

## Required output

Artifact lifecycle table, crash-point matrix, recovery tests and operator instructions.

## Boundaries and failure handling

Never recursively delete broad directories to fix stale artifacts. If ownership is uncertain, quarantine/report rather than remove.

## Trigger examples

- **Positive:** An old staging directory causes future builds to reuse stale generated files.
- **Negative:** Managing persistent user data intended to survive a command.
