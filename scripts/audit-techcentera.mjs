import fs from 'fs';
import path from 'path';

async function audit() {
  console.log('Fetching TechCentera pages...');
  const pages = [
    { name: 'home', url: 'https://techcentera.com/' },
    { name: 'ai-automation', url: 'https://techcentera.com/ai-automation/' },
    { name: 'about-us', url: 'https://techcentera.com/about-us/' },
    { name: 'contact-us', url: 'https://techcentera.com/contact-us/' },
    { name: 'blog', url: 'https://techcentera.com/blog/' },
  ];

  for (const page of pages) {
    try {
      const res = await fetch(page.url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      const html = await res.text();
      console.log(`\n=== Page: ${page.name} (${page.url}) === Length: ${html.length}`);
      
      // Look for inline style tags
      const styleMatches = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)];
      console.log(`Found ${styleMatches.length} <style> tags`);

      // Look for stylesheet links
      const linkMatches = [...html.matchAll(/<link[^>]+href=["']([^"']+\.css[^"']*)["'][^>]*>/gi)];
      console.log(`Found ${linkMatches.length} CSS link tags:`);
      for (const m of linkMatches) {
        console.log(` - ${m[1]}`);
      }

      // Check for css variables in inline styles
      for (const sm of styleMatches) {
        const content = sm[1];
        if (content.includes('--e-global') || content.includes('--wp--') || content.includes(':root')) {
          console.log('Found CSS variables in <style> block:');
          const varMatches = content.match(/--[a-zA-Z0-9_-]+:\s*[^;]+/g);
          if (varMatches) {
            varMatches.slice(0, 20).forEach(v => console.log('   ', v));
          }
        }
      }
    } catch (e) {
      console.error(`Error fetching ${page.url}:`, e);
    }
  }
}

audit();
