import puppeteer from 'puppeteer-core';

async function testFullCMS() {
  console.log('Testing full CMS login and Pages collection...');
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new'
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // 1. Go to login
  await page.goto('http://localhost:3000/admin/login', { waitUntil: 'networkidle2' });
  const emailInput = await page.$('input[name="email"]');
  const passwordInput = await page.$('input[name="password"]');
  if (emailInput && passwordInput) {
    await emailInput.type('admin@techcentera.com');
    await passwordInput.type('TechCentera2026!');
    const submitBtn = await page.$('button[type="submit"]');
    if (submitBtn) await submitBtn.click();
    await new Promise(r => setTimeout(r, 4000));
  }

  console.log('Logged in URL:', page.url());

  // 2. Go to Pages collection
  await page.goto('http://localhost:3000/admin/collections/pages', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: 'C:\\Users\\DK\\Desktop\\Business Website\\techcentera\\design\\screenshots\\built\\pages_collection.png' });
  console.log('Pages collection screenshot captured!');

  // 3. Open Homepage document
  const firstRow = await page.$('tbody tr a, .cell-title a, a[href*="/admin/collections/pages/"]');
  if (firstRow) {
    console.log('Opening Homepage document for editing...');
    await firstRow.click();
    await new Promise(r => setTimeout(r, 3000));
    await page.screenshot({ path: 'C:\\Users\\DK\\Desktop\\Business Website\\techcentera\\design\\screenshots\\built\\homepage_editor.png' });
    console.log('Homepage editor screenshot captured!');
  }

  await browser.close();
  console.log('All CMS tests finished successfully!');
}

testFullCMS().catch(console.error);
