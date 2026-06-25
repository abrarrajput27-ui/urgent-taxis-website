import puppeteer from 'puppeteer'; 
(async () => { 
  const browser = await puppeteer.launch({headless: 'new'}); 
  const page = await browser.newPage(); 
  await page.goto('http://localhost:4173/route/delhi-to-agra', {waitUntil: 'networkidle2'}); 
  const seo = await page.evaluate(() => ({
    title: document.title, 
    meta: document.querySelector('meta[name="description"]')?.content, 
    canonical: document.querySelector('link[rel="canonical"]')?.href
  })); 
  console.log(seo); 
  await browser.close(); 
})();
