import puppeteer from 'puppeteer-core';

async function registerFirstUser() {
  console.log('Navigating to http://localhost:3000/admin/create-first-user ...');
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new'
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/admin/create-first-user', { waitUntil: 'networkidle2' });
  
  // Wait for the email input to be rendered
  await page.waitForSelector('input[name="email"], input[type="email"]', { timeout: 15000 });
  console.log('Found email input, typing credentials...');

  await page.type('input[name="email"], input[type="email"]', 'admin@techcentera.com');

  const passwordInputs = await page.$$('input[type="password"]');
  console.log(`Found ${passwordInputs.length} password inputs`);
  if (passwordInputs[0]) await passwordInputs[0].type('TechCentera2026!');
  if (passwordInputs[1]) await passwordInputs[1].type('TechCentera2026!');

  const nameInput = await page.$('input[name="name"]');
  if (nameInput) await nameInput.type('TechCentera Admin');

  const submitBtn = await page.$('button[type="submit"]');
  if (submitBtn) {
    console.log('Clicking Create user button...');
    await submitBtn.click();
    await new Promise(r => setTimeout(r, 4000));
  }

  console.log('URL after submission:', page.url());
  await page.screenshot({ path: 'C:\\Users\\DK\\Desktop\\Business Website\\techcentera\\design\\screenshots\\built\\admin_registered.png' });
  console.log('Admin registration screenshot saved!');

  await browser.close();
}

registerFirstUser().catch(console.error);
