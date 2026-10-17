---
name: flipper-target-board-variant-coverage
description: "Apply deterministic firmware-engineering checks to map board differences to the build matrix so target-specific code is not compiled for the wrong board."
---

# Flipper Target Board Variant Coverage

## Purpose

Map board differences to the build matrix so target-specific code is not compiled for the wrong board. This turns the concern into a reviewable contract for Flipper Zero firmware, where resource lifetime, constrained hardware, backward compatibility, and user-visible state must remain explicit.

## Required inputs

Inspect targets/f7, targets/f18, hardware target headers. Gather authoritative API/format docs, the selected hardware target, adjacent tests, and the applicable firmware revision. Use host-side mocks or synthetic input fixtures unless a test explicitly requires approved hardware access.

## Workflow

1. Locate targets/f7, targets/f18, hardware target headers; trace ownership, callers, resource acquisition, platform assumptions, and existing tests before changing behavior.
2. Specify the invariants for map board differences to the build matrix so target-specific code is not compiled for the wrong board., including state transitions, input bounds, ownership, cleanup, and unsupported behavior as appropriate.
3. Test Target matrix, optional peripheral absence, unknown target macro with deterministic fixtures and error injection. Cover normal flow, boundaries, cancellation or teardown, corrupted input, and an unavailable dependency where relevant.
4. Deliver Board-variant coverage table. Run the narrow test first, then relevant firmware/build regression checks; record actual commands, target, and outputs without claiming unobserved hardware behavior.

## Validation checklist

- [ ] The key invariant has a named owner and a repeatable assertion or review check.
- [ ] Boundary and failure/cleanup paths are covered beyond the happy path.
- [ ] Resource ownership, API version, and target compatibility are explicit.
- [ ] Tests use host mocks or synthetic fixtures where feasible and do not require unauthorized device interaction.
- [ ] Logs and fixtures exclude secrets, personal data, and unnecessary raw credential/protocol contents.
- [ ] Build/test claims match observed output; physical compatibility remains unverified until checked on the relevant hardware.

## Required output

Provide Board-variant coverage table. Include repository paths, target/build configuration, test commands and actual results, residual risks, and the distinction between host-test evidence and physical-device validation.

## Boundaries and failure handling

Follow the firmware contribution guidance and GPLv3/source-notice obligations for reused code. Treat external device interaction as authorization-sensitive: use synthetic fixtures, official development equipment, and controlled test assets. Do not create workflows for credential theft, unauthorized access-control bypass, covert device operation, or replay/clone of another person's access credentials. For radio/HID/protocol features, prefer parser correctness, defensive bounds, consent checks, and safe no-op behavior. Stop when authorization or the hardware boundary is unclear.

## Trigger examples

- **Positive:** A maintainer needs to map board differences to the build matrix so target-specific code is not compiled for the wrong board..
- **Negative:** Assuming similar MCU families have interchangeable pins or peripherals.
