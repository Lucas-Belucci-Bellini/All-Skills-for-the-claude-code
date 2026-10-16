---
name: network-packet-budget-analysis
description: Measure packet sizes, update frequency, burst behavior, and transport overhead against bandwidth and MTU constraints.
---

# Network Packet Budget Analysis

## Goal

Keep gameplay traffic predictable and avoid fragmentation, congestion bursts, or excessive bandwidth from high-entity-count states.

## Inputs to inspect

Packet traces, message schemas, update cadence, entity population, transport headers, MTU settings and loss/latency tests.

## Workflow

1. Inventory message types and estimate per-message payload plus transport/protocol overhead, including framing, encryption and retransmission when applicable.
2. Capture typical and worst-case sessions at representative player/entity counts; report packet rate, payload percentiles, burst size and bytes per client.
3. Identify redundant fields, over-frequent updates, excessive precision, oversized snapshots and messages that exceed the intended datagram budget.
4. Test MTU boundaries, packet loss, reordering, congestion and reconnect bursts; verify oversized messages are split or rejected according to protocol rules.
5. Define per-message and aggregate budgets with telemetry for sustained and peak use, then compare representative gameplay fixtures against those limits.

## Validation checklist

- [ ] Payload bytes and wire bytes are distinguished and measured correctly.
- [ ] Worst-case packet size respects the chosen transport/MTU policy or is deliberately fragmented at the application layer.
- [ ] Budget estimates include bursts and per-client fanout rather than only average bandwidth.
- [ ] Message reduction preserves required authority, precision and backward compatibility.

## Required output

A message-size/frequency table, peak bandwidth profile, MTU findings and budget thresholds for representative sessions.

## Boundaries and failure handling

Do not optimize packet size based only on compression ratio; account for CPU cost, added latency and recoverability.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
