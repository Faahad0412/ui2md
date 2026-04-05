# 📝 Project State: UI2MD (UI-to-MD Extractor SaaS)

## 🎯 1. Project Goal & Tech Stack
* **Description:** Ek SaaS application (UI2MD) jo kisi bhi website ka URL le kar uski computed CSS aur design system ko analyze karti hai, aur premium `DESIGN.md` file generate karti hai.
* **Frontend Stack:** React.js, Vite, Tailwind CSS, Lucide Icons.
* **Backend Stack:** Node.js, Express.js.
* **Extraction Tools:** Puppeteer/Playwright aur Google Gemini API.

## 📂 2. Current Folder Structure
ui-extractor-saas/
├── frontend/
├── backend/
├── working.md
└── README.md

## ✅ 3. Completed Features (Log)
* **Architecture:** Initial Project structure and master plan created.
* **Project Naming:** Project officially named "UI2MD".
* **Task 1:** Project setup complete. Packages installed, dev server working.
* **Task 2:** Backend API `/api/scrape` setup. Puppeteer webpage `<title>` test passed.
* **Task 3:** Computed CSS extraction complete. `/api/scrape` JSON format mein body styles, typography, aur button tokens successfully extract kar raha hai.
* **Task 4:** Gemini AI Integration complete. Backend mein `@google/generative-ai` aur `dotenv` configure ho gaye hain. Ab API frontend ko Puppeteer data aur prompt pass kar ke Gemini se generate shuda `DESIGN.md` markdown return kar rahi hai (Test Successful).
* **Task 5:** Frontend UI complete. React aur Tailwind CSS se dark mode aur glassmorphism style ka premium SaaS landing page banaya gaya hai. Backend API connect kar di gayi hai along with loading spinners, error boundaries aur "Copy to Clipboard" feature.
* **Task 6:** Production Readiness aur Environment Setup complete. CORS secure kar diya gaya hai, `.gitignore` setup add ho gaya hai, aur API calls ab `VITE_API_URL` ki madad se automatically environment URLs ko support karte hain.
* **Task 1.1 (Bug Fix):** Git system par install nahi tha — `winget` se Git v2.53 install kar diya gaya hai.
* **Task 7:** Git Version Control setup complete. `git init`, `.gitignore` verify, initial commit (`9df60e9`) aur GitHub push successfully complete. Repo live hai: https://github.com/Faahad0412/ui2md
* **Task 8:** Vercel Serverless Migration complete. Express backend replace ho gaya — `api/scrape.js` serverless function ban gaya hai. `@sparticuz/chromium` + `puppeteer-core` + `@supabase/supabase-js` install aur configure ho gaye hain. Frontend `/api/scrape` (relative URL) use kar raha hai. Local test successful (`https://example.com` ka DESIGN.md generated).
* **Task 9:** Supabase Schema aur Documentation complete. `database.sql` mein `extractions` table ka full SQL schema (UUID, RLS policies, indexes) likha gaya. `README.md` ko premium open-source SaaS standard ke mutabiq update kiya — Tech Stack, Local Setup, Supabase Setup, Vercel Deploy, aur API Reference shamil hain. GitHub commit `90c8b88` pushed.
* **Task 10:** BYOK (Bring Your Own Key) Architecture implement ho gaya hai. Frontend mein Settings modal add kiya gaya hai jo Gemini API Key ko `localStorage` mein save karta hai. Backend (`api/scrape.js`) ab request headers se `x-gemini-key` use karta hai. Local testing inclusive of 401 Unauthorized successful.

## 🧩 4. Core Logic & AI Agent Rules
* **Rule 1 (Hyper-Focus):** Ek waqt mein sirf aur sirf **EK Task** execute karna hai.
* **Rule 2 (Separation of Concerns):** Frontend aur backend isolate rehne chahiye.
* **Rule 3 (Bug Tracking):** Error aane par sub-task (Task 1.1) bana kar fix karo.
* **Rule 4:** Task complete hone par `working.md` lazmi update karo.

## 🚧 5. Active Task (Focus on ONE at a time)
* **Task 1.2 (Bug Fix):** Fix Gemini API 404 Error.
  1. `api/scrape.js` open karo.
  2. Jahan `genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })` likha hai, wahan model string ko change kar ke `'gemini-1.5-pro'` ya `'gemini-pro'` kar do.
  3. Git add, commit (`"Fix: Updated Gemini model string to resolve 404"`), aur push karo taa ke Vercel auto-deploy kar sake.
  4. Task complete hone par `working.md` update karo.