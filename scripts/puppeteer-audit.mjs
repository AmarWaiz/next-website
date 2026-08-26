import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

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

async function runAudit() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('Navigating to https://techcentera.com...');
  await page.goto('https://techcentera.com', { waitUntil: 'networkidle2' });

  // 1. Extract all :root CSS variables
  const rootVars = await page.evaluate(() => {
    const rootStyle = getComputedStyle(document.documentElement);
    const styles = Array.from(document.styleSheets);
    const vars = {};
    for (const sheet of styles) {
      try {
        const rules = Array.from(sheet.cssRules || []);
        for (const rule of rules) {
          if (rule.selectorText === ':root' || rule.selectorText === 'html') {
            for (let i = 0; i < rule.style.length; i++) {
              const name = rule.style[i];
              if (name.startsWith('--e-global') || name.startsWith('--wp--') || name.startsWith('--')) {
                vars[name] = rule.style.getPropertyValue(name).trim();
              }
            }
          }
        }
      } catch (e) {}
    }
    return vars;
  });

  console.log('Root CSS variables extracted:', rootVars);

  // 2. Sample computed styles for specific elements on Home
  const elements = [
    { label: 'Header', selector: 'header, .site-header, .elementor-location-header' },
    { label: 'Hero Section', selector: 'section.elementor-top-section:first-of-type, .hero-section, main > section:first-child' },
    { label: 'Hero Heading (H1)', selector: 'h1' },
    { label: 'Body Paragraph', selector: 'p' },
    { label: 'Primary Button (default)', selector: 'a.elementor-button, button.elementor-button, .elementor-button' },
    { label: 'Service Card', selector: '.elementor-widget-icon-box, .elementor-widget-call-to-action, .e-con-inner > .e-con, .elementor-card' },
    { label: 'Stat Counter', selector: '.elementor-counter, .elementor-counter-number-wrapper' },
    { label: 'Section Heading (H2)', selector: 'h2' },
    { label: 'Borders / Dividers', selector: '.elementor-divider-separator, hr, [class*="divider"]' },
    { label: 'Footer', selector: 'footer, .site-footer, .elementor-location-footer' },
  ];

  const sampled = [];

  for (const el of elements) {
    try {
      const info = await page.evaluate((sel, label) => {
        const target = document.querySelector(sel);
        if (!target) return null;
        const comp = window.getComputedStyle(target);
        return {
          label,
          selector: sel,
          actualTag: target.tagName.toLowerCase(),
          className: target.className,
          bgColor: comp.backgroundColor,
          color: comp.color,
          borderColor: comp.borderColor,
          fontFamily: comp.fontFamily,
          fontSize: comp.fontSize,
          fontWeight: comp.fontWeight,
          lineHeight: comp.lineHeight,
          borderRadius: comp.borderRadius,
          padding: comp.padding,
        };
      }, el.selector, el.label);

      if (info) {
        info.bgHex = rgbToHex(info.bgColor);
        info.colorHex = rgbToHex(info.color);
        info.borderHex = rgbToHex(info.borderColor);
        sampled.push(info);
      } else {
        sampled.push({ label: el.label, selector: el.selector, status: 'Not found on home page' });
      }
    } catch (e) {
      sampled.push({ label: el.label, selector: el.selector, error: e.message });
    }
  }

  // Hover state on Primary Button
  try {
    const btnHover = await page.evaluate(async () => {
      const btn = document.querySelector('a.elementor-button, button.elementor-button, .elementor-button');
      if (!btn) return null;
      btn.classList.add('elementor-hover'); // simulate hover or trigger mouseover
      btn.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
      const comp = window.getComputedStyle(btn);
      return {
        bgColor: comp.backgroundColor,
        color: comp.color,
        borderColor: comp.borderColor
      };
    });
    if (btnHover) {
      sampled.push({
        label: 'Primary Button (hover state)',
        selector: '.elementor-button:hover',
        bgHex: rgbToHex(btnHover.bgColor),
        colorHex: rgbToHex(btnHover.color),
        borderHex: rgbToHex(btnHover.borderColor)
      });
    }
  } catch (e) {
    console.error('Hover evaluation error:', e);
  }

  console.log('\n--- SAMPLED ELEMENTS TABLE ---');
  console.log(JSON.stringify(sampled, null, 2));

  // Save audit data to JSON
  fs.writeFileSync('C:\\Users\\DK\\Desktop\\Business Website\\techcentera\\design\\audit-data.json', JSON.stringify({ rootVars, sampled }, null, 2));
  console.log('Saved audit-data.json');

  await browser.close();
}

runAudit();
