# Pizzon – Pizza Restaurant Site

Static pizza restaurant frontend (Vite + React). Single-page site with menu, cart, order, and checkout.

## Stack

- **Build:** Vite 7, React 19  
- **Styling:** Tailwind CSS 4  
- **Routing:** wouter  
- **UI:** Radix UI, shadcn-style components, Framer Motion  

## Prerequisites

- **Node.js** 18+  
- **pnpm** (recommended) or npm  

Install pnpm: `npm install -g pnpm`

## Quick Start

```bash
# Install
pnpm install

# Dev server (http://localhost:5173)
npm start
# or: pnpm start

# Build for production
pnpm run build
```

Build output: `artifacts/pizzon/dist/public/` (static files to deploy anywhere).

## Scripts

| Command        | Description                    |
|----------------|--------------------------------|
| `npm start`    | Start dev server               |
| `pnpm run build` | Typecheck + production build |
| `pnpm run typecheck` | TypeScript check only     |

## Project Layout

```
├── artifacts/pizzon/     # App source (src/, public/, vite.config.ts)
├── package.json         # Root scripts
├── pnpm-workspace.yaml  # Workspace config (single package: pizzon)
└── tsconfig.base.json   # Shared TypeScript options
```

## Deploy on Vercel

1. Import the project from **GitHub** → `CodeChine-Tech/PIZZA-FRONTEND`.
2. Leave **Root Directory** as default (repo root).
3. If the build fails with “No Output Directory named public”, go to **Settings → General → Build & Development** and set **Output Directory** to:
   ```
   artifacts/pizzon/dist/public
   ```
4. Deploy. `vercel.json` sets install/build commands; the output path is above.

No env vars needed for the static site.

## License

MIT

---

**Developed by Faqir Ullah – CodeChine**
