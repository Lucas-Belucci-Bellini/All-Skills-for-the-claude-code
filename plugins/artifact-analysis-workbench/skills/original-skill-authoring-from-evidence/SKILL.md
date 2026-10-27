---
name: original-skill-authoring-from-evidence
description: "Authors an original, executable workflow skill from repository evidence without copying upstream docs or presenting hypotheses as facts."
---

# Original Skill Authoring From Evidence

## Purpose

Authors an original, executable workflow skill from repository evidence without copying upstream docs or presenting hypotheses as facts.

## When to use

A candidate passed the source, provenance, scope, and initial duplicate gates and is ready for a SKILL.md draft.

## Required inputs

Approved workflow card, source references, I/O contract, license decision, and nearest catalog entries.

## Workflow

1. State task, positive trigger, exclusions, prerequisites, and exact inputs.
2. Write a numbered workflow with observable decisions, source references, and safe stop conditions.
3. Define required output, concrete validation, recovery, unknown assumptions, and success conditions.
4. Use original phrasing and short factual summaries; record attribution requirements for any quote/code excerpt.
5. Review the draft against nearest neighbors and source every major claim or label it as reasoning.

## Validation checklist

A contributor can follow it to produce a concrete artifact; material claims trace to sources and runtime claims are not invented.
- [ ] Source revision, paths, and authorized scope are recorded.
- [ ] Every material claim has a source reference or explicit uncertainty label.
- [ ] At least one neighboring/negative case has been checked.
- [ ] Validation describes what actually ran and does not treat a plan as a pass.

## Required output

Complete SKILL.md draft plus canonical ID, source/provenance record, acceptance examples, limitations, and neighbor review.

## Boundaries and failure handling

Do not copy another repository's skill text wholesale. Avoid destructive instructions, secrets, and unsupported guarantees.
If source access, evidence, permissions, or provenance is insufficient, stop and return blockers rather than inventing details. Preserve originals and seek human review for ambiguous licensing or semantic boundaries.

## Trigger examples

- **Positive:** Draft an original workflow skill from this inspected code with validation and limitations.
- **Negative:** Rewrite an upstream skill and present it as original without scope or provenance review.
