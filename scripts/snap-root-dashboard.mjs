import puppeteer from 'puppeteer-core';

async function snapDashboard() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await page.goto('http://localhost:3000/admin/login', { waitUntil: 'networkidle2' });
  await page.type('input[name="email"]', 'admin@techcentera.com');
  await page.type('input[name="password"]', 'TechCentera2026!');
  await page.click('button[type="submit"]');
  await new Promise((r) => setTimeout(r, 4000));

  await page.goto('http://localhost:3000/admin', { waitUntil: 'networkidle2' });
  await new Promise((r) => setTimeout(r, 2000));
  await page.screenshot({ path: 'C:\\Users\\DK\\Desktop\\Business Website\\techcentera\\design\\screenshots\\built\\custom_admin_root.png' });
  console.log('Root dashboard screenshot saved!');

  await browser.close();
}

snapDashboard();
