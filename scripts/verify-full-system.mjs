import puppeteer from 'puppeteer-core';

async function verifyAll() {
  console.log('Verifying Payload CMS and Frontend Pages...');
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new'
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // 1. Login to Admin
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

  // 2. Admin Dashboard
  await page.screenshot({ path: 'C:\\Users\\DK\\Desktop\\Business Website\\techcentera\\design\\screenshots\\built\\admin_dashboard_final.png' });
  console.log('Admin dashboard screenshot saved.');

  // 3. Pages Collection
  await page.goto('http://localhost:3000/admin/collections/pages', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: 'C:\\Users\\DK\\Desktop\\Business Website\\techcentera\\design\\screenshots\\built\\all_pages_cms.png' });
  console.log('All Pages screenshot saved.');

  // 4. Services Collection
  await page.goto('http://localhost:3000/admin/collections/services', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: 'C:\\Users\\DK\\Desktop\\Business Website\\techcentera\\design\\screenshots\\built\\all_services_cms.png' });
  console.log('All Services screenshot saved.');

  // 5. Blog Posts Collection
  await page.goto('http://localhost:3000/admin/collections/blog-posts', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: 'C:\\Users\\DK\\Desktop\\Business Website\\techcentera\\design\\screenshots\\built\\all_blog_posts_cms.png' });
  console.log('All Blog Posts screenshot saved.');

  // 6. Live Frontend Pages
  await page.goto('http://localhost:3000/services', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'C:\\Users\\DK\\Desktop\\Business Website\\techcentera\\design\\screenshots\\built\\live_services_page.png' });
  console.log('Live Services page screenshot saved.');

  await browser.close();
  console.log('🎉 Verification completed successfully!');
}

verifyAll().catch(console.error);
