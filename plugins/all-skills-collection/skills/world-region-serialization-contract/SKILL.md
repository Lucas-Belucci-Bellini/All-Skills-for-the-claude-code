---
name: world-region-serialization-contract
description: Audit world-region serialization for versioning, partial writes, compression, checksums, and recovery from corrupt or interrupted saves.
---

# World Region Serialization Contract

## Goal

Keep large world saves forward-diagnosable and recoverable when a process stops during write, data formats evolve, or one region is corrupted.

## Inputs to inspect

Region/chunk schema, serializer/deserializer, index tables, compression, checksums, file-write strategy, migrations and save fixtures.

## Workflow

1. Document the binary/text layout, byte order, field widths, chunk addressing, compression framing, optional fields and format-version rules.
2. Trace write ordering for payload, index/offset tables, checksums and final commit marker; verify which bytes can be left behind after interruption.
3. Test truncated headers/payloads, invalid offsets, decompression limits, checksum mismatch, unknown fields, duplicate chunk keys and oversized counts.
4. Exercise schema migration and older saves with fixtures; ensure unsupported future versions fail safely without overwriting original data.
5. Define recovery behavior for a corrupt region (restore backup, isolate region, rebuild derived data or stop) and verify atomic replacement/fsync assumptions for supported filesystems.

## Validation checklist

- [ ] Length/offset arithmetic is checked before allocation, seeking or decompression.
- [ ] A partial write cannot masquerade as a fully committed region.
- [ ] Migrations preserve unknown or forward-compatible fields according to the schema policy.
- [ ] Corruption diagnostics name the file/region/chunk and never destroy the source save during attempted recovery.

## Required output

A serialization format contract, fault-injection test matrix, migration/compatibility report, and recovery decision table.

## Boundaries and failure handling

Do not promise recovery from arbitrary corruption; preserve original bytes and distinguish validated recovery from best-effort reconstruction.

When repository evidence is incomplete, label the gap explicitly and request only the missing information that changes the decision. Do not claim commands, benchmarks, tests, or runtime checks passed unless their outputs were observed.
