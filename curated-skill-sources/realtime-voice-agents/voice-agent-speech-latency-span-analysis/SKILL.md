---
name: voice-agent-speech-latency-span-analysis
description: "Trace voice turn latency across speech input, model response, tool execution, and spoken output using correlated spans."
---

# Voice Agent Speech Latency Span Analysis

## Purpose

Identify where latency is actually spent so optimization does not target the wrong component.

## Required inputs

Turn IDs, speech/tool lifecycle events, monotonic clock source, structured logs, and latency targets.

## Workflow

1. Define span boundaries for input finalization, model response, tool dispatch, result rendering, and speech completion.
2. Use one turn correlation ID and a monotonic timing source for durations, with wall-clock timestamps only for cross-system context.
3. Measure median and tail latency per stage under representative tool paths and interrupted turns.
4. Compare slow traces and ensure instrumentation omits transcripts, tokens, and precise user-location details unless strictly necessary.

## Validation checklist

- [ ] Every emitted span can be tied to one turn without reusing IDs across sessions.
- [ ] Missing events produce incomplete-trace status rather than fabricated zero duration.
- [ ] Aggregates separate model latency from provider/tool latency.
- [ ] High-cardinality user content is not used as a metric label.

## Required output

A span taxonomy, latency breakdown table, and prioritized bottlenecks backed by trace evidence.

## Boundaries and failure handling

Avoid logging full audio, transcripts, or unnecessary pointer coordinates as part of performance instrumentation.

## Trigger examples

- **Positive:** Voice replies feel slow and logs only record total turn duration.
- **Negative:** A request to record every conversation verbatim to improve latency analysis.
