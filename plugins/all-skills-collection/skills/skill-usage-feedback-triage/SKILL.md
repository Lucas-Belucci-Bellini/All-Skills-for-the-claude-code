---
name: skill-usage-feedback-triage
description: Turn recurring agent failures, user corrections, and missing-workflow reports into prioritized skill-library improvements with evidence.
---

# Skill Usage Feedback Triage

## Goal

Grow the library from real friction rather than adding generic skills to inflate counts.

## Inputs to inspect

Task reports, failed tool traces, user corrections, existing catalog, skill trigger records, and issue history.

## Workflow

1. Collect recurring failure patterns while redacting secrets and unnecessary user data; distinguish one-off mistakes from repeated workflow gaps.
2. Group reports by task intent, failed step, needed evidence/output, and candidate existing skill before proposing a new skill.
3. Search for a current skill that can be clarified, split, merged, or given a stronger trigger; prefer improving an existing skill if its scope already matches.
4. Rank improvements by recurrence, user impact, risk reduction, and ease of verification; define a concrete before/after acceptance test.
5. Track whether the change reduces recurrence after release and revisit the classification if reports persist.

## Validation checklist

- [ ] Each proposed change cites recurring evidence or a clear high-impact risk.
- [ ] Near-duplicate candidates are reviewed before creating a new entrypoint.
- [ ] Sensitive logs and personal data are filtered from the improvement dataset.
- [ ] Success criteria are observable and checked after release.
- [ ] Skill-count growth is never the only reason for accepting a change.

## Required output

Deliver a prioritized issue queue with evidence summaries, existing-skill candidates, proposed change type, acceptance tests, and post-release outcome.

## Boundaries and failure handling

Do not turn every individual prompt into a new skill; do not preserve private secrets or raw transcripts when a sanitized failure pattern is sufficient.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
