---
name: skill-broker-authentication-rate-limits
description: "Designs authentication, authorization, and abuse limits for a remote skill broker. Use when multiple agents or workspaces retrieve skills through an API or MCP server."
---

# Skill Broker Authentication and Rate Limits

## Purpose

Provide reliable skill retrieval without making the broker an unauthenticated route to private repository contents or an uncontrolled cost center.

## Required inputs

Broker endpoints, public/private skill policy, identity source, tenant/workspace model, expected usage, response sizes, and write-operation scope.

## Workflow

1. Classify endpoints by sensitivity and effect: search, read skill metadata, fetch content, submit gap report, propose change, publish/update.
2. Define identity and authorization checks for each endpoint; default to read-only and deny cross-tenant access unless explicitly permitted.
3. Set per-identity, per-tenant and global limits for request frequency, concurrent fetches, response bytes, and expensive search operations.
4. Return standard authentication, authorization, rate-limit and retry-after responses without disclosing whether protected resources exist to unauthorized callers.
5. Test missing, expired, invalid, over-scoped and revoked credentials as well as burst traffic using isolated test identities.

## Validation checklist

- [ ] Private skills are inaccessible to unauthenticated clients.
- [ ] Read, propose, and publish permissions are distinct.
- [ ] Rate limits cover both request count and response/cost amplification.
- [ ] Errors contain no token, secret, or private resource detail.
- [ ] Limits and authentication failures are observable without logging credentials.

## Required output

An endpoint permission matrix, rate policy, error contract, threat scenarios, and verification results.

## Boundaries and failure handling

Never put tokens in skill content, URLs, committed config, or logs. Do not disable authentication or rate limits as a shortcut to fix an integration failure.

If required evidence is missing, record the gap and stop before irreversible actions. Do not claim a test, network request, compatibility result, or approval occurred unless its evidence was observed.

## Trigger examples

- **Positive:** A remote MCP/API broker serves a private skill repository to multiple AI agents.
- **Negative:** All files are public static assets and no user identity, private content, or resource-intensive search exists.
