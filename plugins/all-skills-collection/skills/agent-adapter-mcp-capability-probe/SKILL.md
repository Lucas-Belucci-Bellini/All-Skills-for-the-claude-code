---
name: agent-adapter-mcp-capability-probe
description: "Probes supported MCP operations and resources in a connected client. Use when an adapter depends on tools, resources, prompts, or sampling features."
---

# MCP Capability Probe for Agent Adapters

## Purpose

MCP client/server versions, enabled feature list, connection logs, and safe fixture server

## Required inputs

Negotiate supported protocol versions and enumerate tools/resources/prompts without invoking write operations.

## Workflow

1. Identify the exact target provider/version, package or connection path, and relevant official contract before relying on platform behavior.
2. Call one safe read-only fixture per advertised capability and mark each result observed, unavailable, or untested.
3. A capability probe report with protocol version, feature outcomes, and adapter limitations.
4. Run the positive and negative conformance cases in an isolated environment, recording observed results and any untested capabilities.
5. Produce do not infer support for a feature simply because the transport connected. with provider/version, evidence, limitations, and the next safe action.

## Validation checklist

- [ ] Tested provider and environment versions are recorded.
- [ ] Supported, unsupported, and unverified capabilities are distinguishable.
- [ ] At least one success path and one negative or failure path are covered.
- [ ] Private data and credentials are excluded from fixture output.
- [ ] No compatibility claim exceeds the evidence from the target environment.

## Required output

Do not infer support for a feature simply because the transport connected.

## Boundaries and failure handling

An MCP integration connects but the broker needs to know which operations the client actually exposes. If official documentation, workspace settings, or runtime evidence are unavailable, state the blocker and do not present integration as complete.

## Trigger examples

- **Positive:** No MCP endpoint or adapter capability is involved.
- **Negative:** undefined
