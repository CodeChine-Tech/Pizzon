# Pizzon Admin Panel

Full admin panel to **control the entire website**: orders, dispatch, riders, menu, content, settings, coupons, and users. **Not linked from the customer website** — no nav button or link to this panel; only staff with the URL can access it.

## Run locally

From repo root:

```bash
pnpm run start:admin
# or
pnpm run dev:admin
```

Opens at **http://localhost:5174**

## Login

- Any username (and any password) signs you in for demo.
- Replace with real auth (e.g. backend `/api/auth/login`) when integrating.

## Sidebar & routes (after login)

- **Dashboard** (`/`) — Overview, stats, recent orders
- **Orders** (`/orders`) — Orders list, assign rider, view, invoice, track
- **Order detail** (`/orders/:id`) — Status, customer, items, assign rider, invoice
- **Track** (`/track`) — Live rider map
- **Riders** (`/riders`) — Riders list, add/edit
- **Menu & Products** (`/menu`) — Categories and items (controls website menu)
- **Content** — About, Blog, Team, Specials, Gallery, Testimonials, Contact, Reservation (controls each section on the website)
- **Coupons** (`/coupons`) — Discount codes for checkout
- **Settings** (`/settings`) — Store info, hours, tax, delivery
- **Users** (`/users`) — Panel users (admin/staff)

No animations. Backend integration can replace mock data and wire save actions later.

## Deploy (single project with customer site)

The admin is built **into the same deployment** as the customer site. One Vercel project builds both:

- **Build command** (in root `vercel.json`): `pnpm install && pnpm run build && pnpm run build:admin`
- **Output:** `artifacts/pizzon/dist/public` (customer app + `admin/` folder with the admin app)
- **URLs:** Customer site at `/`, admin panel at **`/admin`** (e.g. `https://yoursite.vercel.app/admin`)

No second Vercel project or `VITE_ADMIN_URL` needed. Use one project with **Root Directory** = repo root (empty).
