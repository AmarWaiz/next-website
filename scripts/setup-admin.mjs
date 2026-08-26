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
  
  console.log('URL:', page.url());

  // Email
  const emailInput = await page.$('input[name="email"], input[type="email"]');
  if (emailInput) {
    await emailInput.type('admin@techcentera.com');
  }

  // Passwords
  const passwordInputs = await page.$$('input[type="password"]');
  console.log(`Password inputs found: ${passwordInputs.length}`);
  if (passwordInputs[0]) await passwordInputs[0].type('TechCentera2026!');
  if (passwordInputs[1]) await passwordInputs[1].type('TechCentera2026!');

  // Name / other text inputs
  const nameInput = await page.$('input[name="name"]');
  if (nameInput) {
    await nameInput.type('TechCentera Admin');
  }

  // Submit button
  const submitBtn = await page.$('button[type="submit"]');
  if (submitBtn) {
    console.log('Clicking Create button...');
    await submitBtn.click();
    await new Promise(r => setTimeout(r, 4000));
  }

  console.log('URL after creation:', page.url());
  await page.screenshot({ path: 'C:\\Users\\DK\\Desktop\\Business Website\\techcentera\\design\\screenshots\\built\\admin_logged_in_dashboard.png' });
  console.log('Logged-in dashboard screenshot saved!');

  await browser.close();
}

registerFirstUser().catch(console.error);
