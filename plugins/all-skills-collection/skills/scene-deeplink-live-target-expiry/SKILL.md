---
name: scene-deeplink-live-target-expiry
description: "Handle shared links that refer to live entities which have disappeared, gone stale, or changed identity."
---

# Scene Deeplink Live Target Expiry

## Purpose

Prevent old deep links from implying that a transient public contact is still present or that a recycled ID is the same entity.

## Required inputs

Share URL schema, source-scoped IDs, freshness policies, target lookup, and live-target test fixtures.

## Workflow

1. Define how live targets are represented in links, including provider namespace and any source timestamp or expiry metadata.
2. Resolve the referenced target against the current source and confirm identity using stable provider-scoped identifiers.
3. Test absent, stale, reused, duplicated, and provider-unavailable targets.
4. Show a safe fallback such as the last known area or an overview and state that the live target is unavailable.

## Validation checklist

- [ ] Expired live references do not silently bind to a similar-looking entity.
- [ ] Source identity and expiry rules are encoded or retrieved explicitly.
- [ ] Unavailability and stale last-known data are distinguishable.
- [ ] The link never reveals private local history or retained identity profiles.

## Required output

A live-target link contract, expiry policy, and tests for absence, staleness, and ID reuse.

## Boundaries and failure handling

Do not turn a transient public signal into a persistent person-tracking link; keep use limited to legitimate public telemetry.

## Trigger examples

- **Positive:** A previously shareable public aircraft target has disappeared by the time the link opens.
- **Negative:** A request to recover a person's movements from an expired camera or location link.
