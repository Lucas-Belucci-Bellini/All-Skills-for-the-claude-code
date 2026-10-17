---
name: netcode-packet-parser-fuzz-regression
description: "Provides an evidence-driven workflow for netcode packet parser fuzz regression, with concrete invariants, representative failure cases, and a reviewable validation artifact. Use when implementing, diagnosing, or changing this specific boundary."
---

# Netcode Packet Parser Fuzz Regression

## Purpose

Provide a task-specific, reproducible workflow for netcode packet parser fuzz regression; isolate the relevant contract and produce evidence another maintainer can review without relying on undocumented context.

## Required inputs

Target project or service and version; current configuration/data shape; expected behavior and invariant; minimal sanitized reproduction or fixture; toolchain/environment; and applicable safety, rollback, retention or approval requirements. Capture exact identifiers when useful, but do not include credentials or unnecessary personal data.

## Workflow

1. Pin protocol/build versions and capture the authority model, tick rate, session identity, relevant packet/command traces and reproduction seed; redact secrets and player identifiers.
2. Define the invariant at both client and server boundaries, including ownership, sequence/epoch behavior, resource limits, and which side effects must occur only once.
3. Create deterministic tests for loss, duplication, reordering, delay, clock skew, reconnect, malformed or oversized packets, and incompatible feature versions as applicable.
4. Run in a network simulator or isolated test server first; verify invalid commands are rejected server-side and observe latency, CPU/memory use, resynchronization and cleanup.
5. Preserve packet/log evidence and record the tested versions, expected/observed state, edge cases and bounded rollback or mitigation; do not infer exploitability without reproduction.

## Validation checklist

- [ ] The scope, assumptions, version and expected invariant for netcode packet parser fuzz regression are explicit.
- [ ] Success and negative/boundary/failure cases are represented by a repeatable fixture or reviewable evidence.
- [ ] The procedure checks the relevant state/data/permission boundary and records expected versus observed results.
- [ ] Failure recovery, rollback or safe stop behavior is defined before irreversible actions.
- [ ] The report distinguishes verified, failed, blocked and untested claims and includes a named next action for remaining gaps.

## Required output

A netcode packet parser fuzz regression evidence package containing context/version, reproduction/fixture, invariants, checks performed, measured or observed results, failure cases, recommended action, rollback/recovery notes and PASS / FAIL / UNVERIFIED status.

## Boundaries and failure handling

Treat client messages as untrusted. Validate actions on the authoritative side, bound queues and payloads, avoid logging credentials/session tokens, and require approval before load/attack tests against shared systems.
If the version, source contract or permission boundary cannot be confirmed, mark the result UNVERIFIED and stop before irreversible changes. Bound retries, preserve the smallest useful reproduction and escalate when evidence is ambiguous. Never claim a test, deployment, provider response, runtime behavior or approval occurred unless the result was actually observed.

## Trigger examples

- **Positive:** An engineer needs to investigate or change netcode packet parser fuzz regression and must provide reproducible evidence, known limits and recovery steps.
- **Negative:** The request does not involve netcode packet parser fuzz regression or a downstream contract affected by this exact boundary.
