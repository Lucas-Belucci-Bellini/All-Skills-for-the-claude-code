---
name: skill-broker-public-private-scope-enforcement
description: "Enforces visibility boundaries during both search and retrieval. Use when public skills and private project skills share a broker."
---

# Skill Broker Public/Private Scope Enforcement

## Purpose

visibility labels, caller identity, tenant/project scope, and access policy

## Required inputs

Filter candidate metadata by the caller's authorized scope before returning names or snippets.

## Workflow

1. Inspect the current canonical schema, relevant service/client boundary, and target environment before changing behavior.
2. Repeat authorization at content fetch time and test guessed IDs, aliases, and stale caches.
3. A scope-enforcement report with allowed/denied cases and path-level evidence.
4. Exercise positive, negative, unavailable, and malformed cases using test identities and fixture content; record actual outputs separately from expected outcomes.
5. Produce hiding a search result is not sufficient; direct retrieval must enforce authorization too. and include exact contracts, evidence, limitations, and a safe next action.

## Validation checklist

- [ ] Inputs, outputs, and version assumptions are explicit.
- [ ] A positive path and at least one negative/failure path are tested.
- [ ] Authorization and integrity gates cannot be overridden by query relevance or client claims.
- [ ] Logs and fixtures contain no real credentials or unnecessary private content.
- [ ] Unrun runtime or provider checks are marked blocked/unverified.

## Required output

Hiding a search result is not sufficient; direct retrieval must enforce authorization too.

## Boundaries and failure handling

A team member requests a private skill from a workspace without access. When evidence or provider capability is missing, return a structured blocker instead of guessing. Do not execute publish, revoke, deploy, or destructive operations during a read-path test.

## Trigger examples

- **Positive:** The registry contains only public content and no restricted scope.
- **Negative:** undefined
