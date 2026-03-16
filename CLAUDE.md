# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start dev server (localhost:5173)
npm run build     # type-check + production build
npm run preview   # serve the production build locally
```

## Stack

- **Vite** + **React 19** + **TypeScript** (strict mode)
- **Tailwind CSS v4** via `@tailwindcss/vite` — configured entirely through the Vite plugin, no `tailwind.config.*` file
- **React Router v7** for client-side routing

## Architecture

```
src/
  context/AuthContext.tsx   # in-memory mock auth (isAuthenticated, login, logout)
  pages/LoginPage.tsx       # public route — mocked credentials: user@example.com / password123
  pages/DashboardPage.tsx   # protected route — holds live score state, composes the full layout
  components/Banner.tsx     # scrolling amber warning banner (CSS marquee animation in index.css)
  components/Sidebar.tsx    # left nav — only Logout is functional; others show "Coming soon"
  components/PongCanvas.tsx # HTML5 canvas AI-vs-AI Pong simulation via requestAnimationFrame
```

**Auth flow**: `AuthContext` holds a boolean in React state (not persisted). `App.tsx` wraps routes in `<ProtectedRoute>` which redirects to `/login` when unauthenticated. Refreshing the page resets auth.

**Pong simulation**: runs entirely inside a `useEffect` + `requestAnimationFrame` loop. Score state lives in `DashboardPage` and is updated via an `onScore` callback to keep the canvas component stateless about the UI.

**CSS animation**: the marquee scroll is defined as a custom `@keyframes marquee` in `src/index.css` (not a Tailwind utility) and applied via the `.animate-marquee` class.
