const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://urgenttaxis.com/');
  const heroImage = await page.evaluate(() => {
    // Find image in the hero section. Usually it's the largest image or an image inside the first section.
    // The hero section probably has a height > 500px and contains an image.
    const imgs = Array.from(document.querySelectorAll('img'));
    return imgs.map(img => img.src);
  });
  console.log(heroImage);
  await browser.close();
})();
