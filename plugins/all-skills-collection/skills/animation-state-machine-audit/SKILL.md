---
name: animation-state-machine-audit
description: "Audits animation state machines, transitions, and gameplay synchronization. Use when characters pop, get stuck, play duplicate animations, or animation events fire at the wrong time."
---

# Animation State Machine Audit

## Use when
Visual animation states drift from gameplay state or overlapping transitions cause unreachable states and repeated side effects.

## Workflow
1. Inventory states, transition conditions, entry/exit actions, blend rules, animation events, and gameplay authority.
2. Trace representative sequences including interruption, cancellation, death, respawn, network correction, and missing animation assets.
3. Separate cosmetic state from authoritative combat/movement state and define how skipped or duplicated events are handled.
4. Create transition-table tests and record frame/event timing for regressions.

## Required output
A state-transition diagram, timing/event contract, problematic transition list, and regression sequence suite.

## Validation
- All transitions are reachable or documented as intentionally obsolete.
- Gameplay results do not depend solely on a presentation animation finishing successfully.
- Interruptions cannot leave input, hitboxes, or root motion in invalid states.

## Guardrails
Do not use animation clips as the only source of truth for critical world state without explicit synchronization and fallback rules.
