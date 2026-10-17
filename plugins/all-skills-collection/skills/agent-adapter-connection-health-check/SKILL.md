---
name: agent-adapter-connection-health-check
description: "Checks that an agent adapter can reach required broker functions. Use after configuration changes or service incidents."
---

# Agent Adapter Connection Health Check

## Purpose

endpoint config, authentication status, capability list, safe fixture IDs, and timeout policy

## Required inputs

Probe health metadata and a minimal read-only query without fetching arbitrary private content.

## Workflow

1. Identify the exact target provider/version, package or connection path, and relevant official contract before relying on platform behavior.
2. Distinguish DNS/network failure, TLS error, authentication denial, timeout, schema mismatch, and broker health failure.
3. A health report with normalized status, observed latency, and safe remediation.
4. Run the positive and negative conformance cases in an isolated environment, recording observed results and any untested capabilities.
5. Produce a healthy transport response does not prove skill search or retrieval works; test both separately. with provider/version, evidence, limitations, and the next safe action.

## Validation checklist

- [ ] Tested provider and environment versions are recorded.
- [ ] Supported, unsupported, and unverified capabilities are distinguishable.
- [ ] At least one success path and one negative or failure path are covered.
- [ ] Private data and credentials are excluded from fixture output.
- [ ] No compatibility claim exceeds the evidence from the target environment.

## Required output

A healthy transport response does not prove skill search or retrieval works; test both separately.

## Boundaries and failure handling

A connector appears configured but agents cannot find skills. If official documentation, workspace settings, or runtime evidence are unavailable, state the blocker and do not present integration as complete.

## Trigger examples

- **Positive:** No remote connector is configured or required.
- **Negative:** undefined
