---
name: npc-schedule-constraint-validation
description: Validate NPC daily schedules against time windows, travel duration, work shifts, resources, and interruptible high-priority actions.
---

# NPC Schedule Constraint Validation

## Goal

Keep simulated routines plausible and conflict-free while allowing urgent events and dynamic travel to override plans safely.

## Inputs to inspect

Schedule definitions, world clock, travel-time estimates, action priorities, location availability and interrupt/resume behavior.

## Workflow

1. Represent schedule entries with start/end windows, location, required resources, travel buffers, priority and whether interruptions are permitted.
2. Check temporal overlap, impossible travel transitions, missing fallback activities and actions whose required location/resource is unavailable.
3. Simulate schedules around day rollover, daylight changes if relevant, delayed travel, blocked paths, urgent events and temporarily unavailable workplaces.
4. Verify interrupted actions resume, expire or replan according to an explicit policy instead of duplicating effects or leaving agents stuck.
5. Add property-based or scenario tests for impossible schedules and report conflicts with the minimal responsible entry sequence.

## Validation checklist

- [ ] Travel time is included when evaluating whether one appointment can follow another.
- [ ] Higher-priority events interrupt only actions declared interruptible and preserve required cleanup.
- [ ] Unavailable locations/resources produce a defined fallback or visible schedule failure.
- [ ] Time rollover and save/load preserve schedule semantics.

## Required output

A schedule constraint report, interruption policy, conflict fixtures and runtime diagnostics for missed or blocked activities.

## Boundaries and failure handling

Do not silently move schedule entries to resolve conflicts without preserving authored intent or recording a replanning decision.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
