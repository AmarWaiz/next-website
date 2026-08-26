import fs from 'fs';

async function fetchCssFiles() {
  const urls = [
    'https://techcentera.com/wp-content/uploads/elementor/css/post-7.css',
    'https://techcentera.com/wp-content/uploads/elementor/css/post-34.css',
    'https://techcentera.com/wp-content/uploads/elementor/css/post-24.css',
    'https://techcentera.com/wp-content/uploads/elementor/css/post-1295.css',
    'https://techcentera.com/wp-content/uploads/elementor/css/post-1222.css',
    'https://techcentera.com/wp-content/uploads/elementor/css/post-2900.css',
    'https://techcentera.com/wp-content/themes/hello-theme-child-master/style.css',
    'https://techcentera.com/wp-content/themes/hello-elementor/assets/css/theme.css',
    'https://techcentera.com/wp-content/themes/hello-elementor/assets/css/header-footer.css',
    'http://techcentera.com/wp-content/uploads/elementor/css/base-desktop.css',
  ];

  for (const url of urls) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      const css = await res.text();
      console.log(`\n========================================`);
      console.log(`FILE: ${url} (length: ${css.length})`);
      console.log(`========================================`);
      
      // Look for --e-global-color
      const globalColors = [...css.matchAll(/--e-global-color-[a-zA-Z0-9_-]+:\s*[^;]+/g)];
      if (globalColors.length > 0) {
        console.log(`\n--e-global-color variables:`);
        globalColors.forEach(m => console.log('  ', m[0]));
      }

      // Look for --e-global-typography
      const globalTypo = [...css.matchAll(/--e-global-typography-[a-zA-Z0-9_-]+:\s*[^;]+/g)];
      if (globalTypo.length > 0) {
        console.log(`\n--e-global-typography variables:`);
        globalTypo.forEach(m => console.log('  ', m[0]));
      }

      // Look for font-family
      const fontFamilies = [...css.matchAll(/font-family:\s*([^;}]+)/gi)];
      if (fontFamilies.length > 0) {
        const uniqueFonts = [...new Set(fontFamilies.map(f => f[1].trim()))];
        console.log(`\nUnique font-families:`, uniqueFonts);
      }

      // Look for root variables
      const rootVars = [...css.matchAll(/:root\s*\{([^}]+)\}/g)];
      if (rootVars.length > 0) {
        console.log(`\n:root blocks:`);
        rootVars.forEach(r => console.log(r[0]));
      }
    } catch (e) {
      console.error(`Error fetching ${url}:`, e);
    }
  }
}

fetchCssFiles();
