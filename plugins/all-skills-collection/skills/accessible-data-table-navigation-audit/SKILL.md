---
name: accessible-data-table-navigation-audit
description: "Audit complex data tables for header relationships, sorting announcements, row actions and keyboard navigation beyond a basic page-level smoke test."
---

# Accessible Data Table Navigation Audit

## Purpose

Make dense, interactive tables understandable and operable when users navigate by keyboard or assistive technology.

## Required inputs

Table markup or grid component, row/column model, sort and filter behaviors, pagination, row actions and representative data.

## Workflow

1. Determine whether the interaction is a semantic table or an application grid; do not assign grid keyboard behavior to a normal table without need.
2. Verify header-to-cell relationships, caption/name, sort state and row-header semantics.
3. Exercise sorting, filters, pagination, empty results, expandable rows, selection and per-row menus using keyboard only.
4. Confirm sort changes and result updates are announced, focus remains stable after refresh, and row action names identify the relevant record.
5. Test narrow viewports, zoom, long values and loading transitions to ensure the active row and column remain understandable.

## Validation checklist

- [ ] Table purpose and headers are available programmatically.
- [ ] Sort state is exposed and changes are communicated.
- [ ] Keyboard behavior matches the component pattern.
- [ ] Pagination/filtering do not silently reset focus or selection.
- [ ] Per-row actions have distinguishable accessible names.

## Required output

A table interaction matrix, header/keyboard defects, announcement requirements and repeatable tests.

## Boundaries and failure handling

Do not replace semantic table structure with generic roles without need. Do not mark a table accessible based only on automated output or visual inspection.

## Trigger examples

- **Positive:** Keyboard users lose their place after sorting a results table.
- **Negative:** A static two-column layout used only for decoration.
