---
name: atm10-mod-client-server-state-divergence
description: "Investigate a mod feature whose visible client state differs from authoritative server state after a repeatable multiplayer action. Use timestamped evidence before assigning a defect."
---

# ATM10 Mod Client-Server State Divergence

## Purpose

Determine whether an individual mod feature displays stale or incorrect client state when the server has different authoritative state, without assuming the network layer or a particular mod is at fault.

## Required inputs

Verified mod ID/version, game and loader versions, sanitized logs from both endpoints, the affected feature, exact reproduction steps, and a staging server or copied world.

## Workflow

1. Confirm the specific mod and feature from the installed inventory and runtime evidence.
2. Record the expected state and actual state as seen by client and server.
3. Reproduce one bounded action and align client/server timestamps around it.
4. Capture state immediately before and after the action and again after reconnect, where safe.
5. Repeat with a minimal configuration and change one relevant setting or action at a time.
6. Check whether the server state is correct, the client update is missing, or both endpoints diverge; do not infer a packet defect without evidence.
7. Test any candidate workaround in staging and verify persistence after reconnect.
8. Produce a minimal reproduction, tested versions, evidence references, confidence and rollback path.

## Validation checklist

- [ ] Installed mod ID/version is verified.
- [ ] Server-authoritative and client-visible states are compared.
- [ ] Reproduction and timestamps are repeatable or marked inconsistent.
- [ ] External connectivity and unrelated mods are considered.
- [ ] No production save or account state is put at risk.
- [ ] The reported conclusion distinguishes evidence from hypothesis.

## Required output

A client-versus-server state timeline, minimal reproduction, exact environment, observed divergence, tested hypotheses, confidence level, remaining unknowns and safe regression test.

## Boundaries and failure handling

Do not blame a specific mod based only on a visible mismatch. Keep logs sanitized and do not expose credentials or private endpoints. If server-side evidence is unavailable, state the limitation.

## Trigger examples

- **Positive:** A mod feature shows different states on the server and client after a repeatable action.
- **Negative:** A single-player problem has no client/server state boundary involved.
