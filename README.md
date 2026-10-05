# AI Evolution Timeline

An interactive timeline visualization of AI evolution — from Transformers (2017)
through LLMs to agentic AI (2024–2025+) — built as a shareable static website.
Clicking an event reveals architecture details and source citations.

## Scope

Key milestones covered: multi-agent systems, small language models (SLMs), AI
orchestration, and agent browsers — see `data.js` (`window.TIMELINE_DATA`) for
the event dataset.

## Quickstart

No build step — this is a static site. Serve it locally:

```bash
python3 -m http.server 8080
# open http://localhost:8080
```

Opening `index.html` directly also works, but a local server is preferred so
relative assets resolve.

## How it works

- `index.html` — page shell; renders the timeline with Plotly and shows event
  details in the sidebar.
- `data.js` — the event dataset: year, category (`architecture` | `model` |
  `agent` | `product`), details, and citations.
- Plotly is loaded from CDN (`plotly-2.28.0.min.js`); the page needs network
  access for it to render.

## Versioning

This repo follows the standard app-versioning flow — see `docs/VERSIONING.md`.
`VERSION` is the single source of truth; author-time bump with
`node scripts/bump-version.mjs <X.Y.Z>` stamps the `<meta name="app-version">`
marker in `index.html` and promotes the CHANGELOG `Unreleased` section.
Releases are cut by tagging `v<X.Y.Z>` (CI version guard + auto release notes).

## Contributing

See `CONTRIBUTING.md`. Draft PR → owner merges; no direct pushes to `main`.

## License

The license for this repository is not yet declared — flagged for the owner's
call (no LICENSE file ships; nothing here relicenses anything).
