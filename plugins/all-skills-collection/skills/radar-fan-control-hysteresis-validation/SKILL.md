---
name: radar-fan-control-hysteresis-validation
description: "Apply deterministic engineering checks to test cooling control hysteresis and fail-safe response to missing temperature telemetry."
---

# Radar Fan Control Hysteresis Validation

## Purpose

Test cooling control hysteresis and fail-safe response to missing temperature telemetry. This workflow turns the concern into a traceable engineering contract for the AERIS-10 project, while keeping simulations, software behavior, and physical measurements clearly distinguished.

## Required inputs

Inspect Thermistor conversion, temperature aggregation, and fan GPIO outputs. Gather the authoritative interface/schema, the selected board or bitstream revision, existing tests, and the expected result. Prefer synthetic input vectors, simulator outputs, host mocks, and de-energized design inspection.

## Workflow

1. Trace Thermistor conversion, temperature aggregation, and fan GPIO outputs and record source paths, board/design revision, input/output ownership, and the existing validation entry points.
2. Define pass/fail invariants for test cooling control hysteresis and fail-safe response to missing temperature telemetry.; explicitly document units, widths, timing assumptions, safe defaults, and unsupported states where relevant.
3. Exercise Threshold crossing, noisy samples, maximum channel, missing sensor, and rearm with deterministic simulation or mocked hardware. Include normal, boundary, malformed, reset/cancellation, and failure cases without relying on uncontrolled physical targets.
4. Produce A fan-control truth table with boundary fixtures. Run the narrow test and relevant regression suite, capture actual outputs, and separate verified findings from assumptions requiring qualified hardware review.

## Validation checklist

- [ ] The requirement is represented as an explicit, repeatable assertion or review criterion.
- [ ] Boundary values and at least one injected failure are included.
- [ ] Units, revision, data origin, and interface timing are stated where they change interpretation.
- [ ] Test results cite the exact command/tool run and repository revision.
- [ ] Simulation/mock evidence is not misrepresented as hardware measurement or certification.
- [ ] RF, power, motion, or external-interface tests stop when the approved safety envelope is unknown or violated.

## Required output

Deliver A fan-control truth table with boundary fixtures. Attach the paths reviewed, fixture or simulation identifiers, test commands and observed results, unresolved safety/compliance questions, and a clear distinction between code-level evidence and physical verification still required.

## Boundaries and failure handling

Use synthetic inputs, host tests, simulation, or de-energized inspection wherever possible. Physical RF or powered hardware work requires qualified supervision, an approved lab procedure, regional compliance review, and functioning safety/thermal interlocks. Do not bypass an interlock, increase transmitter power or range as an objective, or turn signal-processing workflows into instructions for targeting people. If the design revision, emissions permission, termination, cooling, or measurement setup is uncertain, stop and document the blocker.

## Trigger examples

- **Positive:** A maintainer needs to test cooling control hysteresis and fail-safe response to missing temperature telemetry..
- **Negative:** Disabling cooling or suppressing an over-temperature alarm to keep a test running.
