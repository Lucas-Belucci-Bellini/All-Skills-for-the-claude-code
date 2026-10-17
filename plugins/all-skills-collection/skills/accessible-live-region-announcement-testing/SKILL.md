---
name: accessible-live-region-announcement-testing
description: "Test whether asynchronous status, progress, result counts and validation changes are announced once at the right urgency to assistive technology."
---

# Accessible Live Region Announcement Testing

## Purpose

Verify dynamic UI changes reach users who cannot reliably perceive visual updates, without flooding them with duplicate or overly urgent announcements.

## Required inputs

Async flows, loading/completion states, progress signals, accessible status regions, supported browsers and assistive-technology test scope.

## Workflow

1. List meaningful state changes such as save completion, upload progress, result counts, background failure and form submission.
2. For each change, specify if a status role or live region is appropriate, its urgency and sufficient message text.
3. Confirm the live region exists before content changes where needed; avoid replacing the whole region so quickly that announcement is unreliable.
4. Exercise rapid updates, retries, cancellation, duplicate responses and component unmounts to find missing or repeated announcements.
5. Test representative browser/screen-reader combinations when available; label DOM assertions separately from manual AT observations.

## Validation checklist

- [ ] Success and failure states are announced without relying only on visuals.
- [ ] Routine progress does not repeatedly interrupt the user.
- [ ] Duplicate transitions do not create duplicate announcements.
- [ ] Announcements avoid sensitive payload data.
- [ ] Rapid or out-of-order progress does not produce misleading status.

## Required output

A state-to-announcement matrix, timing expectations, reproduction steps and a report separating automated and manual verification.

## Boundaries and failure handling

Do not use assertive live regions for every status message. Presence of aria-live alone does not prove clarity. If the actual AT combination is unavailable, mark that test as not run.

## Trigger examples

- **Positive:** Search updates its result count after a network request and must announce the new count.
- **Negative:** A static page has no changing status or progress feedback.
