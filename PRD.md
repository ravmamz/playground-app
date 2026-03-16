# Product Requirements Document — Pong Web Interface

## Overview

A web-based interface simulating a Pong game session. The product is not a real playable game but a polished UI shell: authenticated users land on a dashboard where an autonomous Pong simulation plays continuously. The primary goal is to establish the visual and structural foundation of the interface, ready to be extended with a real backend later.

---

## Scope

**In scope (v1)**
- Login screen with email + password (mocked, no backend)
- Post-login dashboard with a persistent top banner, left sidebar, and a Pong simulation canvas
- AI vs AI animated Pong simulation (no user input)

**Out of scope (v1)**
- User registration, password reset, or any account management
- Real backend / database / session persistence
- Playable game controls
- Real multiplayer

---

## Screens

### 1. Login Screen

The only publicly accessible screen. Redirects to the dashboard on successful auth.

**Layout**
- Centered card on a clean, light background
- App name / logo at the top of the card
- Email input field
- Password input field
- "Sign In" button

**Behavior**
- Auth is fully mocked client-side. A hardcoded credential pair (e.g. `user@example.com` / `password123`) is accepted.
- On success: navigate to the dashboard.
- On failure: show an inline error message ("Invalid email or password").
- No "Forgot password", no "Create account" links in v1.

---

### 2. Dashboard (Post-Login)

The main and only authenticated screen. Composed of three zones: top banner, left sidebar, and main content area.

#### 2a. Top Warning Banner

A full-width, persistent banner pinned to the very top of the page (above everything else, including the sidebar).

- **Style**: high-visibility, warning color (e.g. amber/yellow or red).
- **Content**: a horizontally scrolling (marquee-style) message:
  > "Please reach out to support at support@dotfilehelp.zendesk.com as your session is currently blocked"
- The scroll is continuous and loops. It is always visible and cannot be dismissed.

#### 2b. Left Sidebar

A fixed vertical sidebar on the left edge of the dashboard, below the banner.

**Menu items (all mocked — no real navigation targets in v1)**
- Dashboard *(active/highlighted by default)*
- Profile
- Leaderboard
- Game History
- Settings
- Account
- Logout *(clicking this returns the user to the Login screen and clears the session)*

**Behavior**
- Only "Logout" is functional in v1.
- All other items are visually interactive (hover states) but clicking them does nothing or shows a "Coming soon" indication.

#### 2c. Main Content Area

Occupies the remaining space to the right of the sidebar and below the banner.

**Contents (top to bottom)**
1. **Page title**: e.g. "Live Match"
2. **Score display**: two player labels ("Player 1" / "Player 2") with a live score counter that updates as the simulation runs.
3. **Pong simulation canvas**: a rectangular game canvas where:
   - Two paddles (one on each vertical edge) move up and down autonomously.
   - A ball bounces off the top/bottom walls and the paddles.
   - When the ball passes a paddle (a point is scored), the score updates and the ball resets to center.
   - The simulation runs indefinitely with no user interaction required.
4. **Match status label**: a small text below the canvas (e.g. "Match in progress…").

---

## UI / Visual Design

| Property | Spec |
|---|---|
| Theme | Light / minimal |
| Font | System sans-serif or a clean web font (e.g. Inter) |
| Primary color | Neutral dark (e.g. slate or gray-900) |
| Accent color | One highlight color for active states and the score |
| Banner color | Amber or red — must be visually distinct and attention-grabbing |
| Canvas | Dark background (black or very dark gray) to contrast with the light shell |
| Responsive | Desktop-first; mobile layout is out of scope for v1 |

---

## Auth Logic (Mocked)

| Credential | Value |
|---|---|
| Email | `user@example.com` |
| Password | `password123` |

- Session state is held in memory (or `sessionStorage`). Refreshing the page logs the user out.
- No token, no cookie, no real auth library required for v1.

---

## Pong Simulation Rules

- The canvas renders at a fixed resolution (e.g. 800×500).
- Ball starts at center, moves at a fixed angle and speed.
- Ball bounces off top and bottom walls (angle reflection).
- Each paddle tracks the ball's Y position with a slight lag to simulate imperfect AI — this ensures points are scored periodically.
- When the ball exits left or right: the opposing player scores +1, ball resets to center with a random angle.
- Paddle and ball movement are driven by `requestAnimationFrame` (or equivalent).
- No win condition — the game runs forever.

---

## Future Considerations (Not in v1)

- Real authentication with a backend (JWT / OAuth)
- User registration and profile management
- Playable single-player mode (keyboard controls)
- Real-time multiplayer via WebSockets
- Persistent leaderboard and match history
- Mobile / responsive layout
- Dismissible or configurable banner
