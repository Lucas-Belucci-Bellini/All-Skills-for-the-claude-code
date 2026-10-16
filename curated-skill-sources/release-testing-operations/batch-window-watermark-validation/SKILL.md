---
name: batch-window-watermark-validation
description: "Use when streaming/scheduled batches use event-time windows or watermarks and must handle late data correctly; not for generic crash-resumable backfills."
---

# Batch Window Watermark Validation

## Purpose

Make window aggregation correct at boundaries and explicit about late events.

## Required inputs

Window size/timezone, watermark, lateness allowance, event timestamps, dedupe key, late-event policy, sample stream.

## Workflow

1. Define event versus processing time, window boundaries, timezone/DST, watermark advancement, and finalization.
2. Create fixtures before/on/after boundaries including late, out-of-order, duplicate, and invalid timestamps.
3. Verify aggregate corrections/retractions and alerting for data arriving after the lateness horizon.
4. Replay historical input and explain differences from online results under the declared policy.

## Verification checklist

- [ ] Window inclusivity is unambiguous and tested.
- [ ] Late events have a correction, side-output, or rejection policy.
- [ ] Duplicates follow the intended identity key.
- [ ] Timezone/DST behavior is tested where applicable.

## Required output

A window/watermark specification, boundary fixtures, late-event outcomes, and reconciliation report.

## Boundaries and failure handling

Do not silently discard late events without a contract; retain visibility into excluded records.

When evidence, permissions, or environment details are missing, stop at the supported analysis, record the missing prerequisite, and do not report unexecuted validation as passing.

## Trigger examples

- **Positive:** A daily metric varies depending on late-event arrival time.
- **Negative:** Resuming a one-time backfill without time-window logic.
