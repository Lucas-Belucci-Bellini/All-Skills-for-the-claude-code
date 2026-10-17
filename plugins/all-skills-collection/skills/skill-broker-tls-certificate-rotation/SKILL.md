---
name: skill-broker-tls-certificate-rotation
description: "Plans and validates broker certificate renewal. Use when a remote endpoint relies on TLS and adapters may cache connection state."
---

# Skill Broker TLS Certificate Rotation

## Purpose

endpoint topology, certificate chain, renewal schedule, trust stores, and client pinning behavior

## Required inputs

Inventory client trust behavior, certificate dependencies, and any pinning/rotation constraints.

## Workflow

1. Identify the exact service, release, or data boundary and applicable operational/security policy before changing behavior.
2. Test the replacement chain and renewal window in staging, including old/new certificate overlap and expired-certificate rejection.
3. A TLS rotation plan with timeline, verification commands, failure path, and rollback notes.
4. Test both expected operation and the relevant denial/failure path in an isolated environment, capturing evidence without sensitive content.
5. Produce do not disable certificate verification to resolve a rotation failure. with scope, observations, limitations, and safe recovery or escalation steps.

## Validation checklist

- [ ] The affected service/component and version are explicit.
- [ ] Allowed and denied/failure behavior is defined before testing.
- [ ] Evidence distinguishes observed results from assumptions and skipped checks.
- [ ] Sensitive identifiers, tokens, prompts, and private skill content are not exposed.
- [ ] Any release, revocation, credential rotation, or destructive action has explicit authorization and rollback criteria.

## Required output

Do not disable certificate verification to resolve a rotation failure.

## Boundaries and failure handling

A broker endpoint needs a certificate renewal with minimal client disruption. If the operation requires production access or a security decision outside the approved scope, stop and provide a safe, actionable blocker rather than attempting it.

## Trigger examples

- **Positive:** No remote TLS endpoint is involved.
- **Negative:** undefined
