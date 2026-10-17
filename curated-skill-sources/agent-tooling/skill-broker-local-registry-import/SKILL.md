---
name: skill-broker-local-registry-import
description: "Imports a local canonical catalog into a broker index while preserving source identity. Use when setting up an offline/development broker or rebuilding from a checkout."
---

# Skill Broker Local Registry Import

## Purpose

catalog files, source root, schema version, path policy, and import mode

## Required inputs

Validate schema, relative paths, unique IDs, and source file existence before accepting entries.

## Workflow

1. Inspect the current canonical schema, relevant service/client boundary, and target environment before changing behavior.
2. Import into a staging namespace, compare counts and digests, and only promote after reconciliation passes.
3. An import report with new/updated/skipped/rejected counts and exact paths.
4. Exercise positive, negative, unavailable, and malformed cases using test identities and fixture content; record actual outputs separately from expected outcomes.
5. Produce do not import executable scripts or private materials from an untrusted source without separate review. and include exact contracts, evidence, limitations, and a safe next action.

## Validation checklist

- [ ] Inputs, outputs, and version assumptions are explicit.
- [ ] A positive path and at least one negative/failure path are tested.
- [ ] Authorization and integrity gates cannot be overridden by query relevance or client claims.
- [ ] Logs and fixtures contain no real credentials or unnecessary private content.
- [ ] Unrun runtime or provider checks are marked blocked/unverified.

## Required output

Do not import executable scripts or private materials from an untrusted source without separate review.

## Boundaries and failure handling

A developer runs the broker against a local repository checkout. When evidence or provider capability is missing, return a structured blocker instead of guessing. Do not execute publish, revoke, deploy, or destructive operations during a read-path test.

## Trigger examples

- **Positive:** The broker reads the canonical catalog directly and no import is required.
- **Negative:** undefined
