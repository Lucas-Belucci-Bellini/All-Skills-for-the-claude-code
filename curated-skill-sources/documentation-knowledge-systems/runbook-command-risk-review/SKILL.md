---
name: runbook-command-risk-review
description: "Review operational commands for prerequisites, scope, destructive effects, privileges, verification and recovery before execution."
---

# Runbook Command Risk Review

## Purpose

Make operational instructions safer to follow under pressure by exposing risk and authority before action.

## Required inputs

Runbook commands, target environment, permissions, affected resources and recovery mechanisms.

## Workflow

1. Extract commands and classify effects as read-only, mutating, destructive or externally visible.
2. Identify target selection, wildcards, environment variables and implicit defaults that affect blast radius.
3. Add preconditions and observable success/failure criteria to high-impact steps.
4. Require preview and verified recovery guidance where technically meaningful.
5. Review copy/paste hazards such as stale placeholders, production defaults and suppressed errors.

## Validation checklist

- [ ] High-impact commands state target and expected effect.
- [ ] Destructive steps include confirmation and recovery planning.
- [ ] Verification is stronger than process exit code alone.
- [ ] Untested recovery procedures are labeled as such.
- [ ] Secrets are absent from logs and examples.

## Required output

Command risk table, corrected runbook, preflight/abort criteria and untested assumptions.

## Boundaries and failure handling

Do not execute production operations merely to validate docs. A backup is not proven restorable until restore has been exercised.

## Trigger examples

- **Positive:** A recursive deletion command depends on an unset environment variable.
- **Negative:** Editing an FAQ without commands or state-changing operations.
