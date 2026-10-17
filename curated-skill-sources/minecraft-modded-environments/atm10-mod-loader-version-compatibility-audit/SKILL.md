---
name: atm10-mod-loader-version-compatibility-audit
description: "Audit Minecraft, NeoForge or other loader, Java runtime, and mod-version compatibility in a real ATM10 instance before changing dependencies."
---

# ATM10 Mod Loader Version Compatibility Audit

## Purpose

Detect version skew and unsupported combinations in the installed modpack using evidence from the instance, manifests, and mod metadata.

## Required inputs

Instance manifest or launcher export, Minecraft version, loader build, Java runtime/version/architecture, exact mod JAR filenames, launcher profile, and relevant startup logs.

## Workflow

1. Capture the current environment without modifying it: launcher profile, game version, loader version, Java executable/version, JVM arguments, and installed JAR inventory.
2. Compare the instance's declared versions with the loader metadata, manifest, and each suspect mod's declared Minecraft/loader compatibility.
3. Identify missing, duplicated, wrong-loader, wrong-Minecraft-version, or incompatible dependency JARs; verify artifact identity rather than relying only on similar filenames.
4. Search startup logs for explicit dependency constraints, class-loading failures, mixin compatibility errors, and metadata rejection messages.
5. Separate hard incompatibilities from unconfirmed suspicions and check whether the modpack deliberately overrides upstream versions.
6. Build a compatibility matrix listing component, installed version, required range, evidence source, severity, and confidence.
7. Test the smallest proposed correction in a copied instance, then verify startup and a representative world-load path.

## Validation checklist

- [ ] Runtime and loader versions come from the actual running instance.
- [ ] Suspect JARs are confirmed present and not inferred from a web list.
- [ ] Compatibility constraints cite metadata or a concrete log message.
- [ ] Intentional modpack overrides are preserved unless evidence shows they are faulty.
- [ ] Test results cover the original failure phase and startup regression risk.
- [ ] Rollback instructions restore the original artifact/configuration.

## Required output

Deliver a version compatibility matrix, confirmed blockers, likely issues, evidence links/filenames, minimal remediation order, test results, and a rollback plan.

## Boundaries and failure handling

Do not blindly update all mods or replace the loader. If authoritative compatibility metadata is unavailable, label the range unknown and recommend a controlled test rather than inventing support claims.

## Trigger examples

- **Positive:** ATM10 fails during mod discovery after a manually added JAR and the installed loader/runtime versions need checking.
- **Negative:** A user only wants a gameplay guide and reports no startup or compatibility problem.
