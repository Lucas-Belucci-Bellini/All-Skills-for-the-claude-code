---
name: localization-placeholder-integrity
description: Validate localization catalogs for placeholder parity, missing keys, plural rules, encoding, and runtime fallback behavior.
---

# localization placeholder integrity

## Goal

Prevent translated UI or dialogue from crashing, losing variables, or displaying untranslated internal keys.

## Inputs to inspect

Source and translated catalogs, placeholder syntax, plural rules, locale configuration, and localization build pipeline.

## Workflow

1. Extract keys from source and every locale; classify missing, extra, duplicate, unused, and renamed keys without changing source content.
2. Parse placeholders and compare variable names/types and formatting requirements between source and translations, accounting for locale-specific grammar and plural forms.
3. Validate encoding, escape sequences, line breaks, rich-text tags, interpolation nesting, and maximum-length constraints for constrained UI elements.
4. Run locale-aware formatter tests for plurals, dates, numbers, currencies, gender/context variants where supported, and missing-translation fallback.
5. Generate an actionable report and test a representative screen/dialogue flow in each supported locale after catalog compilation.

## Validation checklist

- [ ] Required placeholders match the source contract and retain correct type/format semantics.
- [ ] Plural categories and fallback behavior are valid for the target locale.
- [ ] Malformed markup, encoding, or interpolation is caught before runtime.
- [ ] Missing/extra keys are reported with locale and path context.
- [ ] Long translated strings are assessed in UI layouts instead of only checking JSON validity.

## Required output

Deliver a locale/key/placeholder parity report, compilation results, high-risk layout cases, and a regression test for each confirmed class of defect.

## Boundaries and failure handling

Do not copy source-language text silently into translated catalog files as a fake translation; do not reorder placeholders in ways the formatter does not support.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
