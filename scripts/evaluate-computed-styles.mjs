import http from 'http';
import { spawn } from 'child_process';
import path from 'path';

// Let's launch Chrome with remote debugging to query exact computed styles
async function run() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9222;
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--disable-gpu',
    `--remote-debugging-port=${port}`,
    '--window-size=1440,900',
    'https://techcentera.com'
  ]);

  await new Promise(r => setTimeout(r, 4000));

  try {
    const listRes = await fetch(`http://127.0.0.1:${port}/json/list`);
    const pages = await listRes.json();
    const page = pages.find(p => p.url.includes('techcentera.com') || p.type === 'page');
    console.log('Target page found:', page.title, page.webSocketDebuggerUrl);

    // Use WebSocket to connect to Chrome DevTools Protocol
    const WebSocket = (await import('ws')).default || (await import('ws'));
    // If ws not available in node, let's see
  } catch (e) {
    console.log('WS inspect failed:', e.message);
  } finally {
    chrome.kill();
  }
}

run();
