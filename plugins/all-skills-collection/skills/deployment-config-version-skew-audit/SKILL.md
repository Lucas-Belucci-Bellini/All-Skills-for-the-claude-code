---
name: deployment-config-version-skew-audit
description: "Use when rolling deployments mix application versions with incompatible config or schema expectations; not for container image reproducibility."
---

# Deployment Config Version Skew Audit

## Purpose

Use when rolling deployments mix application versions with incompatible config or schema expectations; not for container image reproducibility.

## Required inputs

Inputs: app-version matrix, config schema, feature values, secret/key identifiers (never secret values), stages, compatibility policy.

## Workflow

1. Build compatibility matrix for old/new application against current/next config and schema, including rollback states.
2. Identify field/default changes and define handling for unknown or missing values.
3. Exercise mixed-version rollout, delayed propagation, partial rollback, and stale startup config.
4. Gate promotion on supported combinations and record safe version fingerprints.

## Verification checklist

Checks: supported app/config combinations explicit; rollback tolerates propagated config; defaults don't bypass controls; fingerprints never expose credentials.

## Required output

Output: compatibility matrix, rollout evidence, unsupported combinations, promotion/rollback order.

## Boundaries and failure handling

Boundary: don't dump secret values while comparing configuration; avoid production experiments without approval.

If evidence or permissions are missing, record the blocker and don't report unrun validation as passed.

## Trigger examples

- Positive: Positive: old instances crash because new config arrives before new code.
- Negative: Negative: comparing independently built container digests.
