---
name: renderer-frame-capture-triage
description: Triage GPU frame captures to localize rendering correctness or performance regressions to a pass, resource, or synchronization point.
---

# Renderer Frame Capture Triage

## Goal

Turn a capture from a failing scene into a reproducible, evidence-backed diagnosis rather than guessing from visual symptoms.

## Inputs to inspect

GPU frame captures, failing scene/build revision, pipeline and resource labels, CPU/GPU timing data, and expected output.

## Workflow

1. Record the exact build, device/driver, resolution, scene state, capture tool version, and reproduction sequence; verify the capture reproduces the reported artifact or stall.
2. Walk the frame in execution order and isolate the earliest pass where output, bindings, geometry, synchronization or timing diverges from expectation.
3. Inspect pipeline state, viewport/scissor, attachment formats, shader inputs, resource contents and barriers only for the implicated pass and its direct dependencies.
4. Compare a known-good capture or controlled toggle, changing one feature at a time; distinguish missing/wrong data from scheduling stalls and GPU saturation.
5. Document the minimum reproduction and add a named pass marker, debug assertion, image comparison, or performance threshold that can detect recurrence.

## Validation checklist

- [ ] Diagnosis is anchored to a specific pass/resource/event and captured evidence.
- [ ] CPU waits are not misreported as shader cost, and GPU duration is not inferred from wall-clock capture time.
- [ ] Driver/tool differences and nondeterministic scene state are recorded as limitations.
- [ ] The proposed fix is validated against both the failing scene and a representative unaffected scene.

## Required output

A capture walkthrough, earliest-divergence point, evidence screenshots/event references, root-cause confidence, and verification procedure.

## Boundaries and failure handling

Do not claim a root cause from a single frame when the capture is missing prerequisites or the failure is not reproducible.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
