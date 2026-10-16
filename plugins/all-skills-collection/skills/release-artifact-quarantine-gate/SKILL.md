---
name: release-artifact-quarantine-gate
description: "Use when release artifacts must remain unavailable to downstream deployment until required provenance, scan, signature, and policy checks pass; not for general release-readiness documentation."
---

# Release Artifact Quarantine Gate

## Purpose

Define a fail-closed promotion gate that prevents unverified artifacts from reaching deployment channels.

## Required inputs

Artifact registry, immutable digest, source revision, required CI checks, signature/attestation rules, vulnerability policy, and promotion permissions.

## Workflow

1. Define a quarantine state and explicit policy requirements for every artifact type before it can be promoted.
2. Bind checks to immutable digests and verify that the source commit, build run, attestation, and scan all refer to the same artifact.
3. Exercise missing evidence, expired evidence, policy-service outage, artifact replacement, scan failure, and reviewer override paths.
4. Permit promotion only after all required checks are satisfied; record who approved any policy exception and its expiration.

## Verification checklist

- [ ] Artifacts are identified by digest rather than mutable tags alone.
- [ ] Check failure or evidence-service outage cannot silently promote an artifact.
- [ ] Only designated roles can override a gate, and overrides are audited and time-bounded.
- [ ] Promoted digest is the same digest that passed all checks.

## Required output

A release-gate policy, decision table, negative-case test results, and an auditable promotion evidence record.

## Boundaries and failure handling

Do not delete or publish quarantined artifacts automatically without retention policy. An override is not proof that the artifact passed the gate.

When required evidence, permissions, or environment details are unavailable, stop at the supported analysis, record the missing prerequisite, and do not report an unexecuted validation as passing.

## Trigger examples

- **Positive:** A deployment pipeline currently pushes images before signature and scan results finish.
- **Negative:** Reviewing release notes for wording or formatting only.
