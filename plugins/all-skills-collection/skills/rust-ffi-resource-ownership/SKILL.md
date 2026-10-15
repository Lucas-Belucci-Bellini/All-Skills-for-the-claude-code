---
name: rust-ffi-resource-ownership
description: Review Rust FFI resource ownership, allocator boundaries, callback lifetimes, and error propagation across native-language interfaces.
---

# Rust Ffi Resource Ownership

## Goal

Prevent leaks, double frees, dangling callbacks, and invalid ownership assumptions between Rust and foreign code.

## Inputs to inspect

Extern declarations, C headers or bindings, resource constructors/destructors, callbacks, and thread/shutdown behavior.

## Workflow

1. Create an ownership table for every resource crossing the FFI boundary: allocator, owner, transfer point, permitted lifetime, and destructor.
2. Check pointer nullability, buffer lengths, alignment, string encoding/termination, struct layout, enum representation, and integer-width assumptions.
3. Audit callback registration/unregistration and foreign retention of pointers, including thread safety and shutdown order.
4. Define how Rust panics, C++ exceptions, and foreign error codes are contained or translated; prevent unwinding across unsupported ABI boundaries.
5. Add tests for null/empty input, repeated create/destroy, callback cancellation, malformed lengths, and failure paths; use sanitizer/Miri coverage where applicable.

## Validation checklist

- [ ] Each allocated object has exactly one documented release responsibility or explicit shared ownership.
- [ ] Pointers are not retained beyond the guaranteed owner lifetime.
- [ ] ABI layouts and integer/string conventions match the foreign declarations.
- [ ] Error and panic behavior cannot unwind unexpectedly across the ABI boundary.
- [ ] Failure-path tests cover partial initialization and callback teardown.

## Required output

Produce an FFI ownership matrix, confirmed lifetime/ABI risks, minimal wrapper design, and a test plan for both sides of the boundary.

## Boundaries and failure handling

Do not infer safety from generated bindings alone; do not free memory with a different allocator than the one that created it.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
