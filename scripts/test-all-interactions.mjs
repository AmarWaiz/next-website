import puppeteer from 'puppeteer-core';

async function runTests() {
  console.log('Starting end-to-end interaction tests...\n');
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new'
  });

  const page = await browser.newPage();

  // Test 1: Desktop - FAQ Toggle & Carousel Arrows
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

  console.log('--- TEST 1: REVIEWS CAROUSEL ---');
  const quote1 = await page.$eval('blockquote', el => el.innerText.trim());
  console.log('Initial Quote:', quote1);

  // Click Next Button
  const nextBtn = await page.waitForSelector('button[aria-label="Next Review"]');
  await nextBtn.click();
  await new Promise(r => setTimeout(r, 400));
  const quote2 = await page.$eval('blockquote', el => el.innerText.trim());
  console.log('Quote after clicking Next:', quote2);
  console.log('Carousel Next Changed successfully:', quote1 !== quote2 ? 'PASS ✅' : 'FAIL ❌');

  // Click Prev Button
  const prevBtn = await page.waitForSelector('button[aria-label="Previous Review"]');
  await prevBtn.click();
  await new Promise(r => setTimeout(r, 400));
  const quote3 = await page.$eval('blockquote', el => el.innerText.trim());
  console.log('Quote after clicking Prev:', quote3);
  console.log('Carousel Prev Returned successfully:', quote1 === quote3 ? 'PASS ✅' : 'FAIL ❌');

  console.log('\n--- TEST 2: FAQ ACCORDION ---');
  // Click the 2nd FAQ question
  const faqButtons = await page.$$('section button[aria-expanded]');
  console.log(`Found ${faqButtons.length} FAQ buttons`);
  if (faqButtons.length > 1) {
    const secondFaq = faqButtons[1];
    const initialExpanded = await secondFaq.evaluate(el => el.getAttribute('aria-expanded'));
    console.log('2nd FAQ initial aria-expanded:', initialExpanded);
    
    await secondFaq.click();
    await new Promise(r => setTimeout(r, 300));
    
    const afterClickExpanded = await secondFaq.evaluate(el => el.getAttribute('aria-expanded'));
    console.log('2nd FAQ after click aria-expanded:', afterClickExpanded);
    console.log('FAQ Open Toggle:', afterClickExpanded === 'true' ? 'PASS ✅' : 'FAIL ❌');
  }

  console.log('\n--- TEST 3: MOBILE HAMBURGER MENU ---');
  await page.setViewport({ width: 390, height: 844 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

  const hamburgerBtn = await page.waitForSelector('#mobile-menu-toggle-btn');
  console.log('Found mobile hamburger button. Clicking...');
  await hamburgerBtn.click();
  await new Promise(r => setTimeout(r, 400));

  const mobileOverlay = await page.$('#mobile-menu-overlay');
  const overlayVisible = mobileOverlay ? await mobileOverlay.evaluate(el => el.offsetHeight > 0) : false;
  console.log('Mobile menu overlay visible:', overlayVisible ? 'PASS ✅' : 'FAIL ❌');

  if (mobileOverlay) {
    const mobileLinks = await page.evaluate(() => {
      const overlay = document.querySelector('#mobile-menu-overlay');
      if (!overlay) return [];
      return Array.from(overlay.querySelectorAll('a')).map(a => a.innerText.trim());
    });
    console.log('Mobile navigation links found in overlay:\n', mobileLinks);
  }

  await page.screenshot({ path: 'C:\\Users\\DK\\Desktop\\Business Website\\techcentera\\design\\screenshots\\built\\mobile_menu_open.png' });
  console.log('Mobile menu screenshot captured successfully');

  await browser.close();
  console.log('\nAll interaction tests completed!');
}

runTests();
