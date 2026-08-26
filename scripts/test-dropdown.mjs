import puppeteer from 'puppeteer-core';

async function testDropdown() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new'
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3005', { waitUntil: 'networkidle2' });

  // Hover over the Services button
  const servicesBtn = await page.waitForSelector('button[aria-haspopup="true"]');
  await servicesBtn.hover();
  await new Promise(r => setTimeout(r, 500));

  const links = await page.evaluate(() => {
    const anchors = Array.from(document.querySelectorAll('a[href^="/services"]'));
    return anchors.map(a => a.innerText.trim());
  });

  console.log('Services Submenu links found:', links.length);
  console.log(links);

  await page.screenshot({ path: 'C:\\Users\\DK\\Desktop\\Business Website\\techcentera\\design\\screenshots\\built\\dropdown_desktop.png' });
  console.log('Dropdown screenshot captured successfully');

  await browser.close();
}

testDropdown();
