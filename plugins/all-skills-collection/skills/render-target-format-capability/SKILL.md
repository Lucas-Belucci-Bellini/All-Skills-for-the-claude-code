---
name: render-target-format-capability
description: Validate render-target and texture formats against device capabilities, usage flags, precision needs, and fallback paths.
---

# Render Target Format Capability

## Goal

Select formats that are both supported by target devices and sufficient for the pass's color, depth, sampling and storage requirements.

## Inputs to inspect

Format-selection code, target-device capability tables, render-pass usage, color-space intent, bandwidth budgets, and fallback code.

## Workflow

1. Classify each render target by required usages: attachment, sampled, storage/image load-store, copy source/destination, depth/stencil and present.
2. Query or inspect format support for the exact combination of usages and sample count on every supported backend/device tier.
3. Check data precision, HDR range, signedness, sRGB behavior, channel packing and depth precision against what the producing and consuming shaders require.
4. Exercise unsupported-format devices or test overrides to confirm fallback formats preserve semantics and do not create incompatible pipelines.
5. Record memory/bandwidth effects and add startup diagnostics that identify the selected format and reason for each fallback.

## Validation checklist

- [ ] Format capability is verified for the combination of usages, not only whether the format exists.
- [ ] sRGB/linear conversions and HDR precision are intentional and tested.
- [ ] Fallbacks have known quality and memory impacts and remain compatible with shader variants.
- [ ] Unsupported capabilities fail with actionable diagnostics rather than a late driver error.

## Required output

A render-target format matrix, capability-tested fallbacks, precision/bandwidth notes, and a device-tier regression checklist.

## Boundaries and failure handling

Do not silently downgrade depth, HDR or data formats when the change can alter rendering correctness or gameplay-visible output.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
