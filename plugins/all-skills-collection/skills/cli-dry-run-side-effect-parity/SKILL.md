---
name: cli-dry-run-side-effect-parity
description: "Verify a CLI dry run previews the same targets and operations as execution while remaining non-mutating."
---

# Cli Dry Run Side Effect Parity

## Purpose

Make previews trustworthy by sharing the planning path without performing writes, service calls or remote changes.

## Required inputs

Command plan, dry-run handling, mutation call sites, preview output and execution authorization.

## Workflow

1. Map plan construction to every side effect such as file writes, deletes, process launches and API requests.
2. Ensure dry-run and execution build the same targets and operation plan.
3. Test zero, one and many targets, conflicts, stale inputs and partial permissions.
4. Use fixtures or mocks that fail if dry run calls mutating APIs or writes outside scratch space.
5. Compare preview with isolated execution and document runtime-dependent differences.

## Validation checklist

- [ ] Dry run performs no external mutation.
- [ ] Preview identifies targets and relevant before/after state.
- [ ] Plan logic is shared rather than duplicated inconsistently.
- [ ] High-impact approval gates remain in force.
- [ ] Tests detect side effects added without preview handling.

## Required output

Side-effect map, dry-run contract, preview fixtures and parity regression tests.

## Boundaries and failure handling

Do not call a command safe solely because it has a dry-run flag. Distinguish previewed intent from actions actually executed.

## Trigger examples

- **Positive:** A cleanup preview lists 12 files while execution deletes 18.
- **Negative:** A read-only listing command with no writes or destructive choices.
