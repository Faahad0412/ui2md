const chromium = require('@sparticuz/chromium');
const puppeteer = require('puppeteer-core');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client (for future use)
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

module.exports = async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  // BYOK: Extract user's Gemini API key from request header
  const geminiKey = req.headers['x-gemini-key'];
  if (!geminiKey) {
    return res.status(401).json({ error: 'Unauthorized: Please provide your Gemini API Key via the Settings panel.' });
  }

  let browser = null;
  try {
    // Detect local development vs Vercel production
    const isLocal = process.env.NODE_ENV !== 'production' && !process.env.VERCEL;

    if (isLocal) {
      // Local development: use installed puppeteer if available
      try {
        const puppeteerFull = require('puppeteer');
        browser = await puppeteerFull.launch({ headless: true });
      } catch (_) {
        // Fallback: try puppeteer-core with system chrome
        const executablePath =
          process.platform === 'win32'
            ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
            : process.platform === 'darwin'
            ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
            : '/usr/bin/google-chrome';

        browser = await puppeteer.launch({
          executablePath,
          headless: true,
          args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
      }
    } else {
      // Vercel production: use @sparticuz/chromium
      browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
      });
    }

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

    const designTokens = await page.evaluate(() => {
      const getStyle = (el, prop) =>
        el ? window.getComputedStyle(el).getPropertyValue(prop) : null;

      const body = document.body;
      const h1 = document.querySelector('h1');
      const p = document.querySelector('p');
      const button = document.querySelector('button');

      return {
        body: {
          backgroundColor: getStyle(body, 'background-color'),
          color: getStyle(body, 'color'),
        },
        typography: {
          h1FontFamily: getStyle(h1, 'font-family'),
          pFontFamily: getStyle(p, 'font-family'),
        },
        button: {
          backgroundColor: getStyle(button, 'background-color'),
          color: getStyle(button, 'color'),
          borderRadius: getStyle(button, 'border-radius'),
        },
      };
    });

    await browser.close();

    // Generate Markdown via Gemini AI using USER's key (BYOK)
    let markdown = '';
    try {
      const genAI = new GoogleGenerativeAI(geminiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
      const prompt = `Act as an expert UI designer. Take this raw CSS JSON and convert it into a highly structured, premium DESIGN.md format. Include sections for Color Palette, Typography, and Component Styles. JSON: ${JSON.stringify(designTokens)}`;
      const result = await model.generateContent(prompt);
      markdown = result.response.text();
    } catch (aiError) {
      return res.status(400).json({ error: `Gemini AI Error: ${aiError.message}. Check your API key.` });
    }

    // Future: Save to Supabase
    // if (supabase) {
    //   await supabase.from('extractions').insert({ url, markdown, tokens: designTokens });
    // }

    return res.status(200).json({ success: true, url, markdown, designTokens });
  } catch (error) {
    console.error('Scraping error:', error);
    if (browser) await browser.close();
    return res.status(500).json({ error: error.message || 'Failed to scrape the provided URL' });
  }
};
