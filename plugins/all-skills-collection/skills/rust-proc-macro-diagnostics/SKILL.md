---
name: rust-proc-macro-diagnostics
description: Improve Rust procedural macro diagnostics with span-aware errors, invalid-input tests, and stable generated-code contracts.
---

# Rust Proc Macro Diagnostics

## Goal

Make macro failures explain the user's source error rather than exposing opaque compiler failures deep inside generated code.

## Inputs to inspect

Proc-macro entrypoints, parsed syntax, generated token streams, trybuild or equivalent tests, and documented macro syntax.

## Workflow

1. Inventory accepted syntax and identify which tokens, attributes, types, or combinations are required or rejected.
2. Attach diagnostics to the most relevant source spans and produce actionable messages for missing, conflicting, or unsupported inputs.
3. Separate parser validation from code generation so malformed syntax fails early and valid syntax produces a predictable expansion.
4. Add compile-pass fixtures for supported syntax and compile-fail fixtures for each documented error; include renamed dependencies and module paths where relevant.
5. Inspect expansion output or use expansion tooling where available to detect accidental API dependencies, unstable generated names, and unnecessary trait bounds.

## Validation checklist

- [ ] Expected invalid input fails with a targeted diagnostic rather than an unrelated type error.
- [ ] Pass/fail fixtures cover both common syntax and boundary cases.
- [ ] Generated code avoids surprising visibility, hygiene, and path-resolution assumptions.
- [ ] Diagnostic wording identifies the problem and a concrete correction when possible.
- [ ] Changes to generated output are treated as API compatibility changes for macro users.

## Required output

Deliver a syntax/diagnostic matrix, expansion notes, compile-pass/fail fixtures, and compatibility review.

## Boundaries and failure handling

Do not rely on exact compiler wording across every Rust version; assert meaningful diagnostic content without overfitting unstable internals.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
