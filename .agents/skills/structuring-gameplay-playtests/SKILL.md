---
name: structuring-gameplay-playtests
description: "Plans focused playtests that reveal player understanding, strategy, friction, and failure points without leading participants. Use when a playable build exists and the team needs actionable evidence for gameplay changes."
---

# Structuring Gameplay Playtests

## Goal
Produce actionable observations about player behavior while minimizing moderator influence and separating evidence from interpretation.

## Procedure
1. State the decision the playtest must inform. Do not run a session without a concrete question.
2. Select tasks that exercise the relevant mechanic and define what observable behavior would answer the question.
3. Recruit participants whose experience is appropriate to the question; document sample limitations instead of implying universal results.
4. Prepare a stable build, reset procedure, known-issue list, and a way to capture notes or telemetry without collecting unnecessary personal data.
5. Give neutral instructions. Explain controls and safety boundaries, but do not reveal the intended strategy or tell players what they should notice.
6. Observe silently where possible. Record timestamps, player actions, visible game state, hesitation, repeated errors, and direct quotes separately from interpretation.
7. If a participant is blocked, use a predefined neutral intervention and mark the observation as moderated.
8. After play, ask open questions first (for example, what they expected and what surprised them). Avoid questions that suggest the desired answer.
9. Group observations by repeated pattern and severity. Distinguish a single anecdote from a recurring issue.
10. Convert the highest-impact pattern into a testable change, then define a follow-up check that could prove the change did not help.

## Session record
- Research question and decision owner
- Build identifier and environment
- Participant context and limitations
- Tasks and neutral prompts
- Timestamped observations
- Direct quotes, kept distinct from analysis
- Findings with confidence level
- Proposed change and follow-up validation

## Acceptance criteria
- Findings are traceable to observed behavior or clearly labeled participant reports.
- Moderator hints are documented.
- Recommendations target a specific issue and include a way to verify impact.
- Privacy-sensitive data is not collected unless necessary, consented to, and appropriately protected.

## Avoid
- Asking leading questions such as “Was that mechanic fun?”
- Treating stated preference as proof of actual behavior.
- Generalizing from a tiny or unrepresentative sample without qualification.
- Changing the build mid-session without recording the version change.
