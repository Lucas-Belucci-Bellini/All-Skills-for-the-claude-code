---
name: third-party-skill-provenance-audit
description: "Audits source ownership, license notices, and redistribution terms for imported skills. Use before public release, repackaging, or moving skills between repositories."
---

# Third Party Skill Provenance Audit

## Use when
A root license or repository ownership is assumed to cover all imported content, creating avoidable redistribution risk.

## Workflow
1. Track each skill and supporting file to its upstream repository, commit/release, author or publisher, and acquisition path.
2. Read applicable license and terms for source code, documentation, assets, examples, models, and generated artifacts separately.
3. Check attribution, NOTICE, modification disclosure, share-alike, non-commercial, redistribution, and trademark conditions; record ambiguities.
4. Produce an allow/hold/remove decision with evidence and required notices, then re-run the audit when upstream content changes.

## Required output
A source-to-file provenance table, license evidence, required-notice checklist, and release-blocking exceptions.

## Validation
- Every imported source has a known provenance status.
- Unclear terms are marked for human/legal review rather than guessed.
- Required notices travel with both the source and distributed package.

## Guardrails
Do not provide definitive legal conclusions or publicly redistribute held material until its terms are reviewed.
