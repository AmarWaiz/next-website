import fs from 'fs';

async function auditBexon() {
  const url = 'https://bexon-react.vercel.app/home-02';
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const html = await res.text();
    console.log(`Fetched Bexon home-02, length: ${html.length}`);

    // Find stylesheets
    const links = [...html.matchAll(/<link[^>]+href=["']([^"']+\.css[^"']*)["'][^>]*>/gi)].map(m => m[1]);
    console.log(`Found ${links.length} CSS links:`);
    links.forEach(l => console.log(' -', l));

    for (const link of links) {
      const fullUrl = link.startsWith('http') ? link : new URL(link, url).href;
      const cssRes = await fetch(fullUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      const css = await cssRes.text();
      console.log(`\nCSS file: ${fullUrl} (length: ${css.length})`);
      
      // Look for fonts
      const fonts = [...css.matchAll(/font-family:\s*([^;}]+)/gi)];
      console.log('Fonts:', [...new Set(fonts.map(f => f[1].trim()))]);

      // Look for container, section padding, gaps
      const containers = [...css.matchAll(/(\.container[^{}]*)\{([^{}]+)\}/gi)];
      containers.forEach(c => console.log('Container rule:', c[1], '=>', c[2]));

      // Look for sections
      const sections = [...css.matchAll(/(\.[a-zA-Z0-9_-]*(?:section|hero|service|about|process|testimonial|contact|footer)[^{}]*)\{([^{}]+)\}/gi)];
      console.log(`Found ${sections.length} section-related rules.`);
      sections.slice(0, 20).forEach(s => console.log(`[Section] ${s[1]} => ${s[2]}`));
    }
  } catch (e) {
    console.error('Error auditing Bexon:', e);
  }
}

auditBexon();
