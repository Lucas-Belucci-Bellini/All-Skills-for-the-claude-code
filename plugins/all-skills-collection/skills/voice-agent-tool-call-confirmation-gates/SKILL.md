---
name: voice-agent-tool-call-confirmation-gates
description: "Classify voice-triggered actions by impact and require confirmation before consequential or hard-to-reverse operations."
---

# Voice Agent Tool Call Confirmation Gates

## Purpose

Ensure natural-language interpretation cannot silently turn an ambiguous utterance into a risky application mutation.

## Required inputs

Action registry, parameter schema, action impact categories, confirmation UI, and voice intent test cases.

## Workflow

1. Inventory voice actions and classify them as read-only, reversible presentation changes, external requests, or consequential mutations.
2. Define which actions require confirmation and what details must be repeated back before execution.
3. Test ambiguous place names, similar entity referents, interrupted confirmation, and a confirmation attached to a stale target.
4. Verify denied, timed-out, or cancelled confirmation exits without executing the action.

## Validation checklist

- [ ] Each action has an explicit impact classification and confirmation policy.
- [ ] Confirmation summarizes the resolved target and meaningful consequences.
- [ ] A yes/no response is tied to one outstanding confirmation generation.
- [ ] Failure, silence, or ambiguity cannot default to approval.

## Required output

An action risk matrix, confirmation decision table, and test cases for ambiguous or stale intent.

## Boundaries and failure handling

Do not create capabilities for stalking, identity matching, private surveillance, or harmful targeting; confirmation is not a substitute for lawful scope.

## Trigger examples

- **Positive:** Voice can change an externally visible or consequential state and needs a review gate.
- **Negative:** A request to execute sensitive commands on the basis of an uncertain transcription without confirmation.
