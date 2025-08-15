# BST Visualizer (Frontend)

Build, view, and save **Binary Search Trees** from a list of numbers.
Clean Tailwind UI, SPA routing, local history, and a pluggable backend API.

> Backend repo: [https://github.com/007snoop/sdat-s4-sprint-backend](https://github.com/007snoop/sdat-s4-sprint-backend)

---

## ✨ Features

* **Enter Numbers** → builds a BST and saves the result locally
* **Previous Trees** → click to expand JSON, copy to clipboard, or re-run
* **Configurable API** → uses `VITE_API_BASE` when present; falls back to the deployed backend
* **Modern UI** → React + Tailwind CSS v4, responsive layout, hover/active states
* **Docker & Render ready** → Nginx SPA config with client-side routing fallback

---

## 🛠️ Tech Stack

* **Vite + React + TypeScript**
* **Tailwind CSS v4** (via `@tailwindcss/postcss`)
* **lucide-react** (icons)
* **Axios** (API client)
* **Nginx** (production container)

---

## 🚀 Getting Started

### Prerequisites

* **Node.js**: `^20.19.0` or `>=22.12.0`
* **npm** or **yarn**

### Install & Run (dev)

```bash
npm install
npm run dev
# open the printed http://localhost:5173
```

### Build (prod)

```bash
npm run build
npm run preview
```

### Typecheck & Tests (optional)

```bash
npm run typecheck   # if present; separated from build
npm test            # vitest, if used
```

---

## 🧩 Tailwind v4 Setup (already configured)

**`postcss.config.js`**

```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

**`src/index.css`**

```css
@import "tailwindcss";
```

**`src/main.tsx`**

```ts
import "./index.css";
```

Use Tailwind utilities in JSX:

```tsx
<div className="p-4 rounded-2xl bg-indigo-600 text-white">Hello</div>
```

---

## 🔌 API

The frontend talks to the backend at:

* `POST /trees` with body `{ numbers: number[], balanced: boolean }`
* If `POST` returns **405**, the client automatically retries `GET /trees?numbers=...&balanced=...`

**Config:** set **`VITE_API_BASE`** (optional). If unset, fallback is:

```
https://bst-visualizer-backend.onrender.com/api
```

---

## 🧭 Pages

* **Home** (`/`) — intro, quick links, backend link
* **Enter Numbers** (`/enter`) — paste numbers, submit, local save
* **Previous Trees** (`/previous-trees`) — clickable list, JSON expand, copy, delete, clear all
* **Process Numbers** (`/process-numbers`) — calls API and shows result JSON

Saved trees are stored in **`localStorage["trees"]`**.

---

## 🗂️ Structure

```
src/
  components/
    Navbar.tsx
    Footer.tsx
  pages/
    Home.tsx
    EnterNumbers.tsx
    PreviousTrees.tsx
    ProcessNumbers.tsx
  services/
    api.ts
  main.tsx
  App.tsx
  index.css

Dockerfile
nginx.conf
.dockerignore
postcss.config.js
tailwind.config.js
vite.config.ts
```

---

## 📦 Docker (local)

```bash
docker build -t bst-frontend --build-arg VITE_API_BASE=https://bst-visualizer-backend.onrender.com/api .
docker run --rm -p 8080:80 bst-frontend
# http://localhost:8080
```

The image serves `dist/` via **Nginx** with SPA fallback (`/index.html`) so client routes work.

---

## ☁️ Deploy on Render

**Option A – Connect repo (Docker Web Service):**

1. Push to GitHub.
2. In Render: **New → Web Service → Connect repo**.
3. Environment: **Docker** (uses your `Dockerfile`).
4. (Optional) Add env var **`VITE_API_BASE`** and mark **Available at build time**.

**Option B – `render.yaml`** (if included): Render will auto-provision from it.

---

## 🧰 Troubleshooting

* **Unstyled UI**

  * Ensure `@import "tailwindcss";` in `src/index.css` and `main.tsx` imports `./index.css`.
  * Restart Vite after PostCSS changes.

* **“Cannot apply unknown utility class `from-slate-50`”**

  * Tailwind v4 doesn’t allow gradient utilities inside `@apply`. Use them in JSX classes.

* **“You cannot render a <Router> inside another <Router>”**

  * Only wrap `<BrowserRouter>` in `src/main.tsx`. Do **not** add another Router in `App.tsx` or children.

* **405 from `/trees`**

  * Client POSTs first and auto-fallbacks to GET.
  * If CORS fails, allow your frontend origin and methods (`GET, POST, OPTIONS`) on the backend.

* **Windows git error with `NUL`**

  * A file/folder named `NUL` can break Git indexing. Delete it or add `NUL` to `.gitignore`.

---

## 📝 Scripts

```jsonc
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",        // or "tsc -b && vite build" if you keep typecheck in CI
    "preview": "vite preview",
    "typecheck": "tsc -p tsconfig.app.json --noEmit",
    "test": "vitest"
  }
}
```

---

## 🤝 Contributing

Use **Conventional Commits**, e.g.:

```
feat(api): resilient base URL + 405 auto-fallback (POST→GET) for /trees
```

---

## 🔗 Links

* **Frontend (this repo)**: [https://github.com/JaowadH/bst-visualizer-frontend](https://github.com/JaowadH/bst-visualizer-frontend)
* **Backend API**: [https://github.com/007snoop/sdat-s4-sprint-backend](https://github.com/007snoop/sdat-s4-sprint-backend)

---

## 📄 License

MIT
