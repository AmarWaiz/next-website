import puppeteer from 'puppeteer-core';

async function testMediaUploadAndMenu() {
  console.log('Testing Media Upload & Navigation Settings in Payload CMS...');
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new'
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // 1. Login
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

  // 2. Go to media create
  console.log('Navigating to Media collection...');
  await page.goto('http://localhost:3000/admin/collections/media/create-new', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));

  const fileInput = await page.$('input[type="file"]');
  if (fileInput) {
    const testImgPath = 'C:\\Users\\DK\\Desktop\\Business Website\\techcentera\\public\\images\\ai-receptionist.jpg';
    await fileInput.uploadFile(testImgPath);
    console.log('File selected for upload.');
    await new Promise(r => setTimeout(r, 2000));

    const saveBtn = await page.$('button#action-save, button.btn--style-primary, button[type="button"].form-submit');
    if (saveBtn) {
      console.log('Clicking Save without entering Alt text...');
      await saveBtn.click();
      await new Promise(r => setTimeout(r, 4000));
    }
  }

  await page.screenshot({ path: 'C:\\Users\\DK\\Desktop\\Business Website\\techcentera\\design\\screenshots\\built\\media_upload_result.png' });
  console.log('Media upload result screenshot captured!');

  // 3. Go to Site Settings (Header Menu Navigation)
  console.log('Navigating to Site Settings...');
  await page.goto('http://localhost:3000/admin/globals/site-settings', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 3000));
  await page.screenshot({ path: 'C:\\Users\\DK\\Desktop\\Business Website\\techcentera\\design\\screenshots\\built\\site_settings_menu.png' });
  console.log('Site settings screenshot captured!');

  await browser.close();
  console.log('Test completed successfully!');
}

testMediaUploadAndMenu().catch(console.error);
