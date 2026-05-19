# Chatroom


A simple, modern chatroom application with a separate `backend` and `frontend`. Clean UI, realtime messaging, and easy local setup.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Quick Start](#quick-start)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- Realtime chat with rooms
- Clean React + TypeScript frontend
- Lightweight Node/TypeScript backend
- Easy to run locally

## Tech Stack

- Frontend: React, Vite, TypeScript
- Backend: Node.js, TypeScript, (WebSocket or Socket.io)
- Package managers: npm / yarn / pnpm

## Screenshots

Add your screenshots to `docs/screenshots/` and update the paths below. Recommended sizes: 1280×800 (desktop), 400×800 (mobile).

Desktop

![Desktop Screenshot](docs/screenshots/desktop.png)

Mobile

![Mobile Screenshot](docs/screenshots/mobile.png)

Optional: Add an animated GIF to showcase realtime messaging:

![Demo GIF](docs/screenshots/demo.gif)

---

## Quick Start

Prerequisites: Node.js 16+ and your preferred package manager.

1) Start the backend

```bash
cd backend
npm install
npm run dev
```

2) Start the frontend

```bash
cd frontend
npm install
npm run dev
```

Open your browser at `http://localhost:3000` (or the Vite URL displayed).

### Environment

Create a `.env` file in `backend/` and `frontend/` as needed. Example keys:

```
# backend/.env
PORT=4000

# frontend/.env
Backend_URL=http://localhost:4000
```

## Development

- Backend entry: `backend/src/index.ts`
- Frontend entry: `frontend/src/main.tsx`

Suggested branches:

- `main` — stable production-ready code
- `dev` — active development

---

## Contributing

Contributions are welcome! Please:

1. Fork this repo
2. Create a branch (`feature/your-feature`)
3. Commit and open a Pull Request

If you want to add screenshots, place them under `docs/screenshots/` and reference them above.
<!-- END -->
