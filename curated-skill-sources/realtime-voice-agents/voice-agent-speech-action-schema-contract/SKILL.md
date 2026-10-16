---
name: voice-agent-speech-action-schema-contract
description: "Validate schemas between spoken intent parsing, tool arguments, and concrete map or scene actions."
---

# Voice Agent Speech Action Schema Contract

## Purpose

Prevent loosely parsed speech from being interpreted as valid structured actions with missing or mismatched arguments.

## Required inputs

Voice action schemas, tool definitions, parser output fixtures, default values, and action validation errors.

## Workflow

1. Inventory each action's required fields, optional fields, enum values, numeric ranges, and permitted target types.
2. Validate model-produced arguments independently before dispatch; distinguish schema failure from unsupported intent.
3. Add cases for omitted fields, wrong types, extra fields, ambiguous references, and boundary coordinates.
4. Verify errors are converted into a concise clarification prompt without partially executing the action.

## Validation checklist

- [ ] The dispatch boundary validates arguments even when the upstream model claims a valid tool call.
- [ ] Defaults are explicit and do not turn missing target identity into a broad action.
- [ ] Unsupported fields are rejected or intentionally ignored according to contract.
- [ ] Invalid input never leaves a partial visual or network mutation.

## Required output

An action-schema coverage table, malformed-argument fixtures, and a consistent clarification/error policy.

## Boundaries and failure handling

Treat model/tool output as untrusted structured data; do not execute strings as commands or code.

## Trigger examples

- **Positive:** The voice model sometimes emits a tool call with a missing entity ID or invalid camera mode.
- **Negative:** A request to trust all tool arguments solely because they came from the AI service.
