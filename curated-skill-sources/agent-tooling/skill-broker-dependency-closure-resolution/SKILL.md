---
name: skill-broker-dependency-closure-resolution
description: "Resolves required skill dependencies as a bounded compatible set. Use when a selected skill references prerequisite skills or helpers."
---

# Skill Broker Dependency Closure Resolution

## Purpose

selected skill, dependency metadata, versions, compatibility matrix, and context budget

## Required inputs

Traverse declared dependencies and deduplicate IDs by immutable identity while recording the parent relationship.

## Workflow

1. Inspect the current canonical schema, relevant service/client boundary, and target environment before changing behavior.
2. Detect missing, incompatible, cyclic, or revoked dependencies and compute the smallest valid closure.
3. A dependency plan with ordered skills, versions, cycles, and blockers.
4. Exercise positive, negative, unavailable, and malformed cases using test identities and fixture content; record actual outputs separately from expected outcomes.
5. Produce do not load optional dependencies automatically when they exceed budget or expand permissions. and include exact contracts, evidence, limitations, and a safe next action.

## Validation checklist

- [ ] Inputs, outputs, and version assumptions are explicit.
- [ ] A positive path and at least one negative/failure path are tested.
- [ ] Authorization and integrity gates cannot be overridden by query relevance or client claims.
- [ ] Logs and fixtures contain no real credentials or unnecessary private content.
- [ ] Unrun runtime or provider checks are marked blocked/unverified.

## Required output

Do not load optional dependencies automatically when they exceed budget or expand permissions.

## Boundaries and failure handling

A task selects a skill that declares required supporting skills. When evidence or provider capability is missing, return a structured blocker instead of guessing. Do not execute publish, revoke, deploy, or destructive operations during a read-path test.

## Trigger examples

- **Positive:** The chosen skill is self-contained and declares no dependencies.
- **Negative:** undefined
