---
name: artifact-signature-verification
description: "Use when checking whether a release artifact has a valid cryptographic signature tied to an expected publisher and artifact digest; not for general dependency inventory."
---

# Artifact Signature Verification

## Purpose

Verify integrity and publisher identity before trusting an artifact in a release or deployment path.

## Required inputs

Artifact and digest, signature format, expected signer identity, trust roots, signing workflow, key rotation policy, and verification command/tool version.

## Workflow

1. Record the artifact digest and source location; obtain the signature and identity metadata through the approved release channel.
2. Verify the signature with the project-approved tool and trust policy, checking both cryptographic validity and expected signer identity.
3. Check key validity, revocation/rotation policy, transparency or attestation references when the project requires them, and artifact-to-source linkage.
4. Run negative tests for tampered artifact, wrong signer, missing signature, expired/untrusted key, and mismatched digest.

## Verification checklist

- [ ] The exact artifact digest is bound to the signature result.
- [ ] The accepted signer is pinned to an explicit trust policy, not merely any valid key.
- [ ] Missing or invalid signatures fail closed where signing is mandatory.
- [ ] The report records tool version and verification output without exposing private key material.

## Required output

A verification record with artifact digest, signer identity, trust decision, tool/version, and any failed checks.

## Boundaries and failure handling

Never request or store a private signing key to verify a release. A valid signature proves the signer signed a digest, not that the artifact is safe.

When required evidence, permissions, or environment details are unavailable, stop at the supported analysis, record the missing prerequisite, and do not report an unexecuted validation as passing.

## Trigger examples

- **Positive:** A CI job must reject a release archive that was replaced after signing.
- **Negative:** Building a complete SBOM or inventory of all transitive dependencies.
