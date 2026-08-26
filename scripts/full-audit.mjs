import puppeteer from 'puppeteer-core';
import fs from 'fs';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

function rgbToHex(rgb) {
  if (!rgb || rgb === 'transparent' || rgb === 'rgba(0, 0, 0, 0)') return 'transparent';
  if (rgb.startsWith('#')) return rgb;
  const match = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)$/);
  if (!match) return rgb;
  const r = parseInt(match[1]).toString(16).padStart(2, '0');
  const g = parseInt(match[2]).toString(16).padStart(2, '0');
  const b = parseInt(match[3]).toString(16).padStart(2, '0');
  if (match[4] !== undefined && parseFloat(match[4]) < 1) {
    const a = Math.round(parseFloat(match[4]) * 255).toString(16).padStart(2, '0');
    return `#${r}${g}${b}${a}`;
  }
  return `#${r}${g}${b}`;
}

async function run() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: false, // Non-headless or headless with user-agent
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-blink-features=AutomationControlled',
      '--window-size=1440,900'
    ]
  });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36');
  await page.setViewport({ width: 1440, height: 900 });

  console.log('Navigating to https://techcentera.com...');
  await page.goto('https://techcentera.com', { waitUntil: 'networkidle2', timeout: 60000 });

  // Wait for challenge / redirection if any
  console.log('Waiting 8s for challenge / load...');
  await new Promise(r => setTimeout(r, 8000));

  console.log('Page URL:', page.url());
  console.log('Page Title:', await page.title());

  // Capture real full screenshot now that challenge has cleared!
  await page.screenshot({ path: 'C:\\Users\\DK\\Desktop\\Business Website\\techcentera\\design\\screenshots\\home_desktop.png', fullPage: false });
  fs.copyFileSync('C:\\Users\\DK\\Desktop\\Business Website\\techcentera\\design\\screenshots\\home_desktop.png', 'C:\\Users\\DK\\Desktop\\Business Website\\design\\screenshots\\home_desktop.png');

  // Extract all CSS variables on :root
  const rootVars = await page.evaluate(() => {
    const vars = {};
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules || []) {
          if (rule.selectorText === ':root') {
            for (let i = 0; i < rule.style.length; i++) {
              const name = rule.style[i];
              vars[name] = rule.style.getPropertyValue(name).trim();
            }
          }
        }
      } catch (e) {}
    }
    return vars;
  });

  console.log('Extracted :root CSS variables:', rootVars);

  // Sample elements
  const selectors = [
    { label: 'Header / Navbar', sel: 'header, .site-header, .elementor-location-header, .elementor-nav-menu' },
    { label: 'Header Nav Link', sel: '.elementor-nav-menu .elementor-item' },
    { label: 'Hero Section', sel: '.elementor-top-section:first-of-type, .elementor-element-24c1bb6, .e-con:first-of-type' },
    { label: 'Hero Heading (H1)', sel: 'h1, .elementor-heading-title' },
    { label: 'Section Heading (H2)', sel: 'h2' },
    { label: 'Body Paragraph', sel: 'p, .elementor-text-editor' },
    { label: 'Primary Button (Default)', sel: 'a.elementor-button, .elementor-button, .btn' },
    { label: 'Service Card', sel: '.elementor-widget-icon-box, .elementor-card, .e-con-boxed, [data-element_type="container"]' },
    { label: 'Stat Counter Number', sel: '.elementor-counter-number, .elementor-counter-number-wrapper, .elementor-counter' },
    { label: 'Stat Counter Label', sel: '.elementor-counter-title' },
    { label: 'Borders / Dividers', sel: '.elementor-divider-separator, hr' },
    { label: 'Footer', sel: 'footer, .site-footer, .elementor-location-footer' }
  ];

  const results = [];
  for (const s of selectors) {
    const data = await page.evaluate((item) => {
      const el = document.querySelector(item.sel);
      if (!el) return { label: item.label, selector: item.sel, status: 'Not found' };
      const comp = window.getComputedStyle(el);
      return {
        label: item.label,
        selector: item.sel,
        actualSelector: el.tagName.toLowerCase() + (el.className ? '.' + el.className.trim().split(/\s+/).join('.') : ''),
        bgColor: comp.backgroundColor,
        color: comp.color,
        borderColor: comp.borderColor,
        fontFamily: comp.fontFamily,
        fontSize: comp.fontSize,
        fontWeight: comp.fontWeight,
        lineHeight: comp.lineHeight,
        borderRadius: comp.borderRadius,
        padding: comp.padding
      };
    }, s);

    if (data.bgColor) {
      data.bgHex = rgbToHex(data.bgColor);
      data.colorHex = rgbToHex(data.color);
      data.borderHex = rgbToHex(data.borderColor);
    }
    results.push(data);
  }

  // Primary button hover test
  const btnHover = await page.evaluate(() => {
    const btn = document.querySelector('a.elementor-button, .elementor-button');
    if (!btn) return null;
    btn.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
    const comp = window.getComputedStyle(btn);
    return {
      bgColor: comp.backgroundColor,
      color: comp.color,
      borderColor: comp.borderColor
    };
  });
  if (btnHover) {
    results.push({
      label: 'Primary Button (hover state)',
      selector: 'a.elementor-button:hover',
      bgHex: rgbToHex(btnHover.bgColor),
      colorHex: rgbToHex(btnHover.color),
      borderHex: rgbToHex(btnHover.borderColor)
    });
  }

  console.log('\n--- SAMPLE RESULTS ---');
  console.log(JSON.stringify(results, null, 2));

  fs.writeFileSync('C:\\Users\\DK\\Desktop\\Business Website\\techcentera\\design\\audit-results.json', JSON.stringify({ rootVars, results }, null, 2));

  // Now capture each page screenshot with 8s wait to ensure challenge passed
  const otherPages = [
    { name: 'ai_automation', url: 'https://techcentera.com/ai-automation/' },
    { name: 'about', url: 'https://techcentera.com/about-us/' },
    { name: 'contact', url: 'https://techcentera.com/contact-us/' },
    { name: 'blog', url: 'https://techcentera.com/blog/' },
  ];

  for (const op of otherPages) {
    console.log(`Navigating to ${op.name} (${op.url})...`);
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(op.url, { waitUntil: 'networkidle2', timeout: 60000 });
    await new Promise(r => setTimeout(r, 4000));
    await page.screenshot({ path: `C:\\Users\\DK\\Desktop\\Business Website\\techcentera\\design\\screenshots\\${op.name}_desktop.png` });
    fs.copyFileSync(`C:\\Users\\DK\\Desktop\\Business Website\\techcentera\\design\\screenshots\\${op.name}_desktop.png`, `C:\\Users\\DK\\Desktop\\Business Website\\design\\screenshots\\${op.name}_desktop.png`);

    await page.setViewport({ width: 390, height: 844 });
    await page.screenshot({ path: `C:\\Users\\DK\\Desktop\\Business Website\\techcentera\\design\\screenshots\\${op.name}_mobile.png` });
    fs.copyFileSync(`C:\\Users\\DK\\Desktop\\Business Website\\techcentera\\design\\screenshots\\${op.name}_mobile.png`, `C:\\Users\\DK\\Desktop\\Business Website\\design\\screenshots\\${op.name}_mobile.png`);
  }

  // Home mobile
  await page.setViewport({ width: 390, height: 844 });
  await page.goto('https://techcentera.com', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 3000));
  await page.screenshot({ path: `C:\\Users\\DK\\Desktop\\Business Website\\techcentera\\design\\screenshots\\home_mobile.png` });
  fs.copyFileSync(`C:\\Users\\DK\\Desktop\\Business Website\\techcentera\\design\\screenshots\\home_mobile.png`, `C:\\Users\\DK\\Desktop\\Business Website\\design\\screenshots\\home_mobile.png`);

  await browser.close();
  console.log('Audit completed successfully!');
}

run();
