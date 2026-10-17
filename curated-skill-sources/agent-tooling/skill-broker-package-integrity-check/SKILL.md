---
name: skill-broker-package-integrity-check
description: "Verifies integrity of a skill package and all supporting files. Use when a skill includes references, scripts, or assets."
---

# Skill Broker Package Integrity Check

## Purpose

package manifest, file paths, hashes, expected root, and allowed file types

## Required inputs

Enumerate package members and resolve relative paths without allowing traversal outside the package root.

## Workflow

1. Inspect the current canonical schema, relevant service/client boundary, and target environment before changing behavior.
2. Verify hashes, required files, and path normalization before making content available to the agent.
3. A package-integrity report with missing files, unexpected files, digest mismatches, and status.
4. Exercise positive, negative, unavailable, and malformed cases using test identities and fixture content; record actual outputs separately from expected outcomes.
5. Produce do not execute scripts or trust package content merely because its hashes match; integrity is not safety approval. and include exact contracts, evidence, limitations, and a safe next action.

## Validation checklist

- [ ] Inputs, outputs, and version assumptions are explicit.
- [ ] A positive path and at least one negative/failure path are tested.
- [ ] Authorization and integrity gates cannot be overridden by query relevance or client claims.
- [ ] Logs and fixtures contain no real credentials or unnecessary private content.
- [ ] Unrun runtime or provider checks are marked blocked/unverified.

## Required output

Do not execute scripts or trust package content merely because its hashes match; integrity is not safety approval.

## Boundaries and failure handling

A skill bundle includes multiple reference files and a script. When evidence or provider capability is missing, return a structured blocker instead of guessing. Do not execute publish, revoke, deploy, or destructive operations during a read-path test.

## Trigger examples

- **Positive:** The retrieved object is one verified inline Markdown file with no supporting artifacts.
- **Negative:** undefined
