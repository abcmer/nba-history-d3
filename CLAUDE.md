# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install        # Install dependencies
npm run dev        # Start dev server at http://localhost:3000
npm run build      # Production build
npm run lint       # Run ESLint
```

No test suite is configured.

## Architecture

Single-page Next.js 15 app (App Router) with a D3 v7 visualization.

**Data flow:**
- `public/data/teamData.json` — static JSON with NBA championship data (team names, years won, years runner-up) from 1947–2021
- `src/components/NbaViz.tsx` — `'use client'` component; fetches `teamData.json` in `useEffect`, instantiates a `Viz` class, and auto-plays through years via `setInterval`
- `src/app/page.tsx` — renders `<NbaViz />` inside `#container`

**Viz class** (`NbaViz.tsx`): Plain TypeScript class (not React) that owns all D3 state. Each year step calls `viz.initialize()` which tears down and rebuilds the full SVG (no incremental D3 update pattern). Key methods:
- `defineProperties()` — sets layout dimensions, adapts for mobile vs desktop
- `initialize()` — full render: filters data by year, builds SVG layers, bars, axes, year slider
- `filterOnYear()` / `filterForTitleTeams()` / `sortData()` — data pipeline before each render

**Styling:** `globals.css` (plain CSS, no Tailwind). Bar color: `#1D4289` (NBA navy). Axis/border accent: `#C40628` (NBA red).

**Key constraint:** The year slider range is hardcoded to `[1947, 2021]` in `createYearsToHorizontalPixelsScale()`, and autoplay stops at 2021 — even though `teamData.json` may contain data beyond that year. Updating the range requires changing both the scale domain and the interval stop condition in the `useEffect`.
