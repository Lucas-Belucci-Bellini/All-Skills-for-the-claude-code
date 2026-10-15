---
name: animation-event-timing-audit
description: Audit animation event timing, root-motion assumptions, cancel windows, and gameplay synchronization across blends and frame rates.
---

# Animation Event Timing Audit

## Goal

Prevent animation-driven actions from firing too early, too late, twice, or not at all during interruptions.

## Inputs to inspect

Animation clips/state machines, event markers, gameplay action code, root motion, transition rules, and frame/tick timing.

## Workflow

1. List gameplay-significant markers such as hit frames, footfalls, interaction points, invulnerability windows, and cancel windows; identify which are cosmetic only.
2. Trace marker dispatch through blending, looping, transition interruption, animation speed changes, and fixed/variable update domains.
3. Define whether event timing follows simulation ticks, animation time, or presentation time; specify how events behave when frames are skipped or clips are interrupted.
4. Test low/high frame rate, time scaling, animation blend transitions, pause/resume, rollback/replay if applicable, and repeated state entry.
5. Compare event traces with authored marker times and validate gameplay collision/hit windows independently from visual anticipation.

## Validation checklist

- [ ] Gameplay-critical events have explicit exactly-once or intentionally repeatable semantics.
- [ ] Interrupted clips cannot emit stale events after the owning action is cancelled.
- [ ] Timing tests run under differing render rates and blend paths.
- [ ] Root motion and collision state use a documented authority relationship.
- [ ] Cosmetic animation polish is not confused with authoritative gameplay timing.

## Required output

Produce an animation-event inventory, transition timing diagram, confirmed timing defects, and a reproducible test matrix.

## Boundaries and failure handling

Do not move event markers to conceal a simulation timing bug; do not assume visual contact equals authoritative collision timing.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
