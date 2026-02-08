import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 816, height: 1056, deviceScaleFactor: 2 });
await page.goto('file:///home/ec2-user/clawd/outreach-engine/templates/one-pager/index.html', { waitUntil: 'networkidle0' });

await page.screenshot({ path: '/home/ec2-user/clawd/outreach-engine/templates/one-pager/preview.png', fullPage: true });
console.log('✅ Preview saved');

await page.pdf({
  path: '/home/ec2-user/clawd/outreach-engine/templates/one-pager/HobnobGrowth-OnePager.pdf',
  width: '816px',
  height: '1056px',
  printBackground: true,
  preferCSSPageSize: true,
  margin: { top: 0, right: 0, bottom: 0, left: 0 }
});
console.log('✅ PDF saved');

await browser.close();
