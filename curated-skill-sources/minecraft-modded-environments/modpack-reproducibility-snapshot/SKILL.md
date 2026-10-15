---
name: modpack-reproducibility-snapshot
description: "Creates a reproducible, privacy-aware snapshot of a modded Minecraft instance. Use when archiving a pack, collaborating on debugging, or preparing a safe GitHub report."
---

# Modpack Reproducibility Snapshot

## Use when
A bug cannot be reproduced because the mod/config state was uploaded selectively or the snapshot contains private data and huge transient folders.

## Workflow
1. Inventory files and classify them as essential source/config, generated runtime data, large artifacts, personal secrets, or private world/user data.
2. Create a versioned manifest containing file hashes, mod identifiers, loader/runtime versions, and explicitly excluded items.
3. Use a staging copy and review .gitignore before collecting configuration; exclude tokens, session credentials, personal logs, and private saves unless authorized.
4. Validate the snapshot in a clean copy or document which missing external artifacts prevent reproduction.

## Required output
A sanitized manifest, curated folder inclusion/exclusion report, reproducibility notes, and backup/restore instructions.

## Validation
- Hashes match the staged snapshot and file changes are traceable.
- No credentials or private data are included unintentionally.
- The report says which components were not captured and why.

## Guardrails
Never force-push, delete local files, or publish private worlds or access tokens as part of snapshot creation.
