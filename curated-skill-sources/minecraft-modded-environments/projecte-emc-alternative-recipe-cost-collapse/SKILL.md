---
name: projecte-emc-alternative-recipe-cost-collapse
description: "Detects a cheap alternative recipe that collapses the EMC cost of an expensive product. Use when multiple recipe sources or mod integrations exist."
---

# Alternative Recipe Cost Collapse Audit

## Purpose

all active recipe alternatives, quantities, tag inputs, and item values

## Required inputs

Collect alternatives from the loaded recipe set, preserving tags and custom pack overrides.

## Workflow

1. Confirm actual Minecraft, loader, ProjectE, and modpack versions; identify the exact config files and registry snapshot. Do not write to production paths while gathering evidence.
2. Compute the value and prerequisites of each valid route and highlight the minimum-cost path that undermines intended tiering.
3. An alternative-cost report with active recipe IDs and correction candidates.
4. Validate the conclusion with a reproducible parse, comparison, disposable fixture, or reviewer record; label anything not run as blocked or unverified.
5. Produce do not assume every cheaper recipe is a bug; mark deliberate pack recipes as policy exceptions. with exact version, candidate digest where available, and an actionable pass/fail/blocked status.

## Validation checklist

- [ ] Exact environment and config version are documented.
- [ ] Inputs reconcile to the registry, proposed diff, or release artifact under review.
- [ ] Validation evidence is recorded and unexecuted checks are not marked passed.
- [ ] Exclusions, parser failures, uncertainty, and human decisions remain explicit.
- [ ] Changes are reversible and do not modify production data without authorization.

## Required output

Do not assume every cheaper recipe is a bug; mark deliberate pack recipes as policy exceptions.

## Boundaries and failure handling

A high-tier part can be crafted with a low-tier alternative ingredient. If the required environment, files, parser, or reviewer is unavailable, return a partial report with precise blockers rather than claiming completion.

## Trigger examples

- **Positive:** The output has one verified recipe path.
- **Negative:** undefined
