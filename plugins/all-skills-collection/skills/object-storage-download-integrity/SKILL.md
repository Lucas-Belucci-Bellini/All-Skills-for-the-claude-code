---
name: object-storage-download-integrity
description: "Use when downloaded artifacts may be truncated, substituted, or corrupted before installation; not for multipart upload finalization."
---

# Object Storage Download Integrity

## Purpose

Use when downloaded artifacts may be truncated, substituted, or corrupted before installation; not for multipart upload finalization.

## Required inputs

Inputs: trusted digest/size metadata, object version, download/resume path, and test fixtures.

## Workflow

1. Obtain expected digest and length from trusted manifest/signature metadata independent of the download response.
2. Download to a temporary path and verify length/digest before atomic promotion.
3. Test interrupted/resumed transfer, range mismatch, object version changes, truncation, and digest failure.
4. Ensure consumers never extract partial files and temporary failures follow secure cleanup policy.

## Verification checklist

Checks: expected digest is independently trusted; length/checksum verified before use; resume detects object change and bad offsets; no unverified fallback.

## Required output

Output: download-integrity matrix, trusted digest source, failure results, and atomic-promotion policy.

## Boundaries and failure handling

Boundary: never execute failed-digest artifacts; a checksum helps only when the expected digest is trusted.

If evidence or permissions are missing, record the blocker and don't report unrun validation as passed.

## Trigger examples

- Positive: Positive: downloaded plugin archive has missing files despite HTTP success.
- Negative: Negative: checking multipart upload checksums.
