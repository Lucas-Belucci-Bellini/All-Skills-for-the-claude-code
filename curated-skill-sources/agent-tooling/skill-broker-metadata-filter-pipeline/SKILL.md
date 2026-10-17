---
name: skill-broker-metadata-filter-pipeline
description: "Defines the ordered metadata filters used before ranking candidates. Use when compatibility, visibility, lifecycle status, and risk must be enforced consistently."
---

# Skill Broker Metadata Filter Pipeline

## Purpose

canonical metadata, policy order, agent context, version selector, and risk rules

## Required inputs

Separate hard filters such as access, revocation, compatibility, and validation from soft ranking signals.

## Workflow

1. Inspect the current canonical schema, relevant service/client boundary, and target environment before changing behavior.
2. Use fixtures to prove hard filters cannot be overridden by relevance scores or query text.
3. A filter-pipeline specification with ordered stages, dropped-candidate reasons, and tests.
4. Exercise positive, negative, unavailable, and malformed cases using test identities and fixture content; record actual outputs separately from expected outcomes.
5. Produce do not let a high semantic score override access denial, incompatibility, or revoked status. and include exact contracts, evidence, limitations, and a safe next action.

## Validation checklist

- [ ] Inputs, outputs, and version assumptions are explicit.
- [ ] A positive path and at least one negative/failure path are tested.
- [ ] Authorization and integrity gates cannot be overridden by query relevance or client claims.
- [ ] Logs and fixtures contain no real credentials or unnecessary private content.
- [ ] Unrun runtime or provider checks are marked blocked/unverified.

## Required output

Do not let a high semantic score override access denial, incompatibility, or revoked status.

## Boundaries and failure handling

Search must restrict results to approved skills for the connected agent. When evidence or provider capability is missing, return a structured blocker instead of guessing. Do not execute publish, revoke, deploy, or destructive operations during a read-path test.

## Trigger examples

- **Positive:** The query is a pure local fuzzy search without versions, lifecycle states, or access controls.
- **Negative:** undefined
