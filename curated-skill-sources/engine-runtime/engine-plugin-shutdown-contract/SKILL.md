---
name: engine-plugin-shutdown-contract
description: Validate plugin lifecycle ordering, unregister operations, worker termination, and resource release when engine plugins unload or the runtime exits.
---

# Engine Plugin Shutdown Contract

## Goal

Prevent dangling callbacks, use-after-unload behavior, and hangs caused by plugin-owned tasks or resources surviving their host subsystem.

## Inputs to inspect

Plugin interface, dependency graph, event subscriptions, background tasks, registered resources, dynamic library policy and shutdown logs.

## Workflow

1. Inventory resources each plugin registers or owns, including callbacks, console commands, data schemas, jobs, thread-local state and graphics resources.
2. Define shutdown order as the reverse of dependencies and specify which host services remain valid during each plugin's cleanup phase.
3. Test unload while callbacks are queued, tasks are running, assets are in flight, dependencies fail, and the application is closing.
4. Verify unregistration prevents future callback entry and waits or safely fences any invocation already in progress before code can be unloaded.
5. Add lifecycle assertions and an integration test that repeatedly load/unloads plugins while checking handles, tasks and subscriptions return to baseline.

## Validation checklist

- [ ] No callback or task can execute plugin code after its executable module has been unloaded.
- [ ] Plugin cleanup can run more than once or reports a clear single-use contract.
- [ ] Dependent plugins stop before services they need are destroyed.
- [ ] A failed plugin shutdown is observable and cannot leave the entire engine hanging indefinitely.

## Required output

A plugin lifecycle dependency map, ordered shutdown contract, leak/late-callback tests and failure diagnostics.

## Boundaries and failure handling

Do not free a dynamically loaded module merely because its shutdown callback returned; verify all outstanding execution and references are gone.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
