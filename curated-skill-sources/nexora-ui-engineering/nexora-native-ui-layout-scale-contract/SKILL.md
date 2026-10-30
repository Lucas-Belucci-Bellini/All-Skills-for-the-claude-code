---
name: nexora-native-ui-layout-scale-contract
description: "Translate interface designs into resolution-independent native engine layout rules. Use when implementing menus or HUDs across window sizes, aspect ratios and UI scale settings."
---

# NEXORA Native UI Layout Scale Contract

## Purpose

Ensure native UI geometry remains legible and predictable across resolutions without baking a single screenshot's pixel coordinates into the runtime.

## Required inputs

- The design reference and intended screen states, including target aspect ratios and minimum window size.
- The engine's actual UI coordinate system, font metrics, anchoring/layout primitives and input model.
- Required scale settings, safe-area behavior, localization constraints and accessibility expectations.

## Workflow

1. Inspect the existing UI renderer and layout primitives before choosing an implementation pattern; do not assume a web DOM, CSS engine or a specific UI crate exists.
2. Separate logical design units from physical framebuffer pixels and document the conversion point, rounding policy and scale source.
3. Define anchors, constraints, minimum/maximum sizes and overflow behavior for each major region; prefer relationships over screenshot-specific absolute positions.
4. Test representative wide, tall, ultrawide and minimum-window layouts, including long localized strings and large text settings.
5. Verify hit targets and pointer/controller navigation use the same transformed geometry as rendering.
6. Record intentional deviations from the design reference and add deterministic layout snapshots or geometry assertions.

## Validation checklist

- [ ] Logical-to-physical scaling occurs in one documented layer.
- [ ] Text, hit targets and visual bounds share a consistent transform.
- [ ] Layout remains usable at the declared minimum size and supported aspect ratios.
- [ ] Overflow, clipping and localization expansion have explicit behavior.

## Required output

A layout contract, scale formula, breakpoint/constraint table, representative screenshots or geometry snapshots, and unresolved design questions.

## Boundaries and failure handling

Do not copy Figma pixel positions directly into framebuffer coordinates. Do not claim support for aspect ratios or accessibility settings that were not exercised.

## Trigger examples

- **Positive:** A menu design must work at 1080p, 1440p and ultrawide resolutions.
- **Positive:** HUD elements drift or become too small when the game window is resized.
- **Negative:** The request is only to restyle a web frontend.
- **Negative:** The engine has no native UI renderer yet and the task is merely speculative concept art.
