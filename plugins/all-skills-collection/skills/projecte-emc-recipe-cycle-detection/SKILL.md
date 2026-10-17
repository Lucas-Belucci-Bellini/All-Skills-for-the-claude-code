---
name: projecte-emc-recipe-cycle-detection
description: "Finds recipe graph cycles that can produce net EMC gain. Use when crafting and processing routes interconnect."
---

# ProjectE Recipe Cycle Detection

## Purpose

normalized recipe graph, EMC mapping, quantities, and cycle boundaries

## Required inputs

Build a multi-output directed graph preserving amounts, alternatives, remainders, and provenance.

## Workflow

1. Confirm the actual Minecraft/loader/ProjectE versions and target config locations before interpreting recipe or item behavior.
2. Search cycles and calculate net value using exact quantities and state transitions.
3. A cycle report with route, net-value calculation, source IDs, and reproduction fixture.
4. Reproduce the candidate path with disposable fixtures or a calculation based on confirmed quantities; record runtime facts that could not be tested as unverified.
5. Produce a graph cycle is a candidate issue until recipe availability and quantities are confirmed. with evidence, counts, status, and the next safe step.

## Validation checklist

- [ ] Version, registry, and source evidence are recorded.
- [ ] The full relevant route includes quantities, alternatives, remainders, and state changes.
- [ ] Suspected bypasses have a reproducible calculation or item-count comparison.
- [ ] Unknown quantities, chance outcomes, or runtime behavior are explicitly marked unknown.
- [ ] Live validation is bounded, backed up, and reversible.

## Required output

A graph cycle is a candidate issue until recipe availability and quantities are confirmed.

## Boundaries and failure handling

Compression or machine recipes form a possible circular value chain. A graph cycle or unusual yield is only a hypothesis until target recipe and state transitions support it. Stop when a safe minimal reproduction cannot be created without affecting production data.

## Trigger examples

- **Positive:** No related transformation edges exist.
- **Negative:** undefined
