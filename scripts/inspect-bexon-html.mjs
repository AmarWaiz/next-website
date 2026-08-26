import fs from 'fs';

async function inspectBexonHtml() {
  const res = await fetch('https://bexon-react.vercel.app/home-02');
  const html = await res.text();
  
  // Extract all font-family definitions in HTML
  const fontMatches = [...html.matchAll(/font-family:([^;}]+)/gi)];
  console.log('Font families in HTML:', [...new Set(fontMatches.map(m => m[1]))]);

  // Extract next/font variable definitions
  const fontVarMatches = [...html.matchAll(/--font-[a-zA-Z0-9_-]+:[^;}]+/gi)];
  console.log('Next font vars in HTML:', fontVarMatches.map(m => m[0]));

  // Check head style tags
  const styles = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)];
  for (const s of styles) {
    if (s[1].includes('@font-face') || s[1].includes('font-family')) {
      console.log('Style snippet:', s[1].slice(0, 500));
    }
  }
}

inspectBexonHtml();
