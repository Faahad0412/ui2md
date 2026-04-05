require('dotenv').config();
const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = process.env.PORT || 5000;

const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
app.use(cors({
  origin: [frontendUrl, 'http://localhost:5173'],
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());

app.post('/api/scrape', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  let browser = null;
  try {
    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0' });
    
    const designTokens = await page.evaluate(() => {
      const getStyle = (el, prop) => el ? window.getComputedStyle(el).getPropertyValue(prop) : null;
      
      const body = document.body;
      const h1 = document.querySelector('h1');
      const p = document.querySelector('p');
      const button = document.querySelector('button');

      return {
        body: {
          backgroundColor: getStyle(body, 'background-color'),
          color: getStyle(body, 'color')
        },
        typography: {
          h1FontFamily: getStyle(h1, 'font-family'),
          pFontFamily: getStyle(p, 'font-family')
        },
        button: {
          backgroundColor: getStyle(button, 'background-color'),
          color: getStyle(button, 'color'),
          borderRadius: getStyle(button, 'border-radius')
        }
      };
    });
    
    await browser.close();
    
    let markdown = "";
    if (process.env.GEMINI_API_KEY === 'your_api_key_here' || !process.env.GEMINI_API_KEY) {
      markdown = `# 🎨 DESIGN.md (Mocked Data)
> **Note:** Please add your real GEMINI_API_KEY in backend/.env to get an actual generated output.

## Color Palette
* Background: \`${designTokens.body.backgroundColor}\`
* Primary Text: \`${designTokens.body.color}\`
* Button: \`${designTokens.button.backgroundColor}\`

## Typography
* Heading (H1): \`${designTokens.typography.h1FontFamily}\`
* Paragraph (P): \`${designTokens.typography.pFontFamily}\``;
    } else {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const promptText = `Act as an expert UI designer. Take this raw CSS JSON and convert it into a highly structured, premium DESIGN.md format. Include sections for Color Palette, Typography, and Component Styles. JSON: ${JSON.stringify(designTokens)}`;
      
      const result = await model.generateContent(promptText);
      markdown = result.response.text();
    }
    
    res.json({ success: true, url, markdown, designTokens });
  } catch (error) {
    console.error('Error scraping URL:', error);
    if (browser) {
      await browser.close();
    }
    res.status(500).json({ error: 'Failed to scrape the provided URL' });
  }
});

app.listen(port, () => {
  console.log(`Backend server setup and running at http://localhost:${port}`);
});
