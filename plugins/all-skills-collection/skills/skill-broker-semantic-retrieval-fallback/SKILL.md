---
name: skill-broker-semantic-retrieval-fallback
description: "Defines fallback behavior when semantic search is unavailable or uncertain. Use when search combines lexical and semantic retrieval."
---

# Skill Broker Semantic Retrieval Fallback

## Purpose

query, catalog fields, index health, retrieval features, and confidence threshold

## Required inputs

Define a lexical baseline and deterministic metadata filters that work without embeddings or an external model.

## Workflow

1. Inspect the current canonical schema, relevant service/client boundary, and target environment before changing behavior.
2. Compare semantic candidates with lexical fallback and return uncertainty when the configured confidence is not reached.
3. A fallback matrix with query cases, selected results, and unavailable-service behavior.
4. Exercise positive, negative, unavailable, and malformed cases using test identities and fixture content; record actual outputs separately from expected outcomes.
5. Produce do not present a guessed semantic result as an exact match or make embeddings a required dependency without evidence. and include exact contracts, evidence, limitations, and a safe next action.

## Validation checklist

- [ ] Inputs, outputs, and version assumptions are explicit.
- [ ] A positive path and at least one negative/failure path are tested.
- [ ] Authorization and integrity gates cannot be overridden by query relevance or client claims.
- [ ] Logs and fixtures contain no real credentials or unnecessary private content.
- [ ] Unrun runtime or provider checks are marked blocked/unverified.

## Required output

Do not present a guessed semantic result as an exact match or make embeddings a required dependency without evidence.

## Boundaries and failure handling

The semantic index times out and an agent still needs safe skill discovery. When evidence or provider capability is missing, return a structured blocker instead of guessing. Do not execute publish, revoke, deploy, or destructive operations during a read-path test.

## Trigger examples

- **Positive:** The request already specifies an exact stable skill ID.
- **Negative:** undefined
