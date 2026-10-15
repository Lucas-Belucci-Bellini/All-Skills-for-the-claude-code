---
name: network-protocol-versioning
description: Plan multiplayer protocol evolution with compatibility ranges, capability negotiation, schema changes, and safe rejection of unsupported peers.
---

# network protocol versioning

## Goal

Allow clients and servers to evolve without silent packet misinterpretation or accidental compatibility promises.

## Inputs to inspect

Packet schemas, protocol version, server/client release cadence, serialization formats, and current matchmaking rules.

## Workflow

1. Inventory packet types and identify required, optional, derived, and deprecated fields. Record assumptions about ordering, units, enum values, and defaults.
2. Choose explicit protocol and schema version semantics; define the compatible client/server ranges and when capability negotiation is required.
3. Create migration rules for additive fields, changed meaning, removed messages, and enum expansion. Reject incompatible peers before entering a session.
4. Add golden packet fixtures for old/new versions and test unknown fields, unknown enum values, truncation, oversized messages, and malformed input.
5. Update release notes, telemetry, and matchmaking gates so operators can see which versions are still connected.

## Validation checklist

- [ ] Compatibility guarantees are stated as tested ranges, not assumed from similar version strings.
- [ ] Unknown or unsupported values have safe, documented behavior.
- [ ] Incompatible peers are rejected before state mutation with an actionable reason.
- [ ] Golden packet fixtures protect old-version parsing and serialization.
- [ ] Protocol rollout includes rollback and observability for version-specific failures.

## Required output

Deliver a protocol compatibility table, negotiation contract, schema migration plan, fixture set, and rollout/rollback notes.

## Boundaries and failure handling

Do not reuse a field with a new meaning under the same protocol version; do not accept malformed packets for convenience.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
