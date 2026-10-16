---
name: object-storage-upload-integrity
description: "Use when multipart uploads need verification of complete bytes and checksums before finalization; not for asset bundle size budgets."
---

# Object Storage Upload Integrity

## Purpose

Detect truncated or mismatched uploads before consumers trust an object.

## Required inputs

Storage API, upload mode, expected digest/size, multipart rules, retry behavior, metadata, test objects.

## Workflow

1. Define expected length and checksum, including provider-specific multipart checksum semantics.
2. Test interrupted parts, retries, out-of-order completion, duplicate finalization, mismatch, and abandoned sessions.
3. Verify consumers see the object only after integrity verification and finalization.
4. Review metadata/content type separately from byte integrity; ensure failures are retryable or safely aborted.

## Verification checklist

- [ ] Final length/checksum matches trusted expectations.
- [ ] Provider ETags are not assumed to be ordinary content hashes without proof.
- [ ] Partial uploads have cleanup policy.
- [ ] Unverified staging objects cannot appear as committed artifacts.

## Required output

An upload state matrix, integrity plan, fault results, and cleanup policy.

## Boundaries and failure handling

Use test buckets; protect signed URLs and credentials in logs and issue comments.

When evidence, permissions, or environment details are missing, stop at the supported analysis, record the missing prerequisite, and do not report unexecuted validation as passing.

## Trigger examples

- **Positive:** Multipart uploads sometimes finalize with fewer bytes than expected.
- **Negative:** Checking whether an asset bundle is too large.
