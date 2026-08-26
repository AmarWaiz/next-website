import fs from 'fs';

async function inspectBexonVars() {
  const url = 'https://bexon-react.vercel.app/_next/static/chunks/2tr61paoqfswt.css';
  const res = await fetch(url);
  const css = await res.text();
  
  const rootMatches = [...css.matchAll(/:root\s*\{([^}]+)\}/g)];
  console.log('Root blocks in Bexon:');
  rootMatches.forEach(r => console.log(r[1]));

  // Find all --tj- variables
  const tjVars = [...css.matchAll(/--tj-[a-zA-Z0-9_-]+:\s*[^;]+/g)];
  console.log('TJ Variables (first 40):');
  [...new Set(tjVars.map(v => v[0]))].slice(0, 50).forEach(v => console.log(' ', v));
}

inspectBexonVars();
