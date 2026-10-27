# Artifact Analysis Workbench

**Purpose:** accept a source repository, map what it actually does, and author original, testable skills based on demonstrated workflows. REA is a reference for analysis capability areas, not a source to copy wholesale. The workbench is independent and is not affiliated with or endorsed by REA's maintainers.

## Included specialist agents

| Agent | Responsibility | Access |
|---|---|---|
| `repository-capability-architect` | Maps a source repository into bounded capability areas and proposes a reviewable plan for original, evidence-backed skills. | Read-only |
| `upstream-provenance-auditor` | Audits source repository license, notices, generated files, dependencies, and reuse risks before new skills are drafted. | Read-only |
| `repository-structure-miner` | Builds an evidence-linked map of repository layout, entry points, packages, data schemas, tests, and extension points. | Read-only |
| `workflow-evidence-miner` | Finds real user workflows and repeatable engineering tasks from source, examples, tests, docs, and repository history. | Read-only |
| `acceptance-criteria-miner` | Converts repository tests, documented behavior, and issue acceptance criteria into falsifiable acceptance checks for candidate skills. | Read-only |
| `api-contract-extractor` | Extracts documented or tested API/CLI/config contracts into skill-ready requirements without inventing undocumented guarantees. | Read-only |
| `skill-scope-designer` | Defines one clear, non-overlapping skill purpose, trigger, exclusions, prerequisites, and expected artifact from repository evidence. | Read-only |
| `semantic-dedup-reviewer` | Checks proposed skills against existing catalogue entries for duplicated intent, workflow, inputs, triggers, and deliverables. | Read-only |
| `skill-batch-evaluation-engineer` | Designs repeatable quality and routing evaluations for a proposed skill batch before release. | Read-only |
| `skill-release-gatekeeper` | Reviews a skill batch for provenance, deduplication, structure, safety, routing evidence, package synchronization, and human approval. | Read-only |

## Included workflow skills

| Skill | Main purpose |
|---|---|
| `repository-source-inventory` | You have a repository URL or local checkout and need to understand what is actually present before drafting skills. |
| `upstream-license-provenance-gate` | A candidate skill is based on a third-party repository, codebase, API, docs, examples, generated reference, or contributed patch. |
| `repository-capability-map` | You need a reliable view of what workflows a repository can support and which evidence justifies each capability. |
| `project-workflow-mining` | You want useful skills based on how people actually use a repository, not a count inflated by renaming existing steps. |
| `issue-and-acceptance-criteria-mining` | Candidate skills need grounded success conditions rather than vague instructions such as 'make it work'. |
| `api-contract-to-skill-spec` | A repository exposes APIs, configuration, a CLI, data schemas, or extension points that workflows should use correctly. |
| `documentation-evidence-index` | The repository has many docs, references, examples, or changing APIs and skill authors need reliable sources to cite. |
| `test-fixture-to-skill-validation` | A skill claims that a task works in a particular way and there are tests, examples, schemas, or safe fixtures to support it. |
| `canonical-skill-scope-designer` | A workflow candidate is promising but may overlap an existing skill or be too broad to execute reliably. |
| `semantic-skill-dedup-review` | You need to prevent a large centralized collection from accumulating duplicates that look different only by name or phrasing. |
| `skill-trigger-and-negative-case-design` | A skill has a draft description but selection quality and overlap with nearby skills are not yet measured. |
| `repository-to-skill-batch-planner` | You need to turn a large source repository into a small, reviewable batch instead of generating hundreds of speculative files. |
| `original-skill-authoring-from-evidence` | A candidate has passed the scope, source-evidence, provenance, and initial duplicate gates and is ready for a draft skill file. |
| `skill-routing-evaluation` | A skill batch passed structural checks but needs evidence that users can discover the correct workflow. |
| `skill-release-provenance-gate` | A batch is drafted and must be checked before merging or publishing into a centralized library. |

## Recommended end-to-end flow

1. `repository-source-inventory` selects and records an immutable source revision.
2. `upstream-license-provenance-gate` identifies applicable licenses and blockers before reuse.
3. `repository-capability-map` plus `project-workflow-mining` build a source-backed capability and task map.
4. `issue-and-acceptance-criteria-mining`, `api-contract-to-skill-spec`, and `documentation-evidence-index` extract concrete checks and source references.
5. `canonical-skill-scope-designer` proposes a unique intent; `semantic-skill-dedup-review` compares against existing canonical entries.
6. `repository-to-skill-batch-planner` selects a small candidate set and `original-skill-authoring-from-evidence` drafts the new skills.
7. `test-fixture-to-skill-validation` and `skill-routing-evaluation` prepare quality evidence.
8. `skill-release-provenance-gate` reconciles provenance, duplicates, generated artifacts, CI, and human approval.

## Validation

Run `node tools/validate-artifact-analysis-workbench.mjs` from the repository root. With a supported local Claude Code installation, also run `claude plugin validate ./plugins/artifact-analysis-workbench` and manually invoke representative agents/skills.

The repository validator is structural: it checks inventory, frontmatter, read-only agent tools, the 150-role registry, and the 25,000-skill budget. It does not prove semantic quality, correct routing, or runtime installation.

## Provenance

The skill and agent prompts in this initial workbench are written for this repository. They do not vendor REA's implementation, its skills, screenshots, or reference documentation. REA's public README links to its MIT license, but a license review remains necessary for any future material reuse, especially where nested third-party assets have different terms.

This branch is a Draft PR. The separate workbench's 15 candidate skills are **not yet added to the global unique count** until cross-plugin semantic review confirms their boundaries against the existing catalog. Structural counts must never substitute for deduplication.
