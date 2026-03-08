# Next.js Migration

This project has been migrated to Next.js.

The new Next.js project is located at: ../nba-history-d3-nextjs

## Migration notes
- Node version: 20 (via nvm)
- Next.js version: 16.x (App Router)
- Original framework: Plain HTML/CSS/JS + Gulp build + D3.js v6
- Dependencies migrated: `d3` (kept), `sass` added for SCSS support
- Gulp build pipeline removed; Next.js handles bundling
- Prototype-based `Viz` class converted to a proper TypeScript class in `src/components/NbaViz.tsx`
- All Viz/*.js files merged into the single `NbaViz.tsx` client component
- D3 initialization runs in `useEffect` to avoid SSR issues
- SCSS styles converted to plain CSS in `src/app/globals.css`
- `teamData.json` moved to `public/data/teamData.json` (fetched via `fetch('/data/teamData.json')`)
- SVG asset copied to `public/`
