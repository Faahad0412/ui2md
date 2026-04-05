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

```text
ui2md/
├── api/
│   └── scrape.js          # Vercel Serverless Function (core engine)
├── frontend/
│   ├── src/
│   │   ├── App.jsx            # Main React Router Configuration
│   │   ├── LandingPage.jsx    # Marketing UI & Use Cases
│   │   ├── ExtractorApp.jsx   # Core SaaS Tool & Settings
│   │   ├── PrivacyPolicy.jsx  # Legal & BYOK Disclaimer
│   │   ├── TermsOfService.jsx # Terms of Service
│   │   └── index.css          # Tailwind CSS entry
│   └── vite.config.js
├── database.sql           # Supabase table schema
├── vercel.json            # Vercel deployment config
├── package.json           # Root dependencies for serverless
└── working.md             # Project state tracker
⚙️ Local Development Setup
Prerequisites
Node.js 18+

Google Chrome installed (for local Puppeteer)

A Google Gemini API Key (Users bring their own via the UI settings)

1. Clone the repository
Bash
git clone https://github.com/Faahad0412/ui2md.git
cd ui2md
2. Install dependencies
Bash
# Install root backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
3. Set up environment variables
Create a .env file in the root folder:

Code snippet
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
Create a .env file in the frontend/ folder:

Code snippet
VITE_API_URL=http://localhost:3001
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
4. Run locally
Terminal 1 (Backend):

Bash
node dev-server.js
Terminal 2 (Frontend):

Bash
cd frontend
npm run dev
🔌 API Reference
POST /api/scrape
Headers:

HTTP
x-gemini-key: "YOUR_GEMINI_API_KEY"
Content-Type: application/json
Request Body:

JSON
{
  "url": "https://stripe.com"
}
🗺️ Roadmap
[x] Puppeteer CSS extraction

[x] Gemini AI Markdown generation

[x] Vercel Serverless deployment

[x] Supabase database schema

[x] BYOK (Bring Your Own Key) Architecture

[x] Download .md file feature

[x] SaaS Landing Page & Legal Pages

[ ] User authentication (Supabase Auth)

[ ] Extraction history dashboard

📄 License
MIT © Faahad0412
