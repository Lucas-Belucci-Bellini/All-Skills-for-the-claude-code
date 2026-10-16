---
name: render-pass-state-transition
description: Review render-pass transitions for attachment layouts, access masks, load/store actions, and explicit API state requirements.
---

# Render Pass State Transition Review

## Goal

Ensure each render pass leaves resources in a state compatible with the next consumer on every supported graphics backend.

## Inputs to inspect

Render pass setup, attachment formats, resource states/layouts, barriers, backend abstraction, and validation output.

## Workflow

1. Write a per-pass transition table for initial state, required state, access scope, load/store intent, and state after completion.
2. Trace producer-to-consumer chains including depth, color, resolve targets, sampled textures, storage images, copies and presentation.
3. Verify that barriers target the correct stages, access types, layouts and subresource ranges; check backend-specific restrictions and implicit transitions.
4. Test first use, reuse across frames, partial mip/layer access, skipped passes, MSAA resolve, and resize/recreation cases.
5. Turn each confirmed mismatch into an assertion, backend conformance test or state-tracker regression instead of adding undocumented fallback barriers.

## Validation checklist

- [ ] Load operations never depend on content that was not initialized in the current valid lifetime.
- [ ] Store/resolve choices preserve data required by later passes without unnecessary bandwidth.
- [ ] Barriers cover the real producer and consumer scopes, including subresources and queues.
- [ ] D3D/Vulkan/Metal or other backend mappings preserve the abstraction's intended semantics.

## Required output

A pass transition matrix, confirmed API-state defects, backend comparison notes, and focused transition tests.

## Boundaries and failure handling

Do not copy one backend's implicit behavior into a supposedly portable abstraction without documenting the semantic mismatch.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
