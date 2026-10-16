---
name: release-rollback-readiness-drill
description: Verify that a released application or engine runtime can be rolled back to a compatible artifact and configuration without corrupting user state.
---

# Release Rollback Readiness Drill

## Goal

Prove rollback readiness before releases by testing artifact selection, config compatibility, data migrations, and observable recovery criteria.

## Inputs to inspect

Release artifacts, migration policy, config schema versions, deployment steps, persisted-state compatibility and incident playbooks.

## Workflow

1. Identify rollback scope: binary/artifact, runtime configuration, content assets, database/save schema and external service contract versions.
2. Check forward/backward compatibility and define which migrations are reversible, compensatable or intentionally forward-only with a recovery path.
3. Perform a timed rollback in a disposable environment using the documented operator steps and pinned prior artifacts, including required config and dependencies.
4. Inject failure during rollout and verify the rollback target can read state already written by the newer version or the plan prevents incompatible writes.
5. Record recovery time, unavailable capabilities, integrity checks and evidence that critical workflows resume after rollback.

## Validation checklist

- [ ] Rollback artifact and dependencies are retained and integrity-verified.
- [ ] State written by the new release is compatible with the rollback target or a tested repair/restore procedure exists.
- [ ] Rollback has explicit stop conditions and does not silently discard newer state.
- [ ] Post-rollback health checks exercise important user-facing and persistence paths.

## Required output

A rollback compatibility matrix, drill results, recovery-time measurements and an actionable release rollback runbook.

## Boundaries and failure handling

Do not describe a rollback as safe if database/save migration compatibility or state integrity was not tested.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
