---
name: skill-broker-query-context-minimization
description: "Minimizes context sent to a skill registry while preserving retrieval quality. Use when agents search using project logs or large prompts."
---

# Skill Broker Query Context Minimization

## Purpose

task goal, candidate search fields, redaction policy, and query size limits

## Required inputs

Extract only the domain, action, environment/version, and relevant constraints needed to find a skill.

## Workflow

1. Inspect the current canonical schema, relevant service/client boundary, and target environment before changing behavior.
2. Remove secrets, irrelevant transcript segments, and raw source content; compare retrieval quality against a fuller sanitized query.
3. A minimal query record and retrieval comparison with sensitive fields excluded.
4. Exercise positive, negative, unavailable, and malformed cases using test identities and fixture content; record actual outputs separately from expected outcomes.
5. Produce never send access tokens, private keys, full conversation history, or secrets as retrieval hints. and include exact contracts, evidence, limitations, and a safe next action.

## Validation checklist

- [ ] Inputs, outputs, and version assumptions are explicit.
- [ ] A positive path and at least one negative/failure path are tested.
- [ ] Authorization and integrity gates cannot be overridden by query relevance or client claims.
- [ ] Logs and fixtures contain no real credentials or unnecessary private content.
- [ ] Unrun runtime or provider checks are marked blocked/unverified.

## Required output

Never send access tokens, private keys, full conversation history, or secrets as retrieval hints.

## Boundaries and failure handling

An agent needs help finding a matching diagnostic skill from a crash report. When evidence or provider capability is missing, return a structured blocker instead of guessing. Do not execute publish, revoke, deploy, or destructive operations during a read-path test.

## Trigger examples

- **Positive:** The query contains no project/private details and is already minimal.
- **Negative:** undefined
