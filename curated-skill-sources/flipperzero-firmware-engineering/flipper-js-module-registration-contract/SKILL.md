---
name: flipper-js-module-registration-contract
description: "Apply deterministic firmware-engineering checks to keep JavaScript native module names, exports, argument schemas, and API docs consistent."
---

# Flipper JS Module Registration Contract

## Purpose

Keep JavaScript native module names, exports, argument schemas, and API docs consistent. This skill turns the concern into a reviewable contract for Flipper Zero firmware, with explicit ownership, bounded inputs, and safe failure behavior.

## Required inputs

Inspect JS module registration, native binding tables and docs. Gather the authoritative API/format docs, target/revision, adjacent tests, and expected behavior. Prefer host mocks and synthetic fixtures unless an approved hardware test is necessary.

## Workflow

1. Trace JS module registration, native binding tables and docs; record the owner, call sequence, platform assumptions, and current regression coverage.
2. Convert keep javascript native module names, exports, argument schemas, and api docs consistent. into explicit invariants, including allowed values, ownership, timeout/cleanup behavior, and unsupported states.
3. Exercise Unknown module, missing export, wrong type, duplicate name using deterministic fixtures and error injection; include boundaries, malformed input, cancellation, and failure recovery where relevant.
4. Deliver Module API catalogue and contract tests. Run the narrow test then relevant firmware/build checks and record actual outputs; keep hardware claims separate from host-test evidence.

## Validation checklist

- [ ] The invariant has a named owner and repeatable assertion or review check.
- [ ] Normal, boundary, and failure/cleanup paths are represented.
- [ ] Target, API version, resource ownership, and data limits are explicit.
- [ ] Tests prefer host mocks/synthetic fixtures and do not require unauthorized device interactions.
- [ ] Logs and fixtures exclude secrets and unnecessary raw credential/protocol contents.
- [ ] Test claims match observed output; physical compatibility is labelled unverified until checked on relevant hardware.

## Required output

Provide Module API catalogue and contract tests. Include paths, target/build configuration, test commands and outputs, unresolved questions, residual risk, and the distinction between host evidence and hardware validation.

## Boundaries and failure handling

Follow firmware contribution guidance and applicable GPLv3/source-notice obligations. Treat external device interactions as authorization-sensitive; use controlled fixtures and approved lab setups. Do not create instructions for credential theft, unauthorized access-control bypass, covert operation, or cloning/replaying another person's access credentials. Prefer parser correctness, defensive bounds, explicit consent, and fail-safe no-op behavior. Stop when authorization or the hardware boundary is unclear.

## Trigger examples

- **Positive:** A maintainer needs to keep JavaScript native module names, exports, argument schemas, and API docs consistent..
- **Negative:** Exposing native device-control surfaces without capability review.
