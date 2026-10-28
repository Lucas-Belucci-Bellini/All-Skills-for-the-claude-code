---
name: public-data-provenance-chain-integrity
description: "Provides an evidence-driven workflow for public data provenance chain integrity, with concrete invariants, representative failure cases, and a reviewable validation artifact. Use when implementing, diagnosing, or changing this specific boundary."
---

# Public Data Provenance Chain Integrity

## Purpose

Provide a task-specific, reproducible workflow for public data provenance chain integrity; isolate the relevant contract and produce evidence another maintainer can review without relying on undocumented context.

## Required inputs

Target project or service and version; current configuration/data shape; expected behavior and invariant; minimal sanitized reproduction or fixture; toolchain/environment; and applicable safety, rollback, retention or approval requirements. Capture exact identifiers when useful, but do not include credentials or unnecessary personal data.

## Workflow

1. Identify source owner/URL, collection purpose, license/terms, retrieval date, retention policy, sensitivity and downstream audience for public data provenance chain integrity; retain provenance with derived outputs.
2. Trace whether data contains identifiers, precise location/time, sensitive attributes, small-group counts or inferences that could enable harm or re-identification.
3. Define a testable policy for attribution, minimization, aggregation, uncertainty, correction/takedown or retention; specify deny/default behavior when permissions or source terms are ambiguous.
4. Use synthetic or redacted examples to test exports, caches, derived datasets, fallback states and deletion propagation; do not put sensitive real data into fixtures without review.
5. Produce a decision record with source citations, risk tradeoffs, affected fields, approved transformations, expiry/review triggers and unresolved legal or ethical questions.

## Validation checklist

- [ ] The scope, assumptions, version and expected invariant for public data provenance chain integrity are explicit.
- [ ] Success and negative/boundary/failure cases are represented by a repeatable fixture or reviewable evidence.
- [ ] The procedure checks the relevant state/data/permission boundary and records expected versus observed results.
- [ ] Failure recovery, rollback or safe stop behavior is defined before irreversible actions.
- [ ] The report distinguishes verified, failed, blocked and untested claims and includes a named next action for remaining gaps.

## Required output

A public data provenance chain integrity evidence package containing context/version, reproduction/fixture, invariants, checks performed, measured or observed results, failure cases, recommended action, rollback/recovery notes and PASS / FAIL / UNVERIFIED status.

## Boundaries and failure handling

Do not assume public availability grants unrestricted reuse. Minimize sensitive fields, preserve source context and uncertainty, and escalate unclear license, privacy or retention requirements rather than inventing legal clearance.
If the version, source contract or permission boundary cannot be confirmed, mark the result UNVERIFIED and stop before irreversible changes. Bound retries, preserve the smallest useful reproduction and escalate when evidence is ambiguous. Never claim a test, deployment, provider response, runtime behavior or approval occurred unless the result was actually observed.

## Trigger examples

- **Positive:** An engineer needs to investigate or change public data provenance chain integrity and must provide reproducible evidence, known limits and recovery steps.
- **Negative:** The request does not involve public data provenance chain integrity or a downstream contract affected by this exact boundary.
