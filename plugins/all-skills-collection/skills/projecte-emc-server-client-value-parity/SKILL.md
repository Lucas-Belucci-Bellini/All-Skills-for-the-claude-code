---
name: projecte-emc-server-client-value-parity
description: "Checks that server and client resolve the same EMC data and item identifiers. Use for multiplayer desyncs or inconsistent transmutation behavior."
---

# ProjectE Server/Client EMC Parity Audit

## Purpose

client/server mod versions, config hashes, registry dumps, sync logs, and join errors

## Required inputs

Compare exact ProjectE/config versions and the EMC-relevant registry subset on each side.

## Workflow

1. Confirm actual Minecraft, loader, ProjectE, and modpack versions; identify the exact config files and registry snapshot. Do not write to production paths while gathering evidence.
2. Classify mismatches as missing content, stale config, registry divergence, or failed synchronization; avoid editing values before isolating the cause.
3. A parity table with hashes, missing IDs, version mismatch, and safe remediation.
4. Validate the conclusion with a reproducible parse, comparison, disposable fixture, or reviewer record; label anything not run as blocked or unverified.
5. Produce never publish client/server configs or secrets from logs; use sanitized evidence. with exact version, candidate digest where available, and an actionable pass/fail/blocked status.

## Validation checklist

- [ ] Exact environment and config version are documented.
- [ ] Inputs reconcile to the registry, proposed diff, or release artifact under review.
- [ ] Validation evidence is recorded and unexecuted checks are not marked passed.
- [ ] Exclusions, parser failures, uncertainty, and human decisions remain explicit.
- [ ] Changes are reversible and do not modify production data without authorization.

## Required output

Never publish client/server configs or secrets from logs; use sanitized evidence.

## Boundaries and failure handling

A client shows an EMC value that differs from the dedicated server. If the required environment, files, parser, or reviewer is unavailable, return a partial report with precise blockers rather than claiming completion.

## Trigger examples

- **Positive:** Only single-player behavior is in scope and no client/server separation exists.
- **Negative:** undefined
