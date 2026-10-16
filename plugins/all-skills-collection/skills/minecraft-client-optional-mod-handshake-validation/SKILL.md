---
name: minecraft-client-optional-mod-handshake-validation
description: "Test whether supported client-only mods can join the intended server without breaking protocol behavior or concealing genuine version mismatches."
---

# Minecraft Client Optional Mod Handshake Validation

## Purpose

Separate legitimate optional UI/client additions from mismatches that should block connections.

## Required inputs

Client/server manifests, loader versions, handshake logs and an isolated client/server pair.

## Workflow

1. Classify mods by side presence and whether they affect protocol or registry data.
2. Define connection cases for the same pack, optional client additions and required-mod mismatches.
3. Test connect/disconnect/reconnect in an isolated environment and capture rejection phase/reason.
4. Verify optional additions do not alter required registries and true mismatches still fail clearly.
5. Record exact manifest hashes and version pair so results can be reproduced.

## Validation checklist

- [ ] Side classification is backed by metadata or test evidence.
- [ ] Optional client additions do not bypass required checks.
- [ ] Required mismatches have actionable failure reasons.
- [ ] Registry and protocol compatibility are evaluated separately from cosmetic features.
- [ ] Results are scoped to exact tested versions.

## Required output

Client/server compatibility matrix and handshake evidence for allowed and blocked cases.

## Boundaries and failure handling

Do not bypass authentication or server security checks. Do not generalize one version pair to all future releases.

## Trigger examples

- **Positive:** A client-only UI mod unexpectedly blocks joining an otherwise matching server.
- **Negative:** Investigating chunk-loading speed after a successful connection.
