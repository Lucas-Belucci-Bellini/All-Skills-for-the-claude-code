---
name: skill-broker-capability-filtering
description: "Filters skills by the requesting agent's actual capabilities. Use when tools, MCP, scripts, or platform-specific commands differ."
---

# Skill Broker Capability Filtering

## Purpose

agent adapter feature set, target version, skill requirements, and risk policy

## Required inputs

Compare each candidate's declared requirements with verified agent capabilities and environment permissions.

## Workflow

1. Inspect the current canonical schema, relevant service/client boundary, and target environment before changing behavior.
2. Reject or downgrade candidates that require unavailable or unauthorized capabilities and explain the mismatch.
3. A capability-filter report with eligible, excluded, and conditionally usable skills.
4. Exercise positive, negative, unavailable, and malformed cases using test identities and fixture content; record actual outputs separately from expected outcomes.
5. Produce do not infer support from a product name alone; use capability evidence for the connected environment. and include exact contracts, evidence, limitations, and a safe next action.

## Validation checklist

- [ ] Inputs, outputs, and version assumptions are explicit.
- [ ] A positive path and at least one negative/failure path are tested.
- [ ] Authorization and integrity gates cannot be overridden by query relevance or client claims.
- [ ] Logs and fixtures contain no real credentials or unnecessary private content.
- [ ] Unrun runtime or provider checks are marked blocked/unverified.

## Required output

Do not infer support from a product name alone; use capability evidence for the connected environment.

## Boundaries and failure handling

A skill requires a local shell that the current ChatGPT integration does not expose. When evidence or provider capability is missing, return a structured blocker instead of guessing. Do not execute publish, revoke, deploy, or destructive operations during a read-path test.

## Trigger examples

- **Positive:** The task does not depend on any agent-specific capability.
- **Negative:** undefined
