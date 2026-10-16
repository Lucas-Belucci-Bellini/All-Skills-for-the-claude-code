---
name: api-version-sunset-planning
description: "Use when planning retirement of an API version or endpoint and consumers must migrate safely; not for routine backward-compatibility review of an unplanned code change."
---

# Api Version Sunset Planning

## Purpose

Turn a proposed API sunset into an evidence-backed migration and removal process.

## Required inputs

Versioned routes, traffic/consumer inventory, support commitments, replacement API, telemetry availability, deprecation policy, and release schedule.

## Workflow

1. Inventory active consumers by version using aggregate telemetry, SDK versions, known integrations, and support records; mark blind spots explicitly.
2. Specify replacement behavior and migration examples, including removed fields, error changes, auth differences, and pagination or rate-limit changes.
3. Define a deprecation window with owner, communication checkpoints, measurable exit criteria, and a process for exceptional consumers.
4. Gate removal on evidence that exit criteria are met; prepare rollback or temporary compatibility options that do not silently re-enable a retired contract.

## Verification checklist

- [ ] The consumer inventory includes a stated confidence level and last-observed date.
- [ ] Migration guidance is runnable and includes breaking behavior differences.
- [ ] Sunset date, owner, notice channel, and exception policy are explicit.
- [ ] Removal criteria can be verified with telemetry or tests rather than intuition.

## Required output

A sunset plan with consumer inventory, migration checklist, notice timeline, measurable exit criteria, and rollback conditions.

## Boundaries and failure handling

Do not claim zero usage when telemetry is incomplete. Avoid putting identifiable customer usage data in the public migration note.

When required evidence, permissions, or environment details are unavailable, stop at the supported analysis, record the missing prerequisite, and do not report an unexecuted validation as passing.

## Trigger examples

- **Positive:** The team wants to remove `/v1` after clients move to `/v2`.
- **Negative:** Reviewing an API change that is intended to remain fully backward compatible.
