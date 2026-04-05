import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Scale } from 'lucide-react';

function TermsOfService() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30 relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-indigo-500/10 to-transparent pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none opacity-40" />

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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold tracking-widest uppercase mb-4">
              <Scale size={14} />
              Fair Usage
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight">Terms of Service</h1>
            <p className="text-slate-400 font-medium">Last updated: April 6, 2026</p>
          </header>

          <section className="space-y-8 text-slate-400 leading-relaxed font-medium">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">1. Use of Service</h3>
              <p>UI2MD provides a web design extraction tool powered by Gemini AI. By using our service, you agree to comply with all applicable local, state, national, and international laws and regulations.</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">2. Bring Your Own Key (BYOK) Model</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Users must provide their own Gemini API Key to use the extraction tool.</li>
                <li>You are solely responsible for the security and usage of your API Key.</li>
                <li>UI2MD is not responsible for any costs incurred through your API Key.</li>
                <li>We do not store your key on our servers; it is saved only in your local browser storage.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">3. Intellectual Property</h3>
              <p>The code and design resulting from the tool belong to the respective owner of the website being analyzed. UI2MD does not claim ownership over the extracted design system, nor is it responsible for copyright infringement on the user's part.</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">4. Limitation of Liability</h3>
              <p>UI2MD is provided "as is" without any warranties. We are not liable for any damages arising from your use of the tool, including but not limited to loss of data, loss of business, or any direct or indirect damages.</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">5. Termination</h3>
              <p>We reserve the right to terminate access to the service at our sole discretion, without notice, if we believe your use of UI2MD violates these terms or any laws.</p>
            </div>
          </section>

        </div>
      </main>

      {/* Footer link back */}
      <footer className="relative z-10 py-12 px-6 text-center border-t border-slate-900 mt-20">
        <Link to="/app" className="text-indigo-400 hover:underline font-bold">Ready to start? Back to Tool</Link>
      </footer>

    </div>
  );
}

export default TermsOfService;
