# Skill inspiration and provenance review: OSIRIS, AERIS-10, and Flipper Zero

- **Reviewed on:** 2026-10-16
- **Purpose:** document the conceptual sources for the 250-skill expansion from 600 to 850.

## Repositories reviewed

- [OSIRIS](https://github.com/simplifaisoul/osiris): README, SECURITY policy, Next.js/TypeScript API routes, map/data adapters, prediction-run components, and tool/test layout.
- [PLFM_RADAR / AERIS-10](https://github.com/NawfalMotii79/PLFM_RADAR): README, CONTRIBUTING, Licence, schematics/production exports, simulation scripts, STM32 libraries/tests, FPGA RTL/cosimulation assets, and Python GUI utilities.
- [Flipper Zero Firmware](https://github.com/flipperdevices/flipperzero-firmware): ReadMe.md, CONTRIBUTING.md, LICENSE, build/test workflows, applications, Furi, libraries, targets, and file-format documentation.

## Originality

The new entries under curated-skill-sources/osiris-intelligence-platform, aeris-radar-engineering, and flipperzero-firmware-engineering are original operational workflows. They express validation plans, ownership rules, test fixtures, safe failure behavior, output artifacts, and review boundaries. This change does not copy implementation source, schematics, PCB/Gerber designs, firmware binaries, third-party data, screenshots, assets, or real credentials/protocol dumps from those projects.

## License distinctions and redistribution boundary

- **OSIRIS:** the root source repository declares MIT. Public data feeds, camera inventories, media, and provider APIs can still have separate provider-specific terms, attribution, quotas, and privacy implications. Those external materials are not imported here.
- **PLFM_RADAR / AERIS-10:** the README states a split license: software/firmware under MIT and hardware design documentation under CERN Open Hardware Licence Version 2 - Permissive (CERN-OHL-P), with the full hardware license named Licence. This batch contains workflow writing only; it does not redistribute schematics, PCB layouts, BOM/CPL, Gerbers, or CAD files.
- **Flipper Zero Firmware:** the root LICENSE is GNU GPL version 3. Submodules, libraries, bundled assets, and third-party components can carry additional notices or terms. This batch does not copy firmware source, assets, or protocol/credential samples.

These notes record the repositories' own notices; they are not legal advice. Any future copying, bundling, or redistribution of source code, hardware files, media, datasets, or compiled assets needs a separate review of the exact material and its license terms.

## Responsible-use boundary

The OSIRIS workflows focus on defensive authorized scope, public-source provenance, false-positive handling, source attribution, and clear evidence versus inference. AERIS-10 workflows focus on synthetic simulations, interface correctness, firmware fault handling, hardware safety, regulatory preflight, and limits on simulation claims. Flipper workflows focus on firmware quality, parser/input bounds, consent checks, protocol-format correctness, authorized test fixtures, safe no-op behavior, and recovery. They intentionally do not provide instructions for unauthorized scanning, targeting people, bypassing access controls, stealing credentials, or cloning/replaying another person's access credentials.

## Validation still required

- CI results from the 850 branch; this document does not assert tests passed before a run is observed.
- Clean Claude Code installation/discovery in a fresh profile.
- Broad human semantic-overlap review against the full 850-skill catalog.
- Human review of new skill scopes and any future change that imports actual upstream implementation or artifacts.