---
name: skill-trigger-and-negative-case-design
description: "Designs positive and negative routing examples so new skills trigger for intended tasks without stealing neighboring requests."
---

# Skill Trigger And Negative Case Design

## Purpose

Designs positive and negative routing examples so new skills trigger for intended tasks without stealing neighboring requests.

## When to use

Skill descriptions exist but selection quality and overlap with adjacent workflows have not been measured.

## Required inputs

Draft descriptions, neighboring skills, representative intents, and a routing harness if available.

## Workflow

1. Write positive prompts with realistic language variants that preserve the intended task and required inputs.
2. Write hard negatives for adjacent capabilities, incomplete authorization, missing sources, out-of-scope requests, and unrelated tasks.
3. Identify confusing skill pairs and state which intent/evidence boundary should decide selection.
4. Do not repeat the skill filename in every prompt; mirror how a user would naturally ask.
5. Record expected route, rationale, ambiguity, fallback behavior, and whether clarification is required.

## Validation checklist

The suite tests both activation and non-activation and includes neighbor counterexamples, not just easy positives.
- [ ] Source revision, paths, and authorized scope are recorded.
- [ ] Every material claim has a source reference or explicit uncertainty label.
- [ ] At least one neighboring/negative case has been checked.
- [ ] Validation describes what actually ran and does not treat a plan as a pass.

## Required output

Routing set with positive/hard-negative prompts, expected skill IDs, rationales, ambiguity cases, and reviewer notes.

## Boundaries and failure handling

Do not include confidential prompts or secrets without authorization. Keep expected labels reviewable.
If source access, evidence, permissions, or provenance is insufficient, stop and return blockers rather than inventing details. Preserve originals and seek human review for ambiguous licensing or semantic boundaries.

## Trigger examples

- **Positive:** Create positive and hard-negative prompts so these skills do not steal requests from neighbors.
- **Negative:** Test only prompts that repeat the skill name and ignore false positives.
