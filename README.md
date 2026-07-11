# FortiTrade AI — Frontend

A React/Vite dashboard for FortiTrade AI, a fraud-aware trading bot. Built for the **AMD Developer Hackathon: ACT II — Unicorn Track**.

## Live deployment

Frontend: `https://fortitrade-ai.vercel.app`
Backend API: `https://fortitradeai.onrender.com`

## What this does

- Landing page introducing the product, with an animated isometric visualization of the fraud-detection pipeline
- Register/login with a profile picture (image or GIF)
- A trading dashboard showing:
  - A live, auto-refreshing AI trading signal (buy/sell/hold with reasoning)
  - A trade submission form (fraud-checked before execution)
  - Real-time fraud/risk alerts with Gemma AI explanations for flagged trades
  - Full trade history with live status
  - Account management (delete trades, delete account)

## Tech stack

- **React** + **Vite**
- **React Router v7** — client-side routing
- **Tailwind CSS v4** — styling (via `@tailwindcss/vite` plugin)
- **Axios** — API client
- **lucide-react** — icons

## Project structure

```
├── src/
│   ├── api/
│   │   └── client.js            # Axios instance + API call wrappers
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── StackAnimation.jsx   # Landing page 3D fraud-pipeline visualization
│   │   ├── TradeForm.jsx        # Trade submission with live signal polling
│   │   ├── FraudAlert.jsx       # Risk score + Gemma explanation display
│   │   ├── PortfolioCard.jsx    # Trade history list
│   │   └── ProfilePicUpload.jsx # Profile picture upload (image/gif)
│   ├── pages/
│   │   ├── Landing.jsx
│   │   ├── Login.jsx            # Combined login/register
│   │   └── Dashboard.jsx
│   ├── App.jsx                  # Routes
│   ├── main.jsx
│   └── index.css                # Tailwind + custom theme colors
├── vite.config.js               # Includes @tailwindcss/vite plugin
├── vercel.json                  # SPA routing fix for page reloads
└── Dockerfile
```

## Setup — local development

### 1. Clone and install dependencies

```bash
git clone https://github.com/monica-njoki1/FortiTradeAI-Front.git
cd FortiTradeAI-Front
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env
```

Set `VITE_API_BASE` to point at your backend:

```
VITE_API_BASE=http://localhost:5000/api
```

> **Note:** Vite environment variables are baked in at **build time**, not read at runtime. If deploying, this must be set in your hosting platform's environment variable settings (e.g. Vercel dashboard), and a fresh deploy triggered after any change.

### 3. Run the dev server

```bash
npm run dev
```

App runs at `http://localhost:5173`.

### 4. Build for production

```bash
npm run build
```

## Running with Docker

```bash
docker build -t fortitrade-frontend .
docker run -p 80:80 fortitrade-frontend
```

## Deployment notes

- Deployed on **Vercel**
- `vercel.json` includes a rewrite rule so client-side routes (`/login`, `/dashboard`) don't 404 on page reload
- `VITE_API_BASE` must be set in Vercel's **Environment Variables** dashboard (not just a local `.env` file, which is git-ignored) and a fresh deploy triggered for it to take effect
- Requires the backend's `CORS_ORIGINS` to include this frontend's deployed URL
