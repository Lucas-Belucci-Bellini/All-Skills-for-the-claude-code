---
name: network-packet-fragmentation-boundary-testing
description: "Use when a game protocol must handle payloads near MTU or application-fragmentation boundaries; not for average packet bandwidth profiling."
---

# Network Packet Fragmentation Boundary Testing

## Purpose

Find truncation, ordering, and resource-exhaustion defects in message reassembly.

## Required inputs

Transport protocol, packet/fragment limits, reassembly state machine, identity, deadline, and local packet simulator.

## Workflow

1. Document payload limits, fragment metadata, sequence identity, reassembly deadline, and incomplete-message behavior.
2. Test sizes below/at/above each limit including empty, duplicate, missing, and conflicting fragments.
3. Inject reordering, loss, reconnect, and cross-session fragments to verify state isolation.
4. Bound memory/time for partial assemblies and ensure malformed payloads are never accepted as complete.

## Verification checklist

- [ ] Boundary sizes and integer overflow are tested.
- [ ] Fragments are session/message scoped and validated.
- [ ] Expired partial messages release resources and cannot complete as stale data.
- [ ] Malformed/oversized messages fail explicitly instead of silent truncation.

## Required output

A fragmentation matrix, reassembly fault results, resource-limit findings, and regression fixtures.

## Boundaries and failure handling

Use localhost/synthetic sessions; do not fuzz public game servers without authorization.

When evidence, permissions, or environment details are missing, stop at the supported analysis, record the missing prerequisite, and do not report unexecuted validation as passing.

## Trigger examples

- **Positive:** Large inventory updates arrive truncated or never complete.
- **Negative:** Measuring average bytes/second without a fragmentation symptom.
