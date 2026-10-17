---
name: skill-update-adoption-observability
description: "Measures which approved skill versions are served and adopted without collecting unnecessary conversation content. Use to monitor update rollout across agent adapters."
---

# Skill Update Adoption Observability

## Purpose

Show whether a release reached the intended adapters and caches, and distinguish delivery from actual use or verified success.

## Required inputs

Skill release events, broker and adapter versions, cache refresh acknowledgements, privacy requirements, and rollout targets.

## Workflow

1. Define lifecycle events separately: release created, eligible for resolution, fetched, cache refreshed, invoked, and task outcome verified.
2. Attach stable skill/version and adapter-version identifiers plus timestamps; avoid raw prompts, source files, tokens, or personal identifiers.
3. Define useful metrics for fetch success, stale resolution, rejection, adapter error, rollout lag, and task validation where available.
4. Validate counters against synthetic traffic including retries, duplicate events, offline clients, and aborted tasks.
5. Create a dashboard or report that states denominator, time window, missing telemetry, and which stages are observed versus inferred.

## Validation checklist

- [ ] Fetch success is not mislabeled as skill invocation or task success.
- [ ] Metrics omit sensitive prompt and skill body content by default.
- [ ] Version and adapter dimensions have bounded cardinality.
- [ ] Missing acknowledgements remain unknown rather than counted as adoption.
- [ ] Metrics are validated against controlled test events.

## Required output

An event schema, minimal metric set, dashboard/report design, and interpretation notes.

## Boundaries and failure handling

Do not use telemetry to reconstruct private conversations or rank individual users. If an adapter cannot report invocation, display that gap rather than estimating it as fact.

If required evidence is missing, record the gap and stop before irreversible actions. Do not claim a test, network request, compatibility result, or approval occurred unless its evidence was observed.

## Trigger examples

- **Positive:** Maintainers need to know whether version 1.4 reached Codex and Claude Code caches after a release.
- **Negative:** The library has no dynamic clients, release process, or need to measure distribution behavior.
