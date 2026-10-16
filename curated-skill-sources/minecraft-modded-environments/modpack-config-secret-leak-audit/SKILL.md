---
name: modpack-config-secret-leak-audit
description: "Use when preparing configs/logs/crash bundles for sharing and must detect live credentials or private identifiers; not for mod compatibility."
---

# Modpack Config Secret Leak Audit

## Purpose

Prevent sensitive configuration values from being committed or attached to public bug reports.

## Required inputs

Config/defaultconfig files, launcher metadata, logs, crash reports, scripts, ignore rules, and sensitive-pattern guidance.

## Workflow

1. Inventory all files in the outgoing commit or archive, including logs, server lists, scripts and crash reports.
2. Scan for credential-like values, tokens, connection strings, private hosts, user paths, and identifiers; review context for false positives.
3. Replace sensitive values with explicit placeholders while keeping reproduction-relevant structure.
4. Re-scan the exact outgoing diff/archive and list categories requiring manual review.

## Verification checklist

- [ ] The exact final archive is scanned after redaction.
- [ ] Live secrets/private connection details are absent.
- [ ] Redaction preserves versions/config needed to diagnose.
- [ ] False positives are handled without reproducing secrets in the report.

## Required output

A share-readiness report with redacted paths, issue categories, scan evidence, and unresolved review items.

## Boundaries and failure handling

Never publish a secret to prove a finding; do not upload bundles to third-party scanners unless authorized.

When evidence, permissions, or environment details are missing, stop at the supported analysis, record the missing prerequisite, and do not report unexecuted validation as passing.

## Trigger examples

- **Positive:** A modpack crash bundle will be attached to a public issue.
- **Negative:** Resolving a mod dependency crash when no sensitive data is being shared.
