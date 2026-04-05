import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowLeft, Sparkles } from 'lucide-react';

function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30 relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-indigo-500/10 to-transparent pointer-events-none" />
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none opacity-40" />

      {/* Navbar */}
      <nav className="relative z-20 flex items-center justify-between px-6 py-8 max-w-7xl mx-auto">
        <Link to="/" className="flex items-center gap-2 group transition-all">
          <ArrowLeft className="w-5 h-5 text-slate-400 group-hover:text-white group-hover:-translate-x-1 duration-300" />
          <span className="text-xl font-black tracking-tighter text-white">UI2MD</span>
        </Link>
      </nav>

      {/* Content */}
      <main className="relative z-10 px-6 py-20 max-w-4xl mx-auto">
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
          
          <header className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-widest uppercase mb-4">
              <ShieldCheck size={14} />
              Privacy Matters
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight">Privacy Policy</h1>
            <p className="text-slate-400 font-medium">Last updated: April 6, 2026</p>
          </header>

          {/* BYOK Disclaimer Section */}
          <section className="p-8 rounded-3xl bg-emerald-500/5 border border-emerald-500/20 shadow-2xl shadow-emerald-500/5 backdrop-blur-xl">
            <h2 className="text-2xl font-bold text-emerald-400 mb-6 flex items-center gap-3">
              <Sparkles size={24} />
              The BYOK (Bring Your Own Key) Security Model
            </h2>
            <p className="text-slate-300 leading-relaxed font-medium text-lg">
              UI2MD is built with a <strong>privacy-first</strong> approach. We do not operate a centralized AI processing server that stores your sensitive credentials. 
            </p>
            <div className="mt-6 p-6 rounded-2xl bg-slate-950/50 border border-emerald-500/10">
              <p className="text-emerald-300 font-black text-xl leading-relaxed italic">
                "Your Gemini API Key is stored strictly in your browser's LocalStorage. It never touches our databases, and is sent directly from your browser to Google AI Studio when extracting designs."
              </p>
            </div>
          </section>

          <section className="space-y-6 text-slate-400 leading-relaxed font-medium">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">1. Data Collection</h3>
              <p>We do not collect personal information (PII) like names, email addresses, or phone numbers unless you explicitly provide them for support or newsletters. All UI extraction data is processed locally using your provided API key.</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">2. Cookies & Local Storage</h3>
              <p>We use Local Storage to save your preferred settings and your Gemini API Key. This ensures you don't have to re-enter your key every time you use the tool. We do not use persistent tracking cookies or selling data to third parties.</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">3. Third Party Services</h3>
              <p>UI2MD relies on the following third parties:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Google AI (Gemini):</strong> Your 디자인 data and API Key are sent to Google to perform the extraction. Please refer to Google's privacy policy for AI Studio usage.</li>
                <li><strong>Vercel:</strong> Our platform is hosted on Vercel, which collects standard server-side logs during request processing.</li>
              </ul>
            </div>
          </section>

        </div>
      </main>

      {/* Footer link back */}
      <footer className="relative z-10 py-12 px-6 text-center border-t border-slate-900 mt-20">
        <Link to="/app" className="text-indigo-400 hover:underline font-bold">Ready to extract securely? Back to App</Link>
      </footer>

    </div>
  );
}

export default PrivacyPolicy;
