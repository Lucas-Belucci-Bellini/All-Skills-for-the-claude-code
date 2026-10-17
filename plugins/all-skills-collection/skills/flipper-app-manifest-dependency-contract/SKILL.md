---
name: flipper-app-manifest-dependency-contract
description: "Apply deterministic firmware-engineering checks to validate manifests so entry points, assets, dependencies, and target requirements match firmware capabilities."
---

# Flipper App Manifest Dependency Contract

## Purpose

Validate manifests so entry points, assets, dependencies, and target requirements match firmware capabilities. This turns the concern into a reviewable contract for Flipper Zero firmware, where resource lifetime, constrained hardware, backward compatibility, and user-visible state must remain explicit.

## Required inputs

Inspect applications/**/application.fam and manifest processing. Gather authoritative API/format docs, the selected hardware target, adjacent tests, and the applicable firmware revision. Use host-side mocks or synthetic input fixtures unless a test explicitly requires approved hardware access.

## Workflow

1. Locate applications/**/application.fam and manifest processing; trace ownership, callers, resource acquisition, platform assumptions, and existing tests before changing behavior.
2. Specify the invariants for validate manifests so entry points, assets, dependencies, and target requirements match firmware capabilities., including state transitions, input bounds, ownership, cleanup, and unsupported behavior as appropriate.
3. Test Missing dependency, invalid app ID, unavailable API, duplicate registration with deterministic fixtures and error injection. Cover normal flow, boundaries, cancellation or teardown, corrupted input, and an unavailable dependency where relevant.
4. Deliver Manifest schema and dependency tests. Run the narrow test first, then relevant firmware/build regression checks; record actual commands, target, and outputs without claiming unobserved hardware behavior.

## Validation checklist

- [ ] The key invariant has a named owner and a repeatable assertion or review check.
- [ ] Boundary and failure/cleanup paths are covered beyond the happy path.
- [ ] Resource ownership, API version, and target compatibility are explicit.
- [ ] Tests use host mocks or synthetic fixtures where feasible and do not require unauthorized device interaction.
- [ ] Logs and fixtures exclude secrets, personal data, and unnecessary raw credential/protocol contents.
- [ ] Build/test claims match observed output; physical compatibility remains unverified until checked on the relevant hardware.

## Required output

Provide Manifest schema and dependency tests. Include repository paths, target/build configuration, test commands and actual results, residual risks, and the distinction between host-test evidence and physical-device validation.

## Boundaries and failure handling

Follow the firmware contribution guidance and GPLv3/source-notice obligations for reused code. Treat external device interaction as authorization-sensitive: use synthetic fixtures, official development equipment, and controlled test assets. Do not create workflows for credential theft, unauthorized access-control bypass, covert device operation, or replay/clone of another person's access credentials. For radio/HID/protocol features, prefer parser correctness, defensive bounds, consent checks, and safe no-op behavior. Stop when authorization or the hardware boundary is unclear.

## Trigger examples

- **Positive:** A maintainer needs to validate manifests so entry points, assets, dependencies, and target requirements match firmware capabilities..
- **Negative:** Declaring missing required services optional without fallback.
