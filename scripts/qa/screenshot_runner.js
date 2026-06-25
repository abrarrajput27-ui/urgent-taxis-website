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

    // Fare Engine screenshot
    await page.goto('http://localhost:5178/fare-results?pickup=Delhi&drop=Agra', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: join(__dirname, `${namePrefix}_fare_engine.png`), fullPage: true });

    // Route fare (homepage) screenshot
    await page.goto('http://localhost:5178/', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: join(__dirname, `${namePrefix}_route_fare.png`), fullPage: true });
  };

  await takeScreenshots('desktop', false);
  await takeScreenshots('mobile', true);

  await browser.close();
  console.log('Screenshots saved successfully.');
})();
