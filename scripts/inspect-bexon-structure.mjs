import fs from 'fs';

async function inspectBexonStructure() {
  const res = await fetch('https://bexon-react.vercel.app/home-02');
  const html = await res.text();
  
  // Find all sections or main content
  const sections = [...html.matchAll(/<section[^>]*class=["']([^"']+)["'][^>]*>/gi)];
  console.log(`Found ${sections.length} <section> elements on Bexon home-02:`);
  sections.forEach((s, idx) => console.log(` ${idx + 1}. class="${s[1]}"`));

  // Find headings
  const headings = [...html.matchAll(/<(h[1-6])[^>]*>([\s\S]*?)<\/\1>/gi)];
  console.log(`\nFound ${headings.length} headings:`);
  headings.slice(0, 15).forEach(h => console.log(` <${h[1]}>: ${h[2].replace(/<[^>]+>/g, '').trim().slice(0, 80)}`));
}

inspectBexonStructure();
