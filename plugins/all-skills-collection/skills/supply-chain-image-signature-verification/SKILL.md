---
name: supply-chain-image-signature-verification
description: Verify signatures and identity claims for OCI container images by immutable digest before deployment, including registry trust, signer identity, and attestation policy.
---

# Supply Chain Image Signature Verification

## Purpose

Determine whether an OCI image digest has a valid signature from an approved builder or publisher and whether its identity claims satisfy deployment policy. Focus on image manifests, registry references, signatures, and attestations—not the cryptographic signature attached to a Git commit.

## Required inputs

Registry and image reference; immutable image digest; expected publisher or workload identity; signature-verification tool and version; trust roots and policy configuration; required provenance/SBOM attestations; and the deployment gate where verification must occur.

## Workflow

1. Resolve the candidate image tag to an immutable registry digest and record registry, repository, digest, platform/manifests, and retrieval time. Do not base the final decision on a mutable tag alone.
2. Identify the accepted signing system and trusted identity policy. Pin the expected issuer, certificate identity or key fingerprint, repository/workflow constraints, and permitted builder identities.
3. Verify the signature against the exact digest using the organization's supported tooling. Record the tool/version, policy file revision, verification command, and complete sanitized result.
4. Test negative fixtures: unsigned digest, signature for a different digest, untrusted signer, mismatched issuer/identity, expired or revoked trust material, and missing required attestation. Ensure each fails closed.
5. Validate required provenance or SBOM attestations independently from the image signature. Confirm the attestation subject matches the same digest and the source/build claims satisfy policy.
6. Exercise the deployment gate using the same digest that will be deployed. Confirm a tag update between verification and deployment cannot substitute a different image, and verify behavior when the registry or verification service is unavailable.
7. Produce an admission decision with the digest, signer identity, attestation findings, policy revision, verification evidence, and explicit pass/fail/pending status.

## Validation checklist

- [ ] Verification is bound to an immutable OCI digest, not only a mutable tag.
- [ ] Signature validity and signer/issuer authorization are checked separately.
- [ ] Wrong-digest, unsigned, untrusted-identity, and missing-attestation fixtures fail closed.
- [ ] Required provenance/SBOM attestations refer to the exact verified digest.
- [ ] The deployment gate verifies the same digest that will actually run.
- [ ] Registry or verifier outages do not silently bypass mandatory verification.

## Required output

An image admission record with registry, image digest, signer identity, trust-policy revision, attestation status, verifier/version, evidence links, pass/fail/pending result, and deployment decision.

## Boundaries and failure handling

Do not infer that an image is trustworthy because its source commit was signed. Do not allow a mutable tag or registry fallback to replace the verified digest. If the verification service is unavailable, follow the documented fail-closed or approved exception process and record the decision.

## Trigger examples

- **Positive:** A deployment pipeline must prove that the exact OCI image digest was published by an approved builder and has the required provenance.
- **Negative:** A request asks whether a Git commit itself has a valid signature, regardless of any built artifact.
