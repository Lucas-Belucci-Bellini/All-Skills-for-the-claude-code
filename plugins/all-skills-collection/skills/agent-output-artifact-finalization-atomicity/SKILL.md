---
name: agent-output-artifact-finalization-atomicity
description: "Publishes agent artifacts only after validation and promotes them as one coherent version. Use when downstream tasks could observe partially written files or manifests."
---

# Agent Output Artifact Finalization Atomicity

## Purpose

Consumers should see the prior accepted version or a complete new version, not a mixture of files still being written.

## Required inputs

Artifact set, staging path, manifest schema, digest rules, validation commands, storage atomicity, and consumer lookup.

## Workflow

1. Declare the complete deliverable set and manifest fields that identify one immutable version.
2. Write output into a run-unique staging area and keep it outside the accepted consumer pointer.
3. Validate paths, schemas, references, digests, and required files against the staged manifest.
4. Run fast checks before expensive validation and attach results to the exact candidate version.
5. Promote the validated manifest or version pointer atomically where storage supports it.
6. Verify the consumer-visible version and quarantine failed candidates without replacing the last accepted version.

## Validation checklist

- [ ] Staging artifacts are never mistaken for accepted output.
- [ ] Manifest digests cover the declared artifact set.
- [ ] Validation checks the same bytes that are promoted.
- [ ] Failed candidates cannot overwrite the accepted version.

## Required output

A staged manifest, validation receipts, promotion record, and consumer-visible version ID.

## Boundaries and failure handling

Do not claim multi-file atomicity unless storage guarantees it; an immutable version plus atomic pointer may be needed.

## Trigger examples

- **Positive:** Several agents produce code, reports, and a manifest that must be released together.
- **Negative:** A transient chat response has no durable artifact set.
