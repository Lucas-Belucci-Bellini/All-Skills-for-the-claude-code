---
name: minecraft-mod-optional-dependency-boundary-audit
description: "Determine whether mods and libraries are required, optional, client-only or server-only and test declarations against load behavior."
---

# Minecraft Mod Optional Dependency Boundary Audit

## Purpose

Prevent startup and connection failures from mismatched dependency metadata or side-specific code paths.

## Required inputs

JAR metadata, loader version, dependency list, side distribution and crash evidence.

## Workflow

1. Extract required/optional dependencies and environment constraints from metadata.
2. Compare declarations with code paths or documented gates that reference the dependent classes.
3. Classify dependencies as required-both, client-only, server-only, gated-optional or unresolved.
4. Test representative launches with and without optional dependencies in an isolated copy.
5. Produce a side-aware matrix and flag undeclared references that fail before optional features are used.

## Validation checklist

- [ ] Metadata matches actual runtime requirements.
- [ ] Client-only code is not unintentionally required on dedicated server.
- [ ] Optional integrations have a safe disabled path.
- [ ] Version ranges and loader constraints are explicit.
- [ ] Unresolved declarations remain unverified.

## Required output

Dependency/side matrix, metadata gaps and controlled compatibility evidence.

## Boundaries and failure handling

Do not redistribute JARs or patch upstream binaries without authorization and license review. Metadata marked optional does not prove safe optionality.

## Trigger examples

- **Positive:** A mod claims an integration is optional but references its classes during common startup.
- **Negative:** Comparing complete mod lists without investigating dependency declarations.
