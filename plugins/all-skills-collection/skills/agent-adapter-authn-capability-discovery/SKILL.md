---
name: agent-adapter-authn-capability-discovery
description: "Determines which authentication modes an agent adapter supports. Use when configuring private registry access across providers."
---

# Adapter Authentication Capability Discovery

## Purpose

provider docs, connection configuration, identity source, OAuth/API token scope, and test tenant

## Required inputs

Document supported auth flows and distinguish platform login from credentials accepted by the broker.

## Workflow

1. Identify the exact target provider/version, package or connection path, and relevant official contract before relying on platform behavior.
2. Test least-privilege access, expiry, missing credentials, revocation, and denied scope with nonproduction identities.
3. An auth capability matrix and safe setup prerequisites.
4. Run the positive and negative conformance cases in an isolated environment, recording observed results and any untested capabilities.
5. Produce never place tokens or passwords in skill files, source-controlled examples, or logs. with provider/version, evidence, limitations, and the next safe action.

## Validation checklist

- [ ] Tested provider and environment versions are recorded.
- [ ] Supported, unsupported, and unverified capabilities are distinguishable.
- [ ] At least one success path and one negative or failure path are covered.
- [ ] Private data and credentials are excluded from fixture output.
- [ ] No compatibility claim exceeds the evidence from the target environment.

## Required output

Never place tokens or passwords in skill files, source-controlled examples, or logs.

## Boundaries and failure handling

An adapter needs access to private skills through an authenticated broker. If official documentation, workspace settings, or runtime evidence are unavailable, state the blocker and do not present integration as complete.

## Trigger examples

- **Positive:** All skills are public static files and require no user identity.
- **Negative:** undefined
