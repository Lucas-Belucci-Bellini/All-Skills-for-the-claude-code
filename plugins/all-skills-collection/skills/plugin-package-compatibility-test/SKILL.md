---
name: plugin-package-compatibility-test
description: Validate Claude Code plugin layout, manifests, skill paths, references, and installation assumptions before publishing a plugin version.
---

# Plugin Package Compatibility Test

## Goal

Catch packaging failures that allow a repository to look correct while the actual installed plugin is incomplete or misconfigured.

## Inputs to inspect

Plugin directory, `.claude-plugin` manifest, marketplace entry, SKILL.md files, local references/scripts, and supported client version.

## Workflow

1. Validate JSON manifests, names, versions, required metadata, source paths, and consistency between marketplace and plugin manifests.
2. Enumerate each skill entrypoint and resolve every skill-local reference, script, template, and supporting file using the installed package's expected path base.
3. Check for duplicate identifiers, case-sensitive path issues, missing files, accidental generated artifacts, secrets, and unsupported plugin structure.
4. Install or load the plugin in an isolated test environment when possible; separately label structural validation if runtime installation cannot be exercised.
5. Test a minimal trigger for representative skills, then publish a report containing package version, platform/client version, warnings, and rollback version.

## Validation checklist

- [ ] Manifest and marketplace metadata agree on the plugin identity/version.
- [ ] All referenced local files exist in the distributed tree with expected casing.
- [ ] Skill IDs and paths have no unresolved collisions.
- [ ] Runtime install/discovery evidence is not conflated with static file inspection.
- [ ] A known-good previous version and rollback instructions are available.

## Required output

Deliver a package validation report, manifest/path findings, installed-runtime test result, compatibility caveats, and release recommendation.

## Boundaries and failure handling

Do not claim a plugin is installable just because its JSON parses; do not ship source-only paths that are absent from the packaged tree.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
