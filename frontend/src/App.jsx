import React, { useState } from 'react';
import { Copy, Sparkles, Loader2, Link as LinkIcon, CheckCircle2, ChevronRight, Code2, AlertCircle } from 'lucide-react';

function App() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleExtract = async (e) => {
    e.preventDefault();
    if (!url) {
      setError('Please enter a valid URL.');
      return;
    }
    try {
      new URL(url);
    } catch (_) {
      setError('Invalid URL format. Include http/https.');
      return;
    }
    
    setLoading(true);
    setError('');
    setResult(null);
    setCopied(false);

    try {
      const backendUrl = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${backendUrl}/api/scrape`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      const data = await response.json();
      
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to extract design framework.');
      }
      
      setResult(data.markdown || JSON.stringify(data.designTokens, null, 2));
    } catch (err) {
      setError(err.message || 'Error occurred while contacting backend scraper.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30 flex justify-center p-6 sm:p-12 relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-indigo-500/20 to-transparent pointer-events-none" />
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none opacity-60" />

      <main className="relative w-full max-w-4xl flex flex-col gap-8 mt-12 z-10">
        
        {/* Header / Hero */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center p-3 sm:p-4 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 shadow-2xl mb-2">
            <Sparkles className="w-8 h-8 text-indigo-400" />
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-100 to-indigo-400 drop-shadow-sm">
            UI2MD
          </h1>
          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto font-medium">
            Instantly extract computed CSS and design components from any website into a highly structured, premium Markdown file.
          </p>
        </div>

        {/* Input Card */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-2 rounded-2xl shadow-2xl hover:border-slate-700 transition">
          <form onSubmit={handleExtract} className="flex flex-col sm:flex-row gap-2 relative">
            <div className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-500 z-10 pointer-events-none">
              <LinkIcon size={20} />
            </div>
            <input
              type="url"
              className="flex-1 bg-slate-950/50 pl-11 pr-4 py-4 rounded-xl border border-slate-800 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition w-full"
              placeholder="Enter target URL (e.g., https://stripe.com)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={loading}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold transition disabled:opacity-70 shadow-lg shadow-indigo-500/25"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5 flex-shrink-0" />
                  Generating...
                </>
              ) : (
                <>
                  Extract Design
                  <ChevronRight size={18} className="flex-shrink-0" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex animate-in fade-in slide-in-from-top-4 items-center gap-3 p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl relative overflow-hidden">
            <div className="absolute inset-y-0 left-0 w-1 bg-rose-500"></div>
            <AlertCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Output Section */}
        {result && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-500 bg-slate-900/80 backdrop-blur-2xl rounded-2xl border border-slate-800 overflow-hidden shadow-2xl flex flex-col">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 py-4 bg-slate-950/80 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                <h3 className="font-semibold text-slate-200">Generated DESIGN.md</h3>
              </div>
              <button
                onClick={copyToClipboard}
                className="flex flex-shrink-0 items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 active:bg-slate-600 rounded-lg text-sm font-medium text-slate-200 transition-colors border border-slate-700 w-full sm:w-auto"
              >
                {copied ? (
                  <><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Copied!</>
                ) : (
                  <><Copy className="w-4 h-4 text-slate-400" /> Copy to Clipboard</>
                )}
              </button>
            </div>
            
            <div className="p-6 overflow-auto max-h-[600px] text-sm text-slate-300 font-mono scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
              <pre className="whitespace-pre-wrap">{result}</pre>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

export default App;
