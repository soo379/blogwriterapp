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

  test('export triggers a download', async ({ page }) => {
    await page.click('#loadExample');
    await page.click('#generate');

    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.click('#exportMarkdown'),
    ]);

    // Ensure a download object was created
    const suggested = download.suggestedFilename();
    expect(suggested).toContain('blog-post');
    // attempt to save to a temporary path
    const tmpPath = require('path').join(__dirname, '..', 'tmp-download.md');
    await download.saveAs(tmpPath);
    const fs = require('fs');
    expect(fs.existsSync(tmpPath)).toBe(true);
    const content = fs.readFileSync(tmpPath, 'utf8');
    expect(content).toContain('# 2026 네이버 블로그 상위 노출 공식');
    expect(content).toContain('추천 CTA');
    expect(content).toContain('**이미지 URL:**');
    expect(content).toContain('**키워드:**');
    fs.unlinkSync(tmpPath);
  });

  test('copy to clipboard uses navigator.clipboard mock', async ({ page }) => {
    await page.evaluate(() => {
      window._copiedText = null;
      navigator.clipboard = {
        writeText: (t) => {
          window._copiedText = t;
          return Promise.resolve();
        }
      };
    });

    await page.click('#loadExample');
    await page.click('#generate');
    await page.click('#copyMarkdown');

    const copied = await page.evaluate(() => window._copiedText);
    expect(copied).toContain('2026 네이버 블로그 상위 노출 공식');
  });

  test('copy to clipboard failure shows alert', async ({ page }) => {
    await page.evaluate(() => {
      window._copiedText = null;
      navigator.clipboard = {
        writeText: (t) => Promise.reject('mock-error')
      };
    });

    page.once('dialog', async (dialog) => {
      expect(dialog.type()).toBe('alert');
      expect(dialog.message()).toContain('복사 실패');
      await dialog.dismiss();
    });

    await page.click('#loadExample');
    await page.click('#generate');
    await page.click('#copyMarkdown');
  });

  test('export markdown UI shows success path when download is triggered', async ({ page }) => {
    await page.click('#loadExample');
    await page.click('#generate');

    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.click('#exportMarkdown'),
    ]);

    const suggested = download.suggestedFilename();
    expect(suggested).toContain('blog-post');
  });
});
