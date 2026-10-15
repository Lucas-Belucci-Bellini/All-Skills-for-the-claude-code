---
name: reproducible-build-artifact-provenance
description: "Makes build artifacts traceable to source, toolchain, and dependency inputs. Use when distributing engines, CLI tools, modpacks, or signed releases."
---

# Reproducible Build Artifact Provenance

## Use when
A release artifact cannot be tied confidently to the source revision and build environment that supposedly produced it.

## Workflow
1. Record commit/tag, dirty-tree status, compiler/runtime versions, dependency lockfiles, environment inputs, and build commands.
2. Define which output files are expected and hash each artifact after packaging.
3. Repeat the build in a clean workspace or independent environment and compare hashes or explain documented nondeterministic fields.
4. Publish a provenance manifest alongside artifacts and make missing or inconsistent fields fail the release gate.

## Required output
An artifact manifest schema, reproducible build steps, hash list, and release provenance report.

## Validation
- Each distributed file maps to a specific source revision and toolchain.
- Dependency resolution is locked or otherwise reproducible.
- A rebuild mismatch is explained rather than hidden.

## Guardrails
Do not include signing secrets, environment secrets, local paths with private information, or credentials in provenance output.
