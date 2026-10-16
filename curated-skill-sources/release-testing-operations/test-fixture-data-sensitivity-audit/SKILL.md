---
name: test-fixture-data-sensitivity-audit
description: "Use when fixtures, snapshots, or golden files may contain copied production data, credentials, or personal information; not for runtime logs alone."
---

# Test Fixture Data Sensitivity Audit

## Purpose

Use when fixtures, snapshots, or golden files may contain copied production data, credentials, or personal information; not for runtime logs alone.

## Required inputs

Inputs: fixture directories, snapshots, provenance, data classification, and history scope.

## Workflow

1. Inventory fixture origin and whether files derive from production, users, or support tickets.
2. Scan suspicious values and review false positives using minimal excerpts.
3. Replace real values with synthetic data preserving test relationships and edge cases.
4. Re-scan current files and packaged snapshots; report historical exposure separately if authorized.

## Verification checklist

Checks: provenance recorded or unknown; synthetic replacements retain edge cases; current and packaged files checked; report doesn't repeat discovered sensitive data.

## Required output

Output: fixture inventory, findings, replacement plan, final scan evidence.

## Boundaries and failure handling

Boundary: don't publish sensitive values; don't rewrite shared history or force-push without approval.

If evidence, permissions, or environment details are missing, document the limitation and don't report unrun checks as passing.

## Trigger examples

- Positive: Positive: a snapshot contains a real customer email and account ID.
- Negative: Negative: validating JSON log fields when all fixtures are synthetic.
