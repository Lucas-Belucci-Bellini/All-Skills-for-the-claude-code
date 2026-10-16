# God's Eye View — skill inspiration and provenance review

- **Reviewed on:** 2026-10-16
- **Upstream project:** [bilawalsidhu/gods-eye-view](https://github.com/bilawalsidhu/gods-eye-view)
- **Purpose:** document the conceptual source for the 50-skill batch in the 550 → 600 milestone.

## What was reviewed

The upstream repository describes a browser-based 3D globe with public-data layers, coordinate/place search, terrain and camera transitions, live source adapters, real-time voice actions, scene serialization, replay/capture flows, and controls for source health and attribution. Its README, CODE-BOUNDARIES, APPLICATION, VOICE-OWNERSHIP, INFRASTRUCTURE-LAYERS, SECURITY, and DATA_SOURCES documents were consulted to identify workflow gaps worth expressing as independent reusable skills.

## Originality and scope

The 50 entries in the new geospatial-visualization, live-public-data-systems, realtime-voice-agents, scene-navigation-sharing, and public-data-ethics folders are newly authored operational workflows. They describe problem-solving methods, validation criteria, bounded failure modes, and handoff artifacts. The upstream application's implementation source files, source prose, datasets, video/images, and 3D assets were not copied into this skills repository.

## License boundary

The upstream repository includes an MIT license for its source code, but its license notice explicitly separates third-party data and visual assets from that grant. Bundled datasets, external provider feeds, and models can have distinct attribution, non-commercial, share-alike, API, or other terms. This batch does not redistribute those artifacts. Any future importing or bundling of upstream code/data/assets requires a separate provenance and license review; a repository-level MIT notice is not sufficient by itself.

## Privacy and responsible-use boundary

The new workflows focus on software correctness, source reliability, honest freshness/confidence labels, attribution, minimization, and privacy-preserving scene sharing. They reject workflows for identifying private people, building person-level camera trails, querying license plates, evading source quotas, or presenting estimates as verified observations.

## Validation still required

- Human semantic review against neighboring skills across the complete library.
- A clean Claude Code installation/discovery test.
- Human review of the new skills and the upstream terms for any future copied implementation or data.
- CI results on the pull request, reported separately from checks not exercised in this environment.
