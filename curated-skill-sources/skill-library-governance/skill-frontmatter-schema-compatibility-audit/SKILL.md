---
name: skill-frontmatter-schema-compatibility-audit
description: "Use when validating YAML metadata across a skill collection against supported Claude Code schemas/versions; not for assessing workflow usefulness."
---

# Skill Frontmatter Schema Compatibility Audit

## Purpose

Use when validating YAML metadata across a skill collection against supported Claude Code schemas/versions; not for assessing workflow usefulness.

## Required inputs

Inputs: SKILL.md inventory, frontmatter schema, supported Claude Code versions, YAML parser, authoring conventions.

## Workflow

1. Parse frontmatter with a YAML parser rather than regex alone.
2. Validate required fields/types, duplicate keys, multiline descriptions, allowed keys, and name/path conventions.
3. Test representative metadata against supported product versions or documented parser implementations.
4. Report path/line failures and add accepted/rejected fixtures.

## Verification checklist

Checks: malformed YAML/duplicate keys caught; field rules match schema; version support is evidence-based; fixes preserve skill intent.

## Required output

Output: frontmatter compatibility report, parser evidence, invalid paths, migration suggestions.

## Boundaries and failure handling

Boundary: generic YAML parsing does not prove runtime discovery; installation tests are separate.

If evidence, permissions, or environment details are missing, document the limitation and don't report unrun checks as passing.

## Trigger examples

- Positive: Positive: some files parse locally but Claude Code fails to discover them.
- Negative: Negative: reviewing workflow accuracy of valid metadata.
