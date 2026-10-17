---
name: skill-broker-mcp-tool-description-discovery
description: "Defines tool descriptions that help agents select the correct broker operation. Use when exposing search, fetch, version, or gap-report tools over MCP."
---

# Skill Broker MCP Tool Description Discovery

## Purpose

tool schemas, examples, permission classes, client capability profile, and error taxonomy

## Required inputs

Write concise descriptions specifying when to use each tool, required arguments, side effects, and output contract.

## Workflow

1. Inspect the current canonical schema, relevant service/client boundary, and target environment before changing behavior.
2. Test positive and negative calls so agents do not use proposal/write tools for routine retrieval or confuse search with exact fetch.
3. A tool description set and trigger test results with misrouting cases.
4. Exercise positive, negative, unavailable, and malformed cases using test identities and fixture content; record actual outputs separately from expected outcomes.
5. Produce do not hide destructive or write side effects in a tool's description. and include exact contracts, evidence, limitations, and a safe next action.

## Validation checklist

- [ ] Inputs, outputs, and version assumptions are explicit.
- [ ] A positive path and at least one negative/failure path are tested.
- [ ] Authorization and integrity gates cannot be overridden by query relevance or client claims.
- [ ] Logs and fixtures contain no real credentials or unnecessary private content.
- [ ] Unrun runtime or provider checks are marked blocked/unverified.

## Required output

Do not hide destructive or write side effects in a tool's description.

## Boundaries and failure handling

An MCP server exposes several related skill-management operations. When evidence or provider capability is missing, return a structured blocker instead of guessing. Do not execute publish, revoke, deploy, or destructive operations during a read-path test.

## Trigger examples

- **Positive:** The integration has one simple read-only operation.
- **Negative:** undefined
