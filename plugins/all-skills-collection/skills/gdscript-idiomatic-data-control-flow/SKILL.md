---
name: gdscript-idiomatic-data-control-flow
description: "Original GDScript engineering workflow for model data and control flow using the language's native semantics, with reproducible validation and language-specific boundaries."
---

# Idiomatic data and control-flow design for GDScript

## Purpose

Model data and control flow using the language's native semantics for real repositories and production-bound code. This workflow is written specifically around GDScript semantics and the toolchain described below, rather than treating every language as interchangeable.

## When to use

Use when a task creates, changes, reviews, debugs, optimizes, or secures GDScript code or its build/runtime integration.

## Required inputs

domain examples, language version, data invariants, error cases, and API boundaries.

## Language-specific implementation notes

- Toolchain: Godot version, project.godot, autoloads, scene/resource layout, typed-script policy.
- Core model: typed variables, signals, nodes, resources, scene ownership, coroutines, lifecycle callbacks.
- Verification: headless checks, GUT/project-native tests, scene smoke tests, input fixtures.
- Performance: Godot profiler, frame-time captures, node counts, allocations, draw calls, physics cost.
- Security: resource path validation, multiplayer authority, safe save parsing, signal lifecycle cleanup.

## Workflow

1. Confirm language version and runtime semantics before choosing patterns. typed variables, signals, nodes, resources, scene ownership, coroutines, lifecycle callbacks.
2. Translate the domain into explicit data types, states, invariants, and ownership/lifetime rules.
3. Choose native control-flow and abstraction mechanisms; avoid patterns that fight the language's execution or memory model.
4. Define success, absence, cancellation, and failure behavior at every public boundary.
5. Keep side effects visible and isolate parsing, transformation, domain logic, and I/O where supported.
6. Add examples for normal, boundary, and invalid states; review generated or implicit behavior separately.
7. Document the idiom, its tradeoffs, and when a simpler construct is preferable.

## Validation checklist

- [ ] The target language version, toolchain, environment, and supported platforms are explicit.
- [ ] The implementation follows the language's actual semantics and records relevant tradeoffs.
- [ ] Validation covers normal, boundary, invalid, and failure paths with reproducible commands.
- [ ] Performance or security claims are supported by measurements/tests, not assumptions.
- [ ] Generated files, dependencies, secrets, and external interfaces follow repository policies.

## Required output

A reviewed implementation pattern with explicit invariants, error behavior, and representative examples. Include changed paths, commands executed, actual results, assumptions, and remaining risks.

## Boundaries and failure handling

Do not infer compiler/runtime behavior from another language or version. Do not claim a build, test, benchmark, or security review passed unless it was executed and its result was observed. Preserve existing public contracts unless the task explicitly authorizes a breaking change. If the target toolchain or runtime is unavailable, provide the exact blocked check and a reproducible command for the owner to run.

## Trigger examples

- **Positive:** Model data and control flow using the language's native semantics in this GDScript project and verify the result against its actual toolchain.
- **Negative:** Rewrite this repository in another language or claim all platforms work without testing them.
