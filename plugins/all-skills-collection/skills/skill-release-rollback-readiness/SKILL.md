---
name: skill-release-rollback-readiness
description: "Checks whether an approved skill release can be disabled or rolled back safely. Use before publishing changes that may alter agent behavior across many clients."
---

# Skill Release Rollback Readiness

## Purpose

Limit blast radius when a skill version is unsafe, regresses outcomes, or breaks compatibility after distribution.

## Required inputs

Release candidate, previous stable version, client cache policy, compatibility map, test results, and criteria for disabling or restoring a version.

## Workflow

1. Identify the stable version, candidate digest, supported clients, and the locations where each version is cached or pinned.
2. Define measurable rollback triggers such as integrity failure, elevated routing errors, critical unsafe behavior, or a regression in the release test suite.
3. Verify that the release mechanism can withdraw eligibility, restore a known-good version, and communicate the change to caches.
4. Exercise rollback in a test environment, including a client that is offline, pinned, or holding the candidate in cache.
5. Record who can initiate rollback, which actions require approval, and how the system confirms propagation without claiming delivery it cannot observe.

## Validation checklist

- [ ] The previous stable version remains addressable and immutable.
- [ ] Rollback does not erase audit history or overwrite pinned project state silently.
- [ ] Revoked versions are excluded from latest-approved resolution.
- [ ] Offline and pinned-client limitations are explicit.
- [ ] A rollback drill has observable evidence and documented results.

## Required output

A rollback runbook, trigger thresholds, permission matrix, propagation checklist, and drill evidence.

## Boundaries and failure handling

Do not automatically roll forward to an untested replacement during rollback. If the registry cannot prove a safe version is available, disable retrieval rather than serving unknown content.

If required evidence is missing, record the gap and stop before irreversible actions. Do not claim a test, network request, compatibility result, or approval occurred unless its evidence was observed.

## Trigger examples

- **Positive:** A skill update has broad distribution and the team needs a tested response to regressions.
- **Negative:** The draft has not been distributed and no client can have consumed it yet.
