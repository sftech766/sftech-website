import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const url    = process.argv[2] || 'http://localhost:3000';
const label  = process.argv[3] || '';
const width  = parseInt(process.argv[4], 10) || 1440;
const height = parseInt(process.argv[5], 10) || 900;
const dir    = path.join(__dirname, 'temporary screenshots');

if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const existing = fs.readdirSync(dir)
  .map(f => f.match(/^screenshot-(\d+)/))
  .filter(Boolean)
  .map(m => parseInt(m[1], 10));
const N = existing.length ? Math.max(...existing) + 1 : 1;
const filename = label ? `screenshot-${N}-${label}.png` : `screenshot-${N}.png`;
const outPath  = path.join(dir, filename);

const browser = await puppeteer.launch({
  executablePath: 'C:/Users/bhavya/.cache/puppeteer/chrome/win64-148.0.7778.97/chrome-win64/chrome.exe',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});
const page = await browser.newPage();
await page.setViewport({ width, height, deviceScaleFactor: 2 });
await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
await new Promise(r => setTimeout(r, 800));

// Scroll through the page to trigger IntersectionObserver animations
await page.evaluate(async () => {
  const totalHeight = document.body.scrollHeight;
  const step = 250;
  for (let y = 0; y <= totalHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise(r => setTimeout(r, 60));
  }
  window.scrollTo(0, 0);
});
await new Promise(r => setTimeout(r, 1400));

await page.screenshot({ path: outPath, fullPage: true });
await browser.close();
console.log(`Saved: ${outPath}`);
