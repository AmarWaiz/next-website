import puppeteer from 'puppeteer-core';
import fs from 'fs';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function captureBexon() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('https://bexon-react.vercel.app/home-02', { waitUntil: 'networkidle2', timeout: 60000 });
  await new Promise(r => setTimeout(r, 4000));

  await page.screenshot({ path: 'C:\\Users\\DK\\Desktop\\Business Website\\techcentera\\design\\screenshots\\bexon_desktop.png' });
  fs.copyFileSync('C:\\Users\\DK\\Desktop\\Business Website\\techcentera\\design\\screenshots\\bexon_desktop.png', 'C:\\Users\\DK\\Desktop\\Business Website\\design\\screenshots\\bexon_desktop.png');

  await page.setViewport({ width: 390, height: 844 });
  await page.screenshot({ path: 'C:\\Users\\DK\\Desktop\\Business Website\\techcentera\\design\\screenshots\\bexon_mobile.png' });
  fs.copyFileSync('C:\\Users\\DK\\Desktop\\Business Website\\techcentera\\design\\screenshots\\bexon_mobile.png', 'C:\\Users\\DK\\Desktop\\Business Website\\design\\screenshots\\bexon_mobile.png');

  console.log('Bexon screenshots updated.');
  await browser.close();
}

captureBexon();
