# Test plan — ai-evolution-timeline

## Scope

The static timeline app: the event dataset in `data.js` (`window.TIMELINE_DATA`)
and the page shell in `index.html` that renders it with Plotly. Out of scope:
the Plotly CDN library itself and the GitHub Pages hosting layer.

## Suites

| Suite | Covers | Run it | Runs in CI |
|---|---|---|---|
| Node built-in tests (`tests/timeline.test.mjs`) | Dataset loads and is non-empty; every event complete (id, year, category, description, citations); ids unique; years chronological; `index.html` loads `data.js` and its app-version meta matches the `VERSION` file | `node --test tests/timeline.test.mjs` | Yes — CI workflow (`.github/workflows/ci.yml`) |

## CI gates

- Full suite green on every push and pull request to `main`.
- CodeQL (javascript-typescript) runs on push, pull request, and weekly.
- Version guard: a release tag must match the `VERSION` file
  (`.github/workflows/app-versioning.yml`).

## Cadence

- Every pull request: CI suite + CodeQL.
- Weekly: CodeQL scheduled run.
- Every release candidate: the release-readiness run (checker + evidence reads),
  per the house Release-Readiness Standard.

## Coverage bar

No numeric floor; new functionality lands with tests per CONTRIBUTING.
