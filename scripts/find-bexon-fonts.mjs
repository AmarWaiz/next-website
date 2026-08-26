import fs from 'fs';

async function findBexonFonts() {
  const url = 'https://bexon-react.vercel.app/_next/static/chunks/2tr61paoqfswt.css';
  const res = await fetch(url);
  const css = await res.text();
  
  const headingMatches = [...css.matchAll(/--tj-ff-heading:[^;]+/g)];
  headingMatches.forEach(m => console.log('Heading font var:', m[0]));

  const bodyMatches = [...css.matchAll(/--tj-ff-body:[^;]+/g)];
  bodyMatches.forEach(m => console.log('Body font var:', m[0]));

  // Also check Google font links or font-face in HTML
  const htmlRes = await fetch('https://bexon-react.vercel.app/home-02');
  const html = await htmlRes.text();
  const fontLinks = [...html.matchAll(/fonts\.googleapis\.com\/css2\?family=([^"&']+)/g)];
  console.log('Google Fonts in HTML:', fontLinks.map(f => decodeURIComponent(f[1])));
}

findBexonFonts();
