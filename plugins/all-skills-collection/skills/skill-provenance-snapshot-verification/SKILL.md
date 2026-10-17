---
name: skill-provenance-snapshot-verification
description: "Verifies source provenance and content integrity for skill releases. Use when importing, mirroring, rendering, or distributing skills across repositories and agents."
---

# Skill Provenance Snapshot Verification

## Purpose

Make it possible to explain where a skill came from and prove which reviewed bytes were distributed.

## Required inputs

Canonical source path, origin metadata, source/license notices, release commit, content hashes, generated package, and redistribution policy.

## Workflow

1. Identify whether the skill is authored locally or derived/imported; record source URL/revision and attribution/license obligations when known.
2. Compute or retrieve a stable digest for the source file and relevant supporting subtree, using a documented algorithm.
3. Compare the digest and file inventory between canonical source, generated bundle, and release manifest.
4. Verify that required notices and attribution remain present; flag unknown or incompatible licensing for human review.
5. Produce a provenance receipt linked to the reviewed commit and mark any claim that could not be independently confirmed.

## Validation checklist

- [ ] Source identity and revision are recorded for imported material.
- [ ] Source and bundle digests match where byte parity is required.
- [ ] License status differentiates reviewed, unknown, and blocked.
- [ ] A repository license is not assumed to override upstream terms.
- [ ] The receipt never claims a hash or license review that was not performed.

## Required output

A provenance receipt with origin, revision, digests, notice status, and unresolved redistribution blockers.

## Boundaries and failure handling

Do not copy third-party skills or assets into a distribution bundle until rights and required notices are understood. Hash equality proves byte identity, not permission to redistribute.

If required evidence is missing, record the gap and stop before irreversible actions. Do not claim a test, network request, compatibility result, or approval occurred unless its evidence was observed.

## Trigger examples

- **Positive:** A new skill batch is being packaged and its source-to-bundle integrity needs evidence.
- **Negative:** The task is purely about phrasing one local instruction with no import or distribution claim.
