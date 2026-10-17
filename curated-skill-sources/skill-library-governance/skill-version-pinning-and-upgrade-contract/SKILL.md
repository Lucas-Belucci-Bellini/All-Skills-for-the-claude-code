---
name: skill-version-pinning-and-upgrade-contract
description: "Defines immutable skill versions and safe upgrade rules for agents and projects. Use when a broker or plugin distributes skills that may change over time."
---

# Skill Version Pinning and Upgrade Contract

## Purpose

Make task execution reproducible while allowing clients to adopt approved skill updates deliberately.

## Required inputs

Skill identity scheme, existing version fields, release channel policy, compatibility metadata, agent cache behavior, and rollback requirements.

## Workflow

1. Define a stable skill ID independent of folder location and an immutable version or content digest for every released revision.
2. Specify version selectors such as exact pin, compatible range, approved latest, and deprecated; document conflict precedence.
3. Define upgrade behavior for pinned projects, floating clients, broken versions, and version ranges with no eligible candidate.
4. Require the resolver to return both the requested selector and the exact version/digest actually delivered.
5. Test upgrade, downgrade, missing-version, yanked-version, and incompatible-client cases against a disposable registry.

## Validation checklist

- [ ] An exact pin resolves to the same immutable content.
- [ ] A new release does not rewrite an existing version in place.
- [ ] Floating clients update only through an explicit policy.
- [ ] Removed or yanked versions return a clear status and safe alternative.
- [ ] The changelog identifies breaking behavior and migration needs.

## Required output

A version-selection policy, immutable identity rules, upgrade matrix, and resolver test cases.

## Boundaries and failure handling

Do not silently upgrade a pinned production project. If an integrity digest does not match, refuse to serve the content and report the failure.

If required evidence is missing, record the gap and stop before irreversible actions. Do not claim a test, network request, compatibility result, or approval occurred unless its evidence was observed.

## Trigger examples

- **Positive:** Agents need to cache skill versions while the central repository evolves every week.
- **Negative:** A one-off local prompt will never be stored, reused, or distributed.
