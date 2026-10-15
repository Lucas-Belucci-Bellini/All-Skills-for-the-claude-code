---
name: skill-deduplication-and-consolidation
description: "Finds redundant skills and decides whether to retain, merge, or specialize them. Use when the catalog grows quickly or same-named skills appear from different sources."
---

# Skill Deduplication And Consolidation

## Use when
Duplicate skills dilute discovery and create inconsistent maintenance while superficially increasing the count.

## Workflow
1. Compare trigger, required inputs, method, outputs, validation, dependencies, license, and supporting files—not only titles or text hashes.
2. Classify candidates as exact duplicate, same method/different domain, complementary workflow, or genuinely distinct capability.
3. When merging, preserve unique constraints and references, record which source content moved, and update all links/catalog entries.
4. Run positive/negative routing tests and ensure the original supported use cases still resolve after consolidation.

## Required output
A redundancy report, retain/merge/split decisions, provenance mapping, and regression cases for merged skills.

## Validation
- No unique safety rule, source license, or valuable supporting file is discarded.
- Near-duplicates have evidence-based consolidation rationale.
- The post-merge skill has a clear trigger and remains independently actionable.

## Guardrails
Do not merge two skills merely because their titles overlap; different workflows and operating contexts can justify separate entries.
