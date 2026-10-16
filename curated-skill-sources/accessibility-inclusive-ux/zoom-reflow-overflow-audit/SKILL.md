---
name: zoom-reflow-overflow-audit
description: "Find loss of content or functionality at high zoom, text enlargement and narrow viewport reflow, distinguishing genuine exceptions from accidental overflow."
---

# Zoom Reflow Overflow Audit

## Purpose

Ensure content and actions remain usable when users enlarge text or view a page at a narrow effective viewport.

## Required inputs

Critical routes, breakpoints, typography settings, long-content fixtures, browsers and any content-specific exceptions.

## Workflow

1. Select critical flows including navigation, forms, tables, dialogs and errors; prepare long labels, large numbers and unbroken identifiers.
2. Test text enlargement and browser zoom against the product's accessibility target, including a narrow viewport equivalent.
3. Look for two-axis scrolling, overlap, clipped controls, fixed headers covering focus, lost labels and unreachable actions.
4. Distinguish content that genuinely requires two-dimensional layout from ordinary reading and interaction content.
5. Re-test keyboard reachability after responsive rearrangement and document accepted exceptions with their rationale.

## Validation checklist

- [ ] Essential content does not disappear behind clipping or overlapping layers.
- [ ] Controls remain reachable and labels associated at zoomed layouts.
- [ ] Ordinary content avoids unnecessary two-axis scrolling.
- [ ] Sticky/fixed elements do not obscure focused controls.
- [ ] Exceptions do not excuse unrelated page content.

## Required output

A route/viewport matrix, visual evidence, confirmed defects, accepted exceptions and regression breakpoints.

## Boundaries and failure handling

Do not classify every horizontal scrollbar as a failure without inspecting content semantics. Do not excuse an entire page because one embedded surface needs two-dimensional layout.

## Trigger examples

- **Positive:** A sticky checkout footer covers the main action at high zoom.
- **Negative:** Fine-tuning a layout at its standard desktop viewport only.
