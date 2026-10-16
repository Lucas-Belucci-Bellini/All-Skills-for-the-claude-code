---
name: slo-burn-rate-window-analysis
description: "Evaluate service-level objective burn rate across short and long windows to distinguish urgent budget exhaustion from noise or insufficient evidence."
---

# SLO Burn Rate Window Analysis

## Purpose

Turn error-budget consumption into an actionable reliability decision with explicit windows, sample confidence and service ownership.

## Required inputs

SLO definition, SLI query, target, budget period, alert thresholds, event volume, baseline and current incident context.

## Workflow

1. Confirm SLI numerator, denominator, eligible traffic and exclusions match the SLO; check missing or stale telemetry.
2. Calculate error-budget burn rate for each configured window using the same SLO definition and explicit time boundaries.
3. Compare event counts and traffic volume against minimum-sample rules so low-volume spikes are not treated as sustained customer impact.
4. Distinguish fast burn, slow burn, recovery and unknown-data states; identify the affected journey and owner.
5. Recommend the pre-agreed response and cite the actual query range and measured values.

## Validation checklist

- [ ] SLI numerator/denominator, exclusions and target are explicit.
- [ ] Short and long windows use consistent definitions and timezone boundaries.
- [ ] Missing data is not interpreted as zero errors.
- [ ] Burn rate and estimated budget impact can be reproduced.
- [ ] Each recommendation maps to a documented threshold and owner.

## Required output

A burn-rate table, query references, confidence caveats, impact summary and policy-based recommendation.

## Boundaries and failure handling

Do not invent targets or thresholds after seeing results. Do not page or pause deployments unless authorized. If volume or freshness is inadequate, mark the decision indeterminate.

## Trigger examples

- **Positive:** Error-budget consumption is accelerating and the team needs to assess whether the paging policy applies.
- **Negative:** Writing an uptime statement without SLI data.
