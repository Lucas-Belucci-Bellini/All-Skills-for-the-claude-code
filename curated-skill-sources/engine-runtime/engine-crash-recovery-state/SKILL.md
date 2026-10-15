---
name: engine-crash-recovery-state
description: Design engine checkpoint and recovery boundaries for interrupted saves, failed resource loads, and recoverable runtime subsystems.
---

# engine crash recovery state

## Goal

Define what the engine can recover safely after a fault and what must fail closed rather than continuing with inconsistent state.

## Inputs to inspect

Save system, resource loader, world state owners, crash reports, subsystem initialization order, and failure-handling conventions.

## Workflow

1. Classify fault types into recoverable asset/config failures, subsystem restart candidates, corrupted persistent state, and fatal invariant violations.
2. Define checkpoints or atomic state publication points for saves, world loading, resource replacement, and subsystem initialization.
3. Make fallback behavior explicit: last known-good data, default configuration, safe mode, or a clear stop. Record which fallbacks are acceptable for each failure type.
4. Ensure diagnostics preserve enough context to reproduce the fault while redacting secrets and avoiding recursive failures in logging.
5. Inject missing/corrupt assets, partial writes, device reset where supported, and failed subsystem initialization; verify recovery or deliberate shutdown behavior.

## Validation checklist

- [ ] Recovery paths do not continue with partially initialized or contradictory state.
- [ ] Persistent updates use atomic replace, journaling, or another documented consistency mechanism.
- [ ] Fatal invariant failures remain fatal rather than being hidden by broad exception handling.
- [ ] Fallback behavior is visible and documented to the user/developer.
- [ ] Failure injection tests establish which classes of faults are recoverable.

## Required output

Deliver a fault-classification table, recovery-state diagram, checkpoint policy, failure-injection matrix, and known unrecoverable conditions.

## Boundaries and failure handling

Do not promise recovery from arbitrary memory corruption; do not silently reset user data when the recovery source is ambiguous.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
