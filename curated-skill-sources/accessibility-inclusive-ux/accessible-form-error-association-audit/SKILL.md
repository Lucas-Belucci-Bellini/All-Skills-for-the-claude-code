---
name: accessible-form-error-association-audit
description: "Audit relationships among form fields, inline errors, submission summaries and programmatic error state during client- and server-side validation."
---

# Accessible Form Error Association Audit

## Purpose

Help users identify which field failed, understand how to fix it and reach the error without relying on color or visual placement alone.

## Required inputs

Form schema, field components, validation rules, server-error payloads, submission behavior and accessibility semantics.

## Workflow

1. Inventory required fields, constraints, inline error nodes, summary behavior and when validation runs.
2. Check that each field has a stable accessible name and its error/help text is programmatically associated.
3. Verify invalid state appears and clears correctly, including server errors after apparently valid client submission.
4. Test one error, multiple errors, corrected input, dynamic fields and repeated submission; document where focus moves.
5. Confirm the summary identifies fields and does not expose secrets or personal data.

## Validation checklist

- [ ] Required and invalid states are available programmatically and visually.
- [ ] The field's accessible description includes the relevant error.
- [ ] Clearing an error also clears stale invalid state and obsolete text.
- [ ] Multiple errors can be navigated without losing entered values.
- [ ] Server errors map to the correct field or a clear form-level message.

## Required output

A field/error matrix, failing form states, focus rules and regression tests for error appearance and recovery.

## Boundaries and failure handling

Do not put the entire error summary in every field's accessible name. Do not assume client-side acceptance overrides server validation. Mask sensitive values in reproduction artifacts.

## Trigger examples

- **Positive:** A server validation failure is shown visually but not associated with the affected field.
- **Negative:** Styling a normal field border without error behavior.
