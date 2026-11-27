// Render poster.html to entry.png (1024x1024) with Puppeteer.
// Puppeteer is borrowed from the shared make.fun tools install; its package
// ships a CommonJS entry point, so it is loaded through createRequire.
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const require = createRequire(import.meta.url);
const puppeteer = require('/home/hatch/workspace/makefun/tools/node_modules/puppeteer/lib/puppeteer/puppeteer.js');

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(here, '..');
const htmlPath = join(repoRoot, 'poster.html');
const outPath = join(repoRoot, 'entry.png');

const browser = await puppeteer.launch({
  executablePath: '/home/hatch/.cache/puppeteer/chrome/linux-158.0.8127.88/chrome-linux64/chrome',
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1024, height: 1024, deviceScaleFactor: 1 });
  await page.goto('file://' + htmlPath, { waitUntil: 'load' });
  const poster = await page.$('#poster');
  if (!poster) throw new Error('#poster element not found in poster.html');
  await poster.screenshot({ path: outPath, type: 'png' });
  console.log('wrote', outPath);
} finally {
  await browser.close();
}
