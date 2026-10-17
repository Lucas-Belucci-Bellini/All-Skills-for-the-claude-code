---
name: skill-auto-generated-frontmatter-validation
description: "Validates frontmatter fields and naming conventions before a skill can enter the catalog. Use on every new or modified SKILL.md."
---

# Automated Skill Frontmatter Validation

## Purpose

SKILL.md files, schema rules, reserved names, and compatibility policy

## Required inputs

Parse frontmatter with a real YAML parser where available and validate required name/description and supported optional fields.

## Workflow

1. Inspect the canonical source, current repository rules, and the exact change request before taking action.
2. Check name/slug agreement, description actionability, duplicate IDs, unsupported frontmatter keys, and malformed quoting.
3. A frontmatter report with exact path, field, severity, and remediation.
4. Verify behavior with positive and negative fixtures and record skipped runtime checks, unresolved evidence, or required human decisions.
5. Produce do not mark a file valid based only on regex checks when the schema requires yaml semantics. tied to the exact candidate version/digest and request ID.

## Validation checklist

- [ ] Scope and expected change are documented before generating or accepting output.
- [ ] Existing neighboring skills and repository policy are considered.
- [ ] Positive and negative cases are explicit and failures are not described as successes.
- [ ] Security, provenance, compatibility, and rollback requirements are handled where relevant.
- [ ] Unexecuted checks and required approvals remain visibly pending.

## Required output

Do not mark a file valid based only on regex checks when the schema requires YAML semantics.

## Boundaries and failure handling

A batch adds or updates many skill entrypoints. If required evidence or approval is missing, stop promotion and return a precise blocker. Never write directly to the protected main branch through this skill.

## Trigger examples

- **Positive:** Only prose outside the frontmatter changed and metadata validation is not affected.
- **Negative:** undefined
