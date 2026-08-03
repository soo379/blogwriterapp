const { test, expect } = require('@playwright/test');

test('smoke: about:blank loads', async ({ page }) => {
  await page.goto('about:blank');
  expect(page.url()).toBe('about:blank');
});
