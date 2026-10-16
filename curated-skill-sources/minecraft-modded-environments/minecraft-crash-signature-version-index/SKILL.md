---
name: minecraft-crash-signature-version-index
description: "Cluster crash reports by normalized stack signature and record mod, loader, Java and environment versions to detect regressions across pack updates."
---

# Minecraft Crash Signature Version Index

## Purpose

Turn many crash reports into a searchable regression index without claiming co-occurrence proves cause.

## Required inputs

Crash logs/reports, manifests, game/loader/Java versions, environment data and privacy rules.

## Workflow

1. Extract crash phase, exception type, normalized leading frames, mod IDs and version metadata.
2. Build a signature that removes unstable line numbers/timestamps but preserves failure-path differences.
3. Group reports and compare first/last observed pack revision and environment.
4. Separate direct evidence from suspected causality; mark truncated or conflicting traces ambiguous.
5. Generate links to sanitized reports and list signatures that appeared or disappeared between versions.

## Validation checklist

- [ ] Equivalent traces produce a stable signature.
- [ ] Different paths are not merged by exception name alone.
- [ ] Version metadata is captured when available.
- [ ] Correlation is not stated as proven causation.
- [ ] Personal paths and secrets are removed from shared output.

## Required output

Signature index, affected-version matrix and sanitized representative traces.

## Boundaries and failure handling

Do not publish raw logs by default or recommend removing a mod based only on correlation. Keep low-confidence reports labeled.

## Trigger examples

- **Positive:** A pack update creates hundreds of reports that may share a new crash path.
- **Negative:** One clear reproducible crash with no version comparison needed.
