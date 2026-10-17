---
name: atm10-portal-dimension-travel-conflict
description: "Diagnose competing portal interception, dimension registration, teleport events or travel rules across dimension and content mods. Use controlled pairwise or subset testing, preserve dependencies, and report only combinations actually tested."
---

# ATM10 Portal and Dimension Travel Conflict

## Purpose

Diagnose competing portal interception, dimension registration, teleport events or travel rules across dimension and content mods.

## Required inputs

A captured baseline of the actual ATM10 instance; verified mod IDs and versions; dependency constraints; the failure/performance symptom; relevant logs/measurements; and a disposable test profile or save copy.

## Workflow

1. Record the exact component set and classify which integrations share the affected subsystem: diagnose competing portal interception, dimension registration, teleport events or travel rules across dimension and content mods.
2. Freeze Minecraft, loader, Java and configuration versions while testing; confirm each tested artifact is installed and compatible with the baseline.
3. Define a measurable success/failure signal and create a known-good control that keeps world, workload, settings and test sequence consistent.
4. Run the focused combination/subset experiment: Test one origin/destination pair with each integration enabled separately in a copy, recording dimension IDs, return behavior and both-side logs. Record each set, result, environment fingerprint and any dependency-driven exclusions.
5. Repeat the smallest failing combination to rule out nondeterminism or stale caches; if subset testing changes dependency validity, adjust the partition rather than treating the invalid test as evidence.
6. Inspect the first causal log/metric change and verify whether the result implicates one component or only a combination.
7. Test a minimal mitigation or configuration separation in the copy; verify that normal adjacent functionality remains intact.
8. Package the tested matrix, scope limits, reproducibility steps, and rollback plan.

## Validation checklist

- [ ] A known-good baseline and measurable outcome are defined.
- [ ] Tested combinations preserve loader and dependency constraints.
- [ ] Exact mod versions and each result are recorded.
- [ ] The smallest failing set is repeated or labeled provisional.
- [ ] Inferences are limited to combinations actually tested.
- [ ] Mitigation has a regression check and clear rollback path.

## Required output

A portal/dimension interaction map, isolated trigger, and tested safe workaround. Include evidence references, full set fingerprints, pass/fail results, confidence, exclusions, and the smallest next action.

## Boundaries and failure handling

Do not remove half the mods from the user's primary instance or test against the only world save. Binary search is invalid if dependencies or load order change the meaning of the test; state that limitation explicitly.

## Trigger examples

- **Positive:** A modified ATM10 failure appears only with a combination of mods or optimization components and needs isolation.
- **Negative:** The failure is already reproduced and fixed by a known single-setting correction with no interaction uncertainty.
