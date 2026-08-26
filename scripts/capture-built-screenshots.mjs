import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = 'C:\\Users\\DK\\Desktop\\Business Website\\techcentera\\design\\screenshots\\built';
const rootOutDir = 'C:\\Users\\DK\\Desktop\\Business Website\\design\\screenshots\\built';

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
if (!fs.existsSync(rootOutDir)) fs.mkdirSync(rootOutDir, { recursive: true });

const pages = [
  { name: 'home', url: 'http://localhost:3005/' },
  { name: 'services_hub', url: 'http://localhost:3005/services' },
  { name: 'service_ai_receptionist', url: 'http://localhost:3005/services/ai-receptionist' },
  { name: 'about', url: 'http://localhost:3005/about' },
  { name: 'contact', url: 'http://localhost:3005/contact' },
  { name: 'blog_index', url: 'http://localhost:3005/blog' },
  { name: 'blog_post', url: 'http://localhost:3005/blog/governed-ai-vs-black-box' },
];

async function captureBuiltPages() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  for (const p of pages) {
    console.log(`Capturing screenshots for ${p.name} (${p.url})...`);

    // Desktop
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(p.url, { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 600));

    const deskPath = path.join(outDir, `${p.name}_desktop.png`);
    await page.screenshot({ path: deskPath });
    fs.copyFileSync(deskPath, path.join(rootOutDir, `${p.name}_desktop.png`));
    console.log(` - Desktop captured: ${p.name}_desktop.png`);

    // Mobile
    await page.setViewport({ width: 390, height: 844 });
    await page.goto(p.url, { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 600));

    const mobPath = path.join(outDir, `${p.name}_mobile.png`);
    await page.screenshot({ path: mobPath });
    fs.copyFileSync(mobPath, path.join(rootOutDir, `${p.name}_mobile.png`));
    console.log(` - Mobile captured: ${p.name}_mobile.png`);
  }

  await browser.close();
  console.log('\nAll built page screenshots captured successfully!');
}

captureBuiltPages();
