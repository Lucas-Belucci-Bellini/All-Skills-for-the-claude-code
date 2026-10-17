---
name: skill-compatibility-deprecation-propagation
description: "Plans how incompatible or deprecated skills are marked and retired across catalogs and providers. Use when a skill must be replaced, withdrawn, or blocked for a platform version."
---

# Skill Compatibility and Deprecation Propagation

## Purpose

Stop clients from selecting an invalid or unsupported skill while preserving reproducibility and a migration path for pinned projects.

## Required inputs

Skill IDs and versions, compatibility metadata, impacted adapters, deprecation reason, replacement candidate, support policy, and cache inventory.

## Workflow

1. Record whether the issue affects an entire skill, specific versions, a provider adapter, or only a range of platform versions.
2. Define lifecycle status, effective date, affected combinations, severity, and whether the release is deprecated, blocked, or revoked.
3. Identify replacement mappings and migration requirements without assuming the replacement is semantically interchangeable.
4. Propagate status through catalog, broker resolver, provider manifests, caches, and documentation; preserve pinned artifacts for audit where policy allows.
5. Test that latest-approved search excludes blocked combinations, pinned fetch returns the policy-defined warning/error, and clients can discover replacement guidance.

## Validation checklist

- [ ] Deprecation reason and effective scope are recorded.
- [ ] Latest resolution does not select blocked combinations.
- [ ] Replacement links point to an existing compatible candidate.
- [ ] Pinned clients receive an explicit policy-driven response.
- [ ] Catalog, broker, rendered manifests, and documentation agree after propagation.

## Required output

A deprecation record, impact matrix, provider propagation checklist, migration note, and negative resolver tests.

## Boundaries and failure handling

Do not silently substitute a new skill for an exact pin when behavior may differ. If a critical skill is revoked and no safe replacement exists, stop resolution and explain the blocker.

If required evidence is missing, record the gap and stop before irreversible actions. Do not claim a test, network request, compatibility result, or approval occurred unless its evidence was observed.

## Trigger examples

- **Positive:** A skill uses a provider-specific command no longer available in the latest agent version.
- **Negative:** A typo is corrected without changing compatibility or behavior and no old release needs retirement.
