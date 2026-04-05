import React, { useState, useEffect } from 'react';
import { Copy, Sparkles, Loader2, Link as LinkIcon, CheckCircle2, ChevronRight, Code2, AlertCircle, Settings, X, KeyRound, Eye, EyeOff, Download, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

function ExtractorApp() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  // BYOK state
  const [showSettings, setShowSettings] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [savedKey, setSavedKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [keySaved, setKeySaved] = useState(false);

  // Load saved key from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('userGeminiKey');
    if (stored) setSavedKey(stored);
  }, []);

  const handleSaveKey = () => {
    if (!apiKeyInput.trim()) return;
    localStorage.setItem('userGeminiKey', apiKeyInput.trim());
    setSavedKey(apiKeyInput.trim());
    setKeySaved(true);
    setTimeout(() => { setKeySaved(false); setShowSettings(false); }, 1200);
  };

  const handleClearKey = () => {
    localStorage.removeItem('userGeminiKey');
    setSavedKey('');
    setApiKeyInput('');
  };

  const handleExtract = async (e) => {
    e.preventDefault();

    if (!savedKey) {
      setError('Please set your Gemini API Key first. Click the ⚙️ Settings icon.');
      return;
    }
    if (!url) { setError('Please enter a valid URL.'); return; }
    try { new URL(url); } catch (_) {
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
        headers: {
          'Content-Type': 'application/json',
          'x-gemini-key': savedKey,
        },
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

  const handleDownload = () => {
    if (result) {
      const blob = new Blob([result], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'ui2md-design.md';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30 flex justify-center p-6 sm:p-12 relative overflow-hidden">

      {/* Background decoration */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-indigo-500/20 to-transparent pointer-events-none" />
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none opacity-60" />

      {/* Navigation / Actions */}
      <div className="absolute top-6 left-6 z-20 flex gap-2">
        <Link 
          to="/" 
          className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-400 hover:text-slate-200 transition-all backdrop-blur-sm flex items-center gap-2 text-sm font-medium"
        >
          <ArrowLeft size={18} />
          Back
        </Link>
      </div>

      {/* Settings Button */}
      <button
        onClick={() => { setShowSettings(true); setApiKeyInput(savedKey); }}
        title="API Key Settings"
        className="absolute top-6 right-6 z-20 p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-400 hover:text-slate-200 transition-all backdrop-blur-sm"
      >
        <Settings size={20} />
      </button>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" onClick={() => setShowSettings(false)} />
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 flex flex-col gap-5">
            {/* Modal Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-indigo-400" />
                <h2 className="font-bold text-slate-100 text-lg">API Key Settings</h2>
              </div>
              <button onClick={() => setShowSettings(false)} className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition">
                <X size={18} />
              </button>
            </div>

            <p className="text-sm text-slate-400">
              UI2MD uses a <strong className="text-slate-300">Bring Your Own Key</strong> model. Your Gemini API key is stored only in your browser's localStorage and is never saved on any server.
            </p>

            {/* Key Input */}
            <div className="relative flex flex-col gap-2">
              <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Gemini API Key</label>
              <div className="relative">
                <input
                  type={showKey ? 'text' : 'password'}
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  placeholder="AIza..."
                  className="w-full bg-slate-950/80 border border-slate-700 rounded-xl px-4 py-3 pr-12 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowKey(p => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition"
                >
                  {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-indigo-400 hover:text-indigo-300 transition mt-1"
              >
                → Get a free Gemini API Key from Google AI Studio
              </a>
            </div>

            {/* Status */}
            {savedKey && (
              <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-2">
                <CheckCircle2 size={14} />
                Key saved in localStorage
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleSaveKey}
                disabled={!apiKeyInput.trim()}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 rounded-xl font-semibold text-sm transition"
              >
                {keySaved ? <><CheckCircle2 size={16} className="text-emerald-300" /> Saved!</> : 'Save Key'}
              </button>
              {savedKey && (
                <button
                  onClick={handleClearKey}
                  className="px-4 py-3 bg-slate-800 hover:bg-rose-500/10 hover:text-rose-400 border border-slate-700 rounded-xl text-sm text-slate-400 transition"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <main className="relative w-full max-w-4xl flex flex-col gap-8 mt-12 z-10">

        {/* Hero */}
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
          {/* Key status badge */}
          <div className="flex justify-center">
            {savedKey ? (
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1">
                <CheckCircle2 size={12} /> API Key Set
              </span>
            ) : (
              <button
                onClick={() => setShowSettings(true)}
                className="inline-flex items-center gap-1.5 text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1 hover:bg-amber-500/20 transition"
              >
                <KeyRound size={12} /> Set your Gemini API Key to get started
              </button>
            )}
          </div>
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
            />
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold transition disabled:opacity-70 shadow-lg shadow-indigo-500/25"
            >
              {loading ? (
                <><Loader2 className="animate-spin w-5 h-5 flex-shrink-0" />Generating...</>
              ) : (
                <>Extract Design<ChevronRight size={18} className="flex-shrink-0" /></>
              )}
            </button>
          </form>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-3 p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl relative overflow-hidden">
            <div className="absolute inset-y-0 left-0 w-1 bg-rose-500" />
            <AlertCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Output */}
        {result && (
          <div className="bg-slate-900/80 backdrop-blur-2xl rounded-2xl border border-slate-800 overflow-hidden shadow-2xl flex flex-col">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 py-4 bg-slate-950/80 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                <h3 className="font-semibold text-slate-200">Generated DESIGN.md</h3>
              </div>
              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                <button
                  onClick={copyToClipboard}
                  className="flex flex-1 sm:flex-none items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 active:bg-slate-600 rounded-lg text-sm font-medium text-slate-200 transition-colors border border-slate-700"
                >
                  {copied ? <><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Copied!</> : <><Copy className="w-4 h-4 text-slate-400" /> Copy</>}
                </button>
                <button
                  onClick={handleDownload}
                  className="flex flex-1 sm:flex-none items-center justify-center gap-2 px-4 py-2 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 hover:text-indigo-300 rounded-lg text-sm font-medium transition-colors border border-indigo-500/20"
                >
                  <Download className="w-4 h-4" /> Download .md
                </button>
              </div>
            </div>
            <div className="p-6 overflow-auto max-h-[600px] text-sm text-slate-300 font-mono">
              <pre className="whitespace-pre-wrap">{result}</pre>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

export default ExtractorApp;
