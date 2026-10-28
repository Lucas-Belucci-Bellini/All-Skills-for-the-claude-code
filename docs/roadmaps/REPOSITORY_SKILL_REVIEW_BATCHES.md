# Repository skill review batches

This utility turns a manually assembled set of candidate records into a deterministic human-review plan. It does not discover capabilities by itself; it organizes candidates already created from pinned evidence.

## Input

Create a UTF-8 JSON file with the shape `{ "schema_version": 1, "candidates": [ ... ] }`, where each array item is a candidate JSON record accepted by `validate-repository-skill-candidate.mjs`. A review group may be supplied as `candidate.review_group`, `skill.review_group`, `skill.domain`, or `skill.category`. Candidates without one go into `unclassified`.

## Use

```sh
node tools/plan-repository-skill-review-batches.mjs candidates.json --batch-size 10 --output review-plan.json
node tools/plan-repository-skill-review-batches.mjs --self-test
```

Batch size is limited to 1–50. Output includes small reviewer-facing candidate summaries, review flags, checklists, and a separate list of possible overlaps. Candidate IDs must be unique.

## Review signals and limits

- Exact skill-name collisions are surfaced directly.
- A simple Jaccard similarity over selected text and at least three shared terms can surface possible overlaps.
- These are triage heuristics, not semantic deduplication or a claim that two skills are equivalent.
- License status, evidence count, decision state, and deduplication status create reviewer flags.
- The tool groups but does not alter candidates, access the network, read repository contents, approve skills, or update canonical manifests/counts. The output is a planning artifact only.
- Every candidate still needs evidence inspection, license review, exact and semantic deduplication, and a recorded human decision before release.
