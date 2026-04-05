<div align="center">

# ✨ UI2MD

**Extract computed CSS design tokens from any website and generate a premium `DESIGN.md` file — powered by Puppeteer and Google Gemini AI.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://github.com/Faahad0412/ui2md)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js)](https://nodejs.org)

</div>

---

## 🚀 What is UI2MD?

**UI2MD** is a SaaS tool that takes any website URL, launches a headless browser to extract its real computed CSS (colors, fonts, button styles), and converts that data into a beautifully structured `DESIGN.md` file using Google Gemini AI.

> Just paste a URL → Get a premium design document in seconds.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, Vite 8, Tailwind CSS v4, Lucide Icons |
| **Serverless API** | Vercel Serverless Functions (Node.js) |
| **Scraping** | Puppeteer-Core + @sparticuz/chromium |
| **AI Generation** | Google Gemini 1.5 Flash |
| **Database** | Supabase (PostgreSQL) |
| **Deployment** | Vercel |

---

## 📂 Project Structure

```
ui2md/
├── api/
│   └── scrape.js          # Vercel Serverless Function (core engine)
├── frontend/
│   ├── src/
│   │   ├── App.jsx        # Main React UI
│   │   └── index.css      # Tailwind CSS entry
│   └── vite.config.js
├── database.sql            # Supabase table schema
├── vercel.json             # Vercel deployment config
├── package.json            # Root dependencies for serverless
└── working.md              # Project state tracker
```

---

## ⚙️ Local Development Setup

### Prerequisites
- Node.js 18+
- Google Chrome installed (for local Puppeteer)
- A Google Gemini API Key ([get one here](https://aistudio.google.com/app/apikey))

### 1. Clone the repository

```bash
git clone https://github.com/Faahad0412/ui2md.git
cd ui2md
```

### 2. Install root dependencies (serverless API)

```bash
npm install
```

### 3. Install frontend dependencies

```bash
cd frontend
npm install
cd ..
```

### 4. Set up environment variables

Create a `.env` file in the **root** folder:

```env
GEMINI_API_KEY=your_gemini_api_key_here
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

Create a `.env` file in the **frontend/** folder:

```env
VITE_API_URL=http://localhost:3001
```

### 5. Run locally

**Terminal 1 — Start the local API server:**
```bash
node dev-server.js
```

**Terminal 2 — Start the frontend:**
```bash
cd frontend
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🗄️ Supabase Setup

1. Go to [supabase.com](https://supabase.com) and create a new project.
2. In the **SQL Editor**, run the contents of [`database.sql`](./database.sql) to create the `extractions` table.
3. Copy your **Project URL** and **anon/public key** from **Settings → API**.
4. Add them to your `.env` file:
   ```env
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_ANON_KEY=your-anon-key
   ```

---

## ☁️ Deploy on Vercel

### 1. Fork & Import

- Fork this repo on GitHub.
- Go to [vercel.com](https://vercel.com), click **"Add New Project"**, and import your fork.

### 2. Configure Build Settings

Vercel will auto-detect `vercel.json`. Ensure these settings:

| Setting | Value |
|---|---|
| **Build Command** | `cd frontend && npm install && npm run build` |
| **Output Directory** | `frontend/dist` |
| **Root Directory** | `.` (root) |

### 3. Add Environment Variables

In your Vercel project → **Settings → Environment Variables**, add:

```
GEMINI_API_KEY     = your_gemini_api_key
SUPABASE_URL       = your_supabase_url
SUPABASE_ANON_KEY  = your_supabase_anon_key
```

### 4. Deploy

Click **Deploy** — Vercel will build the frontend and deploy `api/scrape.js` as a serverless function automatically.

---

## 🔌 API Reference

### `POST /api/scrape`

Scrapes a URL and returns extracted CSS design tokens + AI-generated Markdown.

**Request Body:**
```json
{
  "url": "https://stripe.com"
}
```

**Response:**
```json
{
  "success": true,
  "url": "https://stripe.com",
  "markdown": "# 🎨 DESIGN.md\n## Color Palette\n...",
  "designTokens": {
    "body": { "backgroundColor": "rgb(255,255,255)", "color": "rgb(26,26,26)" },
    "typography": { "h1FontFamily": "\"Sohne\", sans-serif" },
    "button": { "backgroundColor": "rgb(99,91,255)", "borderRadius": "6px" }
  }
}
```

---

## 🗺️ Roadmap

- [x] Puppeteer CSS extraction
- [x] Gemini AI Markdown generation
- [x] Vercel Serverless deployment
- [x] Supabase database schema
- [ ] User authentication (Supabase Auth)
- [ ] Extraction history dashboard
- [ ] Support for dark/light mode detection
- [ ] PDF export of DESIGN.md

---

## 📄 License

MIT © [Faahad0412](https://github.com/Faahad0412)
