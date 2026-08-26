import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const targets = [
  { name: 'home', url: 'https://techcentera.com/' },
  { name: 'ai_automation', url: 'https://techcentera.com/ai-automation/' },
  { name: 'about', url: 'https://techcentera.com/about-us/' },
  { name: 'contact', url: 'https://techcentera.com/contact-us/' },
  { name: 'blog', url: 'https://techcentera.com/blog/' },
];

const outDirs = [
  'C:\\Users\\DK\\Desktop\\Business Website\\techcentera\\design\\screenshots',
  'C:\\Users\\DK\\Desktop\\Business Website\\design\\screenshots',
];

for (const dir of outDirs) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

for (const t of targets) {
  console.log(`\nCapturing screenshots for ${t.name} (${t.url})...`);
  
  // Desktop: 1440x900
  const desktopOut1 = path.join(outDirs[0], `${t.name}_desktop.png`);
  const desktopOut2 = path.join(outDirs[1], `${t.name}_desktop.png`);
  const desktopCmd = `"${chromePath}" --headless=new --disable-gpu --window-size=1440,900 --screenshot="${desktopOut1}" "${t.url}"`;
  try {
    execSync(desktopCmd, { timeout: 30000, stdio: 'ignore' });
    fs.copyFileSync(desktopOut1, desktopOut2);
    console.log(` - Desktop screenshot captured: ${t.name}_desktop.png`);
  } catch (err) {
    console.error(` - Failed desktop screenshot for ${t.name}:`, err.message);
  }

  // Mobile: 390x844
  const mobileOut1 = path.join(outDirs[0], `${t.name}_mobile.png`);
  const mobileOut2 = path.join(outDirs[1], `${t.name}_mobile.png`);
  const mobileCmd = `"${chromePath}" --headless=new --disable-gpu --window-size=390,844 --screenshot="${mobileOut1}" "${t.url}"`;
  try {
    execSync(mobileCmd, { timeout: 30000, stdio: 'ignore' });
    fs.copyFileSync(mobileOut1, mobileOut2);
    console.log(` - Mobile screenshot captured: ${t.name}_mobile.png`);
  } catch (err) {
    console.error(` - Failed mobile screenshot for ${t.name}:`, err.message);
  }
}

console.log('\nAll screenshots captured successfully!');
