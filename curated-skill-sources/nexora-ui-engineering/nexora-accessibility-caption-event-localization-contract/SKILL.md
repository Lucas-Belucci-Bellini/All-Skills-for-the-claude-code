---
name: nexora-accessibility-caption-event-localization-contract
description: Define and validate NEXORA's semantic gameplay-caption boundary, localized text resolution, deterministic ordering, bounded presentation, and accessibility-safe fallbacks without changing authoritative simulation.
---

# NEXORA Accessibility Caption Event Localization Contract

## Purpose and evidence

Use this workflow when implementing or auditing subtitles, sound captions, dialogue labels, environmental cues, or text alternatives to audio events.

Inspect the current versions of:
- `docs/plans/ACCESSIBILITY SYSTEM.md`
- `docs/plans/Audio.md`
- `docs/plans/LOCALIZATION SYSTEM.md`
- relevant event-bus, gameplay-event, audio, UI, and localization code
- ADRs/tests defining event identity, world-time authority, and presentation ownership

The plans establish that semantic world/gameplay facts may drive captions and cues; Audio and Renderer own presentation; localization resolves stable keys; and accessibility preferences must not alter authoritative simulation. Treat plans as intended architecture, not proof of shipped behavior. Record commit, exact paths/symbols, and executed test commands. Mark absent runtime APIs as planned.

## Boundary model

```text
Authoritative gameplay/world fact
        |
        v
Semantic presentation event
        +------> Audio selection / playback
        +------> Caption policy
                       |
                       v
             Stable localization key
                       |
                       v
             Locale + format context
                       |
                       v
             Caption presentation
```

Caption output may observe semantic events, but translated text, caption visibility, reading speed, and accessibility preferences must never feed back into simulation, combat, AI, inventory, physics, world time, or network authority.

Audio and captions share semantic event identity. Do not infer caption meaning from audio filenames or parse rendered strings.

## Semantic event contract

Define a versioned, typed, bounded event envelope containing only the data required for presentation and correlation:

- stable namespaced event kind and schema version
- stable event/sequence identity
- safe source identity where useful
- authoritative world/simulation timestamp when ordering requires it
- minimal typed context (material, action, environment category)
- localization key and typed arguments, or a deterministic mapping to them
- privacy classification and explicit exclusions

Do not include arbitrary entity snapshots, private account/player data, secrets, unbounded user strings, or server-only state. Never use client wall-clock time as authoritative event order. If stable sequence identity or schema version is absent, document the gap and propose the smallest additive contract; do not pretend an API exists.

## Mapping and localization

Use explicit mappings from semantic event kinds to stable namespaced keys, for example:
- `nexora.caption.block.break.stone`
- `nexora.caption.weather.thunder`
- `nexora.caption.entity.footstep`

Never persist translated caption strings as world state, save data, replay authority, or protocol identity. Validate typed formatting arguments and define behavior for missing keys/arguments, invalid types, unsupported locales, active captions during locale switches, plural forms, numbers, dates, units, safe rich-text markers, and untrusted mod content.

Follow the documented fallback chain: requested locale → language fallback → default locale → developer-visible key or safe diagnostic fallback. Missing translations must not suppress the underlying event or crash gameplay. Require mod translation bundles to use namespaces and pass validation before registry publication; isolate malformed bundles.

## Ordering and bounded presentation

Captions are presentation, not a lossless event log. Define policy by event class:

- **Critical/unique:** preserve identity and order for warnings or dialogue.
- **Repeatable/noisy:** coalesce footsteps, machinery, rain, and repeated impacts within bounded time/distance windows.
- **Superseding:** replace an older caption when newer state makes it obsolete.
- **Low priority:** drop under a documented budget and increment diagnostics.

Use deterministic tie-breaking for same-tick events (sequence identity, then stable event kind); never rely on hash-map iteration. Bound active caption count, text length, queue depth, and lifetime. Specify burst, pause/menu, focus, world-transition, and locale-switch behavior. Do not merge sources when that makes direction or attribution misleading. If directional cues are unavailable, degrade to readable text.

## Preferences and authority isolation

Preferences may control enabled state, size, contrast, background/opacity, duration, speaker labels, sound-category filters, and directional indicators. Validate ranges and persist them through user settings/configuration, never world saves.

Preference changes affect presentation only. They must not change whether an event occurred, damage, collision, movement, AI, item/block state, server authority, replication, or world-time progression. Provide category distinctions that do not depend on color alone. Respect UI scaling and reduced-motion preferences.

## Multiplayer, prediction, and replay

Replicate semantic facts only when clients need them for presentation; never replicate rendered caption strings as authoritative state. For each event class, document whether it is server-authored and replicated, client-local from an authoritative replicated fact, or local UI/audio feedback.

Prevent duplicates when local prediction and later server reconciliation describe the same fact. Correlate with stable event identity and define correction/retraction behavior. Captions must not reveal hidden entities, private chat, unrevealed world state, or server-only diagnostics.

For replay, record only the stable semantic data needed to reproduce presentation, or explicitly regenerate captions from replayed authoritative facts. Locale-rendered strings must not enter deterministic simulation hashes.

## Validation matrix

1. Mapping: every caption-enabled event resolves to a valid namespaced key and typed argument schema.
2. Fallback: missing locale/key/argument follows policy without dropping events or panicking.
3. Formatting: singular/plural, numbers, units, and dates match locale fixtures.
4. Ordering: same-tick events have stable order across repeated runs/platforms.
5. Burst bounds: event floods coalesce/drop within fixed queue, count, and text budgets.
6. Locale switch: active captions follow a documented update/finish policy without duplication.
7. Preference isolation: toggling captions, size, contrast, or filters leaves authoritative state hashes unchanged.
8. Prediction/reconciliation: one semantic fact yields at most one visible caption.
9. Privacy: hidden entities, private messages, account identifiers, secrets, and server-only data never appear.
10. Mod isolation: malformed/missing translations fail safely without corrupting other bundles.
11. Accessibility: keyboard navigation, UI scale, contrast, reduced motion, and non-color cues remain usable.
12. Lifecycle: pause/resume, focus loss, world unload, disconnect, and shutdown follow explicit clear/retain policy.

Use property tests for bounded queues and stable ordering; golden locale fixtures for formatting. Keep presentation tests separate from authoritative simulation tests.

## Delivery checklist

- [ ] Current plans and implementation inspected; planned versus implemented behavior is explicit.
- [ ] Event identity/schema are stable and bounded.
- [ ] Caption mapping uses namespaced keys and typed arguments.
- [ ] Fallback, pluralization, formatting, and mod-bundle failure are specified.
- [ ] Ordering, coalescing, priority, and queue limits are deterministic and bounded.
- [ ] Preferences affect presentation only.
- [ ] Multiplayer/replay do not leak hidden data or duplicate predicted events.
- [ ] Privacy and lifecycle behavior have tests.
- [ ] Runtime/hardware evidence is reported accurately.
- [ ] Canonical source and generated plugin copy are byte-identical.

## Non-goals

This workflow does not implement a caption renderer, speech recognition, text-to-speech, audio mixing, localization runtime, translation content, input remapping, or networking. Do not claim NEXORA supports captions until runtime systems and end-to-end tests exist.


## Required inputs

- Current NEXORA plan documents and relevant implementation/ADR paths.
- Semantic event types and their source/authority, or an explicit statement that these are still planned.
- Localization key/bundle schema, locale fallback policy, and formatting capabilities.
- Caption preference/settings model and presentation owner.
- Multiplayer/replay event provenance where applicable.
- Existing tests, build commands, and known platform limitations.

## Workflow

1. Trace one representative event (for example, a stone block break or thunder cue) from its authoritative producer through the event bus and audio/caption consumers. Mark every missing link as a gap.
2. Specify a versioned semantic event envelope, namespaced localization mapping, typed formatting arguments, privacy exclusions, and deterministic ordering.
3. Define queue/coalescing budgets, locale fallback, preference isolation, lifecycle behavior, and client/server/prediction ownership for each event class.
4. Implement or review the smallest compatible change in the correct runtime subsystem; keep presentation concerns out of simulation authority.
5. Add unit/property/golden tests for mapping, fallback, formatting, boundedness, ordering, privacy, locale switching, and duplicate suppression.
6. Report exact changed files, executed commands, outcomes, and remaining untested runtime/hardware behavior.

## Required output

Produce a concise implementation/audit report containing:
- event-to-caption data-flow diagram and ownership table
- event schema and localization-key mapping
- fallback, ordering, coalescing, queue, privacy, and lifecycle policies
- test matrix with pass/fail/not-run status
- exact files/symbols and runtime gaps
- explicit statement that presentation preferences do not alter authoritative state

## Boundaries and failure handling

- If a required runtime system is absent, return a plan and acceptance criteria; do not fabricate code symbols or claim integration.
- If event identity/order cannot be established, do not merge or coalesce events in a way that can hide critical information.
- If locale resolution or formatting fails, use the documented safe fallback and emit bounded diagnostics; never crash or suppress the authoritative event.
- If privacy classification is unknown, omit sensitive fields and do not render the event to clients until reviewed.
- If the implementation would change simulation authority, persistence semantics, or network protocol, stop and request an explicit architecture review.

## Validation checklist

- [ ] Evidence and planned-versus-implemented status are recorded.
- [ ] Event schema, identity, and privacy exclusions are explicit.
- [ ] Locale mapping, fallback, and typed formatting are covered.
- [ ] Ordering and presentation queues are deterministic and bounded.
- [ ] Preferences are isolated from authoritative simulation.
- [ ] Prediction/replay paths do not duplicate or leak captions.
- [ ] Tests and untested behavior are reported accurately.

## Trigger examples

- **Positive:** "Design NEXORA subtitles for thunder, footsteps, and block sounds using the existing Audio and Localization plans."
- **Positive:** "Audit whether caption settings can affect authoritative gameplay or leak hidden multiplayer state."
- **Negative:** "Implement a generic React accessibility modal unrelated to NEXORA gameplay events."
- **Negative:** "Translate the whole game into Portuguese without reviewing the localization runtime or event contract."
