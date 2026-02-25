# YoungTekkie Next (Milestone 0)

This is a clean-slate scaffold repo for YoungTekkie.

## What works
- Single JS entrypoint: `scripts/main.js`
- Global contract: `window.YTA`
- Versioned localStorage profiles (no server)
- Responsive header/nav + fixed header offset
- Home hero video wired (self-hosted)
- Favicons + mascot logo wired
- Debug page for quick sanity checks

## Run locally
Open `index.html` in a browser.
(For module imports, a local web server is recommended, but most modern browsers will load ES modules from file when using a simple static server.)

If you have Python installed:
- `python -m http.server 8000`
Then open `http://localhost:8000`

## Next milestones
See `CODEX.md`.
