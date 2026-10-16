---
name: dependency-update-risk-assessment
description: Review dependency upgrades by API change, security advisories, transitive graph, license/provenance, and rollback risk.
---

# Dependency Update Risk Assessment

## Goal

Make routine dependency updates predictable instead of merging upgrades solely because a version resolver succeeds.

## Inputs to inspect

Manifest/lockfile diff, changelog/release notes, advisory records, impacted call sites, tests, and release constraints.

## Workflow

1. Inventory direct and transitive version changes, source changes, platform constraints, native build scripts, and any lockfile churn unrelated to the intended upgrade.
2. Read primary release notes and current relevant advisories; identify removed APIs, changed defaults, security fixes, support-window changes, and new permissions.
3. Trace impacted API usage and runtime paths in the repository; prioritize high-risk areas such as auth, serialization, storage, networking, and FFI.
4. Run focused tests, build matrix, integration tests, and license/provenance checks appropriate to the changed dependency; note any unavailable coverage.
5. Choose a rollout strategy: batch low-risk updates, isolate high-risk updates, canary production-facing changes, and keep a tested rollback or forward-fix option.

## Validation checklist

- [ ] The upgrade is linked to an exact manifest/lockfile change and release-note evidence.
- [ ] Transitive updates and platform-specific effects are considered.
- [ ] Security findings are assessed for affected versions and reachability.
- [ ] Tests target actual call sites and critical behavior, not only compilation.
- [ ] The final recommendation states risk, coverage gaps, and rollback assumptions.

## Required output

Deliver a dependency change table, compatibility/security impact, test evidence, rollout plan, and accepted exceptions.

## Boundaries and failure handling

Do not automatically downgrade every advisory without impact analysis; do not assert 'safe' based only on a passing unit suite.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
