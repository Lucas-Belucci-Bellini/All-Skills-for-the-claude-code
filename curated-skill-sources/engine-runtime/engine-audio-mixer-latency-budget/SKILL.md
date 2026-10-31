---
name: engine-audio-mixer-latency-budget
description: Audit an engine audio mixer for latency budgets, buffer scheduling, voice limits, underruns, and safe real-time thread behavior.
---

# Engine Audio Mixer Latency Budget

## Purpose

Keep audio responsive and stable by making buffering, voice allocation, thread boundaries, and overload behavior measurable.

## Required inputs

Audio backend/API, sample rate, callback period, buffer sizes, mixer graph, voice allocation policy, asset decode path, platform matrix, and audio diagnostics.

## Workflow

1. Define target end-to-end latency and identify each contributor: input event, command queue, mixer block, backend buffer, and device output.
2. Trace the audio callback and verify it avoids blocking I/O, unbounded allocation, mutex waits, and unpredictable work where the backend requires real-time safety.
3. Bound voice count and command queues; specify priority, stealing, and degradation rules for overload rather than allowing uncontrolled growth.
4. Check asset decoding and streaming so slow disk or decompression work cannot block the real-time mixer thread.
5. Measure callback duration distribution, underrun/dropout counts, queue depth, voice count, and end-to-end event-to-audio latency on supported targets.
6. Test CPU contention, bursty sound events, device changes, suspend/resume, sample-rate changes, and missing or corrupt assets.
7. Use captured metrics to tune buffer sizes per platform, documenting the latency-versus-stability tradeoff and fallback settings.

## Validation checklist

- [ ] Real-time callback work is bounded and avoids prohibited blocking operations.
- [ ] Voice and command queues have explicit capacity and overload policies.
- [ ] Latency and underrun measurements identify hardware, backend, sample rate, and buffer settings.
- [ ] Device lifecycle and overload scenarios have reproducible tests.

## Required output

An audio-thread safety audit, latency budget table, voice/queue policy, platform test matrix, and measured dropout report.

## Boundaries and failure handling

Do not claim imperceptible latency from buffer size alone. Distinguish configured theoretical latency from measured end-to-end behavior on actual devices.

## Trigger examples

- **Positive:** The task concerns engine audio mixing, callback safety, buffer sizing, voice saturation, or audio underruns.
- **Negative:** The task only concerns composing music or editing sound assets outside the engine runtime.
