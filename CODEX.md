# CODEX.md — YoungTekkie Next Execution Plan

## Non‑negotiables
- Static hosting (GitHub Pages)
- Vanilla HTML/CSS/JS (no frameworks)
- One entrypoint (`scripts/main.js`)
- One global namespace (`window.YTA`)
- Versioned localStorage keys (migrations when needed)
- Mobile-first layouts
- No external CDN dependencies once Milestone 1 completes

## Milestone 0 (this repo)
Goal: predictable foundation.

Deliverables:
- Page skeletons + nav/footer
- Profiles CRUD + active profile selection
- Debug self-test checks
- Hero video + mascot + favicons integrated

Acceptance:
- All pages load without console errors
- Creating a profile works, persists on refresh, and can be selected/deleted
- Header never overlaps content

## Milestone 1 (Complete)
- Confirm zero external network calls (enforced via Debug scan)
- Prepare self-hosted fonts folder (/assets/fonts) without using any CDN
- Fonts remain system-default until you add WOFF2 files locally
- Prepare empty module folders for engines

## Milestone 2 — Typing Trainer
- JSON lesson files
- Typing engine (vanilla JS)
- Save results to learnerState.typingRecords
- Dashboard typing summary
- Auto-tick criteria support

## Milestone 3 — Maths Engine
- Question banks JSON
- Maths engine
- Save scores to learnerState.mathsScores
- Dashboard maths summary

## Milestone 4 — Python IDE
- Self-host Pyodide + CodeMirror bundle
- Run/clear, stdout capture, error rendering
- input() bridge
- Save code per lesson

## Milestone 5 — Block Coding Studio
- Self-host Blockly + Phaser
- Runtime + execution
- Lesson-gated blocks
- Save workspace XML per lesson

## Milestone 6 — PWA & Offline
- Service Worker + cache buckets
- Manifest
- Offline indicator
