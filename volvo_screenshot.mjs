import puppeteer from 'puppeteer';

const PORT = 4173;
const BASE_URL = `http://localhost:${PORT}`;

const delay = (time) => new Promise(resolve => setTimeout(resolve, time));

async function takeFocusedScreenshots() {
  const browser = await puppeteer.launch({
    headless: "new",
    defaultViewport: { width: 1280, height: 2500 },
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    console.log('Taking full fleet screenshot...');
    
    await page.goto(`${BASE_URL}/fleet`, { waitUntil: 'networkidle0' });
    await delay(2000);
    await page.screenshot({ path: 'volvo_fleet_full.png', fullPage: true });
    console.log('Saved volvo_fleet_full.png');

  } catch (error) {
    console.error('Error taking screenshots:', error);
  } finally {
    await browser.close();
  }
}

takeFocusedScreenshots();
