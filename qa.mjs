import puppeteer from 'puppeteer';
import fs from 'fs';

const PORT = 4173;
const BASE_URL = `http://localhost:${PORT}`;

async function runQA() {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const report = [];
  report.push('# Final Live QA Report');
  
  try {
    const page = await browser.newPage();
    
    // 1. Homepage SEO & Links
    await page.goto(BASE_URL, { waitUntil: 'networkidle2' });
    const title = await page.title();
    report.push(`\n## 1. Homepage`);
    report.push(`- **Title:** ${title}`);
    
    // Check Mobile Viewports for overflow
    report.push(`\n## 6. Mobile QA (Overflow Check)`);
    const viewports = [
      { width: 360, height: 800, name: 'Small Mobile (360px)' },
      { width: 390, height: 844, name: 'iPhone 12/13 (390px)' },
      { width: 414, height: 896, name: 'Large Mobile (414px)' },
      { width: 768, height: 1024, name: 'Tablet (768px)' },
    ];
    
    for (const vp of viewports) {
      await page.setViewport(vp);
      await page.goto(BASE_URL, { waitUntil: 'networkidle2' });
      const hasOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });
      report.push(`- **${vp.name}:** Horizontal Scroll/Overflow: ${hasOverflow ? 'FAIL ❌' : 'PASS ✅'}`);
    }

    // 4. Route Pages (Check 5 pages as sample)
    report.push(`\n## 4. Route Pages (SEO & Errors Check)`);
    const routes = ['/route/delhi-to-agra', '/route/delhi-to-jaipur', '/route/noida-to-dehradun', '/route/gurgaon-to-chandigarh', '/route/delhi-to-shimla'];
    
    for (const route of routes) {
      await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle2' });
      
      const seo = await page.evaluate(() => {
        return {
          title: document.title,
          metaDesc: document.querySelector('meta[name="description"]')?.content || 'Missing',
          canonical: document.querySelector('link[rel="canonical"]')?.href || 'Missing'
        };
      });
      
      report.push(`### ${route}`);
      report.push(`- **Title:** ${seo.title}`);
      report.push(`- **Meta Desc:** ${seo.metaDesc}`);
      report.push(`- **Canonical:** ${seo.canonical}`);
    }
    
    // 5. Airport Pages
    report.push(`\n## 5. Airport Pages`);
    const airports = ['/airport/delhi-airport-transfers', '/airport/noida-international-airport-transfers'];
    for (const apt of airports) {
      const response = await page.goto(`${BASE_URL}${apt}`, { waitUntil: 'networkidle2' });
      report.push(`- **${apt}:** Status ${response.status()}`);
    }

  } catch (err) {
    console.error(err);
    report.push(`\n**Error during QA script:** ${err.message}`);
  } finally {
    await browser.close();
  }

  fs.writeFileSync('qa_report.md', report.join('\n'));
  console.log('QA script completed. Report written to qa_report.md');
}

runQA();
