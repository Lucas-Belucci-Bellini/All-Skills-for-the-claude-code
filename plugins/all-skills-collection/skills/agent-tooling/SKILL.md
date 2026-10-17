---
name: agent-tooling
description: "Defines how an agent adapter declares the features it actually supports. Use when broker results need filtering by tool, format, auth, or context capability."
---

# Agent Capability Advertisement

## Purpose

adapter build/version, platform feature evidence, enabled tools, context limits, and configuration

## Required inputs

Build a versioned capability document with supported operations and explicit unsupported/unknown fields.

## Workflow

1. Inspect the current canonical schema, relevant service/client boundary, and target environment before changing behavior.
2. Compare declarations with conformance tests and reject capabilities that have no supporting evidence.
3. A capability document plus conformance proof and unverified feature list.
4. Exercise positive, negative, unavailable, and malformed cases using test identities and fixture content; record actual outputs separately from expected outcomes.
5. Produce do not advertise a feature because it exists in another plan, provider, or version. and include exact contracts, evidence, limitations, and a safe next action.

## Validation checklist

- [ ] Inputs, outputs, and version assumptions are explicit.
- [ ] A positive path and at least one negative/failure path are tested.
- [ ] Authorization and integrity gates cannot be overridden by query relevance or client claims.
- [ ] Logs and fixtures contain no real credentials or unnecessary private content.
- [ ] Unrun runtime or provider checks are marked blocked/unverified.

## Required output

Do not advertise a feature because it exists in another plan, provider, or version.

## Boundaries and failure handling

The broker must decide whether a candidate skill can run in a connected agent. When evidence or provider capability is missing, return a structured blocker instead of guessing. Do not execute publish, revoke, deploy, or destructive operations during a read-path test.

## Trigger examples

- **Positive:** No multi-agent selection or feature-dependent routing exists.
- **Negative:** undefined
