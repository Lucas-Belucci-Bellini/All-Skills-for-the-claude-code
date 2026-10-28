---
name: supply-chain-commit-signature-verification
description: Verify cryptographic signatures on Git commits against the repository's trusted signer policy, including signer identity, key validity, and protected-branch enforcement.
---

# Supply Chain Commit Signature Verification

## Purpose

Establish whether a specific Git commit is signed and whether the signing identity is trusted under the repository's policy. Focus on commit objects, signer identity, key trust/revocation, and enforcement at merge time—not signatures on built container images or release artifacts.

## Required inputs

Repository URL and target commit SHA; branch protection or ruleset policy; accepted signature mechanisms (for example SSH or GPG); trusted signer identities or allowed principals; key rotation/revocation rules; and sanitized verification output.

## Workflow

1. Pin the repository and full commit SHA. Identify whether policy requires every commit, only commits reaching protected branches, or a specific set of trusted maintainers/bots to sign.
2. Verify the commit object with the repository's supported Git signature-verification tooling. Record the exact command, verifier version, signature type, signer identity, and verification status.
3. Resolve the signer to the approved identity source. Check key fingerprint/principal, validity period, revocation state, account association where applicable, and whether the identity is permitted to contribute to this repository.
4. Test negative fixtures: unsigned commit, malformed signature, signature from an untrusted key, expired or revoked key, and a valid signature from an unauthorized identity. Each must fail for the expected policy reason.
5. Inspect repository rulesets and merge settings to confirm the policy is enforced at the intended boundary. A green local verification is insufficient if unsigned commits can still enter the protected branch through another path.
6. Verify behavior for merge commits, rebases, squash merges, automation accounts, and key rotation according to the repository's actual workflow. Record any workflow that changes commit identity or creates new commit objects.
7. Produce an evidence record keyed by commit SHA, with signer identity, trust decision, policy rule, verification output, and remediation for any noncompliant commit.

## Validation checklist

- [ ] The tested commit is identified by a full immutable SHA.
- [ ] Signature validity and signer authorization are evaluated separately.
- [ ] Trusted fingerprints/principals and revocation/rotation rules are current.
- [ ] Unsigned, malformed, untrusted, expired/revoked, and unauthorized signer cases are rejected.
- [ ] Branch/ruleset enforcement is verified independently of local verification.
- [ ] Merge and automation behavior matches the documented policy.

## Required output

A commit-signature decision record with commit SHA, signature mechanism, signer identity, trust-policy source, verifier/version, pass/fail/pending result, evidence links, and any required remediation.

## Boundaries and failure handling

Do not treat a platform's generic “verified” badge as a complete authorization decision without checking the applicable trust policy. Never publish private key material. If signer identity or revocation status cannot be established, classify the result as indeterminate and block policy-sensitive release decisions.

## Trigger examples

- **Positive:** A protected branch must reject commits signed by unknown or revoked identities, and the team needs reproducible evidence.
- **Negative:** A request needs to verify a signature or attestation attached to an OCI image digest rather than a Git commit object.
