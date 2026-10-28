# Repository-to-skill intake template

Use this template when proposing a batch from an existing repository. The goal is to convert demonstrated, repeatable workflows into original, testable skills—not to mirror an upstream directory tree or import every file.

## Source identity
- Repository URL:
- Owner/project:
- Immutable commit/tag/revision:
- Date inspected:
- Public/private/user-provided:
- Who authorized the analysis and reuse?

## License and provenance
- Root license:
- Nested licenses / NOTICE files:
- Generated, vendored, third-party, or imported material:
- Required attribution/notices:
- Unresolved license questions (release blocker):

## User tasks and evidence
- User-facing tasks to support:
- Relevant source paths, interfaces, tests, examples, and documentation:
- What was inspected directly:
- What remains inferred, inaccessible, planned, or unverified:
- Version/runtime assumptions:

## Candidate skills
For each candidate: canonical name; user intent and positive trigger; negative triggers/neighbors; inputs/prerequisites; distinct workflow/decision points; required output; acceptance criteria; recovery/stop conditions; source refs; exact and semantic duplicate review; decision (keep/merge/hold/reject).

## Batch quality gate
- [ ] Source revision and license posture recorded.
- [ ] Every proposed skill is grounded in source evidence.
- [ ] Exact duplicate and bundle-mirror check completed.
- [ ] Semantic comparison with nearby existing skills documented.
- [ ] Metadata, workflow, output, verification, triggers, and boundaries are complete.
- [ ] Positive and hard-negative routing examples exist.
- [ ] Relevant local tests were run, or are explicitly marked not run.
- [ ] Source, plugin mirror, central bundle, manifests, catalog, and counts reconcile.
- [ ] The PR remains Draft until human review of provenance, scope, and evidence.

A repository URL alone does not establish that every capability was examined or that a derived skill is safe to publish.
