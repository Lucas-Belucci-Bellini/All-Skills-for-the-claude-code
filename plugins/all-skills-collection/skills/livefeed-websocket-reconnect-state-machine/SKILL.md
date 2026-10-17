---
name: livefeed-websocket-reconnect-state-machine
description: "Validate WebSocket connection transitions, reconnect policy, and data continuity for a live feed."
---

# Live Feed WebSocket Reconnect State Machine

## Purpose

Ensure temporary disconnects recover predictably without duplicated subscriptions or false continuity claims.

## Required inputs

Socket lifecycle code, connection events, reconnect limits, subscription protocol, sequence IDs if supplied, and fake-socket tests.

## Workflow

1. Enumerate states from idle through connecting, open, retry-wait, degraded, and closed; define legal transitions.
2. Specify backoff, max retry duration, intentional close behavior, and whether a subscription must be replayed.
3. Simulate duplicate close events, network flaps, delayed handshake, malformed frames, and late messages after close.
4. Verify state and freshness are visible to downstream consumers until a valid connection and data event are re-established.

## Validation checklist

- [ ] Each connection generation owns at most one active socket and listener set.
- [ ] Intentional shutdown does not schedule a reconnect.
- [ ] Late messages from superseded connections are ignored.
- [ ] Recovery resets retry state only after a valid health signal.

## Required output

A connection state diagram, fake-socket transition suite, and recovery/freshness contract.

## Boundaries and failure handling

Do not treat socket-open as proof that the data provider is healthy or current.

## Trigger examples

- **Positive:** A live stream reconnects twice or renders records from an obsolete socket after a network flap.
- **Negative:** A request to hide a sustained feed outage by reporting a permanently connected state.
