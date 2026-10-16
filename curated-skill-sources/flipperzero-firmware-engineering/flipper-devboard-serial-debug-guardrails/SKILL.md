---
name: flipper-devboard-serial-debug-guardrails
description: "Apply deterministic firmware-engineering checks to keep serial diagnostics bounded and explicit about test mode, device identity, and sensitive output."
---

# Flipper Devboard Serial Debug Guardrails

## Purpose

Keep serial diagnostics bounded and explicit about test mode, device identity, and sensitive output. This workflow creates a reviewable contract for Flipper Zero firmware with explicit resource lifetime, target capability, error recovery, and data boundaries.

## Required inputs

Inspect Devboard serial connection and debug commands. Gather authoritative API/format documentation, target/revision, adjacent tests, and expected behavior. Prefer host-side mocks and synthetic input unless an approved hardware test is necessary.

## Workflow

1. Trace Devboard serial connection and debug commands; record the owner, call sequence, platform assumptions, and existing regression coverage.
2. Turn keep serial diagnostics bounded and explicit about test mode, device identity, and sensitive output. into explicit invariants, including allowed values, ownership, timeout/cleanup behavior, and unsupported states.
3. Exercise Unknown board, missing port, noisy stream, disconnect, fake secret output with deterministic fixtures and error injection. Cover boundary cases, malformed input, cancellation, and failure recovery where applicable.
4. Produce Safe debug checklist and serial parser tests. Run the narrow test then related firmware/build checks and record actual outputs; keep physical-device claims separate from host-test evidence.

## Validation checklist

- [ ] The invariant has a named owner and repeatable assertion or review check.
- [ ] Normal, boundary, and failure/cleanup paths are represented.
- [ ] Target, API version, resource ownership, and data limits are explicit.
- [ ] Tests prefer host mocks/synthetic fixtures and do not require unauthorized device interactions.
- [ ] Logs and fixtures exclude secrets and unnecessary raw credential/protocol contents.
- [ ] Test claims match observed output; physical compatibility is labelled unverified until checked on relevant hardware.

## Required output

Provide Safe debug checklist and serial parser tests. Include repository paths, target/build configuration, test commands and actual outputs, unresolved questions, residual risk, and the distinction between host evidence and hardware validation.

## Boundaries and failure handling

Follow firmware contribution guidance and applicable GPLv3/source-notice obligations. Treat external device interactions as authorization-sensitive; use controlled fixtures and approved lab setups. Do not create instructions for credential theft, unauthorized access-control bypass, covert operation, or cloning/replaying another person's access credentials. Prefer parser correctness, defensive bounds, explicit consent, and fail-safe no-op behavior. Stop when authorization or the hardware boundary is unclear.

## Trigger examples

- **Positive:** A maintainer needs to keep serial diagnostics bounded and explicit about test mode, device identity, and sensitive output..
- **Negative:** Capturing credentials or controlling an unintended serial device.
