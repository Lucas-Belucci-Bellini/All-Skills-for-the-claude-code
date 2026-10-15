---
name: repository-architecture-map
description: "Produces an evidence-backed architecture map of an unfamiliar repository. Use before large refactors, onboarding contributors, or creating project-specific agent instructions."
---

# Repository Architecture Map

## Use when
A repository has many folders and entrypoints but no reliable account of runtime flow, ownership, or dependency direction.

## Workflow
1. Identify build files, executable entrypoints, module manifests, test roots, generated directories, and deployment/runtime targets.
2. Trace one real feature from public entrypoint through core domain code to persistence, UI, network, and external integrations.
3. Construct a dependency map and label observed facts, inferred edges, dynamic/plugin boundaries, and unknowns separately.
4. Validate the map against build scripts and tests, then propose the smallest set of docs and owner boundaries that would prevent recurring confusion.

## Required output
A source-grounded system map, entrypoint/module inventory, uncertainty list, and refactor/onboarding priorities.

## Validation
- Every critical edge cites a file, symbol, configuration, or test.
- Generated artifacts are not mistaken for canonical source.
- Unknown runtime behavior remains explicitly unverified.

## Guardrails
Do not claim to have exhaustively understood a codebase after reading its README or directory names alone.
