---
name: bidirectional-text-layout-regression
description: "Find layout and reading-order regressions in right-to-left, left-to-right and mixed-direction text, including punctuation, identifiers and embedded numbers."
---

# Bidirectional Text Layout Regression

## Purpose

Prevent mixed-direction content from reordering labels, identifiers, dates, punctuation or controls in ways that change meaning.

## Required inputs

Supported locales, writing directions, mixed-script fixtures, layout components and locale-specific acceptance criteria.

## Workflow

1. Identify components mixing interface language with user-provided names, URLs, identifiers, numbers, code or punctuation.
2. Build fixtures for pure RTL, pure LTR and mixed strings, including parentheses, hyphens, currency, dates and long tokens.
3. Verify direction is intentional at document/component boundaries; isolate embedded fragments rather than injecting arbitrary directional controls.
4. Compare visual order, keyboard order, copy/paste output, accessible reading order and narrow-width behavior.
5. Record each regression with locale, safe fixture, expected behavior and the responsible component boundary.

## Validation checklist

- [ ] Mixed text keeps punctuation and identifiers attached to the intended fragment.
- [ ] Directional layout preserves logical reading and keyboard order.
- [ ] User content cannot unexpectedly change surrounding interface direction.
- [ ] Overflow, ellipsis and wrapping are included in tests.
- [ ] Copy/paste and accessible names preserve meaningful text.

## Required output

A locale fixture matrix, rendering evidence, component-level remediation notes and reusable regression cases.

## Boundaries and failure handling

Do not assume every RTL locale uses identical conventions. Do not normalize away meaningful user text to improve screenshots. Keep production personal data out of fixtures.

## Trigger examples

- **Positive:** A mixed Arabic/Latin invoice identifier renders punctuation on the wrong side.
- **Negative:** Translating plain copy with no mixed-direction layout risk.
