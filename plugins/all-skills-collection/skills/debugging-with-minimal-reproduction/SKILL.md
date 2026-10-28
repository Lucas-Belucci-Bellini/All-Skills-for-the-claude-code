---
name: debugging-with-minimal-reproduction
description: "Finds the cause of a software defect by producing a minimal reproducible failure and testing competing hypotheses. Use when a bug report is vague, intermittent, environment-dependent, or difficult to localize."
---

# Debugging with Minimal Reproduction

## Goal
Move from a symptom to a falsifiable cause with the smallest reliable reproduction.

## Workflow
1. **Capture the symptom.** Record expected versus actual behavior, exact error text, environment, version, input, and the first known failing step.
2. **Preserve evidence.** Reproduce before editing where feasible. Save relevant logs and inputs while removing credentials and personal data.
3. **Reduce variables.** Remove unrelated steps, data, dependencies, and configuration one at a time. Keep the failure intact after each reduction.
4. **Build hypotheses.** Write down plausible causes and a prediction that would distinguish each one. Prefer a direct test over speculative code changes.
5. **Instrument the boundary.** Observe inputs, outputs, state transitions, and error paths around the suspected component. Avoid logging secrets or flooding production systems.
6. **Test one hypothesis at a time.** Change one variable, compare with the baseline, and record whether the result supports or weakens the hypothesis.
7. **Identify the first divergence.** Trace the earliest point where observed behavior differs from the contract, not merely the later crash or visible symptom.
8. **Verify the repair.** Add a regression test based on the minimized reproduction, apply the smallest fix, and run relevant negative and neighboring cases.
9. **Document uncertainty.** If the cause cannot be established, report the strongest evidence, rejected hypotheses, and next discriminating experiment.

## Deliverable
- Minimal reproduction steps or fixture.
- Expected and observed result.
- Root cause with supporting evidence, or an explicit unresolved status.
- Regression coverage and checks actually executed.

## Acceptance criteria
- Another developer can reproduce the failure from the written steps or fixture.
- The diagnosis explains the observed failure rather than merely correlating with it.
- The regression test fails before the fix and passes after it when that comparison can be run.
- Environment limitations and unverified claims are explicit.

## Failure modes and guardrails
- Do not change several unrelated variables at once.
- Do not treat a disappearing intermittent failure as proof of a fix.
- Do not expose credentials, personal data, or production customer payloads in logs.
- Do not suppress exceptions or loosen assertions to hide the symptom.
- Avoid expensive production experiments when a local or isolated reproduction is sufficient.
