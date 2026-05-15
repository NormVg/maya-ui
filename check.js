import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto('http://localhost:3000/components/button');
  await page.evaluate(() => {
    localStorage.setItem('nuxt-color-mode', 'light');
    document.documentElement.setAttribute('data-theme', 'light');
  });
  await page.goto('http://localhost:3000/components/button');
  await page.screenshot({ path: 'test_clean_button.png' });
  await browser.close();
})();
