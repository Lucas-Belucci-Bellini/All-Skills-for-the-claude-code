# Skill Library Maintainer

A maintenance plugin for the private combined skill collection and its 500-skill target.

- /update-skill-library regenerates and validates the unified bundle after a new source batch.
- /audit-skill-library audits counts, categories, duplicate candidates, metadata, support files and provenance blockers.

## Routine

1. Inspect the default branch and open pull requests before changes.
2. Add authored skills under curated-skill-sources/<category>/<name>/SKILL.md. Preserve source attribution/license notices for imported content.
3. Run the bundle sync script in write mode and then check mode.
4. Update SKILL_LIBRARY_CATALOG.md, SKILL_LIBRARY_CATALOG.json and SKILL_GROWTH_ROADMAP.md in the same branch.
5. Verify the unique count is based on complete deduplicated subtrees, review the diff and open a PR. Never merge or publish automatically.

A skill count is not a quality metric by itself. Do not count placeholders, duplicate aliases, or entries without actionable workflow and validation.
