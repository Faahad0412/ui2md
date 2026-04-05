# ✨ UI2MD

<div align="center">

**Extract computed CSS design tokens from any website and generate a premium DESIGN.md file — powered by Puppeteer and Google Gemini AI.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://ui2md.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

</div>

---

## 🚀 1. Overview
**UI2MD** is a SaaS tool that takes any website URL, launches a headless browser to extract its real computed CSS, and converts that data into a beautifully structured `DESIGN.md` file using Google Gemini AI.

### 🔒 Security First (BYOK Model)
UI2MD operates on a zero-server-cost model. Your Gemini API key is **never stored on our servers**; it is securely saved in your browser's `localStorage` and sent directly via API headers.

---

## 🛠️ 2. Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 19, Vite, Tailwind CSS v4, React Router |
| **Backend** | Vercel Serverless Functions (Node.js) |
| **Scraping** | Puppeteer-Core + @sparticuz/chromium |
| **AI Engine** | Google Gemini (Flash Latest) |

---

## 📂 3. Project Structure

```text
ui2md/
├── api/
│   └── scrape.js              # Core extraction engine
├── frontend/
│   ├── src/
│   │   ├── App.jsx            # Router Configuration
│   │   ├── LandingPage.jsx    # Marketing & UI
│   │   ├── ExtractorApp.jsx   # Main Tool Logic
│   │   └── index.css          # Tailwind Styles
└── vercel.json                # Deployment config
⚙️ 4. Local Development Setup
1️⃣ Clone and Install
Bash
git clone [https://github.com/Faahad0412/ui2md.git](https://github.com/Faahad0412/ui2md.git)
cd ui2md
npm install
cd frontend
npm install
2️⃣ Run Locally
Backend: node dev-server.js (Root folder)

Frontend: npm run dev (Frontend folder)

🔌 5. API Reference
POST /api/scrape
Headers:

HTTP
x-gemini-key: "YOUR_GEMINI_API_KEY"
Content-Type: application/json
🗺️ 6. Roadmap
[x] Puppeteer CSS extraction

[x] Gemini AI Markdown generation

[x] Vercel Serverless deployment

[x] BYOK (Bring Your Own Key) Architecture

[x] SaaS Landing Page & Legal Sections

[ ] User Extraction History Dashboard

📄 7. License
MIT © Faahad0412
