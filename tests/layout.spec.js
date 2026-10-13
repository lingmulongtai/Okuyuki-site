const { test, expect } = require('@playwright/test');

for (const scheme of ['light', 'dark']) {
  test(`${scheme}: ページ全体が横にはみ出さない`, async ({ page }, info) => {
    await page.emulateMedia({ colorScheme: scheme });
    await page.goto('index.html');
    await page.waitForTimeout(1800);
    const { scrollWidth, innerWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
    }));
    expect(scrollWidth).toBeLessThanOrEqual(innerWidth);
    await expect(page.locator('h1')).toBeVisible();
    for (const id of ['devices', 'how', 'quality', 'privacy', 'status']) {
      await expect(page.locator(`#${id} h2`)).toBeVisible();
    }
    await page.screenshot({ path: info.outputPath(`${scheme}.png`), fullPage: true });
  });
}

test('ページ内リンクの行き先がすべてある', async ({ page }) => {
  await page.goto('index.html');
  const missing = await page.evaluate(() =>
    [...document.querySelectorAll('a[href^="#"]')]
      .map((a) => a.getAttribute('href').slice(1))
      .filter((id) => !document.getElementById(id)));
  expect(missing).toEqual([]);
});
