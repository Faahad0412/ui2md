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

## 🧩 4. Core Logic & AI Agent Rules
* **Rule 1 (Hyper-Focus):** Ek waqt mein sirf aur sirf **EK Task** execute karna hai.
* **Rule 2 (Separation of Concerns):** Frontend aur backend isolate rehne chahiye.
* **Rule 3 (Bug Tracking):** Error aane par sub-task (Task 1.1) bana kar fix karo.
* **Rule 4:** Task complete hone par `working.md` lazmi update karo.

## 🚧 5. Active Task (Focus on ONE at a time)
* **Task 1.1 (Bug Fix):** System par `git` command recognized nahi hai (Git installed nahi hai). Pehle Git install karna hoga.
* **Task 7:** Local Version Control (Git) Setup.
  1. Root directory (`ui-extractor-saas/`) mein terminal open karo aur `git init` command run karo taa ke local repository initialize ho jaye.
  2. `git status` check karo aur make sure karo ke `.gitignore` theek se kaam kar raha hai (yani `node_modules` aur `.env` files untracked files mein show na hon).
  3. `git add .` command se saari zaroori files ko staging area mein add karo.
  4. `git commit -m "Initial Commit: UI2MD MVP Ready for Production"` command run kar ke local commit create karo.
  5. Agar successfully commit ho jaye toh `working.md` update karo.