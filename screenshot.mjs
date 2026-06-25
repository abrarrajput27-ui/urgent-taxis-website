import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

(async () => {
  console.log('Starting puppeteer...');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  const takeScreenshots = async (namePrefix, isMobile) => {
    if (isMobile) {
      await page.setViewport({ width: 390, height: 844 });
    } else {
      await page.setViewport({ width: 1440, height: 900 });
    }

    console.log(`Taking ${isMobile ? 'mobile' : 'desktop'} screenshots for ${namePrefix}...`);

    // 1. Hero Section
    await page.goto('http://localhost:5174', { waitUntil: 'networkidle0' });
    // evaluate and remove any external elements if necessary
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: join(__dirname, `${namePrefix}_1_hero.png`), fullPage: false });

    // 2. Fleet Section (on Homepage)
    await page.goto('http://localhost:4173/fleet', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: join(__dirname, `${namePrefix}_2_fleet.png`), fullPage: true });

    // 3. Fare Breakup Section
    await page.goto('http://localhost:4173/fare-results?pickup=Delhi&drop=Agra', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 2000));
    // Desktop fare engine screenshot
await page.screenshot({ path: join(__dirname, `${namePrefix}_fare_engine.png`), fullPage: true });
// Desktop route fare screenshot (homepage)
await page.goto('http://localhost:5174', { waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 1000));
await page.screenshot({ path: join(__dirname, `${namePrefix}_route_fare.png`), fullPage: true });
  };

  await takeScreenshots('desktop', false);
  await takeScreenshots('mobile', true);

  await browser.close();
  console.log('Screenshots saved successfully.');
})();
