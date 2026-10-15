---
description: Audit the skill library, identify duplicate/weak entries, validate metadata and report progress toward the 500-skill goal.
argument-hint: "[--report PATH]"
---

# Audit Skill Library

1. Read the library catalog and growth roadmap before quoting totals.
2. Enumerate canonical sources separately from generated plugin output so every bundled skill is counted only once.
3. Compare full skill-local subtrees, names, descriptions, references, assets, scripts, license notices and category assignments. Separate exact duplicates from near-duplicates.
4. Run the bundle checker in check-only mode. Report discrepancies rather than silently rewriting files unless refresh was requested.
5. Produce an audit report with actual unique count, additions/changes/removals, missing frontmatter, unresolved file references, duplicate candidates, provenance blockers and progress toward 500.
6. Never inflate the count with aliases or placeholders. Do not merge, publish, change repository visibility or delete source files automatically.
