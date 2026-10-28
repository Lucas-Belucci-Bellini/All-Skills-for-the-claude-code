---
name: validating-multiplayer-session-lifecycle
description: "Validates multiplayer lobby, join, leave, host migration, reconnect, and shutdown transitions as a session lifecycle. Use when sessions leak resources, strand players, duplicate participants, or recover inconsistently."
---

# Validating Multiplayer Session Lifecycle

## Goal
Make session transitions explicit and recoverable so a disconnect, host departure, or late join does not leave the match in a contradictory state.

## Procedure
1. Define session states such as idle, creating, lobby, starting, in-match, migrating, ending, and closed. Specify which states are valid for the chosen architecture.
2. Document transition triggers, authority, timeout behavior, and user-visible outcomes. Include rejected transitions and duplicate requests.
3. Assign stable session and participant identifiers. Treat a reconnect as a candidate to resume an existing participant identity, not automatically as a new player.
4. Define join/leave semantics for each phase: before match start, during active play, during migration, and after match end. State whether late join and rejoin are supported.
5. Make host loss explicit. Choose a documented policy—end session, elect a host, or transfer authority—and define what happens if migration fails or times out.
6. Ensure lifecycle operations are idempotent. Repeated leave, cancel, start, or reconnect requests must not double-release resources or create duplicate participants.
7. Bound retries and deadlines. Distinguish a temporary transport outage from an authoritative session termination and avoid retry loops with no terminal outcome.
8. Clean up subscriptions, sockets, timers, reservations, and temporary match resources on every terminal path. Check both client and server cleanup.
9. Test race conditions: join versus start, leave versus match end, two reconnects for one identity, host loss during migration, and stale callbacks after session closure.
10. Emit structured lifecycle events with session ID, participant ID, previous/new state, reason, authority, and correlation ID. Exclude secrets and unnecessary personal data.
11. Run fault-injection tests for delayed messages, dropped connections, duplicate commands, and server restarts. Confirm the resulting state is deterministic or explicitly documented as best-effort.

## Deliverables
- Session state diagram and transition table
- Identity and rejoin policy
- Timeout/retry policy
- Cleanup checklist for every terminal state
- Race-condition and fault-injection test matrix

## Acceptance criteria
- No participant is registered twice for the same active identity.
- Every transition has a defined owner and failure outcome.
- Host-loss and reconnect behavior are reproducible in tests.
- Closed sessions release resources and reject stale callbacks.
- Logs can reconstruct a transition without exposing credentials.

## Avoid
- Treating transport connectivity as proof that a session is still valid.
- Creating a new player identity for every reconnect attempt.
- Cleaning up resources only on the normal success path.
- Allowing an unbounded retry loop to hide a terminal failure.
