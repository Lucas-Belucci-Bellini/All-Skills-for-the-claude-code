---
name: voice-agent-microphone-lifecycle-cleanup
description: "Verify microphone, playback, data-channel, and observer resources are released on every voice-session exit path."
---

# Voice Agent Microphone Lifecycle Cleanup

## Purpose

Prevent microphones remaining active, audio playback leaking between sessions, or duplicate listeners accumulating after reconnects.

## Required inputs

Connection setup/teardown, media-stream tracks, playback elements, event listeners, abort scopes, and test harness.

## Workflow

1. Inventory every resource acquired during startup and register its cleanup next to the acquisition point.
2. Enumerate normal stop, permission denial, connection failure, timeout, tab teardown, and restart flows.
3. Run repeated start/stop and mid-start cancellation tests while asserting tracks, channels, timers, and listeners are released.
4. Inspect late callbacks after teardown and ensure they cannot recreate resources without a new session generation.

## Validation checklist

- [ ] Microphone tracks stop on every terminal path.
- [ ] Only one active playback/listener set exists per current session.
- [ ] Cleanup is idempotent and tolerates partial initialization.
- [ ] A late event from a closed connection cannot revive the old session.

## Required output

A resource ownership table, teardown path matrix, and regression tests for leak-free repeated sessions.

## Boundaries and failure handling

Respect browser microphone permission and visible recording indicators; never bypass user permission or continue capture after session stop.

## Trigger examples

- **Positive:** Repeated voice sessions leave duplicate event handlers or the microphone indicator active after stop.
- **Negative:** A request to keep listening after the user ends the voice session or denies permission.
