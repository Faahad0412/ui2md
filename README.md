<div align="center">

# ✨ UI2MD

**Extract computed CSS design tokens from any website and generate a premium `DESIGN.md` file — powered by Puppeteer and Google Gemini AI.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://ui2md.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js)](https://nodejs.org)

</div>

---

## 🚀 What is UI2MD?

**UI2MD** is a SaaS tool that takes any website URL, launches a headless browser to extract its real computed CSS (colors, fonts, button styles), and converts that data into a beautifully structured `DESIGN.md` file using Google Gemini AI.

🔒 **BYOK (Bring Your Own Key) Architecture:** UI2MD operates on a zero-server-cost model. Your Gemini API key is never stored on our servers; it is securely saved in your browser's `localStorage` and sent directly via API headers.

> Just paste a URL → Get a premium design document in seconds.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, Vite, Tailwind CSS v4, React Router, Lucide Icons |
| **Serverless API** | Vercel Serverless Functions (Node.js) |
| **Scraping** | Puppeteer-Core + @sparticuz/chromium |
| **AI Generation** | Google Gemini (Flash Latest) |
| **Database** | Supabase (PostgreSQL) |
| **Deployment** | Vercel |

---

## 📂 Project Structure

ui2md/├── api/│   └── scrape.js          # Vercel Serverless Function (core engine)├── frontend/│   ├── src/│   │   ├── App.jsx            # Main React Router Configuration│   │   ├── LandingPage.jsx    # Marketing UI & Use Cases│   │   ├── ExtractorApp.jsx   # Core SaaS Tool & Settings│   │   ├── PrivacyPolicy.jsx  # Legal & BYOK Disclaimer│   │   ├── TermsOfService.jsx # Terms of Service│   │   └── index.css          # Tailwind CSS entry│   └── vite.config.js├── database.sql           # Supabase table schema├── vercel.json            # Vercel deployment config├── package.json           # Root dependencies for serverless└── working.md             # Project state tracker
---

## ⚙️ Local Development Setup

### Prerequisites
- Node.js 18+
- Google Chrome installed (for local Puppeteer)
- A Google Gemini API Key (Users bring their own via the UI settings)

### 1. Clone the repository

```bash
git clone [https://github.com/Faahad0412/ui2md.git](https://github.com/Faahad0412/ui2md.git)
cd ui2md
2. Install root dependencies (serverless API)Bashnpm install
3. Install frontend dependenciesBashcd frontend
npm install
cd ..
4. Set up environment variablesCreate a .env file in the root folder:Code snippetSUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
Create a .env file in the frontend/ folder:Code snippetVITE_API_URL=http://localhost:3001
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
(Note: GEMINI_API_KEY is intentionally excluded because UI2MD uses a BYOK architecture).5. Run locallyTerminal 1 — Start the local API server:Bashnode dev-server.js
Terminal 2 — Start the frontend:Bashcd frontend
npm run dev
Open http://localhost:5173 in your browser.🗄️ Supabase SetupGo to supabase.com and create a new project.In the SQL Editor, run the contents of database.sql to create the extractions table.Copy your Project URL and anon/public key from Settings → API.Add them to your environment variables as shown above.☁️ Deploy on Vercel1. Fork & ImportFork this repo on GitHub.Go to vercel.com, click "Add New Project", and import your fork.2. Configure Build SettingsVercel will auto-detect vercel.json. Ensure these settings:SettingValueBuild Commandcd frontend && npm install && npm run buildOutput Directoryfrontend/distRoot Directory. (root)3. Add Environment VariablesIn your Vercel project → Settings → Environment Variables, add:VITE_SUPABASE_URL      = your_supabase_url
VITE_SUPABASE_ANON_KEY = your_supabase_anon_key
(Do NOT add GEMINI_API_KEY. The server runs 100% free via BYOK headers).4. DeployClick Deploy — Vercel will build the frontend and deploy api/scrape.js as a serverless function automatically.🔌 API ReferencePOST /api/scrapeScrapes a URL and returns extracted CSS design tokens + AI-generated Markdown.Headers Required:HTTPx-gemini-key: "YOUR_GEMINI_API_KEY"
Content-Type: application/json
Request Body:JSON{
  "url": "[https://stripe.com](https://stripe.com)"
}
Response:JSON{
  "success": true,
  "url": "[https://stripe.com](https://stripe.com)",
  "markdown": "# 🎨 DESIGN.md\n## Color Palette\n...",
  "designTokens": {
    "body": { "backgroundColor": "rgb(255,255,255)", "color": "rgb(26,26,26)" },
    "typography": { "h1FontFamily": "\"Sohne\", sans-serif" },
    "button": { "backgroundColor": "rgb(99,91,255)", "borderRadius": "6px" }
  }
}
🗺️ Roadmap[x] Puppeteer CSS extraction[x] Gemini AI Markdown generation[x] Vercel Serverless deployment[x] Supabase database schema[x] BYOK (Bring Your Own Key) Architecture[x] Download .md file feature[x] SaaS Landing Page & Legal Pages[ ] User authentication (Supabase Auth)[ ] Extraction history dashboard[ ] Support for dark/light mode detection[ ] PDF export of DESIGN.md📄 LicenseMIT © Faahad0412
