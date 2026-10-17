---
name: skill-broker-signature-verification
description: "Verifies signed skill release metadata or package artifacts when signature-based provenance is configured. Use before trusting a release from an authorized publisher."
---

# Skill Broker Signature Verification

## Purpose

signature format, trusted keys, signed manifest, artifact bytes, and revocation policy

## Required inputs

Identify the exact signing scheme and trust root from the project's official release policy.

## Workflow

1. Identify the exact service, release, or data boundary and applicable operational/security policy before changing behavior.
2. Verify signature, manifest digest, key status, and artifact digest; test invalid and revoked signatures.
3. A verification receipt with trusted key identity, verified digest, and failures.
4. Test both expected operation and the relevant denial/failure path in an isolated environment, capturing evidence without sensitive content.
5. Produce do not treat a hash alone as a signature or trust a public key delivered only alongside the artifact. with scope, observations, limitations, and safe recovery or escalation steps.

## Validation checklist

- [ ] The affected service/component and version are explicit.
- [ ] Allowed and denied/failure behavior is defined before testing.
- [ ] Evidence distinguishes observed results from assumptions and skipped checks.
- [ ] Sensitive identifiers, tokens, prompts, and private skill content are not exposed.
- [ ] Any release, revocation, credential rotation, or destructive action has explicit authorization and rollback criteria.

## Required output

Do not treat a hash alone as a signature or trust a public key delivered only alongside the artifact.

## Boundaries and failure handling

A release package must prove which authorized publisher approved its content. If the operation requires production access or a security decision outside the approved scope, stop and provide a safe, actionable blocker rather than attempting it.

## Trigger examples

- **Positive:** No signature scheme or signed artifact exists; use other documented integrity checks.
- **Negative:** undefined
