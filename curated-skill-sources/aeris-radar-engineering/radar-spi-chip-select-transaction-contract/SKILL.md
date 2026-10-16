---
name: radar-spi-chip-select-transaction-contract
description: "Apply deterministic engineering checks to verify chip-select and transfer boundaries for each SPI driver, including transmit-only cases and failures."
---

# Radar SPI Chip Select Transaction Contract

## Purpose

Verify chip-select and transfer boundaries for each SPI driver, including transmit-only cases and failures. This workflow turns the concern into a traceable engineering contract for the AERIS-10 project, while keeping simulations, software behavior, and physical measurements clearly distinguished.

## Required inputs

Inspect SPI platform layer and synthesizer/phase-shifter drivers. Gather the authoritative interface/schema, the selected board or bitstream revision, existing tests, and the expected result. Prefer synthetic input vectors, simulator outputs, host mocks, and de-energized design inspection.

## Workflow

1. Trace SPI platform layer and synthesizer/phase-shifter drivers and record source paths, board/design revision, input/output ownership, and the existing validation entry points.
2. Define pass/fail invariants for verify chip-select and transfer boundaries for each spi driver, including transmit-only cases and failures.; explicitly document units, widths, timing assumptions, safe defaults, and unsupported states where relevant.
3. Exercise Transmit-only transfer, timeout, short write, retry, and chip-select state after error with deterministic simulation or mocked hardware. Include normal, boundary, malformed, reset/cancellation, and failure cases without relying on uncontrolled physical targets.
4. Produce A transaction-state test suite with mocked HAL evidence. Run the narrow test and relevant regression suite, capture actual outputs, and separate verified findings from assumptions requiring qualified hardware review.

## Validation checklist

- [ ] The requirement is represented as an explicit, repeatable assertion or review criterion.
- [ ] Boundary values and at least one injected failure are included.
- [ ] Units, revision, data origin, and interface timing are stated where they change interpretation.
- [ ] Test results cite the exact command/tool run and repository revision.
- [ ] Simulation/mock evidence is not misrepresented as hardware measurement or certification.
- [ ] RF, power, motion, or external-interface tests stop when the approved safety envelope is unknown or violated.

## Required output

Deliver A transaction-state test suite with mocked HAL evidence. Attach the paths reviewed, fixture or simulation identifiers, test commands and observed results, unresolved safety/compliance questions, and a clear distinction between code-level evidence and physical verification still required.

## Boundaries and failure handling

Use synthetic inputs, host tests, simulation, or de-energized inspection wherever possible. Physical RF or powered hardware work requires qualified supervision, an approved lab procedure, regional compliance review, and functioning safety/thermal interlocks. Do not bypass an interlock, increase transmitter power or range as an objective, or turn signal-processing workflows into instructions for targeting people. If the design revision, emissions permission, termination, cooling, or measurement setup is uncertain, stop and document the blocker.

## Trigger examples

- **Positive:** A maintainer needs to verify chip-select and transfer boundaries for each SPI driver, including transmit-only cases and failures..
- **Negative:** Leaving chip select asserted or changing the next transaction after an error.
