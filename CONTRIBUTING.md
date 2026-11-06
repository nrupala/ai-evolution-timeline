# Contributing to ai-evolution-timeline

## PR-flow discipline

Direct pushes to `main` are retired. Every change lands through this flow:

1. Open a **draft PR** from a feature branch.
2. **Owner merges** — the repository owner merges; nobody merges their own PR.
   (The automated test suite — `node --test tests/timeline.test.mjs`, run by
   CI on every push and pull request — must be green, alongside the version
   guard on release tags plus owner review.)
3. Every PR adds a **CHANGELOG entry under `## [Unreleased]`** and bumps semver:
   patch = fix/chore, minor = feature, major = breaking.
4. Merge commits reference the PR number.

## Versioning and releases

This repo follows the standard app-versioning flow — see `docs/VERSIONING.md`:
`VERSION` is the single source of truth; bump with
`node scripts/bump-version.mjs <X.Y.Z>`; cut a release by tagging `v<X.Y.Z>`.
CI fails the build if the tag does not match `VERSION`.

## License

By contributing, you agree your contributions are offered under the same terms
as the repository's declared license (Apache-2.0, see `LICENSE`).
