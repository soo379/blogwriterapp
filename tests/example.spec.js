const { test, expect } = require('@playwright/test');

test.describe('Docs app E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('title and header match', async ({ page }) => {
    await expect(page).toHaveTitle('네이버 블로그 글쓰기 앱');
    await expect(page.locator('h1')).toHaveText('네이버 블로그 글쓰기 앱');
  });

  test('load example, generate and check preview/markdown', async ({ page }) => {
    await page.click('#loadExample');
    await page.click('#generate');

    // preview should include the example title
    await expect(page.locator('#preview')).toContainText('2026 네이버 블로그 상위 노출 공식');

    // markdown panel is populated
    const md = await page.locator('#markdown').innerText();
    expect(md).toContain('# 2026 네이버 블로그 상위 노출 공식');
    expect(md).toContain('**이미지 URL:**');
  });

  test('add section increases section count and appears in preview after generate', async ({ page }) => {
    const sections = page.locator('#sections .section-block');
    const initial = await sections.count();
    await page.click('#addSection');
    await expect(sections).toHaveCount(initial + 1);

    // fill a heading in the newly added section
    const newSection = sections.nth(initial);
    await newSection.locator('.section-heading').fill('추가된 섹션 제목');

    await page.click('#generate');
    await expect(page.locator('#preview')).toContainText('추가된 섹션 제목');
  });
});
