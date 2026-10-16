---
name: decision-log-supersession-integrity
description: "Audit decision records for unique IDs, status, explicit supersession links and downstream documentation consistency."
---

# Decision Log Supersession Integrity

## Purpose

Preserve why decisions changed without leaving multiple records appearing authoritative.

## Required inputs

ADR files/index, status convention, supersession links and dependent docs.

## Workflow

1. Enumerate decision IDs and verify filenames, titles and index references are unique and resolvable.
2. Identify accepted, proposed, rejected, deprecated and superseded states using repository convention.
3. Verify each superseded decision links to its successor and retains the replacement rationale.
4. Search downstream docs for normative claims that conflict with the currently active decision.
5. Preserve abandoned proposals as history rather than deleting or presenting them as current policy.

## Validation checklist

- [ ] Decision IDs and index entries are unique.
- [ ] Statuses follow a consistent convention.
- [ ] Supersession preserves rationale and affected scope.
- [ ] Downstream docs point to the active decision where needed.
- [ ] Missing links and contradictions are reported, not guessed.

## Required output

Decision-record integrity report and minimal traceability patch.

## Boundaries and failure handling

Do not change a decision's status merely because newer code differs; verify whether a formal decision superseded it.

## Trigger examples

- **Positive:** An older accepted ADR conflicts with a newer approved storage decision.
- **Negative:** Creating a new design decision with no historical log to audit.
