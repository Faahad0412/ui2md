✨ UI2MD<div align="center">Extract computed CSS design tokens from any website and generate a premium DESIGN.md file — powered by Puppeteer and Google Gemini AI.</div>🚀 1. OverviewUI2MD is a SaaS tool that takes any website URL, launches a headless browser to extract its real computed CSS (colors, fonts, button styles), and converts that data into a beautifully structured DESIGN.md file using Google Gemini AI.Security First (BYOK Model):UI2MD operates on a zero-server-cost model. Your Gemini API key is never stored on our servers; it is securely saved in your browser's localStorage and sent directly via API headers.🛠️ 2. Tech StackLayerTechnologyFrontendReact 19, Vite, Tailwind CSS v4, React Router, Lucide IconsBackendVercel Serverless Functions (Node.js)ScrapingPuppeteer-Core + @sparticuz/chromiumAI EngineGoogle Gemini (Flash Latest)DatabaseSupabase (PostgreSQL)HostingVercel📂 3. Project StructurePlaintextui2md/
├── api/
│   └── scrape.js              # Core extraction engine (Serverless)
├── frontend/
│   ├── src/
│   │   ├── App.jsx            # Router Configuration
│   │   ├── LandingPage.jsx    # Marketing & UI
│   │   ├── ExtractorApp.jsx   # Main Tool Logic
│   │   ├── PrivacyPolicy.jsx  # Legal & BYOK Terms
│   │   └── index.css          # Tailwind Styles
│   └── vite.config.js
├── database.sql               # Supabase schema
├── vercel.json                # Deployment config
└── working.md                 # Project state tracker
⚙️ 4. Local Development Setup📋 PrerequisitesNode.js 18+Google Chrome (For local Puppeteer scraping)Gemini API Key (Provided by user via UI settings)1️⃣ Clone and InstallBash# Clone the repository
git clone https://github.com/Faahad0412/ui2md.git
cd ui2md

# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
2️⃣ Environment VariablesCreate a .env file in the root folder:Code snippetSUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
Create a .env file in the frontend/ folder:Code snippetVITE_API_URL=http://localhost:3001
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
3️⃣ Run LocallyBackend: Run node dev-server.js in one terminal.Frontend: Run npm run dev inside the frontend folder.🔌 5. API ReferencePOST /api/scrapeRequired Headers:HTTPx-gemini-key: "YOUR_GEMINI_API_KEY"
Content-Type: application/json
Request Payload:JSON{
  "url": "https://stripe.com"
}
🗺️ 6. Roadmap[x] Puppeteer CSS extraction[x] Gemini AI Markdown generation[x] Vercel Serverless deployment[x] BYOK (Bring Your Own Key) Architecture[x] Download .md file feature[x] SaaS Landing Page & Legal Sections[ ] User Extraction History Dashboard[ ] Multi-model selection (Pro/Flash)📄 7. LicenseMIT © Faahad0412
