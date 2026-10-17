---
name: skill-broker-client-capability-advertisement
description: "Defines how an agent adapter declares the features it actually supports. Use when broker results need filtering by tool, format, authentication, or context capability."
---

# Skill Broker Client Capability Advertisement

## Purpose

Define a truthful, versioned capability profile so the broker does not send skills that require tools, formats, permissions, or context budgets unavailable to a client.

## Required inputs

Adapter build/version, platform version, enabled tools/connectors, supported package formats, authentication state, permissions, context budget, and existing conformance-test results.

## Workflow

1. Enumerate the features the client claims to support: search, exact-version fetch, references, scripts, MCP calls, write operations, context limits, and cache/update behavior.
2. For each feature, record the evidence source and classify it as runtime-tested, documented but untested, unavailable, or unknown; do not infer support from the provider name.
3. Build a versioned capability document with stable field names and explicit unsupported/unknown states; keep permissions separate from technical availability.
4. Run the adapter conformance suite against the declared features and compare claims with observed results, rejecting any unsupported positive claim.
5. Publish the capability document to the broker only after schema validation, and record the adapter version and expiry/revalidation policy.

## Validation checklist

- [ ] The capability document has a schema version and adapter build identity.
- [ ] Every positive feature claim cites runtime evidence or clearly says documented-but-untested.
- [ ] Unknown and unavailable are distinct states.
- [ ] Write/publish permissions are not inferred from the ability to read a skill.
- [ ] Broker filtering is tested using at least one supported and one unsupported requirement.

## Required output

A versioned client capability document, a feature-evidence matrix, conformance results, and a list of unverified capabilities.

## Boundaries and failure handling

Do not advertise a feature because another plan, product version, or adapter supports it. If the connected environment cannot be probed, use conservative capabilities and request verification before returning a skill that depends on the uncertain feature.

## Trigger examples

- **Positive:** The broker must decide whether a skill requiring local shell access can be used by this connected ChatGPT or Codex environment.
- **Negative:** The agent is writing an ordinary answer and no broker selection or platform compatibility decision is needed.
