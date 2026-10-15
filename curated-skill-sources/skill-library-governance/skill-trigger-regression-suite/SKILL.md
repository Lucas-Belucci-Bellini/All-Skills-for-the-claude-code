---
name: skill-trigger-regression-suite
description: Test a Claude Code skill's trigger description against positive, negative, and neighboring-skill prompts to reduce routing mistakes.
---

# Skill Trigger Regression Suite

## Goal

Make skill activation intentional and specific rather than over-triggering on broad keywords or missing real use cases.

## Inputs to inspect

Skill name and description, intended scenarios, adjacent skills, repository task history, and routing behavior if available.

## Workflow

1. Write at least five positive prompts that should activate the skill across common and edge-case phrasings, including the user's likely beginner language.
2. Write negative prompts that share keywords but belong to adjacent skills, plus vague prompts that lack sufficient evidence to route confidently.
3. Build a neighbor matrix listing the closest skills and the unique boundary that separates their responsibilities.
4. Run prompts through the actual skill-selection environment when possible; otherwise label the result as a manual review rather than runtime evidence.
5. Revise trigger language to name the task and decisive signals, then rerun the same suite and compare false positives, false negatives, and ambiguity.

## Validation checklist

- [ ] Positive and negative test cases have expected routes and rationale.
- [ ] At least one test checks overlap with every nearest neighbor skill.
- [ ] Descriptions avoid generic triggers such as 'help with coding' unless the skill is genuinely broad.
- [ ] The suite is versioned so future description changes can be checked against regressions.
- [ ] Runtime-tested routing is distinguished from manually reasoned routing.

## Required output

Commit a trigger test matrix with prompt, expected skill, observed route, pass/fail, overlap note, and next revision.

## Boundaries and failure handling

Do not count keyword presence as a successful trigger; do not hide ambiguous routing by marking every overlapping skill as correct.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
