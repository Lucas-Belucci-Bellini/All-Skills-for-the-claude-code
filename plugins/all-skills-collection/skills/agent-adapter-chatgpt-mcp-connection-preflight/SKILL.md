---
name: agent-adapter-chatgpt-mcp-connection-preflight
description: "Checks prerequisites for a ChatGPT-to-broker MCP connection. Use before planning an integration that depends on custom MCP access."
---

# ChatGPT MCP Connection Preflight

## Purpose

target ChatGPT workspace/plan, MCP endpoint, auth mode, administrator settings, and supported operations

## Required inputs

Verify the current platform's documented support for remote MCP, required workspace/plan settings, and read/write feature scope.

## Workflow

1. Identify the exact target provider/version, package or connection path, and relevant official contract before relying on platform behavior.
2. Run a low-risk authenticated read test and document unsupported features or required configuration steps.
3. A preflight report with confirmed prerequisites, tested tools, limitations, and fallback route.
4. Run the positive and negative conformance cases in an isolated environment, recording observed results and any untested capabilities.
5. Produce do not promise that every chatgpt plan or workspace can connect to a custom mcp server. with provider/version, evidence, limitations, and the next safe action.

## Validation checklist

- [ ] Tested provider and environment versions are recorded.
- [ ] Supported, unsupported, and unverified capabilities are distinguishable.
- [ ] At least one success path and one negative or failure path are covered.
- [ ] Private data and credentials are excluded from fixture output.
- [ ] No compatibility claim exceeds the evidence from the target environment.

## Required output

Do not promise that every ChatGPT plan or workspace can connect to a custom MCP server.

## Boundaries and failure handling

A user wants ChatGPT to fetch skills from a private broker automatically. If official documentation, workspace settings, or runtime evidence are unavailable, state the blocker and do not present integration as complete.

## Trigger examples

- **Positive:** A task is a general ChatGPT conversation with no remote repository integration.
- **Negative:** undefined
