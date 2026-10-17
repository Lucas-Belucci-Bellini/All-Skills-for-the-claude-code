---
name: atm10-client-server-mod-parity-audit
description: "Compare client and dedicated-server mod inventories and configuration contracts to diagnose join failures, registry mismatches, and desynchronization."
---

# ATM10 Client–Server Mod Parity Audit

## Purpose

Identify client/server differences that explain connection failures or inconsistent behavior without assuming every client-side mod must be installed on the server.

## Required inputs

Client and server mod inventories, Minecraft/loader versions, server startup and client latest logs, join-failure message, relevant config/datapack lists, and the exact connection sequence.

## Workflow

1. Capture client and server versions, loader builds, Java versions, and normalized lists of installed mod JARs with filenames and hashes where practical.
2. Classify each difference as required on both sides, client-only, server-only, optional integration, or unknown; verify against mod metadata/docs rather than guessing from names.
3. Compare registry/datapack/configuration evidence for mismatched item, block, entity, recipe, or dimension state.
4. Align timestamps across client/server logs and locate the earliest handshake, channel, registry, or packet error.
5. Reproduce with a test client/server pair or staging copy and change only the smallest suspected parity/configuration difference.
6. Validate connection, dimension transition, inventory interaction, and a representative mod feature after the change.
7. Document approved client-only exceptions and preserve a versioned parity report for future updates.

## Validation checklist

- [ ] Both environments' versions and inventories were collected independently.
- [ ] Client-only/server-only status is verified rather than assumed.
- [ ] The earliest handshake or registry error is identified.
- [ ] The test changes only a documented difference and can be rolled back.
- [ ] A successful login is supplemented by checks of relevant gameplay interactions.
- [ ] Secrets, private IPs, and player-identifying data are redacted from shared evidence.

## Required output

Return a client/server parity matrix, verified mandatory components, intentional exceptions, mismatch evidence, minimal remediation, validation results, and update procedure.

## Boundaries and failure handling

Do not copy the entire client mods folder over a production server or delete arbitrary JARs. If compatibility requirements cannot be verified, mark the component unknown and test on staging.

## Trigger examples

- **Positive:** Players cannot join a modified ATM10 server after manually adding content mods to the client.
- **Negative:** A single-player performance issue occurs with no server or connection involved.
