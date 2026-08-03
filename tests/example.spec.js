const { test, expect } = require('@playwright/test');

test('page: docs index serves', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Blog Writer/i);
});
