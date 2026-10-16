---
name: flipper-spi-transaction-boundary-test
description: "Apply deterministic firmware-engineering checks to validate SPI transaction lifetime including chip select, transfer size, and error cleanup."
---

# Flipper SPI Transaction Boundary Test

## Purpose

Validate SPI transaction lifetime including chip select, transfer size, and error cleanup. This workflow creates a reviewable contract for Flipper Zero firmware with explicit resource lifetime, target capability, error recovery, and data boundaries.

## Required inputs

Inspect SPI HAL calls and device-driver wrappers. Gather authoritative API/format documentation, target/revision, adjacent tests, and expected behavior. Prefer host-side mocks and synthetic input unless an approved hardware test is necessary.

## Workflow

1. Trace SPI HAL calls and device-driver wrappers; record the owner, call sequence, platform assumptions, and existing regression coverage.
2. Turn validate spi transaction lifetime including chip select, transfer size, and error cleanup. into explicit invariants, including allowed values, ownership, timeout/cleanup behavior, and unsupported states.
3. Exercise Transmit-only transfer, short response, timeout, chip-select after failure with deterministic fixtures and error injection. Cover boundary cases, malformed input, cancellation, and failure recovery where applicable.
4. Produce Transaction boundary suite with mock traces. Run the narrow test then related firmware/build checks and record actual outputs; keep physical-device claims separate from host-test evidence.

## Validation checklist

- [ ] The invariant has a named owner and repeatable assertion or review check.
- [ ] Normal, boundary, and failure/cleanup paths are represented.
- [ ] Target, API version, resource ownership, and data limits are explicit.
- [ ] Tests prefer host mocks/synthetic fixtures and do not require unauthorized device interactions.
- [ ] Logs and fixtures exclude secrets and unnecessary raw credential/protocol contents.
- [ ] Test claims match observed output; physical compatibility is labelled unverified until checked on relevant hardware.

## Required output

Provide Transaction boundary suite with mock traces. Include repository paths, target/build configuration, test commands and actual outputs, unresolved questions, residual risk, and the distinction between host evidence and hardware validation.

## Boundaries and failure handling

Follow firmware contribution guidance and applicable GPLv3/source-notice obligations. Treat external device interactions as authorization-sensitive; use controlled fixtures and approved lab setups. Do not create instructions for credential theft, unauthorized access-control bypass, covert operation, or cloning/replaying another person's access credentials. Prefer parser correctness, defensive bounds, explicit consent, and fail-safe no-op behavior. Stop when authorization or the hardware boundary is unclear.

## Trigger examples

- **Positive:** A maintainer needs to validate SPI transaction lifetime including chip select, transfer size, and error cleanup..
- **Negative:** Reusing a failed transaction state without resetting chip select.
