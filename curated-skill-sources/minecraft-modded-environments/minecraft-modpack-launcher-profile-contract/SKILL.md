---
name: minecraft-modpack-launcher-profile-contract
description: "Audit launcher metadata, game/loader versions, Java selection and JVM arguments for consistency with a distributable Minecraft instance."
---

# Minecraft Modpack Launcher Profile Contract

## Purpose

Keep launcher imports reproducible without relying on stale local settings.

## Required inputs

Instance profile/export, game and loader versions, Java requirement and JVM arguments.

## Workflow

1. Identify launcher-owned profile files versus local UI preferences and regenerated fields.
2. Compare game/loader versions and Java major version with the manifest and mod requirements.
3. Inspect inherited JVM arguments for duplicates, conflicts, obsolete flags and unsupported options.
4. Test profile import through a clean or isolated launcher path without replacing the original instance.
5. Record fields that must be exported and differences that affect reproducibility.

## Validation checklist

- [ ] Game and loader versions match the intended profile.
- [ ] Java selection fits the documented requirements.
- [ ] Conflicting JVM options are identified explicitly.
- [ ] Launcher-owned and portable fields are distinguished.
- [ ] Import is tested without changing the original profile.

## Required output

Profile/manifest matrix, version and JVM-argument conflicts and import evidence.

## Boundaries and failure handling

Do not prescribe arbitrary JVM flags as a universal fix or replace user profile data without approval. Verify launcher-specific behavior.

## Trigger examples

- **Positive:** Exported profile names one loader version while the manifest specifies another.
- **Negative:** Debugging an in-game recipe conflict with no launcher relationship.
