---
name: rendering-abstraction-design
description: "Designs a renderer abstraction that preserves backend capabilities without over-generalizing. Use when splitting engine rendering code from graphics APIs or adding a second backend."
---

# Rendering Abstraction Design

## Use when
Rendering code is leaking API-specific types into gameplay and world systems, or a new backend is exposing premature abstraction.

## Workflow
1. Inventory which operations are truly shared and which differ between the current graphics API and likely next backend.
2. Define a narrow render-device/resource interface for buffers, textures, pipelines, uploads, command submission, and readback only where needed.
3. Keep backend capabilities explicit; fail early when a requested feature is unsupported instead of silently emulating it.
4. Build a vertical slice that uploads a mesh, updates a uniform, presents a frame, and reports a GPU validation error.

## Required output
A capability matrix, interface draft, ownership/lifetime rules, and a backend vertical-slice acceptance checklist.

## Validation
- Gameplay modules do not import backend-specific resource types.
- Resource lifetime and device-loss behavior are documented.
- The abstraction maps to current use cases without dozens of unused generic parameters.

## Guardrails
Avoid designing a universal rendering API before a second real use case exists; keep escape hatches explicit and measurable.
