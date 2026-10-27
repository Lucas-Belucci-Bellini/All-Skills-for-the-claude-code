---
name: upstream-license-provenance-gate
description: "Reviews licenses, notices, source revisions, generated material, and attribution requirements before a repository-derived skill batch is drafted."
---

# Upstream License Provenance Gate

## Purpose

Reviews licenses, notices, source revisions, generated material, and attribution requirements before a repository-derived skill batch is drafted.

## When to use

Check reuse/provenance before a candidate uses third-party code, docs, examples, or imported skills.

## Required inputs

Source URL/revision, proposed material, root/nested license files, NOTICE files, and candidate skill scope.

## Workflow

1. Record the upstream URL and immutable commit/tag actually inspected; flag branch-only references.
2. Read root and relevant nested license/NOTICE files and package license metadata.
3. Classify planned material as original writing, factual summary, quotation, copied code, imported skill, generated output, or unresolved origin.
4. For reused material, identify applicable terms and required notices; ask for human/legal review when compatibility is uncertain.
5. Block release if provenance is absent or material reuse terms are unresolved; do not infer one license for nested third-party content.

## Validation checklist

Every reused item has a source/license trail; original procedures are distinguished from quotations, code, and imported content.
- [ ] Source revision, paths, and authorized scope are recorded.
- [ ] Every material claim has a source reference or explicit uncertainty label.
- [ ] At least one neighboring/negative case has been checked.
- [ ] Validation describes what actually ran and does not treat a plan as a pass.

## Required output

Provenance manifest linking source, revision, material type, applicable notices, attribution plan, review state, and blockers.

## Boundaries and failure handling

This is not legal advice. Do not remove notices or claim ownership of upstream work; a root license does not automatically relicense nested third-party assets.
If source access, evidence, permissions, or provenance is insufficient, stop and return blockers rather than inventing details. Preserve originals and seek human review for ambiguous licensing or semantic boundaries.

## Trigger examples

- **Positive:** Check licenses and notices before deriving skills from this project.
- **Negative:** Ignore licensing and copy its entire skill directory unchanged.
