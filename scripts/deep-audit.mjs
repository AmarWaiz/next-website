import fs from 'fs';

async function deepAudit() {
  const cssFiles = [
    { name: 'global_post_7', url: 'https://techcentera.com/wp-content/uploads/elementor/css/post-7.css' },
    { name: 'header_footer_post_34', url: 'https://techcentera.com/wp-content/uploads/elementor/css/post-34.css' },
    { name: 'home_post_24', url: 'https://techcentera.com/wp-content/uploads/elementor/css/post-24.css' },
    { name: 'about_post_1295', url: 'https://techcentera.com/wp-content/uploads/elementor/css/post-1295.css' },
    { name: 'contact_post_1222', url: 'https://techcentera.com/wp-content/uploads/elementor/css/post-1222.css' },
    { name: 'blog_post_2900', url: 'https://techcentera.com/wp-content/uploads/elementor/css/post-2900.css' },
  ];

  const allRules = [];

  for (const file of cssFiles) {
    const res = await fetch(file.url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const cssText = await res.text();
    
    // Parse CSS rules regex
    const ruleMatches = [...cssText.matchAll(/([^{}]+)\{([^{}]+)\}/g)];
    for (const match of ruleMatches) {
      const selector = match[1].trim();
      const body = match[2].trim();
      allRules.push({ file: file.name, selector, body });
    }
  }

  console.log(`Parsed total ${allRules.length} CSS rules.`);

  // Find colors used in backgrounds, text, borders, buttons
  const findRules = (keyword) => {
    return allRules.filter(r => r.selector.toLowerCase().includes(keyword.toLowerCase()) || r.body.toLowerCase().includes(keyword.toLowerCase()));
  };

  console.log('\n--- BUTTON RULES ---');
  const buttonRules = allRules.filter(r => r.selector.includes('btn') || r.selector.includes('button') || r.selector.includes('elementor-button'));
  buttonRules.forEach(r => console.log(`[${r.file}] ${r.selector} => ${r.body}`));

  console.log('\n--- HEADER RULES ---');
  const headerRules = allRules.filter(r => r.selector.includes('header') || r.selector.includes('nav') || r.selector.includes('menu'));
  headerRules.slice(0, 15).forEach(r => console.log(`[${r.file}] ${r.selector} => ${r.body}`));

  console.log('\n--- FOOTER RULES ---');
  const footerRules = allRules.filter(r => r.selector.includes('footer'));
  footerRules.slice(0, 15).forEach(r => console.log(`[${r.file}] ${r.selector} => ${r.body}`));

  console.log('\n--- CARD / CONTAINER / STAT RULES ---');
  const cardRules = allRules.filter(r => r.selector.includes('card') || r.selector.includes('counter') || r.selector.includes('box') || r.selector.includes('grid'));
  cardRules.slice(0, 20).forEach(r => console.log(`[${r.file}] ${r.selector} => ${r.body}`));

  // Extract all hex, rgb, rgba colors from all rules
  const allColors = new Set();
  allRules.forEach(r => {
    const hex = r.body.match(/#[0-9a-fA-F]{3,8}/g);
    if (hex) hex.forEach(c => allColors.add(c.toLowerCase()));
    const rgb = r.body.match(/rgba?\([^)]+\)/g);
    if (rgb) rgb.forEach(c => allColors.add(c.toLowerCase()));
  });

  console.log('\n--- ALL UNIQUE COLORS SAMPLED ACROSS STYLESHEETS ---');
  console.log([...allColors].sort());
}

deepAudit();
