---
name: feature-flag-expiry-enforcement
description: "Use when temporary feature flags need owners, expiry, cleanup criteria, and stale-branch detection; not for choosing canary percentages."
---

# Feature Flag Expiry Enforcement

## Purpose

Prevent temporary flags becoming permanent hidden complexity or leaving obsolete branches untested.

## Required inputs

Flag registry, owner, creation date, purpose, rollout state, cleanup date, code references, tests, configuration sources.

## Workflow

1. Classify flags as release, experiment, operational kill switch, permission, or long-lived configuration.
2. Require an owner, renewal/removal date, terminal state, and explicit justification for retaining expired flags.
3. Trace references across source, config, tests, and telemetry; identify the branch that will remain after cleanup.
4. Prepare a narrow deletion change and test the surviving behavior plus stored-value migration if needed.

## Verification checklist

- [ ] Expired flags are reported with owners and code references.
- [ ] Operational kill switches follow a different policy from temporary release flags.
- [ ] Cleanup tests the surviving behavior and removes obsolete branches.
- [ ] Missing owners or ambiguous terminal states are blockers.

## Required output

A lifecycle report of stale flags, owners, removal candidates, regressions, and verification steps.

## Boundaries and failure handling

Do not delete flags or change production configuration without approval; preserve audit history.

When evidence, permissions, or environment details are missing, stop at the supported analysis, record the missing prerequisite, and do not report unexecuted validation as passing.

## Trigger examples

- **Positive:** A shipped feature still has branches behind an expired release flag.
- **Negative:** Picking a traffic percentage for a new canary.
