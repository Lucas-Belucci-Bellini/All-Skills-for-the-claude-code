---
name: validating-game-narrative-localization
description: "Validates localized game dialogue and narrative UI for placeholder integrity, speaker/context consistency, branch fit, text overflow, and language-specific presentation. Use when translating quests, subtitles, dialogue choices, or narrative interface text."
---

# Validating Game Narrative Localization

## Goal
Ensure translated narrative remains correct in context, fits the interface, and preserves the intent and mechanics of the original writing without flattening character voice.

## Procedure
1. Inventory narrative strings by stable key and context: speaker, scene, quest state, player relationship, gender/number constraints where applicable, and preceding/following lines.
2. Preserve format tokens, variables, markup, plural rules, and control characters. Validate each locale against the source schema before opening the game.
3. Review branching dialogue in context. Confirm each choice leads to the intended node, speaker, quest transition, and response; do not validate isolated strings only.
4. Give translators notes for ambiguous pronouns, wordplay, lore terms, character voice, and strings whose wording affects gameplay decisions.
5. Test variable expansion with short, long, empty, Unicode, and punctuation-heavy values. Check that player names, item names, and quantities render correctly.
6. Run UI checks at target resolutions, text scale settings, subtitle speeds, and accessibility settings. Record truncation, overlap, unsafe wrapping, and choices that cannot be read before timeout.
7. Verify right-to-left layout, font coverage, line-breaking, and bidirectional text where supported by the game's target languages.
8. Check terminology consistency for item names, locations, factions, abilities, and quest objectives. Flag intentional character-specific variation rather than forcing every occurrence to match mechanically.
9. Test fallback behavior for missing translations and stale locale files. Missing content should be visible in development builds and handled predictably in release.
10. Keep a regression corpus of branch-heavy scenes and strings with historically fragile placeholders or layout behavior.

## Deliverables
- Locale/key coverage report
- Placeholder and markup validation results
- Contextual dialogue branch test list
- UI overflow screenshots or reproducible cases
- Terminology decisions and approved exceptions

## Acceptance criteria
- Required keys and placeholders match the source schema.
- Choice labels and dialogue responses remain attached to the correct branch.
- Critical narrative UI is readable at supported display and accessibility settings.
- Missing translations have deterministic fallback behavior.
- Automated string checks are complemented by in-context review.

## Avoid
- Translating strings without scene and speaker context.
- Removing placeholders to make a sentence read more naturally.
- Treating a successful export as proof that text fits in the UI.
- Overwriting character voice with a single global glossary rule.
