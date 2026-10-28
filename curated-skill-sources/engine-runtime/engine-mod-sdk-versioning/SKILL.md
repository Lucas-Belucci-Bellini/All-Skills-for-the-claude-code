---
name: engine-mod-sdk-versioning
description: Specify a versioned engine mod SDK with capability declarations, compatibility checks, migration guidance, and safe failure behavior.
---

# Engine Mod SDK Versioning

## Purpose

Keep external mods maintainable as engine APIs evolve by defining compatibility policy, capability requirements, migration paths, and actionable loader diagnostics.

## Required inputs

Public mod API, SDK/package layout, engine release policy, manifest format, extension points, supported platforms, deprecation policy, and representative third-party mods.

## Workflow

1. Separate engine version, public mod API version, binary ABI version, and content/schema version; document which versions affect each mod type.
2. Define compatibility ranges and capability requirements in a machine-readable manifest, including explicit behavior for unknown or malformed fields.
3. Establish rules for additive, deprecated, removed, and behavior-changing API changes, including a deprecation window and replacement guidance.
4. Validate a mod's manifest and requirements before initialization; produce diagnostics that name the incompatible requirement and supported alternatives.
5. Maintain compatibility fixtures for the oldest supported SDK, current SDK, unsupported future SDK, missing capability, and malformed metadata.
6. Provide migration examples and automated checks for common breaking changes where static analysis is feasible.
7. Specify how optional capabilities degrade and which missing capabilities must prevent activation rather than create partially initialized mods.
8. Review API changes against representative mods and publish a compatibility table with each engine release.

## Validation checklist

- [ ] Version dimensions and compatibility rules are distinct and documented.
- [ ] Loader checks requirements before calling mod initialization.
- [ ] Breaking changes have migration guidance and compatibility fixtures.
- [ ] Missing optional and required capabilities have different, tested outcomes.

## Required output

A mod SDK version policy, manifest schema, compatibility matrix, migration notes, and loader rejection test plan.

## Boundaries and failure handling

Do not infer compatibility from semantic-version numbers alone. Treat third-party native code according to the engine's trust model; version checks do not sandbox hostile code.

## Trigger examples

- **Positive:** The task concerns a public mod SDK, mod manifest compatibility, extension API deprecation, or mod migration.
- **Negative:** The task only involves gameplay balance changes inside one mod without changing engine-facing interfaces.
