# Artifact Analysis Workbench

This plugin turns a source repository into a structured, reviewable backlog of original skills. It is informed by public capability areas in [REA](https://github.com/morluto/rea), but is independent and does not bundle REA's implementation, skill text, screenshots, or reference documents.

## Ten read-only specialist agents

- **`repository-capability-architect`** — Maps source-backed capabilities into a reviewable plan.
- **`upstream-provenance-auditor`** — Audits source revisions, licenses, notices, and reuse blockers.
- **`repository-structure-miner`** — Maps packages, interfaces, examples, tests, and extension points.
- **`workflow-evidence-miner`** — Mines repeatable user workflows from source and examples.
- **`acceptance-criteria-miner`** — Converts tests and requirements into falsifiable checks.
- **`api-contract-extractor`** — Extracts API/CLI/config contracts with source evidence.
- **`skill-scope-designer`** — Defines distinct skill intent, triggers, prerequisites, and exclusions.
- **`semantic-dedup-reviewer`** — Compares candidates semantically against the canonical catalog.
- **`skill-batch-evaluation-engineer`** — Designs quality and routing evaluations for candidate batches.
- **`skill-release-gatekeeper`** — Reconciles provenance, duplicates, validations, and human release gates.

## Fifteen repository-to-skill workflow skills

- **`repository-source-inventory`** — Understand what is actually present before drafting skills from a repository.
- **`upstream-license-provenance-gate`** — Check reuse/provenance before a candidate uses third-party code, docs, examples, or imported skills.
- **`repository-capability-map`** — Identify which user workflows a repository actually supports and what evidence justifies each capability.
- **`project-workflow-mining`** — Create skills based on how people use a repository rather than count-inflating file-by-file wrappers.
- **`issue-and-acceptance-criteria-mining`** — Replace vague skill success conditions with grounded, observable checks.
- **`api-contract-to-skill-spec`** — Ensure repository-derived skills use documented/tested API or CLI interfaces correctly.
- **`documentation-evidence-index`** — Help skill authors find the smallest reliable source for each task and claim.
- **`test-fixture-to-skill-validation`** — Validate a skill against available tests, examples, schemas, or safe fixtures.
- **`canonical-skill-scope-designer`** — A candidate looks useful but may overlap an existing skill or be too broad to execute reliably.
- **`semantic-skill-dedup-review`** — Prevent a central library from accumulating skills that differ only by name or phrasing.
- **`skill-trigger-and-negative-case-design`** — Skill descriptions exist but selection quality and overlap with adjacent workflows have not been measured.
- **`repository-to-skill-batch-planner`** — Turn a large repository into a small, reviewable batch instead of generating speculative files at scale.
- **`original-skill-authoring-from-evidence`** — A candidate passed the source, provenance, scope, and initial duplicate gates and is ready for a SKILL.md draft.
- **`skill-routing-evaluation`** — A candidate batch passed structural checks but still needs discoverability evidence.
- **`skill-release-provenance-gate`** — A skill batch is drafted and must be checked before merge or distribution.

## Recommended flow

1. Inventory a pinned source revision and record license/provenance.
2. Map demonstrated capabilities and mine repeatable workflows from tests, examples, docs, and interfaces.
3. Extract acceptance criteria, API/config contracts, and authoritative evidence links.
4. Define canonical scope and compare each candidate against the existing catalog semantically.
5. Plan a small batch, author original SKILL.md files, and keep curated source/plugin/bundle copies byte-identical.
6. Evaluate positive and negative routing, reconcile counts and manifests, and open a Draft PR for human review.

## Quality and limitations

The sync generator performs exact subtree de-duplication. The 1,540 count in this branch is a generated canonical-identity count, not proof that every semantic overlap has been reviewed. The existing catalog contains 54 REA/reverse-engineering skills; this batch focuses on creating skills *from repositories* instead of duplicating generic binary/firmware/mobile/network analysis workflows.

Agent prompts are read-only. They do not implement an analysis engine, install REA, perform a full source audit automatically, or certify licensing. Structural CI does not prove semantic uniqueness, routing quality, or Claude Code runtime loading.

## Provenance and safe use

The prompts/workflows are written for this repository. Review exact upstream revisions and nested third-party notices before any future material reuse. Use only repositories/artifacts you are authorized to inspect. No agent may merge, publish, change visibility, or expand target scope without approval.
