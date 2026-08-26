import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir1 = 'C:\\Users\\DK\\Desktop\\Business Website\\techcentera\\design\\screenshots';
const outDir2 = 'C:\\Users\\DK\\Desktop\\Business Website\\design\\screenshots';

const bDesktop1 = path.join(outDir1, 'bexon_desktop.png');
const bDesktop2 = path.join(outDir2, 'bexon_desktop.png');
const bMobile1 = path.join(outDir1, 'bexon_mobile.png');
const bMobile2 = path.join(outDir2, 'bexon_mobile.png');

try {
  execSync(`"${chromePath}" --headless=new --disable-gpu --window-size=1440,900 --screenshot="${bDesktop1}" "https://bexon-react.vercel.app/home-02"`, { timeout: 30000 });
  fs.copyFileSync(bDesktop1, bDesktop2);
  console.log('Bexon desktop captured');
} catch (e) {
  console.error('Bexon desktop error:', e.message);
}

try {
  execSync(`"${chromePath}" --headless=new --disable-gpu --window-size=390,844 --screenshot="${bMobile1}" "https://bexon-react.vercel.app/home-02"`, { timeout: 30000 });
  fs.copyFileSync(bMobile1, bMobile2);
  console.log('Bexon mobile captured');
} catch (e) {
  console.error('Bexon mobile error:', e.message);
}
