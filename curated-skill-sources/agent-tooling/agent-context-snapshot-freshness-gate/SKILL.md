---
name: agent-context-snapshot-freshness-gate
description: "Checks whether a delegated task's source snapshot remains valid before an agent acts. Use when project files, plans, permissions, or remote records can change between dispatch and execution."
---

# Agent Context Snapshot Freshness Gate

## Purpose

Make results reproducible and stop agents acting on obsolete assumptions.

## Required inputs

Snapshot manifest, revisions/digests, dependency list, age policy, freshness-critical fields, and refresh capability.

## Workflow

1. Capture revisions, artifact digests, retrieval times, and permission versions at dispatch.
2. Classify inputs as immutable, age-sensitive, revision-sensitive, or requiring a live pre-action check.
3. Compare dependencies with authoritative versions before execution and consequential commit.
4. Refresh only stale dependencies needed for the task, then recompute dependent context.
5. Re-plan or stop when changed inputs invalidate assumptions or authorization.
6. Record the snapshot and refresh decisions in the result manifest.

## Validation checklist

- [ ] Freshness compares authoritative revisions where available.
- [ ] Age thresholds do not replace revision checks when state can change abruptly.
- [ ] Permissions and target identity are rechecked before commit.
- [ ] Derived context is refreshed when dependencies change.

## Required output

A snapshot manifest, freshness decision per dependency, refreshed inputs, and stale-context report.

## Boundaries and failure handling

Freshness checks cannot eliminate races after the check; use conditional writes for commits that depend on current state.

## Trigger examples

- **Positive:** An agent is asked to modify a branch after new commits may have landed.
- **Negative:** A self-contained immutable input has no external dependencies.
