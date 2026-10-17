---
name: agent-capability-matrix-audit
description: "Audits real tool, skill, connector, and authentication capabilities by agent version and deployment environment. Use before promising cross-provider integration."
---

# Agent Capability Matrix Audit

## Purpose

Prevent integration plans from depending on features that a particular agent, workspace, or subscription cannot actually use.

## Required inputs

Target platform names, versions, plan/workspace assumptions, official documentation, enabled connectors, and desired operations.

## Workflow

1. List each required capability separately: read repository data, retrieve a file, call remote tools, use MCP, write a proposal, open a PR, and receive updated skills.
2. For each platform/environment, record verified, documented-but-untested, unavailable, and unknown separately; attach a source or test for each positive claim.
3. Distinguish product support from account/workspace configuration, administrator policy, authentication and repository permission.
4. Test a least-privileged read-only path first; test writes only in an isolated branch or sandbox with disposable data.
5. Turn unsupported or unknown rows into explicit prerequisites or an alternative delivery path before designing dependent work.

## Validation checklist

- [ ] Every claimed capability names the target environment and evidence.
- [ ] Unknown values are not treated as supported.
- [ ] Read, write, approval, and deployment permissions are listed separately.
- [ ] Documentation dates and tested product versions are recorded.
- [ ] A fallback is supplied for every critical unavailable capability.

## Required output

A dated capability matrix with evidence, constraints, open questions, and per-platform integration decisions.

## Boundaries and failure handling

Do not use marketing copy alone as proof that a capability is enabled in the user's account. Do not request or store credentials as part of the audit.

If required evidence is missing, record the gap and stop before irreversible actions. Do not claim a test, network request, compatibility result, or approval occurred unless its evidence was observed.

## Trigger examples

- **Positive:** The project needs to confirm whether ChatGPT can call a custom skill broker in a specific workspace.
- **Negative:** The task is unrelated to agent tools or deployment capabilities.
