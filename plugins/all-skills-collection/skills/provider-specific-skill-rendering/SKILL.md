---
name: provider-specific-skill-rendering
description: "Renders canonical skill metadata and instructions into supported provider-specific packages. Use when distributing one maintained skill source to agents with different packaging formats."
---

# Provider-Specific Skill Rendering

## Purpose

Preserve one canonical source while creating provider-ready artifacts that are explicit about transformation and loss.

## Required inputs

Canonical skill source, target provider schema, adapter version, supported features, file references, and build/release requirements.

## Workflow

1. Load the canonical skill and resolve its supporting files by explicit relative path, preserving the source tree's integrity.
2. Apply only documented transformations for the target: frontmatter mapping, manifest fields, path rewriting, and packaging layout.
3. Emit a transformation report listing copied, rewritten, unsupported and omitted fields; fail on loss of safety-critical or identity metadata.
4. Verify output file paths, checksums, manifest entries, and inclusion/exclusion rules against the target adapter contract.
5. Run target-specific trigger and package smoke tests, then compare rendered content to canonical content for unexpected semantic changes.

## Validation checklist

- [ ] Every output references the canonical stable ID and source version.
- [ ] Unsupported metadata is reported rather than dropped silently.
- [ ] Relative supporting files resolve within the emitted package.
- [ ] Generation is deterministic for unchanged inputs and tool versions.
- [ ] Provider artifacts can be regenerated without manual edits to generated output.

## Required output

A rendered package, transformation report, digest manifest, and provider-specific validation report.

## Boundaries and failure handling

Do not hand-edit generated bundles as the source of truth. Do not claim a package is installable for a provider until its documented loader or import path has been tested.

If required evidence is missing, record the gap and stop before irreversible actions. Do not claim a test, network request, compatibility result, or approval occurred unless its evidence was observed.

## Trigger examples

- **Positive:** A single skill must be made available both as a Claude Code plugin skill and through another agent's supported mechanism.
- **Negative:** The target provider receives the canonical Markdown directly and has no package conversion or transformation step.
