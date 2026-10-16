---
name: mcp-auth-scope-minimization
description: "Use when reducing an MCP server's OAuth/API permissions to the smallest set required by its exposed tools; not for evaluating the semantics of tool side effects."
---

# Mcp Auth Scope Minimization

## Purpose

Prevent an MCP integration from receiving broad credentials that exceed the operations it actually needs.

## Required inputs

Tool-to-endpoint map, token scopes, app registration, resource audience, role model, authorization failures, and secret refresh/revocation behavior.

## Workflow

1. Map each exposed tool to the precise API endpoints and verbs it needs, including pagination, metadata reads, and background calls.
2. Compare this map with configured OAuth scopes, service roles, token audience, and any wildcard permissions.
3. Create a minimal scope matrix and run positive/negative integration tests for intended operations and forbidden access.
4. Verify expiration, revocation, refresh, tenant/resource boundaries, and failure behavior after a permission is removed.

## Verification checklist

- [ ] Each scope has a documented tool or endpoint need.
- [ ] Read-only behavior does not require write scopes without a justified dependency.
- [ ] Negative tests show forbidden operations fail at the API boundary.
- [ ] Tokens are scoped to the expected audience, tenant, and lifetime.

## Required output

A tool-to-scope matrix, candidate least-privilege configuration, and access regression test results.

## Boundaries and failure handling

Do not paste access tokens into reports. Test changes in a non-production app registration before reducing production permissions.

When required evidence, permissions, or environment details are unavailable, stop at the supported analysis, record the missing prerequisite, and do not report an unexecuted validation as passing.

## Trigger examples

- **Positive:** A read-oriented MCP server has access to organization-wide write permissions.
- **Negative:** Classifying whether a tool's side effects are reversible or destructive.
