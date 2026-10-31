---
name: nexora-windows-portable-client-package-closure
description: "Audits whether the NEXORA Windows x64 portable client archive is self-contained, relocatable, writable for its save workflow, and runnable outside the source checkout."
---

# NEXORA Windows portable client package closure

## Purpose

Use this workflow when preparing, reviewing, or diagnosing the NEXORA Windows x64 portable graphical-client ZIP. It verifies the boundary between a release archive and the machine that extracts it: executable dependencies, packaged resources, launcher path behavior, user-save persistence, and clean-machine startup.

This skill is specific to the portable Windows client package. It complements, but does not replace, general release-artifact integrity checks, cross-platform smoke matrices, save-format compatibility tests, or real-hardware graphics validation.

## Evidence baseline and status vocabulary

Inspect the current NEXORA release workflow, release guide, launcher, client CLI, content/resource loading paths, save implementation, and accepted ADRs before making claims. The documented package currently intends to include `nexora-client.exe`, `RUN-NEXORA.bat`, `README-WINDOWS.txt`, CLI tools, `content/`, README, and license files. The launcher changes to its own directory and starts the client with `--world saves\\main.nxsv`.

Treat that as a documented packaging design until the exact workflow has run and the exact archive has been tested. Distinguish:
- **Specified:** present in workflow/docs or an accepted architecture decision.
- **Built:** produced from a named commit and target.
- **Inspected:** archive contents and executable dependencies were examined.
- **Executed:** the packaged executable was launched from the extracted archive.
- **Verified on clean Windows:** executed on a clean Windows 10/11 x64 machine outside the development checkout.
- **Not tested / blocked:** no evidence exists or a required environment is unavailable.

Never convert a specified or compiled package into a claim of clean-machine compatibility.

## Required inputs

- Exact source commit, release tag or workflow run, and Windows x64 artifact.
- Current `.github/workflows/release.yml`, `docs/RELEASING.md`, launcher and Windows quick-start text.
- Current client CLI arguments, resource/content lookup rules, save location semantics, and relevant persistence ADRs.
- Archive checksum, file listing, executable metadata, and build logs.
- Clean Windows 10/11 x64 test machine or disposable VM, standard-user account, graphics adapter/driver details, and test results.
- Existing world fixture or a newly generated disposable world; never use the only copy of valuable user data.

## Workflow

1. **Pin the candidate.** Record repository, full commit SHA, tag or workflow run ID, target triple, toolchain, artifact name, archive SHA-256, and whether the workflow ran from a tag or manual dispatch. Reject ambiguous or manually assembled binaries.
2. **Derive the package allowlist.** Read the staging commands and launcher from the candidate commit. Enumerate every expected executable, launcher, instruction, content/resource directory, README, license, and checksum. Do not infer that a file is present merely because documentation names it.
3. **Inspect archive closure.** List the actual ZIP entries and compare them to the allowlist. Detect missing files, unexpected development files, duplicate names under Windows case-insensitive comparison, absolute paths, parent-directory traversal, broken links, and path components that Windows cannot represent safely.
4. **Inspect executable dependencies.** Examine the packaged PE binaries and their direct/dynamic dependencies using tools available in the build or audit environment. Separate Windows system components from non-system runtime libraries. Confirm every non-system dependency is either bundled under an intentional loading rule or explicitly declared as a prerequisite; do not assume Rust or Git is needed, and do not assume the absence of a dependency from a static import table proves runtime independence.
5. **Trace runtime resource resolution.** Follow the client startup path and determine which files it actually reads at launch and during world creation. Check working-directory assumptions, executable-relative paths, content/resource roots, shader or other runtime assets, and behavior when optional content is missing. Confirm the archive contains the required closure without copying files from the checkout during the test.
6. **Audit launcher and save paths.** Verify the batch file quotes paths, changes drive and directory to its own location, propagates the client exit status, and creates the intended save directory. Test extraction into a path containing spaces and non-ASCII characters. Determine whether the package directory must be writable; if saves are intentionally stored beside the executable, document that limitation and test a standard-user writable location rather than silently redirecting saves elsewhere.
7. **Run the extracted package in isolation.** Extract the complete ZIP (never launch from the ZIP preview) to a clean location outside the repository. Use a standard Windows account without Rust, Cargo, Git, Visual Studio Build Tools, or development environment variables. Disconnect or rename the source checkout where practical so accidental file resolution cannot mask missing package contents.
8. **Exercise the user journey.** Launch through the documented entry point, create a disposable world, move and cross a streamed boundary where the candidate supports it, perform a permitted edit, exit normally, relaunch, and verify world plus player state. Confirm the save appears only in the documented location and that a second launch does not overwrite or silently replace it.
9. **Exercise failure and relocation cases.** Test missing/corrupt executable or required resource, absent graphics adapter/driver, read-only extraction directory, interrupted first launch, and moving the extracted folder while preserving the save folder. Record controlled failures and user-facing recovery instructions; never classify an environment prerequisite as a package defect without evidence.
10. **Publish a bounded result.** Produce a package manifest, dependency disposition, clean-machine matrix, save round-trip result, known limitations, and GO/HOLD decision tied to the exact archive hash. Keep Windows 10 and Windows 11 results separate when only one was tested.

## Validation checklist

- [ ] Archive SHA-256 and source commit are recorded and match the candidate release evidence.
- [ ] Actual ZIP entries match the allowlist; no missing runtime file, checkout path, unsafe archive path, or unexpected development artifact remains.
- [ ] Every non-system executable dependency has an explicit bundled-or-prerequisite disposition.
- [ ] Client resource lookup succeeds without access to the source checkout.
- [ ] Launcher works from a path with spaces and non-ASCII characters and starts from its own package directory.
- [ ] Save location, directory writability requirement, backup behavior, and relocation behavior are explicit.
- [ ] Create, edit, clean exit, relaunch, and world/player persistence pass on the extracted package.
- [ ] At least one clean Windows 10/11 x64 environment is identified precisely; untested OS versions remain unclaimed.
- [ ] GPU/driver prerequisites and graphics failures are separated from missing package dependencies.
- [ ] The report names exact tested artifact hash, OS build, architecture, GPU/driver, test account privilege, and skipped checks.

## Required output

Return:
- Candidate identity and archive checksum.
- Expected-versus-actual archive inventory.
- Dependency table with each dependency classified as Windows system, bundled, prerequisite, or unresolved.
- Resource and working-directory trace.
- Launcher/save-path results, including path-with-spaces and writable/read-only cases.
- Clean-machine OS/GPU matrix and end-to-end save round-trip evidence.
- GO, HOLD, or FAIL decision, known limitations, and exact evidence still required.

## Boundaries and failure handling

A successful `cargo build`, CI compile, archive creation, checksum, or developer-machine launch is not proof that the portable ZIP runs on a clean Windows machine. A checksum proves byte identity against a known digest, not publisher authenticity or runtime completeness.

Do not add files to the game repository from this skill. Do not alter release workflow, launcher, save semantics, or runtime code unless the task explicitly authorizes a separate NEXORA implementation change. Do not claim an installer exists: this workflow validates the portable ZIP only. Never overwrite a user's existing world during fixtures; copy it first and use disposable test data.

If the release workflow has not run from the default branch, or no exact Windows artifact is available, stop at source/workflow review and report **NOT TESTED** for archive and clean-machine checks. If the clean machine is unavailable, keep the result at **HOLD**, not GO.

## Trigger examples

- **Positive:** Review the NEXORA Windows x64 ZIP before sharing it with Alpha testers and prove it runs outside the development checkout.
- **Positive:** Diagnose a portable client that launches from the repository but fails after extraction to another Windows folder.
- **Positive:** Verify the batch launcher, runtime dependencies, content closure, and world/player save persistence for one exact release artifact.
- **Negative:** A generic cross-platform compile matrix with no portable Windows archive.
- **Negative:** Implementing a new game subsystem, changing save format, or building an installer.
- **Negative:** Claiming public Windows support from a successful compile or an untested release workflow.
