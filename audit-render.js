import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const PORT = 4173; // Default vite preview port
const BASE_URL = `http://localhost:${PORT}`;

const urlsToTest = [
  '/city/noida-international-airport',
  '/city/delhi-airport',
  '/noida-international-airport-to-delhi-taxi',
  '/delhi-airport-to-haldwani-taxi',
  '/haldwani-to-delhi-airport-taxi',
  '/noida-international-airport-to-nainital-taxi',
  '/nainital-to-noida-international-airport-taxi'
];

async function runAudit() {
  console.log("--- PUPPETEER AUDIT ---");
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  let consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });
  page.on('pageerror', err => {
    consoleErrors.push(err.toString());
  });

  // Test URLs
  console.log("8. Verifying URLs render:");
  for (const urlPath of urlsToTest) {
    try {
      const response = await page.goto(`${BASE_URL}${urlPath}`, { waitUntil: 'networkidle2' });
      const content = await page.content();
      const isBlank = !content || content.length < 500 || content.includes('id="root"></div>'); // Very basic check
      const h1Count = await page.evaluate(() => document.querySelectorAll('h1').length);
      console.log(`   ${urlPath} - Status: ${response.status()} - Blank: ${isBlank} - H1s: ${h1Count}`);
    } catch (e) {
      console.log(`   ${urlPath} - Error: ${e.message}`);
    }
  }

  // 9. Footer links
  console.log("9. Verifying footer links on homepage:");
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle2' });
  const footerLinks = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('footer a'));
    return links.map(l => l.href);
  });
  console.log(`   Found ${footerLinks.length} footer links.`);
  // optionally test a few
  
  // 10. Homepage airport links
  console.log("10. Verifying homepage airport links:");
  const airportLinks = await page.evaluate(() => {
    // Assuming airport links have a specific class or we can just find links containing 'noida' or 'delhi'
    const links = Array.from(document.querySelectorAll('a'));
    return links.filter(l => l.href.includes('/city/') || l.href.includes('-airport-')).map(l => l.href);
  });
  console.log(`   Found ${new Set(airportLinks).size} unique airport/city links on homepage.`);

  // 11. Sitemap URL count
  console.log("11. Verifying sitemap URL count:");
  try {
    const sitemapStr = fs.readFileSync('public/sitemap.xml', 'utf8');
    const matches = sitemapStr.match(/<url>/g);
    console.log(`   Sitemap contains ${matches ? matches.length : 0} URLs.`);
  } catch (e) {
    console.log(`   Could not read sitemap: ${e.message}`);
  }

  // 12. React console errors
  console.log("12. Verifying React console errors:");
  console.log(`   Console errors found: ${consoleErrors.length}`);
  if (consoleErrors.length > 0) {
    console.log(`   First error: ${consoleErrors[0]}`);
  }

  await browser.close();
}

runAudit().catch(console.error);
