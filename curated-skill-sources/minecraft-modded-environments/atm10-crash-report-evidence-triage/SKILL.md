---
name: atm10-crash-report-evidence-triage
description: "Triage an ATM10 crash report using exact environment details, causal stack frames, and reproducible evidence before recommending reversible fixes."
---

# ATM10 Crash Report Evidence Triage

## Purpose

Turn a crash report into a ranked, evidence-backed diagnosis without blaming a mod from a single stack-frame mention.

## Required inputs

Full crash report and latest.log; exact Minecraft, loader, Java, ATM10 build and launcher versions when available; mod-list snapshot; recent changes; crash timing and reproduction steps. Redact tokens, usernames, local paths, and server addresses where unnecessary.

## Workflow

1. Classify the failure phase: launcher, JVM startup, mod discovery, registry/datapack loading, world creation, world join, ticking, rendering, networking, or shutdown.
2. Extract the first meaningful exception, causal chain, relevant mod IDs/classes, mixin failures, missing dependencies, and the earliest error preceding cascading failures.
3. Cross-check every suspected component against the actual installed mod list and exact versions; distinguish direct evidence from names merely present in the stack trace.
4. Compare the crash timestamp with latest.log and recent config/mod changes. Request missing context instead of assuming the repository snapshot matches the player's installation.
5. Form at least two plausible hypotheses when evidence is ambiguous and design the smallest test that distinguishes them in a copied instance or disposable world.
6. Propose one reversible change at a time, record the original state, and rerun the same reproduction steps.
7. Report the root cause only when a controlled test supports it; otherwise provide ranked hypotheses and the next evidence needed.

## Validation checklist

- [ ] Failure phase and earliest causal exception are identified.
- [ ] Exact versions and installed presence of suspected mods are checked.
- [ ] Facts, hypotheses, and unverified assumptions are clearly separated.
- [ ] A backup or disposable test environment protects the original world/config.
- [ ] The proposed test changes one variable and has an observable pass/fail result.
- [ ] No mod is declared guilty solely because it appears in a stack trace.

## Required output

Provide a concise incident report with environment, failure phase, decisive log excerpts, ranked hypotheses, confidence, reproduction procedure, minimal reversible test, result, rollback instructions, and unresolved questions.

## Boundaries and failure handling

If logs are truncated, versions are unknown, or the actual mod list is unavailable, mark the diagnosis incomplete. Never ask for secrets or recommend deleting the world, configs, or mods wholesale as the first action.

## Trigger examples

- **Positive:** An ATM10 CurseForge instance crashes on world join and the user has a crash report plus latest.log.
- **Negative:** A user asks for general mod recommendations without a crash, failure symptom, or diagnostic goal.
