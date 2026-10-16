---
name: mcp-side-effect-risk-classification
description: "Use when reviewing MCP tools to classify their side effects and decide which calls require confirmation or isolation; not for implementing an MCP server from scratch."
---

# Mcp Side Effect Risk Classification

## Purpose

Make tool permissions reflect the real consequences of each MCP action.

## Required inputs

Tool names and schemas, implementation or documentation, remote service capabilities, credential scope, environment, and approval policy.

## Workflow

1. Inspect each tool's inputs and downstream behavior; classify it as read-only, reversible local mutation, external write, financial/identity-impacting action, or destructive/irreversible action.
2. Record hidden side effects such as sending messages, changing permissions, launching processes, uploading data, or triggering deployments.
3. Map each risk class to least-privilege scopes, confirmation requirements, sandbox boundaries, audit events, and allowed environments.
4. Test with malformed and adversarial arguments to verify that the server enforces boundaries rather than relying solely on prompt instructions.

## Verification checklist

- [ ] Classification is based on observed implementation/contract, not only the tool description.
- [ ] Irreversible or external actions have explicit approval and an auditable result.
- [ ] Read-only tools are tested not to mutate state.
- [ ] Denied calls do not leak secrets or partial data.

## Required output

An MCP side-effect inventory with risk class, allowed environments, required approval, least-privilege controls, and test evidence.

## Boundaries and failure handling

Do not invoke destructive or production tools just to discover their behavior. Use mocks, staging, or read-only inspection first.

When required evidence, permissions, or environment details are unavailable, stop at the supported analysis, record the missing prerequisite, and do not report an unexecuted validation as passing.

## Trigger examples

- **Positive:** An MCP tool named `sync` might overwrite remote configuration.
- **Negative:** Writing the initial JSON-RPC server scaffolding for an MCP tool.
