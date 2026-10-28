# Repository-to-skill candidate gate

## Purpose

The candidate gate checks whether a proposed repository-derived skill has the minimum structured information needed for review. It is a preflight validator, not an automatic license opinion, semantic embedding model, security review, or release approval.

## Run it

```bash
node tools/validate-repository-skill-candidate.mjs path/to/candidate.json
node tools/validate-repository-skill-candidate.mjs --self-test
```

The candidate JSON uses schema version 1 and these top-level sections:

- `source`: HTTPS repository URL, immutable revision, inspection date, license status, and evidence paths.
- `skill`: canonical slug, user intent, positive and hard-negative triggers, inputs, concrete workflow steps, output contract, acceptance criteria, and stop conditions.
- `evidence`: at least two references connecting claims to source code, tests, docs, examples, or issues.
- `deduplication`: exact-check result, semantic-review decision, and the canonical skills compared.
- `decision`: `draft`, `hold`, `reject`, or `ready-for-human-review`, with explanatory notes.

## Gate semantics

A candidate cannot be marked `ready-for-human-review` unless its license status is `verified-compatible`, exact duplicate check is `pass`, and semantic review is `distinct`. This label means only that the candidate is ready for a human review; it does not mean approved for release.

A moving source ref such as `main`, `master`, `latest`, or `HEAD` is rejected because evidence must be reproducible against a pinned revision. Unknown or restricted license status must remain a blocker until a qualified reviewer resolves it.

## Known limits

- The validator checks required fields and basic consistency; it does not fetch or authenticate source references.
- License status is a reviewer-supplied assertion and is not independently verified by the script.
- Semantic deduplication remains a documented human review result; no vector model or semantic similarity score is claimed here.
- Evidence paths can be stale or incorrect and must be checked during review.
- The CI self-test covers representative valid and invalid inputs but does not execute Claude Code or prove skill-routing quality.

## Release policy

Keep candidates in draft/hold until source revision, provenance, evidence, exact and semantic duplicate review, acceptance checks, and positive/negative routing examples have been inspected. Do not count rejected candidates, aliases, bundle mirrors, or placeholder records as new canonical skills.
