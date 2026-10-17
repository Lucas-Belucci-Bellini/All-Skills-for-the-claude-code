---
name: rust-service-startup-shutdown-test
description: Test startup readiness, task supervision, signal handling, draining, and bounded shutdown for Rust daemons and runtime processes.
---

# Rust Service Startup/Shutdown Test

## Goal

Prove that service lifecycle behavior is correct when dependencies fail, requests are active, tasks are cancelled, or shutdown signals arrive repeatedly.

## Inputs to inspect

Main entrypoint, async runtime, service dependencies, health/readiness hooks, worker tasks, shutdown signal handlers and persistence.

## Workflow

1. Define startup phases and readiness conditions; separate process creation from the moment the service is actually capable of accepting work.
2. Test dependency unavailable, invalid configuration, bind failure, partial initialization and successful retry to verify cleanup and correct exit status.
3. Send shutdown while idle, under request load, with queued jobs, during I/O and after one worker has failed; record how each unit of work is disposed.
4. Verify cancellation reaches child tasks, deadlines bound drain time, and resource guards/temporary files/connections return to baseline.
5. Add an integration test that starts a real test binary in an isolated environment and checks readiness, signal response, exit code and residual resources.

## Validation checklist

- [ ] The service does not report ready before critical dependencies are usable.
- [ ] Partial startup failure cleans up resources already acquired.
- [ ] Shutdown is bounded and reports unfinished durable work instead of silently claiming success.
- [ ] Worker failures are supervised and cannot leave the parent process waiting forever.

## Required output

A lifecycle test matrix, observed process-level test results, readiness/termination contract and regression scenarios.

## Boundaries and failure handling

Do not test signal handling only by calling an internal method; exercise the actual process boundary and ensure tests use isolated ports/files.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
