# ATM10 repository reference observations — 2026-10-17

## Source inspected

- Custom modpack repository: https://github.com/Lucas-Belucci-Bellini/All-The-Mods-10
- User-facing installation notes: [README.md](https://github.com/Lucas-Belucci-Bellini/All-The-Mods-10/blob/main/README.md)
- CurseForge-style pack manifest: [manifest.json](https://github.com/Lucas-Belucci-Bellini/All-The-Mods-10/blob/main/manifest.json)

## Facts visible in the repository at inspection time

The repository README explicitly describes this as a **customized** version of All The Mods 10 with its own configurations/modifications.

The repository-root `manifest.json` observed during this pass contains:

- Pack name: `All the Mods 10`
- Pack version: `8.3`
- Minecraft version: `1.21.1`
- Primary loader identifier: `neoforge-21.1.259`
- `recommendedRam`: `8196` (manifest value; not a guarantee of optimum allocation for every machine)
- A CurseForge `files` list with project and file IDs.

## What this does not prove

- It does not prove the user's local CurseForge profile has the same pack version, files, configs, added JARs, or loader build.
- It does not prove that the repository manifest reflects the latest official ATM10 release.
- A manifest entry listing project/file IDs is not by itself proof that every referenced artifact has been downloaded or that the local JAR inventory matches.
- It does not establish the installed ProjectE version or the actual EMC configuration/schema.

## How the skills should use this reference

- Request the actual local profile/version and compare it with the repository manifest before diagnosing a user's installation.
- Prefer exact JAR metadata, file inventories, logs and crash reports over inferred versions.
- Keep the repository's pack metadata as contextual evidence only; label any mismatch as an observed difference, not automatically as the root cause.
- For ProjectE/EMC work, first verify that ProjectE exists in the target environment and discover the version/config format before proposing values.
- Do not state that a mod, dependency or compatibility problem is confirmed unless the evidence supports it.

## Scope and provenance

The ATM10 skills in this batch are original diagnostic workflow writing inspired by the kinds of evidence and failure classes involved in a customized Minecraft modpack. This documentation does not claim to reproduce or redistribute upstream ATMTeam source code or assets. Preserve third-party notices and review applicable licensing separately.
