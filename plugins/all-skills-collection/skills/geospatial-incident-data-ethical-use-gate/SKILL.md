---
name: geospatial-incident-data-ethical-use-gate
description: "Review proposed geospatial incident workflows for legitimate purpose, source reliability, sensitive-site exposure, and misuse risk."
---

# Geospatial Incident Data Ethical Use Gate

## Purpose

Decide whether a visualization is appropriate to build or share before turning mixed public signals into operational conclusions.

## Required inputs

Intended audience and purpose, data source list, location precision, incident context, sharing plans, and risk owner.

## Workflow

1. Describe the intended decision supported by the map and the minimum information needed to make it.
2. Assess source provenance, freshness, uncertainty, sensitivity of locations, and likelihood of exposing a private person or vulnerable site.
3. Choose mitigation such as aggregation, delayed release, reduced precision, role restrictions, or omitting a risky data layer.
4. Record the go/no-go decision, reviewers, assumptions, and conditions that require a new review.

## Validation checklist

- [ ] The use case is specific, legitimate, and documented rather than generalized surveillance.
- [ ] Data reliability and staleness are visible in the proposed output.
- [ ] Sensitive-person or vulnerable-site exposure has been considered before sharing.
- [ ] Risk mitigations have testable acceptance criteria and an owner.

## Required output

A concise review decision, data-flow risk table, mitigation checklist, and re-review triggers.

## Boundaries and failure handling

Do not operationalize targeting, stalking, doxxing, or harmful surveillance; stop and narrow the use case if it depends on those outcomes.

## Trigger examples

- **Positive:** A team plans to publish a map combining public incident reports with live geographic feeds.
- **Negative:** A request to find, target, intimidate, or reveal the private whereabouts of an individual.
