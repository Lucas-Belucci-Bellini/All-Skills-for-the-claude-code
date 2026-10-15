---
name: frontend-accessibility-smoke-test
description: Run a focused accessibility smoke test across keyboard navigation, focus order, labels, contrast, and dynamic state announcements.
---

# Frontend Accessibility Smoke Test

## Goal

Catch high-impact accessibility regressions early without treating a smoke test as a substitute for a full audit.

## Inputs to inspect

Key user flows, rendered UI, component library, routing/modals, and supported browsers/input methods.

## Workflow

1. Choose critical journeys and list each interactive element, expected keyboard behavior, visible label, and dynamic feedback.
2. Navigate without a mouse through links, menus, dialogs, forms, tabs, and error states; verify focus order, visible focus, and a way to leave trapped contexts.
3. Inspect accessible names, roles, labels, required/error states, heading structure, and status announcements for dynamically updated content.
4. Check text and control contrast, zoom/reflow behavior, reduced-motion handling, and target size on representative breakpoints.
5. Record failures with route/component, reproduction steps, severity, and an objective acceptance criterion; retest after fixes using keyboard and assistive technology when available.

## Validation checklist

- [ ] Critical flows can be completed using keyboard only.
- [ ] Focus is visible and does not become lost or trapped unexpectedly.
- [ ] Controls have meaningful accessible names and form errors are associated with their fields.
- [ ] Dynamic changes communicate status without relying only on color or visual movement.
- [ ] Automated checks and manual/assistive-tech checks are labeled separately.

## Required output

Deliver a route-by-route smoke checklist, reproducible defects, severity, fixes, and the remaining audit scope.

## Boundaries and failure handling

Do not label an interface accessible merely because automated axe/lighthouse checks pass; do not hide failures by disabling focus outlines.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
